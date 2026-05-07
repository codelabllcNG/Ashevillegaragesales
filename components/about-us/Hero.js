import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="lg:flex mt-12 gap-x-10 items-center">
      {/* //>Left */}
      <div className="w-full lg:w-[60%]">
        <h1 className="text-[2.1rem] sm:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-[-0.03rem] text-center lg:text-left">
          Find, Buy, <span className="italic text-[#487354]">Repeat</span>!
        </h1>

        <p
          className={`text-base sm:text-xl font-medium leading-9 duration-300 text-gray-600 mt-2`}
        >
          Welcome to Asheville Garage Sales, a part of the BidClover family!
          We&apos;re your destination for unbeatable deals on premium items.{" "}
          <br />
          <br />
          As a sister company of BidClover, we offer a simplified buy-only
          service, making shopping hassle-free. <br />
          <br />
          At Asheville Garage Sales, we&apos;re committed to providing our
          customers with access to premium items at discounted prices.
          <br />
          <br />
          Whether you&apos;re looking for household essentials, fashion finds,
          or outdoor gear, Asheville Garage Sales has you covered. Our inventory
          is carefully curated to offer a diverse selection of products to suit
          every need and preference
          <br />
          <br />
          Thank you for choosing Asheville Garage Sales for your savings needs!
        </p>
      </div>

      {/* //>Right */}
      <div className="hidden lg:block w-[40%]">
        <Image
          className=""
          alt="About us image"
          // src="/images/about-hero.png"
          src="/images/biddddcc.webp"
          width={500}
          height={400}
        />
      </div>
    </div>
  );
}

export default Hero;
