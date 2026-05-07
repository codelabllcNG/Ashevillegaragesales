import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function ForgotPassword() {
  const { email, setEmail, phone, setPhone } = AllCtx();
  // const { email, setEmail } = useState("");
  const [connecting, setConnecting] = useState(false);
  const [passwordResponse, setPasswordResponse] = useState("");

  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      if (secureLocalStorage.getItem("user")?.status === "inactive") {
        router.push("/email-verification", "signup");

        return;
      }

      router.push("/");
    }
  }, []);

  const router = useRouter();

  async function requestOTP(e) {
    e.preventDefault();
    // return;
    const dataToSend = {
      email: email,
    };

    if (!email || email.trim() === "") {
      setPasswordResponse("Email cannot be empty!");
      // console.log(dataToSend);
      return;
    }

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(validEmailRegex)) {
      setPasswordResponse("Invalid email format!");
      return;
    }

    // console.log(dataToSend);

    // return;

    try {
      setPasswordResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/forget-password`,
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
        setPasswordResponse(data.message);
        // console.log(data.message);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setPasswordResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      console.log(data);
      // setConnecting(false);
      // return;

      router.push("/confirm-otp", "forgot-password");

      setConnecting(false);
      setPasswordResponse("");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setPasswordResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  return (
    <form className="px-3 sm:px-8 lg:px-[5rem] mt-24">
      <h1 className="text-center text-4xl font-bold">Forgot password</h1>

      {/* //> Phone  */}
      {/* <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="phone">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            //   inputComponent="textarea"

            international
            // country="US"
            // defaultCountry="US"
            countryCallingCodeEditable={true}
            className=" border-gray-400  rounded py-2 px-3 text-xl font-medium placeholder:text-gray-400 border text-black"
            // placeholder="Phone"
            value={phone}
            onChange={setPhone}
          />
        </div>
      </div> */}

      {/* //> Email Address  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="fullname">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            name="email"
            id="email"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="The email address registered with us."
          />
        </div>
      </div>

      {/* //> Response */}
      <div
        className={`${
          passwordResponse ? "flex" : "hidden"
        } justify-center items-center mt-5`}
      >
        <p
          // type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
        >
          {passwordResponse}
        </p>
      </div>

      {/* //> Send OTP */}
      <div className="flex justify-center items-center mt-9">
        <button
          disabled={connecting}
          onClick={(e) => {
            requestOTP(e);
          }}
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Send OTP
        </button>
      </div>

      {/* //> Resend OTP */}
      {/* <div className="flex justify-center items-center mt-9">
        <button
          type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-pry-color bg-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80  font-medium "
        >
          Resend OTP
        </button>
      </div> */}
    </form>
  );
}

export default ForgotPassword;
