import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

function WhatClientsSay() {
  const scrollRef = useRef();

  function scroll(value) {
    scrollRef.current.scrollLeft += value;
  }

  const TESTIMONIES = [
    {
      id: 1,
      testimony:
        "I got amazing deals here!!! Great deals, better than thrift stores.",
      name: "John M.",
      link: "https://g.co/kgs/2s7Qxw",
    },

    {
      id: 2,
      testimony:
        "As a single mom, I've been feeling the crunch of everything I buy for my family getting more expensive by the day. So finding a beautiful, brand new artificial Christmas tree, that already has lights on it, for just $5 at Asheville Garage Sales felt almost too good to be true, especially when its suggested retail price at Amazon is $45. I was a little nervous driving to pick it up, because I'd never heard of Asheville Garage Sales before seeing them on Instagram, but when I arrived at the warehouse to pick up my tree, I was greeted by one of the friendly business owners and his adorable toddler and it immediately set my mind at ease. It feels really good being able to support a local, family owned business, too. Thanks Asheville Garage Sales for making this holiday season a little easier and brighter. I'll definitely be back. With gratitude, Teri Wade",
      name: "Teri W.",
      link: "https://g.co/kgs/GjLdaw",
    },

    // {
    //   id: 3,
    //   testimony: "Had a snag with a bid, and BOOM – Asheville Garage Sales support to the rescue! Quick, friendly, and solved my issue in minutes. The UI? Smooth as butter. ",
    //   name: "Mike G."
    // },
  ];

  return (
    <div className=" mt-24 sm:mt-32">
      {/* //>Heading */}
      <div>
        <p className="text-[2.1rem] sm:text-[4rem] font-medium font-outfit text-center">
          What clients say
        </p>
        <p className="text-center">
          Explore on the world&apos;s best & Newest Bidding marketplace with our
          beautiful Bidding products.{" "}
        </p>
      </div>

      <div className="mt-10 flex items-center w-full justify-between gap-x-5">
        <FaRegArrowAltCircleLeft
          onClick={() => {
            scroll(-200);
          }}
          className="hidden sm:block lg:-ml-5 text-gray-600 w-10 h-10 cursor-pointer"
        />
        <div
          ref={scrollRef}
          className="flex items-  justify- scroll-smooth  snap-x overflow-x-scroll hover:overscroll-x-   snap-mandatory duration-500 scrollbar-hide  gap-x-8 w-full"
        >
          {TESTIMONIES.map((testimony, i) => (
            <div
              key={testimony.id}
              className={`  relative  py-5 px-5 md:w-[32%] w-[15rem] 400:w-[17rem] shrink-0 snap-center flex flex-col justify- `}
            >
              <div>
                <Image
                  className="rounded-full "
                  src={"/images/profile-dp.webp"}
                  alt="Client DP"
                  width={68}
                  height={68}
                  // fill
                />

                <p className="mt-2 h-32 overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md">
                  {testimony.testimony}
                </p>
              </div>

              <p className="text-2xl font-semibold mt-4 ">
                <Link
                  className="mt-2 underline text-lg font-medium"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={testimony.link}
                >
                  {testimony.name}
                </Link>
              </p>
              {/* <p className="text-base font-semibold  text-gray-600">Engineer</p> */}
            </div>
          ))}
        </div>
        <FaRegArrowAltCircleRight
          onClick={() => {
            scroll(400);
          }}
          className="hidden sm:block lg:-mr-5 text-gray-600 w-10 h-10 cursor-pointer"
        />
      </div>

      <div className="flex justify-center items-center gap-x-8">
        <FaRegArrowAltCircleLeft
          onClick={() => {
            scroll(-200);
          }}
          className="sm:hidden lg:-ml-5 text-gray-600 w-10 h-10 cursor-pointer"
        />

        <FaRegArrowAltCircleRight
          onClick={() => {
            scroll(400);
          }}
          className="sm:hidden lg:-mr-5 text-gray-600 w-10 h-10 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default WhatClientsSay;
