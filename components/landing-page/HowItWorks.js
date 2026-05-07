import React from "react";
import { FaRedRiver, FaShieldAlt, FaUserShield } from "react-icons/fa";
import { HiChartPie, HiChevronDoubleRight } from "react-icons/hi";
import { IoShieldSharp } from "react-icons/io5";

function HowItWorks() {
  return (
    <div id="how-it-works" className=" pt-24 sm:pt-32 ">
      <div className="flex justify-between items-center ">
        <p className="text-[1.375rem] sm:text-[2.12rem] font-semibold ">
          How it works
        </p>
        {/* <div className="select-none cursor-pointer flex items-center gap-2 ">
          <p className="text-base sm:text-2xl text-pry-color">Watch video</p>
          <HiChevronDoubleRight className="w-[1.1rem] h-[1.1rem] sm:w-6 sm:h-6 text-pry-color" />
        </div> */}
      </div>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-14 gap-y-7">
        {/* //> */}
        <div className="flex items-start gap-x-6">
          <div className="p-4 bg-pry-color rounded-3xl flex justify-center items-center">
            <IoShieldSharp className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-semibold ">
              Browse and Select
            </p>

            <p className="text-sm sm:text-base mt-2 text-gray-500">
              Explore our extensive collection of items across various
              categories, and pick out the products that catch your eye.
            </p>
          </div>
        </div>

        {/* //> */}
        <div className="flex items-start gap-x-6">
          <div className="p-4 bg-pry-color rounded-3xl flex justify-center items-center">
            <IoShieldSharp className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-semibold ">
              Preview Your Cart
            </p>

            <p className="text-sm sm:text-base mt-2 text-gray-500">
              Preview your cart items.
            </p>
          </div>
        </div>

        {/* //> */}
        <div className="flex items-start gap-x-6">
          <div className="p-4 bg-pry-color rounded-3xl flex justify-center items-center">
            <HiChartPie className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-semibold ">
              Choose Pickup or Delivery
            </p>

            <p className="text-sm sm:text-base mt-2 text-gray-500">
              Opt for convenient pickup by selecting an appointment time and
              date, or provide accurate delivery details for doorstep service.
            </p>
          </div>
        </div>

        {/* //> */}
        <div className="flex items-start gap-x-6">
          <div className="p-4 bg-pry-color rounded-3xl flex justify-center items-center">
            <FaRedRiver className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-semibold ">Purchase Items</p>

            <p className="text-sm sm:text-base mt-2 text-gray-500">
              Securely purchase your selected items.
            </p>
          </div>
        </div>

        {/* //> */}
        <div className="flex items-start gap-x-6">
          <div className="p-4 bg-pry-color rounded-3xl flex justify-center items-center">
            <FaRedRiver className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-semibold ">Goto Orders</p>

            <p className="text-sm sm:text-base mt-2 text-gray-500">
              Access your purchased items list to review your orders.
            </p>
          </div>
        </div>

        {/* //> */}
        <div className="flex items-start gap-x-6">
          <div className="p-4 bg-pry-color rounded-3xl flex justify-center items-center">
            <FaRedRiver className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-semibold ">Repeat</p>

            <p className=" text-sm sm:text-base mt-2 text-gray-500">
              Enjoy your shopping as you purchase more!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
