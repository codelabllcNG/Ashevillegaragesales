import React from "react";
import Hero from "./Hero";
import AvailableProducts from "./AvailableProducts";
import AuctionLots from "../bids-and-auctions/AuctionLots";
import TrendingBids from "../bids-and-auctions/TrendingBids";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import WhatClientsSay from "./WhatClientsSay";
import Categories from "../bids-and-auctions/Categories";

function LandingPage({productsArray}) {
  return (
    <div className="">
      <Hero productsArray={productsArray} />
      <Categories productsArray={productsArray}  />
      <AvailableProducts productsArray={productsArray} />
      {/* <AuctionLots />
      <TrendingBids /> */}
      {/* <Banner /> */}
      <HowItWorks />
      <WhatClientsSay />
    </div>
  );
}



export default LandingPage;
