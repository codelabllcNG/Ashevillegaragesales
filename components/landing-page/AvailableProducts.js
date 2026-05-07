import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiBell, HiChevronDoubleRight, HiMenu } from "react-icons/hi";
import {
  IoIosArrowDown,
  IoIosArrowRoundDown,
  IoIosShareAlt,
  IoMdMenu,
} from "react-icons/io";
import { IoFlash, IoFlashOutline, IoGrid } from "react-icons/io5";
import PlaceBidOverlay from "../bids-and-auctions/PlaceBidOverlay";
import AllCtx from "@/util-functions/allCtx";

import { useRouter } from "next/router";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import CartCard from "../cart/CartCard";
import ReactPaginate from "react-paginate";

function AvailableProducts({ productsArray }) {
  // const productsArray = productsArray.slice(3)

  const router = useRouter();

  const { setShowProductRequestOverlay, selectedCategory, searchKeyword } = AllCtx();

  const { products, getProducts, loading } = useCartStore((state) => state);
  // const { filteredProducts, setFilteredProducts } = AllCtx();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [view, setView] = useState("grid");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 500) {
        setFilteredProducts(productsArray);
      } else {
        setFilteredProducts(productsArray.slice(3));
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCategory.toLowerCase() === "all") {
      setFilteredProducts(productsArray);
    } else {
      const filtered = productsArray.filter((product) => {
        // console.log({d: selectedCategory})
        return product.category[0].name.toLowerCase() === selectedCategory.toLowerCase();
      });
      setFilteredProducts(filtered);
    }
  }, [ selectedCategory]);


    ////> search function
    useEffect(() => {
      let searchedArray = [...productsArray];
  
      if (searchKeyword) {
        // Escape special characters in the searchKeyword
        const escapedSearchTerm = searchKeyword.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const searchRegex = new RegExp(escapedSearchTerm, "i");
  
        searchedArray = searchedArray.filter((prod) => {
          const idMatch = searchRegex.test(prod?.id.toString());
          const nameMatch = searchRegex.test(prod?.name?.toLowerCase());
  
          return idMatch || nameMatch;
        
        });
       
      }
      searchKeyword ? setFilteredProducts(searchedArray) : setFilteredProducts(searchedArray.slice(3))
    }, [searchKeyword]);

  // productsArray navigation settings
  const itemsPerPage = 30;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = filteredProducts.slice(offset, endOfOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const listContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the top of the list when the currentPage changes
    if (listContainerRef.current) {
      // console.log("lofff");
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; // productsArray navigation settings end

  const startIndex = (currentPage + 1 - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    (currentPage + 1) * itemsPerPage,
    filteredProducts.length
  );

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div ref={listContainerRef} id="ongoing-bids" className="mt-5 scroll-pt-[6rem]    ">
      {/* //> Products */}
      <div>
        <div className="  mt-8">
          <p
            id="ongoing_bids"
            className=" text-[1.375rem] sm:text-[2.12rem] font-semibold select-none"
          >
            Available Products
          </p>

          <p className=" font-medium whitespace-nowrap">
            Showing results{" "}
            <span className="font-base text-pry-color">
              {filteredProducts.length === 0 ? 0 : startIndex} to {endIndex} of{" "}
              {filteredProducts.length} Item(s)
            </span>
          </p>
        </div>

        {/* //>Desktop Product list */}
        {/* {loading && filteredProducts.length === 0 && (
          <p>Loading... Please wait.</p>
        )} */}
        {filteredProducts.length === 0 && (
          <p className="text-red-600">No products at this time.</p>
        )}
        {filteredProducts?.length > 0 && (
          <div 
            className={`duration-300 ${
              view === "grid" ? "grid" : "hidden"
            }  md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-10 mt-4 `}
          >
            {
              currentItems?.map((product, i) => (
                <CartCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  img={product.image}
                  category={product.category[0].name}
                  price={product.price}
                  desc={product.description}
                  slug={product.slug}
                  stock={product.stock}
                  stockStatus={product.stock_status}
                  show_desc={true}
                />
              ))
              // .filter((bid, i) => i < 10)
            }
          </div>
        )}

        {filteredProducts.length > itemsPerPage && (
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

        <div className="w-full flex justify-center items-center mt-5 gap-x-5 ">
          <p>Didn&apos;t find what you&apos;re looking for? </p>
          <button
            onClick={() => {
              setShowProductRequestOverlay(true);
            }}
            className="border border-pry-color text-pry-color px-2 rounded py-2 hover:bg-gray-50 duration-300"
          >
            Request Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailableProducts;
