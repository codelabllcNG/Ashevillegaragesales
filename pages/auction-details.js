import AuctionNotificationOverlay from "@/components/bids-and-auctions/AuctionNotificationOverlay";
import NotificationOverlay from "@/components/bids-and-auctions/NotificationOverlay";
import PlaceBidOverlay from "@/components/bids-and-auctions/PlaceBidOverlay";
import ShareBidOverlay from "@/components/bids-and-auctions/ShareBidOverlay";
import OngoingBidDesktopCountdown from "@/components/countdowns/OngoingBidDesktopCountdown";
import OngoingBidMobileCountdown from "@/components/countdowns/OngoingBidMobileCountdown";
import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { GrFormFilter } from "react-icons/gr";
import {
  HiBell,
  HiMenu,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { IoIosArrowDown, IoIosShareAlt } from "react-icons/io";
import {
  IoFilterOutline,
  IoFlash,
  IoFlashOutline,
  IoGrid,
  IoTimeSharp,
} from "react-icons/io5";
import ReactPaginate from "react-paginate";
import secureLocalStorage from "react-secure-storage";

function AuctionDetails() {
  const {
    selectedNavLink,
    setSelectedNavLink,
    setAuctionDetails,
    buyNow,
    auctionDetails,
    setShowPlaceBidOverlay,
    setShareBidOverlay,
    shareBidOverlay,
    showPlaceBidOverlay,
    notificationOverlay,
    setNotificationOverlay,
    selectedAuction,
    updateAuctionDetails,
    formatDate,
    setSelectedAuction,
    updateSelectedBid,
    setSelectedBid,
    setBidType,
    auctionNotificationOverlay,
    setSearchSuggestionList,
    setUserDropdown,
    setHelpDropdown,
  } = AllCtx();

  useEffect(() => {
    setSelectedNavLink("products");
  }, []);

  const [buttonToShow, setButtonToShow] = useState(1);
  const [clickedBid, setClickedBid] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [view, setView] = useState("grid");

  // //>Fetch bids
  useEffect(() => {
    updateAuctionDetails();

    const intervalId = setInterval(
      () => {
        // console.log(auctionDetails.length);
        updateAuctionDetails();
        // console.log("This code runs in an interval");
      },
      auctionDetails.length === 0 ? 60000 : 10000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [showPlaceBidOverlay, auctionDetails.length]);

  //  navigation settings
  const itemsPerPage = 12;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = auctionDetails.slice(offset, endOfOffset);
  const pageCount = Math.ceil(auctionDetails.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const listContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the top of the list when the currentPage changes
    if (listContainerRef.current) {
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % auctionDetails.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; //  navigation settings end

  const startIndex = (currentPage + 1 - 1  ) * itemsPerPage + 1 ;
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, auctionDetails.length);

  return (
    <div
      onClick={() => {
        setSearchSuggestionList([]);
        setUserDropdown(false);
        setHelpDropdown(false);
      }}
      className="scroll-smooth px-3 sm:px-8 lg:px-[5rem] "
    >
      {/* //> Green Header */}
      <div
        ref={listContainerRef}
        className="mt-5 flex bg-pry-color text-white gap-x-8 gap-y-8 justify-between items-center py-5 px-2 flex-wrap"
      >
        <div>
          <p className="text-xs sm:text-base ">
            <span className="underline decoration-2 underline-offset-8">
              PRE-IN
            </span>
            SPECTED
          </p>
          <h1 className="text-3xl font-extrabold mt-3">
            AUCTION {selectedAuction?.auction_lot}
          </h1>
        </div>

        <div className="flex items-center  justify-between gap-x-8 gap-y-8 flex-wrap">
          <div>
            <p className="text-xs sm:text-base ">
              <span className="underline decoration-2 underline-offset-8">
                START D
              </span>
              ATE
            </p>
            <div className="flex sm:text-lg text-sm font-medium items-center gap-x-2 mt-3">
              <FaCalendar className="w-4 h-4 text-white" />{" "}
              {formatDate(selectedAuction?.auction_start_date)}
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-base ">
              <span className="underline decoration-2 underline-offset-8">
                START T
              </span>
              IME
            </p>
            <div className="flex sm:text-lg text-sm font-medium items-center gap-x-2 mt-3">
              <IoTimeSharp className="w-4 h-4 text-white" />{" "}
              {selectedAuction?.auction_start_time}
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-base ">
              <span className="underline decoration-2 underline-offset-8">
                END D
              </span>
              ATE
            </p>
            <div className="flex sm:text-lg text-sm font-medium items-center gap-x-2 mt-3">
              <FaCalendar className="w-4 h-4 text-white" />{" "}
              {formatDate(selectedAuction?.auction_end_date)}
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-base ">
              <span className="underline decoration-2 underline-offset-8">
                END T
              </span>
              IME
            </p>
            <div className="flex sm:text-lg text-sm font-medium items-center gap-x-2 mt-3">
              <FaCalendar className="w-4 h-4 text-white" />{" "}
              {selectedAuction?.auction_end_time}
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-base ">
              <span className="underline decoration-2 underline-offset-8">
                NUMB
              </span>
              ER OF ITEMS
            </p>
            <div className="flex sm:text-lg text-sm font-medium items-center gap-x-2 mt-3">
              {/* <FaCalendar className="w-4 h-4 text-white" /> */}
              {auctionDetails.length}
            </div>
          </div>
        </div>
      </div>

      {/* //> */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-xl sm:text-[2rem] font-medium ">
          AUCTION {selectedAuction?.auction_lot}
        </p>

        <div className="flex items-center gap-x-3">
          {/* //> sort by */}
          {/* <button
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
            className="relative p-2 sm:flex justify-center items-center gap-x-2 hidden "
          >
            Sort by <IoFilterOutline className="w-5 h-5" /> */}
          {/* //>dropdown */}
          {/* {showDropdown && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute w-max rounded-md border shadow top-8 px-2 py-2"
              >
                <p
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                  className="text-sm"
                >
                  Ending soon
                </p>
                <p
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                  className="text-sm mt-3"
                >
                  Ending soon
                </p>
              </div>
            )} */}
          {/* </button> */}
          <p className="font-medium">
            Showing results{" "}
            <span className="font-base text-pry-color">
            {auctionDetails.length === 0 ? 0 : startIndex} to {endIndex} of {auctionDetails.length} Item(s)
            </span>
          </p>
        </div>
      </div>

      {/* //>mobile sort by */}
      {/* <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          className="relative p-2 flex justify-center items-center gap-x-2 sm:hidden "
        >
          Sort by <IoFilterOutline className="w-5 h-5" /> */}
      {/* //>dropdown */}
      {/* {showDropdown && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute w-max rounded-md border shadow top-8 px-2 py-2"
            >
              <p
                onClick={() => {
                  setShowDropdown(false);
                }}
                className="text-sm"
              >
                Ending soon
              </p>
              <p
                onClick={() => {
                  setShowDropdown(false);
                }}
                className="text-sm mt-3"
              >
                Ending soon
              </p>
            </div>
          )} */}
      {/* </button>
      </div> */}

      {/* //> Bids */}
      <div>
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

        {/* //>Desktop Product list */}
        {fetching && auctionDetails.length === 0 && (
          <p>Loading bids... Please wait.</p>
        )}
        {!fetching && auctionDetails.length === 0 && (
          <p className="text-red-600">No bid is ongoing at this time.</p>
        )}
        {auctionDetails.length > 0 && (
          <div
            className={`duration-300 ${
              view === "grid" ? "grid" : "hidden"
            }  md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-10 mt-4 `}
          >
            {currentItems.map((bid, i) => (
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
                key={bid.id}
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
                        Current bid: $
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
                        // onClick={() => {
                        //   user?.status === "active"
                        //     ? triggerAlert({
                        //         message:
                        //           "You will be notified about the bid.",
                        //         color: "green",
                        //       })
                        //     : triggerAlert({
                        //         message:
                        //           "You have to be logged in to get notifications.",
                        //         color: "red",
                        //       });
                        //   // setNotificationOverlay(true);
                        // }}
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
                      {/* {
                        <div
                          onClick={() => {
                            setClickedBid(i);
                            setButtonToShow(2);
                            setSelectedBid(bid);
                            updateSelectedBid(bid.bid_id);
                          }}
                          className="flex justify-center items-center px-2 py-2 bg-pry-color text-white rounded gap-1 mt-2"
                        >
                          <p className="font-semibold">Place Bid</p>
                          <IoIosArrowDown className="w-5 h-5 text-white" />
                        </div>
                      } */}
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
                              setBidType("regular");
                              setShowPlaceBidOverlay(true);
                            }}
                            className="flex justify-center items-center px-2 py-2 bg-pry-color text-white rounded-t  mt-2"
                          >
                            Regular Bid
                          </button>
                          <button
                            onClick={() => {
                              setBidType("proxy");
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
                    <IoFlashOutline className="w-6 h-6 text-pry-color " />
                    Quick Bid $
                    {parseFloat(bid.quick_bid_value)
                      .toFixed(2) 
                      .toLocaleString()}
                  </div> */}
                  {+bid.buy_now_price >= +bid.current_bid && (
                    <button
                    disabled={bid.bid_countdown_seconds === "ended"}
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
            ))}
          </div>
        )}

        {/* //>Mobile Product list */}
        <div
          className={`mt-10 space-y-5 ${
            view === "list" ? "block" : "hidden"
          } md:hidden`}
        >
          {auctionDetails.length > 0 &&
            currentItems.map((bid, i) => (
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
                key={bid.id}
                className=" cursor-pointer  border rounded-md"
              >
                {/* //>Image and details */}
                <div className="flex items-center  h-[10rem] ">
                  <div className={`  w-[7rem] h-full  relative   `}>
                    <Image
                      unoptimized
                      className=" object-cover"
                      src={bid.bid_image || "/images/placeholder.jpg"}
                      alt={bid.slug + "image"}
                      // width={96}
                      // height={160}
                      fill
                    />{" "}
                  </div>

                  <div className="p-2 w-full h-full     ">
                    {/* //> */}
                    <div className="flex  justify-between   ">
                      <div className="invisible border border-pry-color px-2 py-1 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
                        <p className=" text-sm  font-semibold">
                          Current bid:{" "}
                          <span className="font-semibold">
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
                    <p className="text-sm font-medium mt-[0.44rem] h-14 overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md">
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
                        disabled={bid.bid_countdown_seconds === "ended"}
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
                      {/* <OngoingBidMobileCountdown serverCountdownInSeconds="02:23:30" /> */}

                      {/* <div className="flex  gap-x-2 items-center ">
                        <HiOutlineUserGroup className="w-4  h-4  !text-gray-600 " />{" "}
                        <p className="text-[0.625rem] font-semibold">
                          {bid.total_bidders} Bidder(s)
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* //> Mobile Quick Bid and Place Bid buttons */}
                <div className="flex m-3 justify-center items-center mt-2 gap-x-3">
                  {/* <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBid(bid);
                      setBidType("quick");
                      // updateSelectedBid(bid.bid_id);
                      setShowPlaceBidOverlay(true);
                    }}
                    className="flex  text-xs items-center justify-center p-2 border cursor-pointer hover:bg-gray-50 duration-300 text-pry-color rounded  font-semibold gap-x-2"
                  >
                    <IoFlashOutline className="w-4 h-4  text-pry-color " />{" "}
                    Quick Bid $
                    {parseFloat(bid.quick_bid_value)
                      .toFixed(2)
                      .toLocaleString()}
                  </div> */}

                  {/* //>Proxy bid button */}
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
            ))}
        </div>

        {auctionDetails.length > itemsPerPage && (
          <div className="overflow-auto flex justify-center mt-12 ">
            <ReactPaginate
              breakLabel="..."
              nextLabel=" Next "
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel=" Previous "
              renderOnZeroPageCount={null}
              className="flex  items-center text-gray-500 justify-center  space-x-2 md:space-x-3   font-semibold"
              activeClassName="text-white  !bg-pry-color rounded-md  flex justify-center items-center"
              disabledLinkClassName="border text-gray-200  py-2 px-4  rounded-md pointer-events-none select-none"
              pageClassName=""
              pageLinkClassName=" py-2 px-4 border rounded-md   flex justify-center items-center  cursor-pointer"
              previousLinkClassName="border text-black rounded-md   flex justify-center items-center  cursor-pointer py-2 px-4"
              nextLinkClassName="border rounded-md   flex justify-center items-center text-black cursor-pointer py-2 px-4"
            />
          </div>
        )}
      </div>
      {showPlaceBidOverlay && <PlaceBidOverlay />}
      {shareBidOverlay && <ShareBidOverlay />}
      {notificationOverlay && <NotificationOverlay />}
      {auctionNotificationOverlay && <AuctionNotificationOverlay />}
    </div>
  );
}

export default AuctionDetails;
