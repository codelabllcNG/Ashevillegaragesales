import NotificationOverlay from "@/components/bids-and-auctions/NotificationOverlay";
import PlaceBidOverlay from "@/components/bids-and-auctions/PlaceBidOverlay";
import ShareBidOverlay from "@/components/bids-and-auctions/ShareBidOverlay";
import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendar, FaRegCalendar } from "react-icons/fa";
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

function UpcomingAuctionItems() {
  const {
    selectedNavLink,
    setSelectedNavLink,
    setShowPlaceBidOverlay,
    setShareBidOverlay,
    shareBidOverlay,
    showPlaceBidOverlay,
    notificationOverlay,
    buyNow,
    setNotificationOverlay,
  } = AllCtx();

  useEffect(() => {
    setSelectedNavLink("products");
  }, []);

  const [buttonToShow, setButtonToShow] = useState(1);
  const [clickedBid, setClickedBid] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [view, setView] = useState("grid");

  const targetTime = new Date().setHours(new Date().getHours() + 24);
  const [timeRemaining, setTimeRemaining] = useState(targetTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeRemaining = targetTime - Date.now();

      if (newTimeRemaining <= 0) {
        clearInterval(intervalId);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(newTimeRemaining);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((timeRemaining / 1000 / 60) % 60)).padStart(
    2,
    "0"
  );
  const hours = String(
    Math.floor((timeRemaining / 1000 / 60 / 60) % 24)
  ).padStart(2, "0");
  // const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

  const [itemsArray, setItemsArray] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);

  //  navigation settings
  const itemsPerPage = 8;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = itemsArray.slice(offset, endOfOffset);
  const pageCount = Math.ceil(itemsArray.length / itemsPerPage);

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
    const newOffset = (event.selected * itemsPerPage) % itemsArray.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; //  navigation settings end

  return (
    <div ref={listContainerRef} className="mt-32 ">
      <p id="" className=" text-[1.375rem] sm:text-[2.12rem] font-semibold ">
        Upcoming Auction Items
      </p>
      {/* //> Bids */}
      <div>
        {/* //>Desktop Product list */}
        <div
          className={`duration-300 ${
            view === "grid" ? "grid" : "hidden"
          }  md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-10 mt-8  `}
        >
          {currentItems.map((item, i) => (
            <div
              key={item.id}
              className="bg-white   rounded-md  cursor-pointer  duration-300 "
            >
              {/* //> product image */}
              <div className="relative  ">
                <Image
                  unoptimized
                  className="w-full"
                  src="/images/product_bid.png"
                  alt="Product2 Image"
                  width={368}
                  height={224}
                  // fill
                />

                {/* <div className="bottom-0 absolute flex px-2 bg-white py-1 right-0 items-center gap-x-2 rounded-tl-lg">
                  <HiOutlineClock className="w-5 h-5 text-pry-color" />
                  <p className="text-lg font-medium text-red-600">{`${hours}:${minutes}:${seconds}`}</p>
                </div> */}

                <div
                  onClick={() => {
                    setShareBidOverlay(true);
                  }}
                  className="ml-2 absolute bottom-0 -mb-5 w-fit bg-pry-color rounded-full flex justify-center items-center p-3 text-white hover:bg-green-700 cursor-pointer "
                >
                  <IoIosShareAlt className="w-6 h-6" />
                </div>
              </div>

              <div className=" pt-8 shadow w-full  p-2">
                <div className="flex gap-x-2 justify-between items-center">
                  <p className="font-medium">
                    IPhone 11 Pro Max All Variants, Available for auction
                  </p>
                  <p className="text-xl font-bold">$234.6</p>
                </div>

                <div className="flex gap-x-8 items-center justify-center mt-2">
                  <div className="flex text-lg  items-center gap-x-3">
                    <FaRegCalendar className="w-6 h-6 " /> Aug 15, 3024
                  </div>
                  <div className="flex  bg-white py-1  items-center gap-x-3 ">
                    <HiOutlineClock className="w-6 h-6" />
                    <p className="text-lg font-medium text-red-600">{`${hours}:${minutes}:${seconds}`}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-x-3 rounded-b-md shadow py-3 px-2  ">
                <button
                  onClick={() => {
                    setNotificationOverlay(true);
                  }}
                  className="w-full bg-pry-color py-2 rounded-md flex items-center justify-center gap-x-2 duration-300 hover:bg-opacity-80 text-white"
                >
                  {" "}
                  <Icon
                    icon="heroicons:bell-alert-20-solid"
                    className="text-white w-5 h-5"
                  />{" "}
                  Notify Me
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* //>Mobile Product list */}
        <div
          className={`mt-10 space-y-5 ${
            view === "list" ? "block" : "hidden"
          } md:hidden`}
        >
          {currentItems.map((item, i) => (
            <div
              key={item.id}
              className="flex items-start  border rounded-md  "
            >
              <div className={`  w-[6rem] h-[10rem]  relative   `}>
                <Image
                  unoptimized
                  className=" "
                  src={"/images/mobile_product.png"}
                  alt="Product image"
                  // width={80}
                  // height={160}
                  fill
                />{" "}
              </div>

              <div className="p-2 w-full h-full overflow-y-auto    ">
                {/* //> */}
                <div className="flex  justify-between   ">
                  <div className=" border border-pry-color px-2 py-1 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
                    <p className=" text-sm  font-semibold">
                      Current bid: <span className="font-semibold">$93</span>
                    </p>
                    <IoFlash className="w-4 h-4 text-yellow-400" />
                  </div>

                  <div
                    onClick={() => {
                      setNotificationOverlay(true);
                    }}
                    className="w-fit h-fit rounded-full  flex justify-center items-center p-1 border border-pry-color cursor-pointer bg-white"
                  >
                    <HiBell className="w-4 h-4 text-pry-color" />
                  </div>
                </div>

                {/* //> */}
                <p className="text-sm font-medium mt-[0.44rem]">
                  Buzz lightyear limited edition action figure
                </p>

                {/* //> */}
                <div className="flex mt-2 gap-x-3  items-center  ">
                  <p className="text-[0.6rem] text-pry-color">Lot1</p>
                  <p className="text-[0.6rem] text-gray-400">MSRP: $2000</p>
                  {+bid.buy_now_price >= +bid.current_bid && (
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        buyNow(bid.bid_id);
                      }}
                      className="text-[0.6rem] text-pry-color font-semibold underline cursor-pointer select-none"
                    >
                      Buy Now $2100
                    </p>
                  )}
                </div>

                {/* //> */}
                <div className="flex items-center  gap-x-5 mt-2">
                  <div className="  flex  items-center gap-x-2 ">
                    <HiOutlineClock className="w-4 h-4 " />
                    <p className="text-[0.625rem] font-semibold text-red-600">{`${hours}:${minutes}:${seconds}`}</p>
                  </div>

                  <div className="flex  gap-x-2 items-center ">
                    <HiOutlineUserGroup className="w-4  h-4  !text-gray-600 " />{" "}
                    <p className="text-[0.625rem] font-semibold">
                      240 Bidder(s)
                    </p>
                  </div>
                </div>

                {/* //> Mobile Quick Bid and Place Bid buttons */}
                <div className="flex items-center mt-2 gap-x-3">
                  <div className="flex  text-xs items-center justify-center p-2 border cursor-pointer hover:bg-gray-50 duration-300 text-pry-color rounded  font-semibold gap-x-2">
                    <IoFlashOutline className="w-4 h-4 text-pry-color " /> Quick
                    Bid
                  </div>

                  <div className="relative ">
                    {/* //> One button */}
                    {
                      <div
                        onClick={() => {
                          setClickedBid(i);
                          setButtonToShow(2);
                        }}
                        className="flex justify-center items-center p-2 bg-pry-color text-white  rounded gap-1 cursor-pointer"
                      >
                        <p className="font-semibold text-xs">Place Bid</p>
                        <IoIosArrowDown className="w-4 h-4 text-white" />
                      </div>
                    }
                    {/* //> Two buttons */}
                    {buttonToShow === 2 && i === clickedBid && (
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
                    )}
                  </div>

                  <div
                    onClick={() => {
                      setShareBidOverlay(true);
                    }}
                    className="   w-fit border border-pry-color bg-white rounded-md flex justify-center items-center px-2 py-[0.1rem] text-pry-color  hover:bg-gray-50 cursor-pointer "
                  >
                    <IoIosShareAlt className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
      </div>
      {showPlaceBidOverlay && <PlaceBidOverlay />}
      {shareBidOverlay && <ShareBidOverlay />}
      {notificationOverlay && <NotificationOverlay />}
    </div>
  );
}

export default UpcomingAuctionItems;
