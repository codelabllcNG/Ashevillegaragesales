import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function ConfirmOTP() {
  const router = useRouter();

  const { email, setEmail, phone, setPhone } = AllCtx();

  const [showPassword, setShowPassword] = useState(false);
  const [canRequestOTP, setCanRequestOTP] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [OTPresponse, setOTPresponse] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);

  // //>Redirect if logged in
  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      if (secureLocalStorage.getItem("user")?.status === "inactive") {
        router.push("/email-verification", "signup");

        return;
      }

      router.push("/");
    }
  }, []);

  //   useEffect(() => {
  //     canRequestOTP ?  resendOTP({ setConnecting, setSeconds, setCanRequestOTP }) : null;
  // },[])

  useEffect(() => {
    let interval;

    if (!canRequestOTP) {
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
  }, [canRequestOTP, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setCanRequestOTP(true);
    }
  }, [seconds]);

  const otpInputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/) && index >= 0 && index < OTP.length) {
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);
      // console.log(newOTP.join(""));

      // Move focus to the next input field
      if (index < OTP.length - 1 && value !== "") {
        otpInputs.current[index + 1].focus();
      }
    } else if (value === "" && index > 0 && index < OTP.length) {
      // Handle backspace to focus on the previous input
      otpInputs.current[index - 1].focus();
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);
      // console.log(newOTP.join(""));
    }
  };

  async function confirmOTP(e) {
    e.preventDefault();
    // console.log(OTP);
    // return;
    const dataToSend = {
      type: "email",
      email: email,
      pin: OTP.join(""),
    };

    if (!email || email.trim() === "") {
      router.push("/forgot-password");

      return;
    }

    if (!OTP || OTP.join("").trim() === "" || OTP.join("").length < 6) {
      router.push("/forgot-password");

      return;
    }

    // console.log(dataToSend);

    // return;

    try {
      setOTPresponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/confirm-pin`,
        {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        setOTPresponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setOTPresponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);
      // setConnecting(false);
      // return;
      setEmail(data.user_email);

      router.push("/reset-password", "forgot-password");

      setConnecting(false);
      setOTPresponse(data.message);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setOTPresponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  return (
    <form className="px-3 sm:px-8 lg:px-[5rem] mt-24">
      <h1 className="text-center text-4xl font-bold">Enter OTP</h1>
      <p className="mt-9 text-center text-gray-500">
        Enter the OTP sent to {concealEmail(email)}
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
            {OTP.map((item, i) => (
              <input
                key={i}
                type="text"
                name="otp"
                id="otp"
                className="rounded-md w-[15%] p-2 h-12 focus:ring-0 text-center"
                placeholder="-"
                onChange={(e) => {
                  handleChange(e, i);
                }}
                ref={(input) => (otpInputs.current[i] = input)}
                maxLength="1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* //> Response */}
      <div
        className={`${
          OTPresponse ? "flex" : "hidden"
        } justify-center items-center mt-5`}
      >
        <p
          // type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
        >
          {OTPresponse}
        </p>
      </div>

      {/* //> Submit */}
      <div className="flex justify-center items-center mt-9">
        <button
          disabled={connecting || OTP.join("").length < 6}
          onClick={(e) => {
            confirmOTP(e);
            // router.push("/recover-password", "login");
          }}
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Submit
        </button>
      </div>

      {/* //> Request OTP*/}
      {canRequestOTP && (
        <div className="flex justify-center items-center mt-9">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/forgot-password");
            }}
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry- text-pry-color rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
          >
            Request OTP
          </button>
        </div>
      )}

      {/* //> Resend OTP */}
      {/* <div className="flex justify-center items-center mt-9">
        <button
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center  bg-white text-gray-500 rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 "
        >
          Resend OTP in <span className="text-pry-color ml-1"> 0:45</span>
        </button>
      </div> */}

      {!canRequestOTP && (
        <div className="flex justify-center items-center mt-9">
          <p className="text-pry-color">
            {" "}
            You can request OTP in {seconds} seconds
          </p>
        </div>
      )}
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
}

export default ConfirmOTP;
