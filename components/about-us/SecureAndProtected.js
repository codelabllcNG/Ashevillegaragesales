import Image from "next/image";
import React from "react";

function SecureAndProtected() {
  return (
    <div className="flex w-full justify-center items-center mt-10">
      <div className="bg-[#eafff0]  w-full lg:w-[90%] items-center justify-center rounded-md p-8 mt-5 gap-x-5 lg:flex">
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <div className="  relative w-[600px] h-[300px]  ">
            <Image alt="Banner image" src="/images/secure.png" fill />
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left mt-5 lg:mt-0 ">
          <p className="text-[2.1rem] sm:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-[-0.03rem] ">
            What Sets Us Apart
          </p>

          <p className="text-lg mt-3 text-left">
            Bid, Win, Repeat - because at Asheville Garage Sales, every bid is a
            step towards an exciting new deal! <br /> Ready to embark on a
            bidding adventure? Start now and let the winning begin!{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecureAndProtected;
