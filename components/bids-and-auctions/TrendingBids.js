import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  HiBell,
  HiChevronDoubleRight,
  HiMenu,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import {
  IoIosArrowDown,
  IoIosArrowRoundDown,
  IoIosShareAlt,
} from "react-icons/io";
import { IoFlash, IoFlashOutline, IoGrid } from "react-icons/io5";
import PlaceBidOverlay from "./PlaceBidOverlay";
import AllCtx from "@/util-functions/allCtx";
import { FaAngleDown } from "react-icons/fa";

import mobileProduct from "@/public/images/mobile_product.png";
import OngoingBidDesktopCountdown from "../countdowns/OngoingBidDesktopCountdown";
import OngoingBidMobileCountdown from "../countdowns/OngoingBidMobileCountdown";
import secureLocalStorage from "react-secure-storage";

function TrendingBids() {
  const {
    setShowPlaceBidOverlay,
    setShareBidOverlay,
    notificationOverlay,
    setNotificationOverlay,
    trendingBids,
    setTrendingBids,
    updateSelectedBid,
    buyNow,
    setSelectedBid,
    setBidType,
    setCategories,
    categories,
    selectedCategory,
    duplicatedOngoingBids,
    setDuplicatedCategories,
    setDuplicatedTrendingBids,
    showPlaceBidOverlay,
    updateTrendingBids,
  } = AllCtx();

  // const [selectedCategory, setSelectedCategory] = useState("Category01");
  const [fetching, setFetching] = useState(false);

  const [buttonToShow, setButtonToShow] = useState(1);

  const [openCategory, setOpenCategory] = useState(false);

  const [clickedBid, setClickedBid] = useState(null);

  const [view, setView] = useState("grid");

  const [fetchingCategories, setFetchingCategories] = useState(false);

  // //>Fetch bids
  useEffect(() => {
    updateTrendingBids();
    const intervalId = setInterval(
      () => {
        //  setUpdate(!update);
        updateTrendingBids();
      },
      trendingBids.length === 0 ? 60000 : 10000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedCategory, showPlaceBidOverlay, trendingBids.length]);

  // // //>Fetch categories
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // setLoginResponse("Please wait...");
  //       setFetchingCategories(true);
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-category`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             usertoken: secureLocalStorage.getItem("userToken"),
  //             useremail: secureLocalStorage.getItem("user")?.email,
  //           },
  //         }
  //       );

  //       const data = await response.json();

  //       if (data.status === "fail") {
  //         // setLoginResponse(data.message);
  //         console.log(data);
  //         console.log("An error occurred.");
  //         setFetchingCategories(false);
  //         return;
  //       }

  //       if (!response.ok) {
  //         // setLoginResponse("Something went wrong, retry!");
  //         console.log(data);
  //         console.log("Response not OK");
  //         // console.log(data);
  //         setFetchingCategories(false);
  //         return;
  //       }
  //       console.log(data);

  //       // return;

  //       setCategories(data.categories);
  //       setDuplicatedCategories(data.categories);

  //       setFetchingCategories(false);
  //     } catch (error) {
  //       // console.log(error);
  //       console.log("An error occurred.");
  //       // setLoginResponse("An error occurred, retry.");
  //       setFetchingCategories(false);
  //     }
  //   }
  //   fetchData();

  //   const intervalId = setInterval(() => {
  //     fetchData();
  //     // console.log("This code runs in an interval");
  //   }, 100000); // 10,000 milliseconds = 10 secs

  //   // Clear the interval when the component is unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <div className="mt-24 sm:mt-32 ">
      {/* //> Heading */}
      <div className="flex justify-between items-center mt-8">
        <p className="text-[1.375rem] sm:text-[2.12rem] font-semibold ">
          Trending Bids
        </p>
        <div className="select-none hidden cursor-pointer  items-center gap-2 ">
          <p className="text-base  sm:text-2xl text-pry-color">See all</p>
          <HiChevronDoubleRight className="w-[1.1rem] h-[1.1rem] sm:w-6 sm:h-6 text-pry-color" />
        </div>
      </div>

      {/* //> View Toggle */}
      <div className="mt-2 flex md:hidden gap-x-2 p-2 rounded-md border border-pry-color w-fit">
        <div
          onClick={() => {
            setView("grid");
          }}
          className={`${
            view === "grid"
              ? "text-white bg-pry-color"
              : "text-pry-color bg-white"
          } px-2 rounded-md py-1 select-none cursor-pointer duration-200 flex items-center`}
        >
          <IoGrid className="w-4 h-4 " />
        </div>

        <div
          onClick={() => {
            setView("list");
          }}
          className={`${
            view === "list"
              ? "text-white bg-pry-color"
              : "text-pry-color bg-white"
          } px-2 rounded-md py-1 select-none cursor-pointer duration-200 flex items-center`}
        >
          <HiMenu className="w-4 h-4 " />
        </div>
      </div>

      {/* //>Desktop Bid list */}
      {fetching && trendingBids.length === 0 && (
        <p>Loading bids... Please wait.</p>
      )}
      {!fetching && trendingBids.length === 0 && (
        <p>No bid is trending at this time.</p>
      )}
      {trendingBids.length > 0 && (
        <div
          className={`duration-300 ${
            view === "grid" ? "grid" : "hidden"
          }  md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-10 mt-4  `}
        >
          {trendingBids
            .map((bid, i) => (
              <div
                onMouseOver={() => {
                  setSelectedBid(bid);
                  // updateSelectedBid(bid.bid_id);

                  // console.log(bid);
                }}
                onTouchStart={() => {
                  setSelectedBid(bid);
                  // updateSelectedBid(bid.bid_id);
                }}
                onClick={() => {
                  setSelectedBid(bid);
                  setBidType("quick");
                  // updateSelectedBid(bid.bid_id);
                  setShowPlaceBidOverlay(true);
                }}
                key={i}
                className="bg-white   rounded-md  cursor-pointer  duration-300 "
              >
                {/* //> product image */}
                <div className="relative  ">
                  <div className=" relative h-[224px] ">
                    <Image
                      unoptimized
                      className="w-full object-cover rounded-md opacity-80"
                      src={bid.bid_image || "/images/placeholder.jpg"}
                      alt={bid.slug + "Image"}
                      // width={368}
                      // height={224}
                      fill
                    />
                  </div>

                  <div className="absolute top-0 mt-2 px-2 justify-between items-center flex w-full">
                    <div className="invisible border border-pry-color px-2 py-1 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
                      <p className=" sm:text-sm lg:text-xs xl:text-base font-semibold">
                        Current bid: ${" "}
                        {parseFloat(bid.current_bid)
                          .toFixed(2)
                          .toLocaleString()}
                      </p>
                      <IoFlash className="w-4 h-4 text-yellow-400" />
                    </div>

                    <div className="w-fit h-fit rounded-full  flex justify-center items-center p-1 border border-pry-color cursor-pointer bg-white">
                      <HiBell
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotificationOverlay(true);
                        }}
                        className="w-5 h-5 text-pry-color"
                      />
                    </div>
                  </div>

                  <OngoingBidDesktopCountdown
                    serverCountdownInSeconds={bid.bid_countdown_seconds}
                    serverCountdownHHMMSS={bid.bid_countdown}
                  />
                  {/* <OngoingBidDesktopCountdown serverCountdownInSeconds="02:23:30" /> */}

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShareBidOverlay(true);
                    }}
                    className="ml-2 absolute bottom-0 -mb-5 w-fit bg-pry-color rounded-full flex justify-center items-center p-3 text-white hover:bg-green-700 cursor-pointer "
                  >
                    <IoIosShareAlt className="w-6 h-6" />
                  </div>
                </div>

                <div className=" pt-8 shadow w-full  p-2">
                  <div className="flex gap-x-2 justify-between items-center text-pry-color font-medium">
                    <p>Lot {bid.auction_lot}</p>
                    <div className="flex items-center gax">
                      {" "}
                      <p>
                        MSRP:{" "}
                        <span className=" text-black font-medium">
                          ${bid.bid_msrp}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="font-medium mt-1 h-24 overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md ">
                    {bid.bid_title}
                  </p>

                  <div className="flex justify-between items-center gap-x-2">
                    {/* <div className="flex gap-x-2 items-center  w-1/2">
                      <HiOutlineUserGroup className="w-5 lg:w-6 h-5 lg:h-6 !text-gray-600 " />{" "}
                      <p className="font-semibold">
                        {" "}
                        {bid.total_bidders} Bidder(s)
                      </p>
                    </div> */}

                    <div className="relative w-1/2">
                      {/* //>Proxy bid button */}
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBid(bid);
                          setBidType("proxy");
                          // updateSelectedBid(bid.bid_id);
                          setShowPlaceBidOverlay(true);
                        }}
                        className="flex w-full justify-center items-center px-2 py-2 bg-pry-color text-white rounded gap-1 mt-2"
                      >
                        <p className="font-semibold">Proxy Bid</p>
                      </button> */}
                      {/* //> One button */}
                      {
                        // <div
                        //   onClick={() => {
                        //     setClickedBid(i);
                        //     setButtonToShow(2);
                        //   }}
                        //   className="flex justify-center items-center px-2 py-2 bg-pry-color text-white rounded gap-1 mt-2"
                        // >
                        //   <p className="font-semibold">Place Bid</p>
                        //   <IoIosArrowDown className="w-5 h-5 text-white" />
                        // </div>
                      }
                      {/* //> Two buttons */}
                      {/* {buttonToShow === 2 && i === clickedBid && (
                      <div
                        onMouseLeave={() => {
                          setButtonToShow(1);
                        }}
                        className="flex flex-col absolute w-full top-0"
                      >
                        <button
                          onClick={() => {
                            setShowPlaceBidOverlay(true);
                          }}
                          className="flex justify-center items-center px-2 py-2 bg-pry-color text-white rounded-t  mt-2"
                        >
                          Regular Bid
                        </button>
                        <button
                          onClick={() => {
                            setShowPlaceBidOverlay(true);
                          }}
                          className="flex justify-center items-center px-2 py-2 bg-pry-color text-white rounded-b  "
                        >
                          Proxy Bid
                        </button>
                      </div>
                    )} */}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-center gap-y-3 rounded-b-md shadow py-3 px-2  ">
                  {/* <div
                    onClick={() => {
                      setSelectedBid(bid);
                      setBidType("quick");
                      // updateSelectedBid(bid.bid_id);
                      setShowPlaceBidOverlay(true);
                    }}
                    className="flex w-full items-center justify-center p-2 border cursor-pointer hover:bg-gray-50 duration-300 text-pry-color rounded  font-semibold gap-x-2"
                  >
                    <IoFlashOutline className="w-6 h-6 text-pry-color " /> Quick
                    Bid $
                    {parseFloat(bid.quick_bid_value)
                      .toFixed(2)
                      .toLocaleString()}
                  </div> */}
                  {+bid.buy_now_price >= +bid.current_bid && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        buyNow(bid.bid_id);
                      }}
                      className="w-full border rounded font-semibold px-2 py-2 bg-pry-color text-white hover:bg-opacity-80 duration-300 "
                    >
                      Buy Now ${bid.buy_now_price}
                    </button>
                  )}
                </div>
              </div>
            ))
            .filter((bid, i) => i < 10)}
        </div>
      )}

      {/* //>Mobile Product list */}
      <div
        className={`mt-10 space-y-5 ${
          view === "list" ? "block" : "hidden"
        } md:hidden`}
      >
        {trendingBids.length > 0 &&
          trendingBids
            .map((bid, i) => (
              <div
                onMouseOver={() => {
                  setSelectedBid(bid);
                  // updateSelectedBid(bid.bid_id);

                  // console.log(bid);
                }}
                onTouchStart={() => {
                  setSelectedBid(bid);
                  // updateSelectedBid(bid.bid_id);
                }}
                key={i}
                className="flex items-start  border rounded-md  "
              >
                <div className={`  w-[6rem] h-[10rem]  relative   `}>
                  <Image
                    unoptimized
                    className=" "
                    src={bid.bid_image || "/images/placeholder.jpg"}
                    alt="Product image"
                    // width={80}
                    // height={160}
                    fill
                  />{" "}
                </div>

                <div className="p-2 w-full h-full overflow-y-auto    ">
                  {/* //> */}
                  <div className="flex  justify-between   ">
                    <div className="invisible border border-pry-color px-2 py-1 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
                      <p className=" text-sm font-semibold ">
                        Current bid:{" "}
                        <span className="font-semibold">
                          $
                          {parseFloat(bid.current_bid)
                            .toFixed(2)
                            .toLocaleString()}
                        </span>
                      </p>
                      <IoFlash className="w-4 h-4 text-yellow-400" />
                    </div>

                    <div className="w-fit h-fit rounded-full  flex justify-center items-center p-1 border border-pry-color cursor-pointer bg-white">
                      <HiBell
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotificationOverlay(true);
                        }}
                        className="w-4 h-4 text-pry-color"
                      />
                    </div>
                  </div>

                  {/* //> */}
                  <p className="text-sm font-medium mt-[0.44rem]">
                    {bid.bid_title}
                  </p>

                  {/* //> */}
                  <div className="flex mt-2 gap-x-3  items-center  ">
                    <p className="text-[0.6rem] text-pry-color">
                      Lot {bid.auction_lot}
                    </p>
                    <p className="text-[0.6rem] text-gray-400">
                      MSRP: ${bid.bid_msrp}
                    </p>
                    {+bid.buy_now_price >= +bid.current_bid && (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          buyNow(bid.bid_id);
                        }}
                        className="text-[0.6rem] text-pry-color font-semibold underline cursor-pointer select-none"
                      >
                        Buy Now ${bid.buy_now_price}
                      </p>
                    )}
                  </div>

                  {/* //> */}
                  <div className="flex items-center  gap-x-5 mt-2">
                    {!showPlaceBidOverlay && (
                      <OngoingBidMobileCountdown
                        serverCountdownInSeconds={bid.bid_countdown_seconds}
                        serverCountdownHHMMSS={bid.bid_countdown}
                      />
                    )}

                    {/* <div className="flex  gap-x-2 items-center ">
                      <HiOutlineUserGroup className="w-4  h-4  !text-gray-600 " />{" "}
                      <p className="text-[0.625rem] font-semibold">
                        {bid.total_bidders} Bidder(s)
                      </p>
                    </div> */}
                  </div>

                  {/* //> Mobile Quick Bid and Place Bid buttons */}
                  <div className="flex items-center mt-2 gap-x-3">
                    {/* <div
                      onClick={() => {
                        setSelectedBid(bid);
                        setBidType("quick");
                        // updateSelectedBid(bid.bid_id);
                        setShowPlaceBidOverlay(true);
                      }}
                      className="flex  text-xs items-center justify-center p-2 border cursor-pointer hover:bg-gray-50 duration-300 text-pry-color rounded  font-semibold gap-x-2"
                    >
                      <IoFlashOutline className="w-4 h-4 text-pry-color " />{" "}
                      Quick Bid $
                      {parseFloat(bid.quick_bid_value)
                        .toFixed(2)
                        .toLocaleString()}
                    </div> */}

                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBid(bid);
                        setBidType("proxy");
                        // updateSelectedBid(bid.bid_id);
                        setShowPlaceBidOverlay(true);
                      }}
                      className="flex justify-center items-center p-2 bg-pry-color text-white rounded gap-1 "
                    >
                      <p className="font-semibold text-xs">Proxy Bid</p>
                    </button> */}
                    {/* <div className="relative "> */}
                    {/* //> One button */}
                    {
                      // <div
                      //   onClick={() => {
                      //     setClickedBid(i);
                      //     setButtonToShow(2);
                      //   }}
                      //   className="flex justify-center items-center p-2 bg-pry-color text-white  rounded gap-1 cursor-pointer"
                      // >
                      //   <p className="font-semibold text-xs">Place Bid</p>
                      //   <IoIosArrowDown className="w-4 h-4 text-white" />
                      // </div>
                    }
                    {/* //> Two buttons */}
                    {/* {buttonToShow === 2 && i === clickedBid && (
                      <div
                        onMouseLeave={() => {
                          setButtonToShow(1);
                        }}
                        className="flex flex-col absolute w-full bottom-0 "
                      >
                        <button
                          onClick={() => {
                            setShowPlaceBidOverlay(true);
                          }}
                          className="flex justify-center items-center p-2 bg-pry-color text-white rounded-t  font-semibold text-xs"
                        >
                          Regular Bid
                        </button>
                        <button
                          onClick={() => {
                            setShowPlaceBidOverlay(true);
                          }}
                          className="flex justify-center items-center p-2 bg-pry-color text-white rounded-b font-semibold text-xs  "
                        >
                          Proxy Bid
                        </button>
                      </div>
                    )} */}
                    {/* </div> */}

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareBidOverlay(true);
                      }}
                      className="   w-fit border border-pry-color bg-white rounded-md flex justify-center items-center px-2 py-[0.1rem] text-pry-color  hover:bg-gray-50 cursor-pointer "
                    >
                      <IoIosShareAlt className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              </div>
            ))
            .filter((bid, i) => i < 10)}
      </div>
    </div>
  );
}

export default TrendingBids;
