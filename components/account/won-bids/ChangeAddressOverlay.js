import ShareBidCountdown from "@/components/countdowns/ShareBidCountdown";
import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
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
import secureLocalStorage from "react-secure-storage";
// import ShareBidCountdown from "../countdowns/ShareBidCountdown";

function ChangeAddressOverlay() {
  const {
    setShowChangeAddressOverlay,
    selectedBid,
    productionShareLink,
    localHostShareLink,
    deliveryAddressArray,
    setSelectedAddress,
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
        setShowChangeAddressOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black px-3 bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white border-pry-color border  pb-8 "
      >
        <div className="flex relative items-center justify-start sm:justify-center px-32 sm:px-36 bg-pry-color rounded-t-md py-2 ">
          <div className="  text-white sm:text-xl flex items-center gap-x-2">
            Saved Addresses
          </div>

          <div className="absolute right-0 flex items-center justify-end">
            <div
              onClick={() => {
                setShowChangeAddressOverlay(false);
              }}
              className="flex justify-center items-center p-1 mr-2  cursor-pointer rounded-full bg-white"
            >
              <IoIosCloseCircle className="w-7 h-7 text-pry-color" />
            </div>
          </div>
        </div>

        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-7 mt-10">
          {deliveryAddressArray.map((address) => (
            <div
              onMouseOver={() => {
                setSelectedAddress(address);
                secureLocalStorage.setItem("selectedAddress", address)
                // console.log(address);
              }}
              onTouchStart={() => {
                setSelectedAddress(address);
                secureLocalStorage.setItem("selectedAddress", address)
              }}
              onClick={() => {
                setSelectedAddress(address);
                secureLocalStorage.setItem("selectedAddress", address)
                setShowChangeAddressOverlay(false);
              }}
              key={address.id}
              className="border  rounded p-2 cursor-pointer  hover:bg-gray-50 duration-300"
            >
              <p className="">
                {address.first_name} {address.last_name}
              </p>

              <p className="text-lg font-medium text-pry-color mt-2">
                {address.delivery_address}
              </p>

              <p className="mt-2">{address.phone_number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChangeAddressOverlay;
