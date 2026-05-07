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
import BuyNow from "./BuyNow";
// import ShareBidCountdown from "../countdowns/ShareBidCountdown";

function BuyNowOverlay() {
  const {
    setShowBuyNowOverlay,
    selectedBid,
    productionShareLink,
    localHostShareLink,
    deliveryAddressArray,
    setSelectedAddress,
    ATMcardArray,
    setSelectedCard,
    defaultCardID,
    selectedCard,
    setShowChangeAddressOverlay,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={() => {
        setShowBuyNowOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black px-3 bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md overflow-y-scroll h-[98%] px-3  bg-white border-pry-color border w-full md:w-[90%] pb-8 "
      >
        <BuyNow />
      </div>
    </div>
  );
}

export default BuyNowOverlay;
