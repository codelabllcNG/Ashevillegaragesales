import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";

function PhoneVerification() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { phone } = AllCtx();
  return (
    <form className="px-3 sm:px-8 lg:px-[5rem] mt-24">
      <h1 className="text-center text-4xl font-bold">Enter OTP</h1>
      <p className="mt-9 text-center text-gray-500">
        Enter the OTP sent to {concealPhone(phone)}
      </p>

      {/* //> Code  */}
      <div className="flex justify-center items-center mt-10">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          {/* <label htmlFor="fullname">
            Code <span className="text-red-500">*</span>
          </label> */}
          {/* <input
            type="text"
            name="code"
            id="code"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            // placeholder="example@gmail.com"
          /> */}

          <div className="justify-between flex gap-x-5">
            {[1, 1, 1, 1, 1, 1].map((item) => (
              <input
                key={item.id}
                type="text"
                name=""
                id=""
                className="rounded-md w-[15%] p-2 h-12 focus:ring-0 text-center"
                placeholder="-"
              />
            ))}
          </div>
        </div>
      </div>

      {/* //> Submit */}
      <div className="flex justify-center items-center mt-9">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/verified", "signup");
          }}
      
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Submit
        </button>
      </div>

      {/* //> Resend OTP */}
      <div className="flex justify-center items-center mt-9">
        <button
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center  bg-white text-gray-500 rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 "
        >
          Resend OTP in <span className="text-pry-color ml-1"> 0:45</span>
        </button>
      </div>
    </form>
  );

  function concealPhone(phoneNumber) {
    // Check if the phone number is at least 6 characters long
    if (phoneNumber.length >= 6) {
      // Keep the first four characters and the last two characters
      const visiblePart = phoneNumber.substring(0, 4);
      const obfuscatedPart = "*".repeat(phoneNumber.length - 6);
      const lastTwoDigits = phoneNumber.slice(-2);

      // Combine the visible part, obfuscated part, and last two digits
      return visiblePart + obfuscatedPart + lastTwoDigits;
    }

    // Return the original phone number if it doesn't have at least 6 characters
    return phoneNumber;
  }
}

export default PhoneVerification;
