import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";

function ContinueToVerifyEmail() {
  const { email, user, regResponse, setRegResponse, phone } = AllCtx();

  const router = useRouter();

  const [seconds, setSeconds] = useState(120); // 5 minutes in seconds
  const [canResendEmail, setCanResendEmail] = useState(false);

  // useEffect(() => {
  //   if (!secureLocalStorage.getItem("user")) {
  //     router.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    let interval;

    if (!canResendEmail) {
      interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [canResendEmail, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setCanResendEmail(true);
    }
  }, [seconds]);

  return (
    <div className="px-3 sm:px-8 lg:px-[5rem] mt-4">
      <h1 className="text-center text-4xl font-bold">Verify your email address</h1>
      <p className="mt-9 text-center text-gray-500">
        We sent a verification code to{" "}
        {user?.email ? concealEmail(user?.email) : ""}. Click Continue to enter
        the code and verify.
      </p>

      <div className="flex justify-center items-center my-8">
        <Image
          className=""
          alt="Verification Image"
          src="/images/verify_email.png"
          width={300}
          height={200}
        />
      </div>

      {/* //> Continue */}
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={() => {
            router.push("/email-verification", "signup");
          }}
          type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Continue
        </button>
      </div>

      {/* //> Resend email */}

      {/* {canResendEmail && (
        <div className="flex justify-center items-center mt-5">
          <button type="button"
            onClick={() => {
              setCanResendEmail(false);
              setSeconds(120)
            }}
            className={`  w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-white  rounded-md  px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold gap-x-5`}
          >
            Resend Email
          </button>
        </div>
      )} */}

      {/* {!canResendEmail && (
        <div className="flex justify-center items-center mt-5">
          <p className="text-pry-color"> Resend email in {seconds} seconds</p>
        </div>
      )} */}
    </div>
  );

  function concealEmail(emailToConceal) {
    // Split the emailToConceal address into local part and domain part
    const parts = emailToConceal.split("@");
    if (parts.length === 2) {
      const localPart = parts[0];
      const domainPart = parts[1];

      // Keep the first two characters of the local part and replace the rest with asterisks
      const obfuscatedLocalPart = localPart.substring(0, 2) + "*********";

      // Split the domain part by the dot
      const domainParts = domainPart.split(".");

      // Replace the characters before the dot with asterisks
      const obfuscatedDomainPart =
        domainParts.length > 1
          ? "*****" + domainPart.substring(domainParts[0].length)
          : domainPart;

      // Combine the obfuscated local part and the obfuscated domain part to form the hidden emailToConceal
      return obfuscatedLocalPart + "@" + obfuscatedDomainPart;
    }

    // Return the original emailToConceal if it doesn't follow the expected format
    return emailToConceal;
  }

  
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

export default ContinueToVerifyEmail;
