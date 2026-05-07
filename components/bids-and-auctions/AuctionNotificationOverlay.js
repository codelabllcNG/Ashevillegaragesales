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
import ShareBidCountdown from "../countdowns/ShareBidCountdown";
import secureLocalStorage from "react-secure-storage";

function AuctionNotificationOverlay() {
  const {
    setShareBidOverlay,
    setNotificationOverlay,
    showAlert,
    setShowAlert,
    setAlertText,
    triggerAlert,

    user,
    userToken,
    formatDate,
    setAuctionNotificationOverlay,
    selectedAuction,
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
  const [notificationResponse, setNotificationResponse] = useState("");
  const [connecting, setConnecting] = useState(false);

  async function notifyMe(e) {
    // e.preventDefault();

    const dataToSubmit = {
      email: email,
      bid_id: selectedAuction?.auction_id,
      auction_id: selectedAuction?.auction_id,
      type: "auction",
    };

    if (!email || email.trim() === "") {
      setNotificationResponse("Email is important.");
      // console.log(dataToSubmit);
      return;
    }

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(validEmailRegex)) {
      setNotificationResponse("Invalid email format!");
      return;
    }

    // console.log(dataToSubmit);
    // return;

    try {
      setNotificationResponse("Please wait...");
      setConnecting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/notify-me`,
        {
          // mode: 'NO-CORS',
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
            usertoken: `${userToken}`,
            useremail: `${user?.email}`,
          },
        }
      );

      const data = await response.json();

      // console.log(data);

      // return;

      if (data.status === "fail") {
        setNotificationResponse(data.message);
        // console.log(data.message);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setNotificationResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);

      // return

      setNotificationOverlay(false);
      triggerAlert({
        message: "You will be notified about this auction's activities.",
        color: "green",
      });

      setConnecting(false);
      setNotificationResponse("");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setNotificationResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  return (
    <div
      onClick={() => {
        setAuctionNotificationOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white  pt-3 pb-3 px-3 min-w-[50%]"
      >
        <p className="text-4xl font-bold text-center">Get Notified</p>

        <p className="text-xl mt-2  text-center">Receive auction activities </p>

        <div className="mt-9 flex gap-x-3 ">
          <Image
            className="rounded-md"
            alt="Product image"
            src="/images/pot.png"
            width={123}
            height={50}
          />

          <div className="flex flex-col justify-center">
            <p className="text-lg font-medium">
              {selectedAuction.auction_title}
            </p>
            <div className="flex gap-x-6 items-center mt-2">
              {/* <div className="flex text-sm  items-center gap-x-2">
                <FaRegCalendar className="w-5 h-5 " />{" "}
                {formatDate(selectedAuction.bid_end_date)}
              </div> */}

              {/* <ShareBidCountdown
                serverCountdownInSeconds={selectedAuction.countdown_seconds}
                serverCountdownHHMMSS={selectedAuction.countdown}
              /> */}
              {/* <ShareBidCountdown serverCountdownInSeconds="02:23:30" /> */}
            </div>
          </div>
        </div>

        {/* //> Email Address  */}
        <div className="flex flex-col mt-5">
          <label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            // required
            type="email"
            name="email"
            id="email"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="example@gmail.com"
          />
        </div>
        {/* //> Response */}
        <div
          className={`${
            notificationResponse ? "flex" : "hidden"
          } justify-center items-center mt-2`}
        >
          <p
            // type="button"
            className={`w-[95%]
          flex items-center justify-center ${
            notificationResponse.includes("Success")
              ? "text-pry-color"
              : "text-red-600"
          }  rounded-md py-4 px-20    font-medium `}
          >
            {notificationResponse}
          </p>
        </div>
        {/* //>Submit */}
        <button
          disabled={connecting || !email || email.trim() === ""}
          onClick={() => {
            notifyMe();
          }}
          className="rounded-md bg-pry-color hover:bg-opacity-80 duration-300 text-white text-lg font-semibold py-3 w-full mt-3"
        >
          Submit
        </button>

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

export default AuctionNotificationOverlay;
