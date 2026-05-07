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
import PhoneInput from "react-phone-number-input";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { COUNTRIES } from "@/util-functions/COUNTRIES";
import { useRouter } from "next/router";
import Paid from "@/components/Paid";
// import ShareBidCountdown from "../countdowns/ShareBidCountdown";

function SuccessfulClaimOverlay() {
  const router = useRouter();

  const {
    setShowSuccessfulClaimOverlay,
    deliveryType,
    setDeliveryType,

    productionShareLink,
    localHostShareLink,
    selectedAccountTab,
    accountTitle,
    accountTabChild,
    setAccountTabChild,
    user,
    showAlert,
    triggerAlert,
    setShowAlert,
    userToken,
    setDeliveryAddressArray,
    deliveryAddressArray,
    setSelectedAddress,
    setSelectedClaimedBid,
    selectedClaimedBid,
    decorateDate,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const downloadPDF = async () => {
    var opt = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const html2pdf = (await import("html2pdf.js")).default;
    const theDiv = document.getElementById("invoice");
    html2pdf(theDiv, opt);

    triggerAlert({
      message: "Invoice downloaded successfully!",
      color: "green",
    });
  };

  return (
    <div
      onClick={() => {
        setShowSuccessfulClaimOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden  "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  max-h-[90%] scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md overflow-y-scroll  bg-white  border-gray-600 border  p-5 w-[90%] lg:w-[70%] xl:w-[65%]"
      >
        <div className="flex justify-end items-center">
          <button
            onClick={() => {
              downloadPDF();
            }}
            className="flex items-center justify-between text-white bg-pry-color opacity-80 duration-300 p-2 gap-x-2 rounded"
          >
            {" "}
            <Icon
              icon="material-symbols:download"
              className="text-white w-6 h-6"
            />{" "}
            Download Invoice
          </button>
        </div>

        <div id="invoice">
          <p className="text-xl font-medium text-center mt-5">
            Item Successfully Claimed
          </p>
          <p className="  text-center mt-4">
            We have sent a confirmation email to {user?.email}
          </p>

          <div className="border-b border-dashed my-5"></div>

          <div>
            <p className="text-lg font-medium">Processing Date</p>
            <p className="to-gray-400 mt-1 ">
              {selectedClaimedBid.processing_date}
            </p>
          </div>

          <div className="border-b border-dashed my-5"></div>

          <div>
            <p className="text-lg font-medium">Claim ID</p>
            <p className="to-gray-400 mt-1 ">{selectedClaimedBid.claim_id}</p>
          </div>

          <div className="border-b border-dashed my-5"></div>

          {selectedClaimedBid?.shipping === "delivery" && (
            <div>
              <p className="text-lg font-medium">Shipping Date</p>
              <p className="to-gray-400 mt-1 ">
                {selectedClaimedBid?.shipping_date}
              </p>
            </div>
          )}

          {selectedClaimedBid?.shipping === "delivery" && (
            <div className="border-b border-dashed my-5"></div>
          )}

          {selectedClaimedBid?.shipping === "pick-up" && (
            <div>
              <p className="text-lg font-medium">Pick-up Date</p>
              <p className="to-gray-400 mt-1 ">{selectedClaimedBid?.pick_up}</p>
            </div>
          )}

          {selectedClaimedBid?.shipping === "pick-up" && (
            <div className="border-b border-dashed my-5"></div>
          )}

          {selectedClaimedBid?.shipping === "delivery" && (
            <div>
              <p className="text-lg font-medium">Delivery Information</p>
              <p className="to-gray-400 mt-1 ">
                {selectedClaimedBid?.shipping_address[0]?.delivery_address}
              </p>
            </div>
          )}

          {selectedClaimedBid?.shipping === "delivery" && (
            <div className="border-b border-dashed my-5"></div>
          )}
          <div>
            <p className="text-lg font-medium">Your Item</p>
            {/* //> Item details */}
            <div className="w-full  mt-5 xl:mt-0">
              <div className=" border rounded p-4">
                <p className="font-semibold text-2xl">
                  Item successfully paid for.
                </p>

                <div className="flex justify-between items-center   overflow-x-scroll scrollbar-hide  gap-x-3 mt-7 w-full">
                  <Image
                    unoptimized
                    className="rounded-md"
                    alt="Product Image"
                    src={
                      selectedClaimedBid.bid_image || "/images/placeholder.jpg"
                    }
                    width={80}
                    height={70}
                  />{" "}
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between items-center gap-x-5">
                      <p className=" font-medium ">
                        {selectedClaimedBid?.bid_title}
                      </p>
                      <p className=" text-xl font-semibold text-pry-color">
                        $
                        {parseFloat(selectedClaimedBid?.current_bid)
                          .toFixed(2)
                          .toLocaleString()}
                      </p>
                    </div>

                    {/* <p className="text-sm text-gray-500 ">1X</p> */}
                  </div>
                </div>

                <div className="border-t border-dashed my-5 border-gray-400"></div>

                {/* <div className="flex items-center justify-between gap-x-5 mt-3">
                  <div className="flex">
                    <p className="text-lg text-gray-500 font-medium">
                      {" "}
                      Buyer&apos;s Premium at 15%
                    </p>
                 
                  </div>

                  <p className="text-lg font-medium">
                    $
                    {parseFloat(selectedClaimedBid?.buyers_premium)
                      .toFixed(2)
                      .toLocaleString()}
                  </p>
                </div> */}

                <div className="flex items-center justify-between gap-x-5 mt-3">
                  <div className="flex">
                    <p className="text-lg text-gray-500 font-medium">Lot Fee</p>
                    {/* {selectedClaimedBid?.bid_payment && <Paid />} */}
                  </div>
                  <p className="text-lg font-medium">
                    $
                    {parseFloat(+selectedClaimedBid?.lot_fee)
                      .toFixed(2)
                      .toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-x-5 mt-3">
                  <div className="flex">
                    <p className="text-lg text-gray-500 font-medium">Tax</p>
                    {/* {selectedClaimedBid?.bid_payment && <Paid />} */}
                  </div>
                  <p className="text-lg font-medium">
                    $
                    {parseFloat(+selectedClaimedBid?.bid_tax)
                      .toFixed(2)
                      .toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-x-5 mt-3">
                  <div className="flex">
                    <p className="text-lg text-gray-500 font-medium">
                      Subtotal
                    </p>
                    {/* {selectedClaimedBid?.bid_payment && <Paid />} */}
                  </div>
                  <p className="text-lg font-medium">
                    $
                    {parseFloat(
                      +selectedClaimedBid?.current_bid +
                        +selectedClaimedBid?.lot_fee +
                        // +selectedClaimedBid?.buyers_premium +
                        +selectedClaimedBid?.bid_tax
                    )
                      .toFixed(2)
                      .toLocaleString()}
                  </p>
                </div>

                {selectedClaimedBid?.shipping === "delivery" && (
                  <div className="flex items-center justify-between gap-x-5 mt-3">
                    <p className="text-lg text-gray-500 font-medium">
                      Delivery
                    </p>
                    {/* <ShippingFee
              addressID={selectedAddress?.id}
              bidID={selectedClaimedBid.bid_id}
            /> */}

                    <p className="text-lg font-medium">
                      $
                      {parseFloat(+selectedClaimedBid?.shipping_fee)
                        .toFixed(2)
                        .toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="border-t border-dashed my-5 border-gray-400"></div>

                <div className="flex items-center justify-between gap-x-5 mt-3">
                  <p className="text-lg text-gray-600 font-medium">
                    Grand Total
                  </p>
                  {/* {selectedClaimedBid?.bid_payment &&
              // <ShippingFee
              //   addressID={selectedAddress?.id}
              //   bidID={selectedClaimedBid.bid_id}
              // />

              (selectedClaimedBid?.shipping === "delivery" ? (
                <p className="text-lg font-medium">
                  ${parseFloat(+selectedClaimedBid?.shipping_fee).toLocaleString()}
                </p>
              ) : (
                <p className="text-lg font-medium">$0</p>
              ))} */}
                  {
                    <p className="text-lg font-medium text-pry-color">
                      $
                      {parseFloat(
                        +selectedClaimedBid?.current_bid +
                          +selectedClaimedBid?.lot_fee +
                          // +selectedClaimedBid?.buyers_premium +
                          +selectedClaimedBid?.bid_tax +
                          (selectedClaimedBid?.shipping === "delivery"
                            ? +selectedClaimedBid?.shipping_fee
                            : 0)
                      )
                        .toFixed(2)
                        .toLocaleString()}
                    </p>
                  }
                </div>

                {/* //>Payment Response */}
                {/* <div
            className={`${
              paymentResponse ? "flex" : "hidden"
            } justify-center items-center mt-5`}
          >
            <p
              // type="button"
              className="w-[95%]
          flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
            >
              {paymentResponse}
            </p>
          </div> */}

                {/* <button
            onClick={() => {
              makePayment();
            }}
            className="py-2 mt-5 w-full rounded-md bg-pry-color text-white duration-300 hover:bg-opacity-80 text-lg font-semibold"
          >
            Make Payment
          </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-10 mt-10">
          <button
            onClick={() => {
              setShowSuccessfulClaimOverlay(false);
              router.push("/");
            }}
            className="rounded bg-pry-color w-1/2 hover:bg-opacity-80 duration-300 text-white py-3"
          >
            Continue Bidding
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulClaimOverlay;
