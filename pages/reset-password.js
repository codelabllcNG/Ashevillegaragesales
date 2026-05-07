import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function ResetPassword() {
  const { setUser, triggerAlert, setEmail, email } = AllCtx();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordResponse, setPasswordResponse] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

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

  async function resetPassword(e) {
    e.preventDefault();
    // console.log(OTP);
    // return;
    const dataToSend = {
      password: password,
      email: email,
    };

    if (!email || email.trim() === "") {
      router.push("/forgot-password");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordResponse("Password does not match.");
      return;
    }

    // console.log(dataToSend);

    // return;

    try {
      setPasswordResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/reset-password`,
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
        // console.log(data);
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
      // console.log(data);
      // setConnecting(false);
      // return;
      setEmail("");

      triggerAlert({ message: "Password reset successfully!", color: "green" });
      router.push("/login");

      setConnecting(false);
      setPasswordResponse(data.message);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setPasswordResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  function handlePasswordChange({ password, e }) {
    setPassword(e.target.value);
    // Define a regex pattern to match your criteria
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Use the test method to check if the password matches the pattern
    const isValid = passwordPattern.test(password);
    isValid ? setValidPassword(true) : setValidPassword(false);
  }

  return (
    <form className="px-3 sm:px-8 lg:px-[5rem] mt-24">
      <p className="text-lg text-center">RECOVER PASSWORD</p>
      <h1 className="text-center text-4xl font-bold">Enter you new password</h1>

      {/* //> Password  */}
      {/* <div className="flex justify-center items-center mt-10">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="border-none w-full focus:ring-0  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="****************************"
            />{" "}
            {showPassword ? (
              <FaRegEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div> */}
      {/* //> New Password  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
              sm:w-[80%] lg:w-[60%]
          flex flex-col"
        >
          <label htmlFor="new_password">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
            <input
              // value={newPassword}
              onChange={(e) => {
                handlePasswordChange({ password: e.target.value, e });
              }}
              required
              type={showPassword ? "text" : "password"}
              name="new_password"
              id="new_password"
              className="border-none w-full focus:ring-0  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="****************************"
            />{" "}
            {showPassword ? (
              <FaRegEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            )}
          </div>
          {validPassword && (
            <p className="text-green-600 font-medium text-sm">
              Strong password!
            </p>
          )}

          {!validPassword && (
            <p className="text-red-600 font-medium text-xs">
              Password must contain at least an upper case, a lower case, a
              number, and minimum of eight characters long.
            </p>
          )}
        </div>
      </div>

      {/* //> Confirm Password  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="confirm_password">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              className="border-none w-full focus:ring-0  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="****************************"
            />{" "}
            {showPassword ? (
              <FaRegEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            )}
          </div>
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

      {/* //> Continue*/}
      <div className="flex justify-center items-center mt-10">
        <button
          disabled={connecting}
          onClick={(e) => {
            resetPassword(e);
          }}
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
}

export default ResetPassword;
