import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  HiBell,
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle, IoIosShareAlt } from "react-icons/io";
import { IoFlash } from "react-icons/io5";
import OngoingBidDesktopCountdown from "../countdowns/OngoingBidDesktopCountdown";
import PlaceBidOverlayCountdown from "../countdowns/PlaceBidOverlayCountdown";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import { Icon } from "@iconify/react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

function PlaceBidOverlay() {
  const router = useRouter();

  const {
    setShowPlaceBidOverlay,
    selectedBid,
    user,
    setAddCardOverlay,
    userToken,
    updateCountdownSelectedBid,
    setBidType,
    bidType,
    highestBid,
    setHighestBid,
    triggerAlert,
    ATMcardArray,
    buyNow,
    updateSelectedBid,
    setSelectedBid,
    refreshOngoingAndTrendingBids,
    setSelectedCard,
    setShareBidOverlay,
    bidResponse,
    setBidResponse,
    showPlaceBidOverlay,
    setDefaultCardID,
    setATMcardArray,
  } = AllCtx();

  const [biddingAmount, setBiddingAmount] = useState("");
  const [proxyBidAmount, setProxyBidAmount] = useState("");
  const [localResponse, setLocalResponse] = useState("");
  const [swapButtons, setSwapButtons] = useState(true);
  const [bidActivityOverlay, setBidActivityOverlay] = useState(false);

  const [connecting, setConnecting] = useState(false);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // //>Disable scrolling when component mounts
  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // >Update selected bid
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateSelectedBid(selectedBid.bid_id);
    }, 2000); // 10,000 milliseconds = 10 secs

    updateSelectedBid(selectedBid.bid_id);
    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // //>Update timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCountdownSelectedBid(selectedBid.bid_id);
      // console.log("This code runs in an interval");
    }, 10000); // 10,000 milliseconds = 10 secs

    updateCountdownSelectedBid(selectedBid.bid_id);
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
        // setFetching(true);
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
          // console.log(data);
          // return
          if (data?.cards.length === 0) {
            setATMcardArray([]);
          }
          // setLoginResponse(data.message);

          // console.log(data);
          console.log("An error occurred.");
          // setFetching(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          // setFetching(false);
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

        // setFetching(false);
        // setLoginResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        // setFetching(false);
      }
    }
    if (secureLocalStorage.getItem("user")) {
      fetchData();
    }
  }, []);

  async function placeBidHandler(e) {
    e.preventDefault();
    ////> Redirect if not authorized
    if (!user) {
      router.push("/login");
      return;
    }

    if (user?.status === "inactive") {
      router.push("/email-verification", "signup");
      return;
    }

    if (ATMcardArray.length === 0) {
      triggerAlert({
        message: "You must add a card to proceed.",
        color: "red",
      });
      // setSelectedAccountTab("card_information");
      // setAccountTabChild("");
      setShowPlaceBidOverlay(false);
      setAddCardOverlay(true);
      return;
    }

    // console.log("lll");
    // return
    const dataToSubmit = {
      bid_id: selectedBid.bid_id,
      bidding_type: bidType,
      proxy_max_amount: bidType === "proxy" ? proxyBidAmount : "",
      proxy_increment_amount: "",
      // regular_amount: biddingAmount,
      quick_amount: bidType === "quick" ? selectedBid?.quick_bid_value : "",
    };

    if (
      (bidType === "proxy" && !proxyBidAmount) ||
      (bidType === "proxy" && proxyBidAmount.toString().trim() === "")
    ) {
      setBidResponse("Enter a valid amount.");
      // console.log(dataToSubmit);
      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      setLocalResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/place-bid`,
        {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setBidResponse(data.message);
        setLocalResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        // setBidResponse("Something went wrong, retry!");
        setLocalResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);

      // return;

      if (
        data.bid.leading_bidder === "leading" &&
        data.bid.bid_won != user?.ID
      ) {
        setBidResponse("You are currently the leading bidder!");
        setBidResponse("");
      }

      if (
        data.bid.leading_bidder === "outbid" &&
        data.bid.bid_won != user?.ID
      ) {
        setBidResponse("You have been outbid!");
        setBidResponse("");
      }

      if (data.bid.bid_won == user?.ID) {
        setBidResponse(
          "You have won this bid! Go to your dashboard to claim item."
        );
        setBidResponse("");
      }

      setLocalResponse("");

      setHighestBid(data.bid.current_bid);
      setSelectedBid(data.bid);
      triggerAlert({ message: "Bid placed successfully!", color: "green" });

      setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setBidResponse("An error occurred, retry.");
      setLocalResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  useEffect(() => {
    const handleBackButtonClick = (event) => {
      if (showPlaceBidOverlay) {
        event.preventDefault();

        setShowPlaceBidOverlay(false);
        router.replace(router.asPath, undefined, { shallow: true });

        // Optionally, you can add a custom confirmation message
        // event.returnValue = 'Are you sure you want to leave this page?';
      }
    };

    // Attach the event listener to the window's beforeunload event
    window.addEventListener("popstate", handleBackButtonClick);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("popstate", handleBackButtonClick);
    };
  }, []);

  return (
    <div
      onClick={() => {
        setShowPlaceBidOverlay(false);
        refreshOngoingAndTrendingBids();
      }}
      className="fixed  left-0 top-0 z-[11] h-screen w-full bg-black bg-opacity-30 justify-end items-end flex overflow-y-hidden"
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={placeBidHandler}
        className="rounded-md p-2 bg-white relative max-w-[650px] max-h-[90%] overflow-y-scroll border-pry-color border w4 relative"
      >
        {/* //>Close icon */}
        <Icon
          onClick={() => {
            setShowPlaceBidOverlay(false);
            refreshOngoingAndTrendingBids();
          }}
          icon="mdi:cancel-bold"
          className="w-6 h-6 text-red-600 cursor-pointer absolute"
        />
        {/* <div className="w-full px-3">   </div> */}
        {/* //> Product image */}

        <div className="flex justify-center items-center w-full">
          <div className="mt-10 flex items-center w-full justify-between gap-x-5">
            {/* <FaRegArrowAltCircleLeft
          onClick={() => {
            scroll(-200);
          }}
          className="hidden sm:block lg:-ml-5 text-gray-600 w-10 h-10 cursor-pointer"
        /> */}
            <div
              // ref={scrollRef}
              className="flex  items-  justify-between scroll-smooth  snap-x overflow-x-scroll hover:overscroll-x-   snap-mandatory duration-500 scrollbar-hide  gap-x- w-full"
            >
              {selectedBid.bid_images.map((image, i) => (
                <div
                  key={image}
                  className={`  relative  py-1 pr-3  w-[50%] shrink-0 snap-center  flex flex-col justify- `}
                >
                  <div className="relative  h-[240px] rounded-md ">
                    <Image
                      unoptimized
                      className=" pr-5 rounded- object-cover"
                      src={image || "/images/placeholder.jpg"}
                      alt="Bid Image"
                      // width={80}
                      // height={80}
                      fill
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* <FaRegArrowAltCircleRight
          onClick={() => {
            scroll(400);
          }}
          className="hidden sm:block lg:-mr-5 text-gray-600 w-10 h-10 cursor-pointer"
        /> */}
          </div>
          {/* <div className=" relative max-h-[300px] h-[300px]  w-[80%] ">
            <Image
              unoptimized
              className=" rounded-md "
              src={selectedBid.bid_image || "/images/placeholder.jpg"}
              alt={selectedBid.slug + "Image"}
              // width={368}
              // height={224}
              fill
            />
          </div> */}
        </div>

        {/* //> Product name */}
        <p className="text-lg 420:text-xl font-medium mt-3">
          {selectedBid.bid_title}{" "}
        </p>
        {/* //> */}
        <div className="mt-3 flex gap-x-5 420:gap-x-10 items-center justify-">
          <p className=" text-xs 420:text-sm font-medium">
            Retail Price:{" "}
            <span className="text-sm 420:text-base font-semibold">
              ${selectedBid.bid_price}
            </span>
          </p>

          {+selectedBid.buy_now_price >= +selectedBid.current_bid && (
            <p
            disabled={selectedBid.bid_countdown_seconds === "ended"}
              onClick={(e) => {
                e.stopPropagation();
                buyNow(selectedBid.bid_id);
                setShowPlaceBidOverlay(false);
              }}
              className="text-sm 420:text-base text-pry-color cursor-pointer select-none px-4 py-2 text-white bg-pry-color rounded"
            >
              Buy Now ${selectedBid.buy_now_price}
            </p>
          )}

          <div
            onClick={() => {
              setShowPlaceBidOverlay(false);
              setShareBidOverlay(true);
            }}
            className="text-pry-color flex gap-x-2 items-center text-sm 420:text-base select-none cursor-pointer"
          >
            <HiShare className="min-w-[20px] min-h-[20px] " /> Share item
          </div>

          {/* <p
            className="text-pry-color   text-sm 420:text-base select-none cursor-pointer"
            onClick={() => {
              setBidActivityOverlay(true);
            }}
          >
            Bid History
          </p> */}
        </div>
        {/* //>  */}
        <div className="mt-2 flex justify-center gap-x-3 420:gap-x-5 items-center">
          <div className="hidden flex items-center gap-x-2">
            <IoFlash className="min-w-[16px] min-h-[16px] text-yellow-400" />
            <p className=" text-sm sm:text-lg text-pry-color font-semibold">
              Current Bid:{" "}
              <span className="font-semibold text-sm sm:text-lg">
                $
                {parseFloat(selectedBid.current_bid)
                  .toFixed(2)
                  .toLocaleString()}
              </span>
            </p>
          </div>

          <div className="w-[2px] h-6  bg-gray-400 "></div>

          <PlaceBidOverlayCountdown
            serverCountdownInSeconds={selectedBid.bid_countdown_seconds}
            serverCountdownHHMMSS={selectedBid.bid_countdown}
          />
          {/* <PlaceBidOverlayCountdown serverCountdownInSeconds="02:23:30" /> */}

          <div className="w-[2px] h-6  bg-gray-400 "></div>

          {/* <div className="flex gap-x-2 items-center justify-between">
            <HiOutlineUserGroup className="min-w-[17px] hidden sm:flex min-h-[17px] !text-gray-600 " />{" "}
            <p className="text-sm sm:text-lg">
              {selectedBid.total_bidders} Bidder(s)
            </p>
          </div> */}
        </div>

        {/* {bidType === "regular" &&
          !bidResponse.includes("leading") &&
          !bidResponse.includes("placed") && (
            <p
              className={`mt-3 text-center ${
                bidResponse.includes("your bidding amount")
                  ? ""
                  : "text-red-600"
              }`}
            >
              {bidResponse}
            </p>
          )} */}

        <div className="mt-3 flex justify-center items-center">
          <p
            className={`${
              bidResponse.includes("leading") ||
              bidResponse.includes("have won") ||
              bidResponse.includes("success")
                ? "text-pry-color bg-green-50  border-pry-color border"
                : bidResponse.includes("outbid")
                ? "text-red-600 bg-red-50  border-red-600 border"
                : bidResponse.includes("incrementally")
                ? "text-black"
                : "text-orange-400"
            } text-sm text-center  w-fit rounded-full px-2 py-1`}
          >
            {bidResponse}
          </p>
        </div>

        <div className="mt-1 flex justify-center items-center">
          <p
            className={`text-orange-400 text-sm text-center  w-fit rounded-full px-2 py-1`}
          >
            {localResponse}
          </p>
        </div>

        {/* //> Proxy Bid input */}

        {bidType === "proxy" && (
          <div className="flex justify-center  mt-3 gap-x-2">
            <div className="w-[50%]  ">
              <input
                onChange={(e) => {
                  const value = e.target.value;

                  // Remove leading zeros and ensure it's a valid number
                  // const decimalCheck = /^\d+(\.\d{1,2})?$/;
                  // console.log(parseFloat(value).toFixed(2));
                  // const validValue = decimalCheck.test(value.toString()) || "";
                  const validValue = parseFloat(value).toFixed(2) || "";
                  setProxyBidAmount(validValue);
                }}
                type="number"
                step="0.01" // Set the step to allow decimal values
                inputMode="decimal" // Specify that it's a decimal input
                // defaultValue={proxyBidAmount}
                // value={proxyBidAmount}
                name="proxy_bidding_input"
                id="proxy_bidding_input"
                className="h-11 rounded-sm border-gray-300 focus:ring-0 focus:border-gray-300 text-xs font-medium w-full "
                placeholder="Enter your maximum bid"
              />

              <p
                onClick={() => {
                  setBidType("proxy");
                }}
                className="text-sm mt-2 cursor-pointer select-none text-pry-color "
              >
                Enter $
                {parseFloat(selectedBid.quick_bid_value).toFixed(2).toLocaleString()} or
                more
              </p>
            </div>
            <button
              disabled={!proxyBidAmount || connecting}
              className="bg-pry-color duration-300 hover:bg-opacity-80 px-8 py-3 flex items-center  h-11 rounded-sm text-white text-center"
            >
              Submit Bid
            </button>
          </div>
        )}

        {/* //> Quick Bid button */}
        {/* {bidType === "quick" && (
          <div className="flex justify-center items-center mt-3">
            <button
              // onMouseOver={() => {
              //   setBidType("quick");
              // }}
              // onTouchStart={() => {
              //   setBidType("quick");
              // }}

              onClick={(e) => {
                setBidType("quick");
                setProxyBidAmount("");
                placeBidHandler(e);
              }}
              className="bg-pry-color text-white duration-300 hover:bg-opacity-80 px-14 py-3 rounded text-xl font-medium"
            >
              Quick Bid $
              {parseFloat(selectedBid.quick_bid_value).toFixed(2).toLocaleString()}
            </button>
          </div>
        )} */}

        {/* //> */}
        {/* <div className="flex justify-center items-center mt-2">
          <div className="w-1/2 flex justify-center items-center gap-x-2 ">
            <div className="w-[25%] h-[1px] bg-gray-300"></div>
            <p>OR</p>
            <div className="w-[25%] h-[1px] bg-gray-300"></div>
          </div>
        </div> */}

        {/* //> Proxy Bid input */}
        {/* {bidType === "quick" && (
          <div className="flex justify-center  mt-3 gap-x-2">
            <div className="w-[50%]  ">
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  // Remove leading zeros and ensure it's a valid number
                  // const decimalCheck = /^\d+(\.\d{1,2})?$/;
                  // console.log(parseFloat(value).toFixed(2));
                  // const validValue = decimalCheck.test(value.toString()) || "";
                  const validValue = parseFloat(value).toFixed(2) || "";
                  setProxyBidAmount(validValue);
                }}
                type="number"
                step="0.01" // Set the step to allow decimal values
                inputMode="decimal" // Specify that it's a decimal input
                // defaultValue={proxyBidAmount}
                // value={proxyBidAmount}
                name="proxy_bidding_input"
                id="proxy_bidding_input"
                className="h-11 rounded-sm border-gray-300 focus:ring-0 focus:border-gray-300 text-xs font-medium w-full "
                placeholder="Enter your maximum bid"
              />

              <p
                onClick={() => {
                  setBidType("proxy");
                }}
                className="text-sm mt-2 cursor-pointer select-none text-pry-color "
              >
                Enter $
                {parseFloat(selectedBid.quick_bid_value).toFixed(2).toLocaleString()} or
                more
              </p>
            </div>
            <button
              disabled={!proxyBidAmount || connecting}
              className="bg-pry-color duration-300 hover:bg-opacity-80 px-8 py-3 flex items-center  h-11 rounded-sm text-white text-center"
            >
              Submit Bid
            </button>
          </div>
        )} */}

        {/* //> Quick Bid button */}
        {/* {bidType === "proxy" && (
          <div className="flex justify-center items-center mt-3">
            <button
              // onMouseOver={() => {
              //   setBidType("quick");
              // }}
              // onTouchStart={() => {
              //   setBidType("quick");
              // }}
              onClick={(e) => {
                setBidType("quick");
                setProxyBidAmount("");
                placeBidHandler(e);
              }}
              className="bg-pry-color text-white duration-300 hover:bg-opacity-80 px-14 py-3 rounded text-xl font-medium"
            >
              Quick Bid $
              {parseFloat(selectedBid.quick_bid_value).toFixed(2).toLocaleString()}
            </button>
          </div>
        )} */}

        {/* //> Warning */}
        {/* <div className="flex justify-center items-center  ">
          <p className="text-sm text-red-600 text-center mt-4 w-[90%]">
            By Submitting your bid, you&apos;ll be committing to buy this item from
            the seller of you are the winning bidder
          </p>
        </div> */}

        <div className="flex justify-center gap-x-2 items-center mt-3 mb-2  select-none">
          <HiInformationCircle
            data-te-toggle="tooltip"
            title="You set your maximum amount, and our system bids for you whenever you are outbid."
            className="w-5 h-6 text-pry-color cursor-help"
          />{" "}
          What is Proxy Bid?
        </div>

        {/* //> */}
        <div className="flex justify-between items-center mt-5 gap-x-5">
          {/* <div className="p-2 bg-green-100 rounded-md border w-full">
            <p className="font-medium">Buyer&apos;s Premium</p>
            <p className="text-sm mt-2">
              A 15% Buyer&apos;s Premium will be applied to the final price
            </p>
          </div> */}

          {/* <div className="p-2 bg-green-100 rounded-md border w-1/2">
            <p className="font-medium">Added Percentage</p>
            <p className="text-sm mt-2">
              A 15% Buyer&apos;s Premium will be applied to the final price
            </p>
          </div> */}
        </div>

        {/* //> */}
        <div className="p-2 bg-green-50 rounded-md border mt-5 mb-5">
          <p className="font-medium">Product Description</p>
          <p className="text-sm mt-2 text-justify">
            {selectedBid.bid_description}
          </p>
        </div>

        {bidActivityOverlay && (
          <div className="bg-white w-full absolute p-3 h-[150%] top-0 -ml-2">
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => {
                  setBidActivityOverlay(false);
                }}
                className="border border-pry-color px-3 py-1 rounded text-pry-color duration-300 hover:bg-gray-50"
              >
                {" "}
                Back
              </button>

              <p className="text-lg">Bid History</p>
            </div>
            <p className="mt-5 text-center">{selectedBid?.bid_title}</p>

            {selectedBid?.bid_activity.length === 0 && (
              <p className="text-red-600 mt-10">
                No activities on this bid yet.{" "}
              </p>
            )}

            {selectedBid?.bid_activity.length > 0 && (
              <div className="overflow-x-auto flex  scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-h-2 scrollbar-rounded-md">
                <div className="mt-4  w-full  ">
                  <div className="flex gap-x-7  px-3 py-4 rounded-t-md  bg-gray-300 w-fit">
                    <div className=" w-[17rem]  min-w-[17rem]  max-w-[17rem] flex items-center break-words  overflow-x-scroll scrollbar-hide ">
                      <p className="text-lg text-gray-500 font-medium break-words overflow-x-scroll scrollbar-hide ">
                        DATE - TIME
                      </p>
                    </div>

                    <div className="flex items-center w-[15rem] min-w-[15rem]  justify-  text-center">
                      <p className="text-lg text-center whitespace-nowrap text-gray-500 font-medium ">
                        BID - TYPE
                      </p>
                    </div>
                  </div>

                  {selectedBid?.bid_activity.slice(0, 10).map((history, i) => (
                    <div
                      key={history.id}
                      className={`flex  gap-x-7 px-3 py-4 border-b border-gray-100 w-fit ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } `}
                    >
                      <div className=" min-w-[17rem]  max-w-[17rem]   overflow-x-scroll scrollbar-hide  ">
                        {new Date(history.date).toLocaleString(
                          "en-GB",
                          options
                        )}
                      </div>

                      <div className="flex items-center w-[15rem] min-w-[15rem]  justify- text-center">
                        <p className="text-base font-medium break-words overflow-x-scroll scrollbar-hide  whitespace-nowrap">
                          ${history.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default PlaceBidOverlay;
