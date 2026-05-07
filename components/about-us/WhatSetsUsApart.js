import { Icon } from "@iconify/react";
import React from "react";

function WhatSetsUsApart() {
  const ARRAY = [
    {
      id: 1,
      icon: "solar:dollar-bold",
      title: "Exceptional Deals",
      content:
        "Asheville Garage Sales offers unbeatable prices on a wide range of premium items, ensuring you get the best value for your money.",
    },

    {
      id: 2,
      icon: "streamline:shield-2-solid",
      title: "Curated Selection",
      content:
        "Our inventory is carefully curated to feature high-quality products across various categories, ensuring you find exactly what you're looking for.",
    },

    {
      id: 3,
      icon: "ic:baseline-sort",
      title: "Reliable Reputation",
      content:
        "Backed by BidClover, a trusted name in online auctions, we uphold the same dedication to excellence and customer satisfaction.",
    },

    {
      id: 4,
      icon: "solar:dollar-bold",
      title: "Continuous Savings",
      content:
        "With constantly updated inventory and exclusive deals, Asheville Garage Sales ensures you always have access to exciting opportunities to save on your favorite items",
    },

    {
      id: 5,
      icon: "mingcute:truck-fill",
      title: "Convenient Pickup and Delivery",
      content:
        "Enjoy the flexibility of choosing between convenient pickup options or doorstep delivery for your purchases.",
    },

    {
      id: 6,
      icon: "streamline:shield-2-solid",
      title: "Secure and Protected",
      content:
        "Shop with confidence knowing that your transactions are secure and your information is protected, ensuring a worry-free shopping experience. ",
    },
  ];

  return (
    <div className="bg-pry-color text-white mt-10 -mx-3 px-3 sm:px-8 lg:px-[5rem] sm:-mx-8 lg:-mx-[5rem] pt-12 ">
      <h1 className="text-[2.1rem] sm:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-[-0.03rem] text-center">
        What Sets Us Apart
      </h1>

      <div className="flex flex-wrap justify-center   gap-4 ">
        {ARRAY.map((item) => (
          <div
            key={item.id}
            className="  bg-gray-50 w-full sm:w-[40%] md:w-[30%] p-4 mb-8 mt-5 bg-opacity-10 rounded-md"
          >
            <Icon icon={item.icon} className="w-7 h-7" />
            <p className="mt-3 text-xl font-bold lg:text-2xl">{item.title}</p>
            <p className="mt-3 text-base lg:text-lg">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatSetsUsApart;
