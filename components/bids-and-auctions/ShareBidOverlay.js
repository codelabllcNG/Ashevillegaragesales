import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import {
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFlash } from "react-icons/io5";
import ShareBidCountdown from "../countdowns/ShareBidCountdown";

function ShareBidOverlay() {
  const {
    setShareBidOverlay,
    selectedProduct,
    productionShareLink,
    localHostShareLink,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [copied, setCopied] = useState(false);

  return (
    <div
      onClick={() => {
        setShareBidOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white border-pry-color border  pb-8"
      >
        <div className="flex relative items-center justify-start sm:justify-center px-32 sm:px-36 bg-pry-color rounded-t-md py-2 ">
          <div className="  text-white sm:text-xl flex items-center gap-x-2">
            <FaGavel className="w-7 h-7" /> Share item with friends
          </div>

          <div className="absolute right-0 flex items-center justify-end">
            <div
              onClick={() => {
                setShareBidOverlay(false);
              }}
              className="flex justify-center items-center p-1 mr-2  cursor-pointer rounded-full bg-white"
            >
              <IoIosCloseCircle className="w-7 h-7 text-pry-color" />
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-2xl font-medium">
          {selectedProduct.name}
        </p>

        <div className="   px-2 py-1 justify-center   text-pry-color flex items-center gap-x-2 ">
         
            <p className=" text-sm md:text-base font-semibold">
              Price: ${selectedProduct.price}
            </p>
          </div>

        {/* <div className="flex gap-x-2 items- justify-center mt-2 ">
          <HiOutlineUserGroup className="w-5 lg:w-6 h-5 lg:h-6 !text-gray-600 " />{" "}
          <p className="">{selectedProduct.total_bidders} Bidder(s)</p>
        </div> */}

        <div className="flex justify-center items-center mt-5">
          <div className="w-[80%] flex justify-center items-center gap-x-2">
            <button className="border rounded p-2 text-gray-400 font-medium text-xs overflow-x-scroll scrollbar-hide cursor-text  whitespace-nowrap">
              {`${localHostShareLink}/cart/product-details/${selectedProduct.slug}`}
            </button>{" "}
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `${localHostShareLink}/cart/product-details/${selectedProduct.slug}`
                );
                setCopied(true);
              }}
              className="rounded bg-pry-color whitespace-nowrap cursor-copy text-white  px-1 py-1"
            >
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareBidOverlay;
