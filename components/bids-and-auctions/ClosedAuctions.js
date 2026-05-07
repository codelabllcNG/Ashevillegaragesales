import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { HiBell, HiOutlineClock } from "react-icons/hi";
import { IoFlash, IoFlashOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import AuctionsCountdown from "../countdowns/AuctionsCountdown";
import secureLocalStorage from "react-secure-storage";

function ClosedAuctions({ fetching }) {
  const router = useRouter();

  const {
    notificationOverlay,
    setNotificationOverlay,
    closedAuctions,
    formatDate,
    setSelectedAuction,
    setAuctionNotificationOverlay,
  } = AllCtx();

  //  navigation settings
  const itemsPerPage = 9;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = closedAuctions.slice(offset, endOfOffset);
  const pageCount = Math.ceil(closedAuctions.length / itemsPerPage);

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
    const newOffset = (event.selected * itemsPerPage) % closedAuctions.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; //  navigation settings end

  return (
    <div ref={listContainerRef} className="mt-14 scroll-mt-60">
      {fetching && closedAuctions.length === 0 && (
        <p>Loading auctions... Please wait.</p>
      )}
      {!fetching && closedAuctions.length === 0 && (
        <p className="text-red-600">
          No Closing Auctions at this time, check other categories.
        </p>
      )}
      {closedAuctions.length > 0 && (
        <div className="duration-300  grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-y-5 sm:gap-16 mt-7">
          {currentItems.map((auction, i) => (
            <div
              key={auction.auction_id}
              className="rounded-lg  cursor-pointer  duration-300 "
            >
              {/* //> Auction heading */}
              <div className="p-4 bg-pry-color text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <p className="text-xs sm:text-base ">
                    <span className="underline decoration-2 underline-offset-8">
                      PRE-IN
                    </span>
                    SPECTED
                  </p>

                  <div className="flex text-sm sm:text-base items-center gap-x-2">
                    <FaCalendar className="w-4 h-4 text-white" />{" "}
                    {formatDate(auction.auction_end_date)}
                  </div>
                </div>

                {/* //> */}
                <p className="mt-2 text-lg sm:text-2xl font-extrabold">
                  AUCTION {auction.auction_lot}
                </p>
              </div>

              <div className="border-x border-b rounded-b-lg border-pry-color">
                {/* //> */}
                <div className="flex justify-end items-center px-4">
                  <div className="flex justify-center items-center p-4 bg-pry-color rounded-3xl -mt-11">
                    <div
                      onClick={() => {
                        setAuctionNotificationOverlay(true);
                      }}
                      className="w-fit h-fit rounded-full  flex justify-center items-center p-2 border border-white cursor-pointer bg-pry-color"
                    >
                      <HiBell className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* //> */}
                {/* <div className="flex justify-center items-center -mt-10">
                  <div className=" border border-pry-color px-6 py-2 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
                    <p className=" text-sm  sm:text-base">Bidding Open</p>
                    <IoFlash className="w-4 h-4 text-yellow-400" />
                  </div>
                </div> */}

                {/* //> */}
                <div
                  className={`grid grid-cols-6 sm:grid-cols-3 gap-2 mt-2  px-2 `}
                >
                  {auction?.bid_images &&
                    auction?.bid_images
                      .concat(
                        Array(Math.max(6 - auction?.bid_images.length, 0)).fill(
                          0
                        )
                      )
                      .slice(0, 6)
                      .map((item, i) => (
                        <div
                          key={item.id}
                          className="relative w-[50px] sm:w-[70px] flex justify-center items-center sm:h-[70px]  h-[50px]"
                        >
                          <Image
                            // unoptimized={item.includes(
                            //   "ashvillegaragesalecloud" ? false : true
                            // )}

                            unoptimized
                            className={`${i > 5 ? "sm:hidden" : ""} rounded-md`}
                            src={item || "/images/pot.png"}
                            alt={i}
                            // width={100}
                            // height={70}
                            fill
                          />
                        </div>
                      ))}
                </div>

                {/* //> */}
                <div className="flex justify-center items-center mt-2">
                  <button
                    onMouseOver={() => {
                      setSelectedAuction(auction);
                      secureLocalStorage.setItem("selectedAuction", auction);
                    }}
                    onTouchStart={() => {
                      setSelectedAuction(auction);
                      secureLocalStorage.setItem("selectedAuction", auction);
                    }}
                    onClick={() => {
                      router.push("/auction-details");
                    }}
                    className="w-[80%]   border flex items-center justify-center px-[7.5rm] py-[0.9rem] sm:py-4 rounded-md text-pry-color duration-300 hover:bg-gray-50 gap-x-2 text-xs sm:text-base font-bold"
                  >
                    {" "}
                    <IoFlashOutline className="w-5 h-5 text-pry-color  " /> View
                    all Items
                  </button>
                </div>

                {/* //> */}
                <div className="flex justify-center items-center my-2 sm:my-4 gap-x-3">
                  {auction.countdown !== "not-started" &&
                    auction.countdown !== "ended" && (
                      <p className="text-gray-600 text-sm sm:text-base font-medium ">
                        CLOSES IN
                      </p>
                    )}
                  <AuctionsCountdown
                    serverCountdownInSeconds={auction.countdown_seconds}
                    serverCountdownHHMMSS={auction.countdown}
                  />
                  {/* <AuctionsCountdown serverCountdownInSeconds="02:23:30" /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {closedAuctions > itemsPerPage && (
        <div className="overflow-auto flex mt-12 ">
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
  );
}

export default ClosedAuctions;
