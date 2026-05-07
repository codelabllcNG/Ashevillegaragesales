import React, { useEffect, useRef, useState } from "react";
// import AppointmentFilter from "./AppointmentFilter";
import ReactPaginate from "react-paginate";
import { IoMdMore } from "react-icons/io";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import secureLocalStorage from "react-secure-storage";
import AllCtx from "@/util-functions/allCtx";
import ActiveBidsCountdown from "@/components/countdowns/ActiveBidsCountdown";
import { useRouter } from "next/router";

function BidList() {
  const router = useRouter();
  const { source } = router.query;

  const {
    user,
    activeBids,
    setActiveBids,
    setShowPlaceBidOverlay,
    setSelectedBid,
    setDuplicatedActiveBids,
    isSurvey,
    duplicatedActiveBids,
    setShowSubmitSurveyOverlay,
    showPlaceBidOverlay,selectedAccountTab
  } = AllCtx();

  const [showDropdown, setShowDropdown] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortTerm, setSortTerm] = useState("All");

  // //>Fetch Bids
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/active-bids`,
          {
            headers: {
              "Content-Type": "application/json",
              usertoken: secureLocalStorage.getItem("userToken"),
              useremail: secureLocalStorage.getItem("user")?.email,
            },
          }
        );

        const data = await response.json();

        if (data.status === "fail") {
          // setLoginResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          setFetching(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetching(false);
          return;
        }
        // console.log(data);

        // return;

        setActiveBids(data.bids);
        setDuplicatedActiveBids(data.bids);

        setFetching(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetching(false);
      }
    }
    fetchData();

    const intervalId = setInterval(
      () => {
        searchWord || sortTerm !== "All" ? null : fetchData();
        // console.log("This code runs in an interval");
      },
      activeBids.length === 0 ? 60000 : 10000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [activeBids.length]);

  // products navigation settings
  const itemsPerPage = 5;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = activeBids.slice(offset, endOfOffset);
  const pageCount = Math.ceil(activeBids.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const listContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the top of the list when the currentPage changes
    if (listContainerRef.current) {
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage, selectedAccountTab]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % activeBids.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; // products navigation settings end

  const startIndex = (currentPage + 1 - 1  ) * itemsPerPage + 1 ;
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, activeBids.length);

  function handleFilter({ searchWord, sortTerm, e }) {
    var filteredBids;

    // Check for all empty
    if (
      (!searchWord || searchWord.trim() === "") &&
      (sortTerm === "" || sortTerm === "All")
    ) {
      setActiveBids(duplicatedActiveBids);
      return;
    }

    // EMPTY SEARCH BAR
    if (!searchWord || searchWord.trim() === "") {
      filteredBids = duplicatedActiveBids;
      setActiveBids(duplicatedActiveBids);
    }
    // FILLED SEARCH BAR
    if (searchWord) {
      filteredBids = duplicatedActiveBids.filter((bid) =>
        bid.bid_title.toLowerCase().includes(searchWord.toLowerCase())
      );

      setActiveBids(filteredBids);
      // handlePageClick(e);
      // console.log({ SEARCH_WORD: filteredBids });
      //   return
    }

    // EMPTY PRODUCT STATUS
    if (!sortTerm || sortTerm === "All") {
      setActiveBids(filteredBids);
      // console.log({ EMPTY_PRODUCT_STATUS: filteredBids });
      //   return
    }

    // FILLED PRODUCT STATUS
    if (sortTerm && sortTerm !== "All") {
      filteredBids = filteredBids.filter(
        (bid) => bid.leading_bidder === sortTerm
      );
      // console.log({ PRODUCT_STATUS_SELECTED: filteredBids });
      setActiveBids(filteredBids);
      // handlePageClick(e);
    }
  }

  return (
    <div ref={listContainerRef} className="mt-8 w-full scroll-mt-56">
      <div ref={listContainerRef} className="w-full">
        {/* //< Header */}
        <div className="lg:flex w-full  justify-between gap-x-5 ">
          {/* //>search */}
          <div className="flex w-full lg:w-[40%] xl:w-[50%] justify-center lg:justify-start">
            <div className="border rounded-full flex justify-between items-center w-full  px-2 py-1 h-12">
              <input
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  handleFilter({ searchWord: e.target.value, sortTerm });
                  // handlePageClick(e);
                }}
                className="border-none focus:ring-0 font-medium placeholder-gray-400 text-xs w-full"
                type="text"
                placeholder="Search"
              />

              <div
                onClick={() => {
                  handleFilter({ searchWord, sortTerm });
                }}
                className="bg-pry-color flex justify-center items-center   -mr-2 rounded-r-full p-3  h-12 cursor-pointer"
              >
                <IoSearchOutline className="w-5 h-5 text-white " />
              </div>
            </div>
          </div>

          {/* //>sort */}
          <div className="flex w-full lg:w-[60%] xl:w-[50%] justify-center lg:justify-end">
            <div className="flex items-center gap-x-3">
              {/* //> sort by */}
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
                className="relative p-2 sm:flex justify-center items-center gap-x-2 hidden whitespace-nowrap"
              >
                Sort by <IoFilterOutline className="w-5 h-5" />
                {/* //>dropdown */}
                {showDropdown && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute w-max rounded-md border shadow top-8 flex flex-col justify-center gap-y-2 py-2 bg-white"
                  >
                    <p
                      onClick={(e) => {
                        setShowDropdown(false);
                        setSortTerm("All");
                        handleFilter({ sortTerm: "All", searchWord });
                        // handlePageClick(e);
                      }}
                      className={`${
                        sortTerm === "All" ? "bg-pry-color text-white" : ""
                      } text-sm py-1 text-center  px-4`}
                    >
                      All
                    </p>
                    <p
                      onClick={(e) => {
                        setShowDropdown(false);
                        setSortTerm("leading");
                        handleFilter({ sortTerm: "leading", searchWord });
                        // handlePageClick(e);
                      }}
                      className={`${
                        sortTerm === "leading" ? "bg-pry-color text-white" : ""
                      } text-sm py-1 text-center  px-4`}
                    >
                      Leading
                    </p>
                    <p
                      onClick={(e) => {
                        setShowDropdown(false);
                        setSortTerm("outbid");
                        handleFilter({ sortTerm: "outbid", searchWord });
                        // handlePageClick(e);
                      }}
                      className={`${
                        sortTerm === "outbid" ? "bg-pry-color text-white" : ""
                      } text-sm py-1 text-center  px-4`}
                    >
                      Outbid
                    </p>
                  </div>
                )}
              </button>
              <p className=" font-medium whitespace-nowrap">
                Showing results{" "}
                <span className="font-base text-pry-color">
                {activeBids.length === 0 ? 0 : startIndex} to {endIndex} of {activeBids.length} Item(s)
                </span>
              </p>
            </div>
          </div>
        </div>

        {fetching && activeBids.length === 0 && (
          <p className="mt-10">Loading bids... Please wait.</p>
        )}

        {!fetching && activeBids.length === 0 && (
          <p className="text-red-600 mt-10">
            You currently have no active bid.
          </p>
        )}

        {activeBids.length > 0 && (
          <div className="overflow-x-auto flex  scrollbar  scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-h-2 scrollbar-rounded-md">
            <div className="mt-4  w-full  ">
              <div className="flex gap-x-7  px-3 py-4 rounded-t-md w-full">
                <div className=" min-w-[17rem]  max-w-[17rem] flex items-center break-words  overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-gray-500 font-medium break-words overflow-x-scroll scrollbar-hide ">
                    ITEM
                  </p>
                </div>
                <div className="flex items-center min-w-[6rem] break-words overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-gray-500 font-medium ">BIDDERS</p>
                </div>
                <div className="flex items-center min-w-[10rem] ">
                  <p className="text-lg text-center text-gray-500 font-medium break-words overflow-x-scroll scrollbar-hide ">
                    CURRENT PRICE
                  </p>
                </div>
                <div className="flex items-center min-w-[6rem]  justify-center text-center">
                  <p className="text-lg text-gray-500 font-medium ">BID TYPE</p>
                </div>
                <div className="flex items-center min-w-[6rem] justify-center text-center">
                  <p className="text-lg text-gray-500 font-medium ">
                    TIME LEFT
                  </p>
                </div>
                <div className="flex items-center min-w-[6rem] justify-center text-center">
                  <p className="text-lg text-gray-500 font-medium ">STATUS</p>
                </div>
              </div>

              {currentItems.map((bid, i) => (
                <div
                  onMouseOver={() => {
                    setSelectedBid(bid);
                    // updateSelectedBidWithoutCountdown(bid.bid_id)
                    // console.log(bid);
                  }}
                  onTouchStart={() => {
                    setSelectedBid(bid);
                    // updateSelectedBidWithoutCountdown(bid.bid_id)
                  }}
                  onClick={() => {
                    // setShowSubmitSurveyOverlay(true)
                    source === "survey" || isSurvey
                      ? setShowSubmitSurveyOverlay(true)
                      : setShowPlaceBidOverlay(true);
                  }}
                  key={bid.bid_id}
                  className="flex cursor-pointer hover:bg-gray-50   gap-x-7 px-3 py-4 border-b border-gray-100 w-full "
                >
                  <div className="flex min-w-[17rem]  max-w-[17rem] justify- items-center   overflow-x-scroll scrollbar-hide  gap-x-5 ">
                    <Image
                      unoptimized
                      className="rounded-md"
                      alt="Product Image"
                      src={bid.bid_image || "/images/product2.png"}
                      width={80}
                      height={70}
                    />{" "}
                    <p className="text-[0.9rem] font-medium">{bid.bid_title}</p>
                  </div>
                  <div className="flex items-center min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide   ">
                      {bid.total_bidders}
                    </p>
                  </div>
                  <div className="flex items-center min-w-[10rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      ${parseFloat(bid.current_bid).toFixed(2).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      Regular
                    </p>
                  </div>
                  {!showPlaceBidOverlay && (
                    <ActiveBidsCountdown
                      serverCountdownInSeconds={bid.bid_countdown_seconds}
                      serverCountdownHHMMSS={bid.bid_countdown}
                    />
                  )}
                  {/* <ActiveBidsCountdown serverCountdownInSeconds="02:23:30" /> */}

                  <div className="flex items-center min-w-[6rem]  justify-center text-center ">
                    <div
                      className={`${
                        bid.leading_bidder === "outbid"
                          ? " bg-red-50 text-red-600 border-red-600"
                          : "bg-green-50 text-pry-color border-pry-color"
                      } border-collapse border   rounded-full py-1 px-7 text-base`}
                    >
                      {bid.leading_bidder === "outbid" ? "Outbid" : "Leading"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeBids.length > itemsPerPage && (
        <div className="overflow-auto flex mt-8 ">
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

export default BidList;
