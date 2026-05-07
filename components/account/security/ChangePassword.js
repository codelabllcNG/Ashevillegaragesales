import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function ChangePassword() {
  const {
    selectedAccountTab,
    accountTitle,
    accountTabChild,
    setAccountTabChild,
    setUser,
    user,
    userToken,
    triggerAlert,
    setSelectedAccountTab
  } = AllCtx();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [gender, setGender] = useState(user?.gender);
  const [DOB, setDOB] = useState(user?.dob);
  const [DP, setDP] = useState("");

  const [passwordResponse, setPasswordResponse] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  function handlePasswordChange({ password, e }) {
    setNewPassword(e.target.value);
    // Define a regex pattern to match your criteria
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Use the test method to check if the password matches the pattern
    const isValid = passwordPattern.test(password);
    isValid ? setValidPassword(true) : setValidPassword(false);
  }

  async function changePassword(e) {
    e.preventDefault();

    const dataToSubmit = {
      old_password: currentPassword,
      new_password: newPassword,
      l: confirmPassword,
    };

    if (
      !currentPassword ||
      currentPassword.trim() === "" ||
      !newPassword ||
      newPassword.trim() === ""
    ) {
      setPasswordResponse("All fields are important.");

      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordResponse("Password does not match.");

      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      setPasswordResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/change-password`,
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

      // return;

      setConnecting(false);
      setPasswordResponse("");
      setSelectedAccountTab("my_account");
      triggerAlert({
        message: "Password updated successfully!",
        color: "green",
      });
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setPasswordResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  const listContainerRef = useRef(null);
  useEffect(() => {
   
    // Scroll to the top of the list when the currentPage changes
    if (listContainerRef.current) {
      // console.log("lofff");
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ selectedAccountTab]);

  return (
    <div ref={listContainerRef} className="mt-8  w-full scroll-mt-56">
      <div className="mt-5 flex items-center justify-center w-full">
        <div className="md:w-[80%] py-5 border rounded-md px-5 border-gray-400 ">
          <p className=" text-xl font-medium text-center">Account Security</p>

          {/* //> Current Password  */}
          <div className="flex justify-center items-center mt-5">
            <div
              className="w-[95%]
          flex flex-col"
            >
              <label htmlFor="current_password">
                Old Password <span className="text-red-500">*</span>
              </label>
              <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
                <input
                  // value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                  required
                  type={showPassword ? "text" : "password"}
                  name="current_password"
                  id="current_password"
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

          {/* //> New Password  */}
          <div className="flex justify-center items-center mt-5">
            <div
              className="w-[95%]
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

          {/* //> Confirm New Password  */}
          <div className="flex justify-center items-center mt-5">
            <div
              className="w-[95%]
          flex flex-col"
            >
              <label htmlFor="confirm_new_password">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
                <input
                  // value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                  type={showPassword ? "text" : "password"}
                  name="confirm_new_password"
                  id="confirm_new_password"
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
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md  px-20    font-medium "
        >
          {passwordResponse}
        </p>
      </div>

      {/* //> Edit Button */}
      <div className="mt-5 flex items-center justify-center w-full">
        <div className="md:w-[80%] flex justify-between items-center gap-x-5">
          <button
            disabled={!validPassword}
            onClick={(e) => {
              changePassword(e);
            }}
            className="w-full bg-pry-color duration-300 hover:bg-opacity-80 rounded-md py-4
           flex items-center justify-center text-white gap-x-2 text-sm font-semibold"
          >
            {/* <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />{" "} */}
            Save Information
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
