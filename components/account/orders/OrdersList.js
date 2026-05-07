import React, { useEffect, useRef, useState } from "react";
// import AppointmentFilter from "./AppointmentFilter";
import ReactPaginate from "react-paginate";
import { IoMdMore } from "react-icons/io";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import AllCtx from "@/util-functions/allCtx";
import secureLocalStorage from "react-secure-storage";
import { useCartStore } from "@/a-store/zustandStore/cartStore";

function OrdersList() {
  const {
    setAccountTabChild,
    setDuplicatedWonBids,
    wonBids, 
    setWonBids,
    duplicatedBids,selectedAccountTab,
    formatDate,
    setSelectedProduct,
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
  const { orders, getOrders, fetchingOrders } = useCartStore((state) => state);
  
  const [filteredOrders, setFilteredOrders] = useState(orders)

  // //>Fetch orders
  useEffect(() => {
  
    getOrders();

    setFilteredOrders(orders)

  }, [getOrders, orders.length]);




  // products navigation settings
  const itemsPerPage = 5;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = filteredOrders.slice(offset, endOfOffset);
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

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
    const newOffset = (event.selected * itemsPerPage) % filteredOrders.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; // products navigation settings end

  const startIndex = (currentPage + 1 - 1  ) * itemsPerPage + 1 ;
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, filteredOrders.length);

  // //>Filter and search function
  function handleFilter({ searchWord, sortTerm, e }) {
    var currentFilter;

    // Check for all empty
    if (
      (!searchWord || searchWord.trim() === "") &&
      (sortTerm === "" || sortTerm === "All")
    ) {
      setFilteredOrders(orders);
      return;
    }

    // EMPTY SEARCH BAR
    if (!searchWord || searchWord.trim() === "") {
      // currentFilter = orders;
      setFilteredOrders(orders);
    }
    // FILLED SEARCH BAR
    if (searchWord) {
      currentFilter = orders.filter((product) =>
        product.product_name.toLowerCase().includes(searchWord.toLowerCase())
      );

      setFilteredOrders(currentFilter);
      // handlePageClick(e);
      // console.log({ SEARCH_WORD: currentFilter });
      //   return
    }

    // EMPTY PRODUCT STATUS
    if (!sortTerm || sortTerm === "All") {
      setFilteredOrders(currentFilter);
      // console.log({ EMPTY_PRODUCT_STATUS: currentFilter });
      //   return
    }

    // FILLED PRODUCT STATUS
    if (sortTerm && sortTerm !== "All") {
      currentFilter = currentFilter.filter(
        (product) => product.leading_bidder === sortTerm
      );
      // console.log({ PRODUCT_STATUS_SELECTED: currentFilter });
      setFilteredOrders(currentFilter);
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

          {/* //>Filter */}
          <div className="flex w-full lg:w-[60%] xl:w-[50%] justify-center lg:justify-end">
            <div className="flex items-center gap-x-3">
             
              <p className=" font-medium whitespace-nowrap">
                Showing results{" "}
                <span className="font-base text-pry-color">
                {filteredOrders.length === 0 ? 0 : startIndex} to {endIndex} of {filteredOrders.length} Item(s)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* //<   Order List */}

        {fetchingOrders && filteredOrders.length === 0 && (
          <p className="mt-10">Loading orders... Please wait.</p>
        )}

        {!fetchingOrders && filteredOrders.length === 0 && (
          <p className="text-red-600 mt-10">No orders to display.</p>
        )}

        {filteredOrders.length > 0 && (
          <div className="overflow-x-auto flex  scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-h-2 scrollbar-rounded-md">
            <div className="mt-4  w-full  ">
              <div className="flex gap-x-7  px-3 py-4 rounded-t-md w-fit">
                <div className="justify-center w-[17rem]  min-w-[17rem]  max-w-[17rem] flex items-center break-words  overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-gray-500 font-medium break-words overflow-x-scroll scrollbar-hide ">
                    PRODUCT
                  </p>
                </div>
                {/* <div className="flex items-center min-w-[6rem] break-words overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-gray-500 font-medium ">QUANTITY</p>
                </div> */}

                <div className="text-center justify-center flex items-center w-[6rem] min-w-[6rem] break-words overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-center text-gray-500 font-medium ">
                    QTY
                  </p>
                </div>

                <div className="text-center justify-center flex items-center w-[6rem] min-w-[6rem] break-words overflow-x-scroll scrollbar-hide ">
                  <p className="text-lg text-center text-gray-500 font-medium ">
                    PRICE
                  </p>
                </div>

                <div className="flex items-center w-[10rem] min-w-[10rem]  justify-center  text-center">
                  <p className="text-lg text-center whitespace-nowrap text-gray-500 font-medium ">
                   DATE
                  </p>
                </div>

                <div className="flex items-center w-[14rem] min-w-[14rem] justify-center text-center">
                  <p className="text-lg text-center text-gray-500 font-medium  ">
                    STATUS
                  </p>
                </div>
              </div>

              {currentItems.map((product, i) => (
                <div
                  onMouseOver={() => {
                    setSelectedProduct(product);
                    // console.log(product)
                    // updateSelectedBid(product.bid_id)
                    // console.log(product);
                  }}
                  onTouchStart={() => {
                    setSelectedProduct(product);
                    // updateSelectedBid(product.bid_id)
                  }}
                  key={product.id}
                  className="flex  gap-x-7 px-3 py-4 border-b border-gray-100 w-full "
                >
                  <div className="flex min-w-[17rem]  max-w-[17rem] justify- items-center   overflow-x-scroll scrollbar-hide  gap-x-5 ">
                    <Image
                      unoptimized
                      className="rounded-md"
                      alt="Product Image"
                      src={product.product_image || "/images/product2.png"}
                      width={80}
                      height={70}
                    />{" "}
                    <p className="text-[0.9rem] font-medium">{product.product_name}</p>
                  </div>
                  {/* <div className="flex items-center min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide   ">
                      4
                    </p>
                  </div> */}
                  <div className="flex items-center w-[6rem] min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      x{product.product_qty}
                    </p>
                  </div>

                  <div className="flex items-center w-[6rem] min-w-[6rem]  justify-center text-center ">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      ${product.product_price}
                    </p>
                  </div>

                  <div className="flex items-center w-[10rem] min-w-[10rem]  justify-center text-center">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  ">
                      {product.order_date}
                    </p>
                  </div>

                  <div className="flex items-center w-[14rem] min-w-[14rem]  justify-center text-center">
                    <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide capitalize ">
                      {product.order_status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {filteredOrders.length > itemsPerPage && (
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

export default OrdersList;
