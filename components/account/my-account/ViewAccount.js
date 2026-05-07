import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

function ViewAccount() {
  const {
    selectedAccountTab,
    accountTitle,
    accountTabChild,
    setAccountTabChild,
    setAccountMobileNav,
    setDeliveryAddressArray,
    deliveryAddressArray,
    user,
    userToken,
    setUserToken,
    setUser,
    formatDOB,
  } = AllCtx();

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // console.log(formatDOB(user?.dob));
      try {
        // setLoginResponse("Please wait...");
        setFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-profile`,
          {
            headers: {
              "Content-Type": "application/json",
              usertoken: secureLocalStorage.getItem("userToken"),
              useremail: secureLocalStorage.getItem("user")?.email,
            },
          }
        );

        const data = await response.json();

        if (data.status === "fail") {
          // setLoginResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          setFetching(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetching(false);
          return;
        }
        // console.log(data);

        // return;

        setUser(data.user_details);
        // setUserToken(data.security.token);
        secureLocalStorage.setItem("user", data.user_details);
        // secureLocalStorage.setItem("userToken", data.security.token);
        setFetching(false);
        // setLoginResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetching(false);
      }
    }
    if (user) {
      fetchData();
    }
  }, ["reload"]);

  return (
    <div className="flex justify-center items-center">
      <div className=" border lg:w-[80%] w-[98%] px-10 py-5 mt-10 rounded-md">
        {/* //>Image part */}
        <div className=" flex items-center justify-between w-full ">
          <div className=" rounded-md w-full  sm:py-5 ">
            <div className="sm:flex-row flex flex-col justify-between items-center gap-x-5">
              <div className=" w-[100px] h-[100px] relative flex sm:block justify-center items-center rounded-full bg-gray-200">
                {" "}
                <Image
                  className="rounded-full"
                  alt="Profile DP"
                  src={`${
                    user?.img && user?.img !== "none"
                      ? user?.img
                      : "/images/profile-dp.webp"
                  }`}
                  // width={100}
                  // height={100}
                  fill
                />{" "}
              </div>

              <div className="w-fit flex sm:block mt-3 sm:mt-0 justify-center items-center">
                <div className="flex justify-center items-center gap-x-2">
                  {/* <button className="bg-white duration-300  px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Remove Photo
                </button> */}
                  <button
                    onClick={() => {
                      setAccountTabChild("edit_information");
                    }}
                    className="bg-pry-color duration-300 hover:bg-opacity-80 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap text-white"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //>name */}
        <div className="mt-10 flex items-center justify-center w-full">
          <div className="w-full flex justify-between items-center gap-x-5">
            <p className="text-sm font-semibold">Name</p>
            <p>
              {user?.first_name} {user?.last_name.toUpperCase()}
            </p>
          </div>
        </div>
        {/* //> email */}
        <div className="mt-5 flex items-center justify-center w-full">
          <div className="w-full flex justify-between items-center gap-x-5">
            <p className="text-sm font-semibold">Email</p>
            <p>{user?.email}</p>
          </div>
        </div>

        {/* //> phone */}
        <div className="mt-5 flex items-center justify-center w-full">
          <div className="w-full flex justify-between items-center gap-x-5">
            <p className="text-sm font-semibold">Phone</p>
            <p>{user?.phone_number ? user?.phone_number : "N/A"}</p>
          </div>
        </div>

        {/* //> gender */}
        <div className="mt-5 flex items-center justify-center w-full">
          <div className="w-full flex justify-between items-center gap-x-5">
            <p className="text-sm font-semibold">Gender</p>
            <p>{user?.gender || "N/A"}</p>
          </div>
        </div>

        {/* //> DOB */}
        <div className="mt-5 flex items-center justify-center w-full">
          <div className="w-full flex justify-between items-center gap-x-5">
            <p className="text-sm font-semibold">Date of Birth</p>
            <p>
              {user?.dob
                ? !user?.dob.includes("/")
                  ? formatDOB(user?.dob)
                  : "N/A"
                : "N/A"}
            </p>
          </div>
        </div>

        {/* //> Edit Button */}
        <div className="mt-8 flex items-center justify-center w-full">
          <div className="w-full flex justify-between items-center gap-x-5">
            <button
              onClick={() => {
                setAccountTabChild("edit_information");
              }}
              className="w-full bg-pry-color duration-300 hover:bg-opacity-80 rounded-md py-3
           flex items-center justify-center text-white gap-x-2 text-sm font-semibold"
            >
              <Icon
                icon="material-symbols:edit"
                className="w-4 h-4 text-white"
              />{" "}
              Edit Information{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAccount;
