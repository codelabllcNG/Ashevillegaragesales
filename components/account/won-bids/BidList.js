import React, { useEffect, useRef, useState } from "react";
// import AppointmentFilter from "./AppointmentFilter";
import ReactPaginate from "react-paginate";
import { IoMdMore } from "react-icons/io";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import AllCtx from "@/util-functions/allCtx";
import secureLocalStorage from "react-secure-storage";

function BidList() {
  const {
    setAccountTabChild,
    setDuplicatedWonBids,
    wonBids,
    setWonBids,
    duplicatedWonBids,selectedAccountTab,
    formatDate,
    setSelectedBid,
    setShowChangeCardOverlay,
    selectedBid,
    setSelectedCard,
    setDefaultCardID,
    deliveryAddressArray,
    setSelectedAddress,
    ATMcardArray,
    setSelectedClaimedBid,
    setShowSuccessfulClaimOverlay,
    setSelectedAccountTab,
    triggerAlert,
    setAddCardOverlay,
    setATMcardArray,
    setShowAddAddressOverlay,
    setDefaultAddressID,
    setDeliveryAddressArray,user,fetchAddressList
  } = AllCtx();

  const [showDropdown, setShowDropdown] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingCards, setFetchingCards] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortTerm, setSortTerm] = useState("All");

  const targetTime = new Date().setHours(new Date().getHours() + 24);

  // //>Fetch bids
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/won-bids`,
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

        // const won_bids = data.bids.filter((bid) => bid.bid_won !== true);
        setWonBids(data.bids);
        // console.log(data.bids);
        setDuplicatedWonBids(data.bids);

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
      wonBids.length === 0 ? 60000 : 2000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // //>Fetching card
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetchingCards(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-card`,
          {
            cache: 'no-store',
            headers: {
              "Content-Type": "application/json",
              usertoken: secureLocalStorage.getItem("userToken"),
              useremail: secureLocalStorage.getItem("user")?.email,
            },
          }
        );

        const data = await response.json();

        if (data.status === "fail") {
          if (data.cards.length === 0) {
            setATMcardArray([]);
          }
          // setLoginResponse(data.message);

          // console.log(data);
          console.log("An error occurred.");
          setFetchingCards(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetchingCards(false);
          return;
        }
        // console.log(data);

        // return;
        if (data.cards.length > 0) {
          const defaultCard = data.cards.find(
            (card) => card.id === data.default
          );
          setSelectedCard(defaultCard);
          secureLocalStorage.setItem("selectedCard", defaultCard)
        }
        setATMcardArray(data.cards);
        setDefaultCardID(data.default);
        // data.default

        setFetchingCards(false);
        // setLoginResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetchingCards(false);
      }
    }
    if (secureLocalStorage.getItem("user")) {
      fetchData();
    }
  }, []);

  // //>Fetch addresses
  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      fetchAddressList();
    }
  }, []);

  // products navigation settings
  const itemsPerPage = 5;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = wonBids.slice(offset, endOfOffset);
  const pageCount = Math.ceil(wonBids.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const listContainerRef = useRef(null);
  useEffect(() => {
   
    // Scroll to the top of the list when the currentPage changes
    if (listContainerRef.current) {
      // console.log("lofff");
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage, selectedAccountTab]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % wonBids.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; // products navigation settings end

  const startIndex = (currentPage + 1 - 1  ) * itemsPerPage + 1 ;
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, wonBids.length);

  function handleFilter({ searchWord, sortTerm, e }) {
    var filteredBids;

    // Check for all empty
    if (
      (!searchWord || searchWord.trim() === "") &&
      (sortTerm === "" || sortTerm === "All")
    ) {
      setWonBids(duplicatedWonBids);
      return;
    }

    // EMPTY SEARCH BAR
    if (!searchWord || searchWord.trim() === "") {
      filteredBids = duplicatedWonBids;
      setWonBids(duplicatedWonBids);
    }
    // FILLED SEARCH BAR
    if (searchWord) {
      filteredBids = duplicatedWonBids.filter((bid) =>
        bid.bid_title.toLowerCase().includes(searchWord.toLowerCase())
      );

      setWonBids(filteredBids);
      // handlePageClick(e);
      // console.log({ SEARCH_WORD: filteredBids });
      //   return
    }

    // EMPTY PRODUCT STATUS
    if (!sortTerm || sortTerm === "All") {
      setWonBids(filteredBids);
      // console.log({ EMPTY_PRODUCT_STATUS: filteredBids });
      //   return
    }

    // FILLED PRODUCT STATUS
    if (sortTerm && sortTerm !== "All") {
      filteredBids = filteredBids.filter(
        (bid) => bid.leading_bidder === sortTerm
      );
      // console.log({ PRODUCT_STATUS_SELECTED: filteredBids });
      setWonBids(filteredBids);
      // handlePageClick(e);
    }
  }

  return (
    <div ref={listContainerRef} className="mt-8 w-full scroll-mt-56">
      <div className="w-full">
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

          {/* //>filter */}
          <div className="flex w-full lg:w-[60%] xl:w-[50%] justify-center lg:justify-end">
            <div className="flex items-center gap-x-3">
              {/* //> sort by */}
              {/* <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
                className="relative p-2 sm:flex justify-center items-center gap-x-2 hidden whitespace-nowrap"
              > */}
              {/* Sort by <IoFilterOutline className="w-5 h-5" /> */}
              {/* //>dropdown */}
              {/* {showDropdown && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute w-max rounded-md border shadow top-8 px-2 py-2 bg-white"
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
              <p className=" font-medium whitespace-nowrap">
                Showing results{" "}
                <span className="font-base text-pry-color">
                {wonBids.length === 0 ? 0 : startIndex} to {endIndex} of {wonBids.length} Item(s)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* //<   Bid List */}

        {fetching && wonBids.length === 0 && (
          <p className="mt-10">Loading bids... Please wait.</p>
        )}

        {!fetching && wonBids.length === 0 && (
          <p className="text-red-600 mt-10">No won bids to display.</p>
        )}

        {wonBids.length > 0 && (
          <div className="overflow-x-auto flex  scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-h-2 scrollbar-rounded-md">
            <div className="mt-4  w-full  ">
              <div className="flex gap-x-7  px-3 py-4 rounded-t-md w-fit">
                <div className="justify-center w-[17rem]  min-w-[17rem]  max-w-[17rem] flex items-center break-words  overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-gray-500 font-medium break-words overflow-x-scroll scrollbar-hide ">
                    ITEM
                  </p>
                </div>
                {/* <div className="flex items-center min-w-[6rem] break-words overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-gray-500 font-medium ">QUANTITY</p>
                </div> */}

                <div className="text-center justify-center flex items-center w-[6rem] min-w-[6rem] break-words overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-center text-gray-500 font-medium ">
                    PRICE
                  </p>
                </div>

                <div className="flex items-center w-[10rem] min-w-[10rem]  justify-center  text-center">
                  <p className="text-lg text-center whitespace-nowrap text-gray-500 font-medium ">
                    DATE-TIME
                  </p>
                </div>

                <div className="flex items-center w-[14rem] min-w-[14rem] justify-center text-center">
                  <p className="text-lg text-center text-gray-500 font-medium  ">
                    ACTION
                  </p>
                </div>
              </div>

              {currentItems.map((bid, i) => (
                <div
                  onMouseOver={() => {
                    setSelectedBid(bid);
                    // updateSelectedBid(bid.bid_id)
                    // console.log(bid);
                  }}
                  onTouchStart={() => {
                    setSelectedBid(bid);
                    // updateSelectedBid(bid.bid_id)
                  }}
                  key={bid.bid_id}
                  className="flex  gap-x-7 px-3 py-4 border-b border-gray-100 w-full "
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
                  {/* <div className="flex items-center min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide   ">
                      4
                    </p>
                  </div> */}
                  <div className="flex items-center w-[6rem] min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      ${parseFloat(bid.current_bid).toFixed(2).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center w-[10rem] min-w-[10rem]  justify-center text-center">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      {formatDate(bid.bid_end_date)} - {bid.bid_end_time}
                    </p>
                  </div>

                  <div className="flex items-center w-[14rem] min-w-[14rem]  justify-center text-center gap-x-1">
                    {!bid.bid_claim && (
                      <button
                        // onMouseOver={() => {
                        //   console.log(bid);
                        // }}
                        onClick={() => {
                          // return
                          if (ATMcardArray.length === 0) {
                            triggerAlert({
                              message:
                                "You must add a card before you claim item.",
                              color: "red",
                            });
                            // setSelectedAccountTab("card_information");
                            // setAccountTabChild("");
                            setAddCardOverlay(true);
                            return;
                          }

                          if (deliveryAddressArray.length === 0) {
                            triggerAlert({
                              message:
                                "You must add an address before you proceed.",
                              color: "red",
                            });
                            setShowAddAddressOverlay(true);
                            return;
                          }
                          secureLocalStorage.setItem("selectedBid", selectedBid)
                          setAccountTabChild("claim_item");
                        }}
                        className=" bg-pry-color text-white rounded py-1 px-2 text-base whitespace-nowrap"
                      >
                        Claim Your Item
                      </button>
                    )}

                    {/* //>Paid and track buttons */}
                    {bid.bid_claim && (
                      <div className="flex items-center justify-between gap-x-3">
                        <button
                          onClick={() => {
                            setSelectedClaimedBid(bid);
                            setShowSuccessfulClaimOverlay(true);
                          }}
                          className=" bg-green-100 text-pry-color border-pry-color border rounded-full py-1 px-4 text-base whitespace-nowrap"
                        >
                          Paid
                        </button>

                        <button
                          disabled
                          onClick={() => {
                            setSelectedClaimedBid(bid);
                            // setShowSuccessfulClaimOverlay(true);
                          }}
                          className=" bg-white text-pry-color border-pry-color border rounded-full py-1 px-4 text-base whitespace-nowrap"
                        >
                          Track
                        </button>
                      </div>
                    )}

                    {/* {i !== 0 && (
                      <button className=" bg-pry-color text-white rounded py-1 px-2 text-base whitespace-nowrap">
                        Track Item
                      </button>
                    )} */}

                    {/* {i !== 0 && (
                      <div className="border  border-pry-color bg-green-50 text-pry-color rounded-full py-1 px-7 text-base">
                        Lead
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {wonBids.length > itemsPerPage && (
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
