import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCalendar, FaGavel, FaRegCalendar } from "react-icons/fa";
import {
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFlash } from "react-icons/io5";

import secureLocalStorage from "react-secure-storage";
import ShareBidCountdown from "./countdowns/ShareBidCountdown";

function BuyNowConfirmation() {
  const {
    setShareBidOverlay,
    setNotificationOverlay,
    routeToClaimPage,setAccountMobileNav,
    showAlert,
    setShowAlert,
    setShowAddAddressOverlay,
    deliveryAddressArray,
    setAlertText,
    triggerAlert,
    selectedBid,
    user,
    buying,
    setShowBuyNowConfirmation,
    userToken,
    formatDate,
    itemBought,
    setShowBuyNowOverlay,
    buyNow,
    buyNowResponse,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [email, setEmail] = useState(secureLocalStorage.getItem("user")?.email);
  // const [buyNowResponse, setNotificationResponse] = useState("");
  const [connecting, setConnecting] = useState(false);

  return (
    <div
      onClick={() => {
        buying ? null : setShowBuyNowConfirmation(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white  pt-3 pb-3 px-3"
      >
        <p className="text-4xl font-bold text-center">Buy An Item</p>

        {/* <p className="text-xl mt-2  text-center">Receive bid activities </p> */}

        <div className="mt-9 flex gap-x-3">
          <div className=" relative w-[128px] h-[100px]">
            <Image
              unoptimized
              className="rounded-md"
              alt="Product image"
              src={selectedBid.bid_image || "/images/placeholder.jpg"}
              // width={128}
              //   height={100}
              fill
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-lg font-medium">{selectedBid.bid_title}</p>
            <div className="flex gap-x-6 items-center mt-2">
              <div className="flex text-sm  items-center gap-x-2">
                <FaRegCalendar className="w-5 h-5 " />{" "}
                {formatDate(selectedBid.bid_end_date)}
              </div>
              <ShareBidCountdown
                serverCountdownInSeconds={selectedBid.bid_countdown_seconds}
                serverCountdownHHMMSS={selectedBid.bid_countdown}
              />
            </div>
          </div>
        </div>

        {/* //> Response */}
        <div
          className={`${
            buyNowResponse ? "flex" : "hidden"
          } justify-center items-center mt-2`}
        >
          <p
            // type="button"
            className={`w-[95%]
          flex items-center justify-center ${
            buyNowResponse.includes("success")
              ? "text-pry-color"
              : "text-red-600"
          }  rounded-md py-4 px-3    font-medium `}
          >
            {buyNowResponse}
          </p>
        </div>

        {/* //>Claim Item */}
        {itemBought && (
          <div className="flex items-center mt-3 justify-between gap-x-4">
            <button
              disabled={!itemBought}
              onClick={() => {
                buying ? null : setShowBuyNowConfirmation(false);
              }}
              className="rounded-md bg-pry-color hover:bg-opacity-80 duration-300 text-white text-lg font-semibold py-3 w-1/2 "
            >
              Check More Items
            </button>{" "}
            <button
              disabled={!itemBought}
              onClick={() => {
                if (deliveryAddressArray.length === 0) {
                  triggerAlert({
                    message: "You must add an address to proceed.",
                    color: "red",
                  });
                  setShowAddAddressOverlay(true);
                  return;
                }
                secureLocalStorage.setItem("selectedBid", selectedBid);
                setAccountMobileNav(false)
                setShowBuyNowConfirmation(false);
                //  console.log(selectedBid.bid_title);
                routeToClaimPage();
              }}
              className="rounded-md bg-pry-color hover:bg-opacity-80 duration-300 text-white text-lg font-semibold py-3 w-1/2 "
            >
              Claim Item
            </button>
          </div>
        )}

        {/* //>Retry */}
        {!itemBought && (
          <button
            disabled={itemBought || buying}
            onClick={() => {
              buyNow(selectedBid.bid_id);
            }}
            className="rounded-md bg-pry-color hover:bg-opacity-80 duration-300 text-white text-lg font-semibold py-3 w-full mt-3"
          >
            Retry
          </button>
        )}

        {/* //> Or sign in  */}
        {/* <div className="flex justify-center items-center mt-5">
          <div
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-between  gap-x-3  "
          >
            <hr className="w-[25%] sm:w-1/3  border border-gray-400 bg-gray-400" />
            <p className="font-medium whitespace-nowrap">
              OR SIGN IN TO GET NOTIFIED
            </p>
            <hr className="w-[25%] sm:w-1/3  border border-gray-400 bg-gray-400" />
          </div>
        </div> */}

        {/* <button className="w-full text-center mt-5 text-green-500 font-semibold">
          Sign in
        </button> */}
      </div>
    </div>
  );
}

export default BuyNowConfirmation;
