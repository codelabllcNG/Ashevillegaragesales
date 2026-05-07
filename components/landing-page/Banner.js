import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiBell, HiOutlineClock } from "react-icons/hi";
import { IoFlash, IoFlashOutline } from "react-icons/io5";

function Banner() {
  const targetTime = new Date().setHours(new Date().getHours() + 24);

  const [timeRemaining, setTimeRemaining] = useState(targetTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeRemaining = targetTime - Date.now();

      if (newTimeRemaining <= 0) {
        clearInterval(intervalId);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(newTimeRemaining);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((timeRemaining / 1000 / 60) % 60)).padStart(
    2,
    "0"
  );
  const hours = String(
    Math.floor((timeRemaining / 1000 / 60 / 60) % 24)
  ).padStart(2, "0");

  const days = String(Math.floor(timeRemaining / 1000 / 60 / 60 / 24)).padStart(
    2,
    "0"
  );
  // const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

  return (
    <div className="  w-full overflow-x-hidden  scrollbar-hide mt-32 hidden xl:grid grid-cols-2  gap-x-5">
      {/* //> Left */}
      <div
        className="h-[400px] bg-[url('/images/left_banner.png')] bg-cover bg-center
      bg-no-repeat flex justify-between items-center px-8 py-10"
      >
        <div className="min-w-[65%]">
          <p className="font-semibold text-3xl">
            This Canon EOS  is currently bidding
          </p>

          <p className="mt-5 text-[1.8rem] ">
            Bidding Price:{" "}
            <span className="text-[2.1rem] font-medium">$300</span>
          </p>

          <div className="  flex  items-center gap-x-2  mt-3">
            <HiOutlineClock className="w-6 h-6  " />
            <p className="text-xl font-semibold text-red-600">{`${hours}:${minutes}:${seconds}`}</p>
          </div>

          <button className="mt-8 flex justify-center items-center py-4 bg-pry-color text-white text-base font-semibold gap-x-2 rounded-md px-8 duration-300 hover:bg-opacity-80">
            Bid Now <IoFlash className="w-6 h-6 text-yellow-300 " />
          </button>
        </div>
        <div className="flex justify-start -ml-16  items-center w-fit ">
          <div className=" relative ">
          <Image
            className=""
            alt="Camera image"
            src="/images/camera.png "
            // fill
            width={300}
            height={300}
          />
          </div>
        </div>
      </div>

      {/* //> Right */}
      <div
        className="h-[400px] bg-[url('/images/right_banner.png')] bg-cover bg-center
      bg-no-repeat flex justify-between items-center px-8 py-10"
      >
        <div className="min-w-[70%]">
          <p className="font-semibold text-3xl">
            Supper Bid Coming  Next Month
          </p>

          {/* //> Countdown */}
          <div className="flex items-center gap-x-5 mt-6">
            <div className="p-2 rounded-md border border-gray-400 mt-6 justify-center items-center flex flex-col">
              <p className="text-3xl font-semibold">{days}</p>
              <p className="text-xl font-medium">Days</p>
            </div>

            <div className="p-2 rounded-md border border-gray-400 mt-6 justify-center items-center flex flex-col">
              <p className="text-3xl font-semibold">{hours}</p> 
              <p className="text-xl font-medium">Hrs</p>
            </div>

              <div className="p-2 rounded-md border border-gray-400 mt-6 justify-center items-center flex flex-col">
              <p className="text-3xl font-semibold">{minutes}</p>
              <p className="text-xl font-medium">Mins</p>
            </div>

            <div className="p-2 rounded-md border border-gray-400 mt-6 justify-center items-center flex flex-col">
              <p className="text-3xl font-semibold">{seconds}</p> 
              <p className="text-xl font-medium">Secs</p>
            </div>
          </div>

          <button className="mt-8 flex justify-center items-center py-4 bg-pry-color text-white text-base font-semibold gap-x-2 rounded-md px-8 duration-300 hover:bg-opacity-80">
          <HiBell className="w-6 h-6 text-white" /> Notify Me
          </button>
        </div>
        <div className="flex justify-start -ml-16  items-center w-fit -mr-8">
          {/* <div className=" relative w-[533px] h-[500px] flex items-center"> */}
          <Image
            className=""
            alt="Camera image"
            src="/images/drone.png "
            // fill
            width={300}
            height={300}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Banner;
