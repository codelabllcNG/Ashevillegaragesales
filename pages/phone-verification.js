import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function PhoneVerification() {
  const {
    email,
    userToken,
    user,
    setUser,
    regResponse,
    setUserToken,
    setRegResponse,
    resendOTP,
  } = AllCtx();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // const [code, setOTP] = useState("");

  const [OTP, setOTP] = useState("");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!secureLocalStorage.getItem("user")) {
      router.push("/login");
    }
  }, []);

  const [seconds, setSeconds] = useState(120);
  const [canResendCode, setCanResendCode] = useState(false);

  useEffect(() => {
    canResendCode
      ? resendOTP({ setConnecting, setSeconds, setCanResendCode, type: "phone", sendTo: user?.phone_number })
      : null;
  }, []);

  useEffect(() => {
    let interval;

    if (!canResendCode) {
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
  }, [canResendCode, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setCanResendCode(true);
    }
  }, [seconds]);

  async function verifyPhone(e) {
    e.preventDefault();

    const dataToSubmit = {
      type: "phone",
      code: OTP,
    };

    // console.log(dataToSubmit);
    // return

    if (!OTP || OTP.trim() === "") {
      setRegResponse("OTP cannot be blank.");
      // console.log(dataToSubmit);
      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      setRegResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/verify-otp`,
        {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        setRegResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setRegResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);
      setConnecting(false);
      // return;

      setUser(data.user_info);
      setUserToken(data.security.token);
      secureLocalStorage.setItem("user", data.user_info);
      secureLocalStorage.setItem("userToken", data.security.token);
      setConnecting(false);
      setRegResponse("");
      router.push("/verified", "signup");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setRegResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  return (
    <form onSubmit={verifyPhone} className="px-3 sm:px-8 lg:px-[5rem] mt-24">
      <h1 className="text-center text-4xl font-bold">
        Enter Authentication Code
      </h1>
      <p className="mt-9 text-center text-gray-500">
        Enter the 6-digit code we just sent to your phone number
      </p>

      <p className="mt-3 text-center text-gray-500">
        Incorrect phone number?{" "}
        <span
          onClick={() => {
            secureLocalStorage.removeItem("userToken");
            secureLocalStorage.removeItem("user");
            setUserToken("");
            setUser(null);
            router.push("/signup");
          }}
          className="underline cursor-pointer text-blue-400"
        >
          Click here to edit
        </span>{" "}
        OR{" "}
        <span
          onClick={() => {
            secureLocalStorage.removeItem("userToken");
            secureLocalStorage.removeItem("user");
            setUserToken("");
            setUser(null);
            router.push("/login");
          }}
          className="underline cursor-pointer text-blue-400"
        >
          Log in with another account.
        </span>
      </p>

      {/* //> Code  */}
      <div className="flex justify-center items-center mt-10">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="fullname">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            required
            type="text"
            name="code"
            id="code"
            className="border-gray-400 border focus:border-none  rounded py-4 font-medium focus:ring-pry-color placeholder:text-gray-400"
            // placeholder="example@gmail.com"
          />
        </div>
      </div>

      {/* //> Response */}
      <div
        className={`${
          regResponse ? "flex" : "hidden"
        } justify-center items-center mt-5`}
      >
        <p
          // type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
        >
          {regResponse}
        </p>
      </div>

      {/* //> Continue */}
      <div className="flex justify-center items-center mt-9">
        <button
          // type="button"
          disabled={!OTP || connecting}
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Continue
        </button>
      </div>

      {/* //> Resend code */}
      {canResendCode && (
        <div className="flex justify-center items-center mt-9">
          <button
            type="button"
            onClick={() => {
              resendOTP({ setConnecting, setSeconds, setCanResendCode, type: "phone", sendTo: user?.phone_number });
            }}
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-pry-color bg-white rounded-md  px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
          >
            Resend Code
          </button>
        </div>
      )}

      {!canResendCode && (
        <div className="flex justify-center items-center mt-9">
          <p className="text-pry-color"> Resend OTP in {seconds} seconds</p>
        </div>
      )}
    </form>
  );
}

export default PhoneVerification;
