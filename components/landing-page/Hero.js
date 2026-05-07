import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { IoFlash } from "react-icons/io5";
import secureLocalStorage from "react-secure-storage";
import HeroCountdown from "../countdowns/HeroCountdown";
import dynamic from "next/dynamic";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import CartCard from "../cart/CartCard";
// import  html2pdf  from "html-to-pdf-js";

function Hero({ productsArray }) {
  const {
    menuClicked,
    setSelectedAuctionTab,
    setShowPlaceBidOverlay,
    setBidType,
    updateSelectedBid,
    setSelectedBid,
    showPlaceBidOverlay,
  } = AllCtx();
  const targetTime = new Date().setHours(new Date().getHours() + 24);
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(targetTime - Date.now());

  const { products, getProducts, loading } = useCartStore((state) => state);

  // useEffect(() => {
  //   getProducts();
  // }, [getProducts]);

  const [heroBids, setHeroBids] = useState([]);
  const [fetching, setFetching] = useState(false);

  // //>Fetch bids
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // setLoginResponse("Please wait...");
  //       setFetching(true);
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_NEW_API_BASE}/hero-bid`,
  //         {
  //           cache: "no-store",
  //           headers: {
  //             "Content-Type": "application/json",
  //             usertoken: secureLocalStorage.getItem("userToken"),
  //             useremail: secureLocalStorage.getItem("user")?.email,
  //           },
  //         }
  //       );

  //       const data = await response.json();

  //       if (data.status === "fail") {
  //         // setLoginResponse(data.message);
  //         // console.log(data);
  //         console.log("An error occurred.");
  //         setFetching(false);
  //         return;
  //       }

  //       if (!response.ok) {
  //         // setLoginResponse("Something went wrong, retry!");
  //         // console.log(data);
  //         console.log("Response not OK");
  //         // console.log(data);
  //         setFetching(false);
  //         return;
  //       }
  //       // console.log(data);

  //       // return;

  //       setHeroBids(data.bids);
  //       // setDuplicatedOngoingBids(data.bids);

  //       setFetching(false);
  //     } catch (error) {
  //       // console.log(error);
  //       console.log("An error occurred.");
  //       // setLoginResponse("An error occurred, retry.");
  //       setFetching(false);
  //     }
  //   }
  //   fetchData();

  //   const intervalId = setInterval(() => {
  //     fetchData();
  //     // console.log("This code runs in an interval");
  //   }, 10000); // 10,000 milliseconds = 10 secs

  //   // Clear the interval when the component is unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [heroBids.length]);

  return (
    <div className="bg-sec-color lg:flex justify-between -mx-3 sm:-mx-8 lg:-mx-[5rem] px-3 sm:px-8 lg:px-[5rem] gap-x-5 items-center ">
      <div className="lg:w-[43rem]  py-4  text-center lg:text-left">
        <h1 className="text-[2.1rem] sm:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-[-0.03rem]">
          Find, Buy, and <span className="italic text-[#487354]">Repeat</span>!
        </h1>
        <p
          className={`text-base sm:text-xl font-medium leading-9 duration-300 text-gray-600 `}
        >
          Shop premium items for less! From home essentials to kids&apos; games;
          Asheville Garage Sales offers unbeatable deals. Discover and save
          today!
        </p>

        <div className="mt-5">
          <button
            onClick={() => {
              // downloadPDF("test")
              router.push("/#categories");
              // setSelectedAuctionTab("categories");
            }}
            className="bg-pry-color text-white  px-10 sm:px-14 py-4 sm:py-5 rounded-md text-xl font-medium duration-300 hover:bg-opacity-80 "
          >
            Start Buying
          </button>
        </div>
      </div>

      <div className="duration-300 500:grid hidden grid-cols-3 gap-x-[0.31rem] sm:gap-x-2 my-4  lg:w-[60%]">
        {productsArray.slice(0, 3).map((product, i) => (
          <CartCard
            showToolTip={true}
            key={product.id}
            id={product.id}
            name={product.name}
            img={product.image}
            category={""}
            price={product.price}
            desc={product.description}
            slug={product.slug}
            stock={product.stock}
            stockStatus={product.stock_status}
            show_desc={false}
          />

          // <div
          //   onMouseOver={() => {
          //     setSelectedBid(bid);
          //     // updateSelectedBid(bid.bid_id);

          //     // console.log(bid);
          //   }}
          //   onTouchStart={() => {
          //     setSelectedBid(bid);
          //     // updateSelectedBid(bid.bid_id);
          //   }}
          //   onClick={() => {
          //     setSelectedBid(bid);
          //     setBidType("quick");
          //     // updateSelectedBid(bid.bid_id);
          //     setShowPlaceBidOverlay(true);
          //   }}
          //   key={bid.bid_id}
          //   className={`bg-white border flex flex-col justify-between  border-pry-color rounded-md p-[0.3rem] sm:p-2 cursor-pointer ${
          //     i === 1 ? "scale-95" : i === 2 ? "scale-90  -ml-2  sm:-ml-4" : ""
          //   }  duration-300 `}
          // >
          //   {/* //> product image */}
          //   <div>
          //     <div className="relative ">
          //       <div className=" relative h-[204px] ">
          //         <Image
          //           unoptimized
          //           className="w-full rounded-md opacity-80 object-cover"
          //           src={bid.bid_image || "/images/placeholder.jpg"}
          //           alt={bid.slug + "Image"}
          //           //  width={305}
          //           // height={204}
          //           fill
          //         />
          //       </div>

          //       {/* <Image
          //       src={bid.bid_image}
          //       alt={`Image ${bid.bid_id}`}
          //       width={305}
          //       height={204}
          //       // fill
          //     /> */}

          //       <div className="hidden absolute top-0 mt-2 ml-2 border border-pry-color px-2 py-1 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
          //         <p className=" text-[0.5rem] sm:text-sm lg:text-xs xl:text-base font-semibold">
          //           Current bid: $
          //           {parseFloat(bid.current_bid).toFixed(2).toLocaleString()}
          //         </p>
          //         {/* <IoFlash className="w-[0.4rem] h-[0.4rem] 450:w-4 450:h-4 text-yellow-300 450:w-400" /> */}
          //       </div>

          //       {!showPlaceBidOverlay && (
          //         <HeroCountdown
          //           serverCountdownInSeconds={bid.bid_countdown_seconds}
          //           serverCountdownHHMMSS={bid.bid_countdown}
          //         />
          //       )}
          //     </div>

          //     <p
          //       data-te-toggle="tooltip"
          //       title={bid.bid_title}
          //       className="text-[0.6rem] sm:text-lg mt-[0.45rem] sm:mt-4"
          //     >
          //       {bid.bid_title.length > 25
          //         ? bid.bid_title.slice(0, 25 - 3) + "..."
          //         : bid.title}
          //     </p>
          //   </div>

          //   {/* <button
          //     onClick={() => {
          //       setSelectedBid(bid);
          //       setBidType("quick");
          //       // updateSelectedBid(bid.bid_id);
          //       setShowPlaceBidOverlay(true);
          //     }}
          //     className="sm:py-2  py-[0.24rem] mt-[0.26rem] sm:mt-2 w-full px-[0.47rem] sm:px-4 bg-pry-color text-white duration-300 hover:bg-opacity-80 rounded-sm sm:rounded-md text-[0.5rem] sm:text-base"
          //   >
          //     Place Bid
          //   </button> */}
          // </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
