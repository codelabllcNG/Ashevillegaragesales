import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function EditInformation() {
  const datePickerRef = useRef();

  const {
    selectedAccountTab,
    accountTitle,
    accountTabChild,
    setAccountTabChild,
    setUser,
    user,
    userToken,
    triggerAlert,
  } = AllCtx();

  const [phone, setPhone] = useState(user?.phone_number);
  const [lastName, setLastName] = useState(user?.last_name);
  const [firstName, setFirstName] = useState(user?.first_name);
  // const [email, setEmail] = useState("");
  const [gender, setGender] = useState(user?.gender);
  const [DOB, setDOB] = useState(user?.dob);
  const [DP, setDP] = useState(
    user?.img && user?.img !== "none" ? user?.img : "/images/profile-dp.webp"
  );

  const [updateResponse, setUpdateResponse] = useState("");
  const [connecting, setConnecting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const base64FileConverter = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        // console.log(reader);
      };
      reader.onerror = (error) => {
        reject(error);
        // console.log(error);
      };
    });

  async function editProfile(e) {
    e.preventDefault();

    const dataToSubmit = {
      fullname: `${firstName} ${lastName}`,
      phone_number: phone,
      dob: DOB,
      gender: gender,
      address: "",
      country: "",
      state: "",
      profile_picture: DP,
    };

    if (
      !firstName ||
      firstName.trim() === "" ||
      !lastName ||
      lastName.trim() === "" ||
      !phone ||
      phone.trim() === ""
    ) {
      setUpdateResponse(
        "First Name, Last Name, and Phone Number fields must be filled."
      );
      // console.log(dataToSubmit);
      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      setUpdateResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/update-user`,
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
        setUpdateResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setUpdateResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);

      // return;

      setUser(data.user_details);
      secureLocalStorage.setItem("user", data.user_details);
      setConnecting(false);
      setUpdateResponse("");
      setAccountTabChild("");
      triggerAlert({
        message: "Profile updated successfully!",
        color: "green",
      });
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setUpdateResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  return (
    <div className=" w-full">
      <div className="mt-5 flex items-center justify-center w-full">
        <div className="w-full py-5 border rounded-md px-5 border-gray-400">
          <p className=" text-xl font-medium text-center">
            Personal Detail Form
          </p>

          <div className="mt-5 flex justify-center ">
            <div className="flex items-center w-full   space-x-5">
              {/* Image upload button  */}
              <div className="w-full  justify-between flex  space-x-1">
                <div className="rounded-full flex justify-center items-center relative h-[100px] w-[100px]">
                  <Image
                    // unoptimized
                    alt="DP"
                    src={
                      DP
                        ? DP
                        : user?.img && user?.img !== "none"
                        ? user?.img
                        : "/images/profile-dp.webp"
                    }
                    // width={100}
                    // height={100}
                    fill
                    className="rounded-full"
                  />
                </div>
                <label className="flex flex-col items-center text-center cursor-pointer ">
                  <div className="w-full  h-28   rounded-md duration-200 flex flex-col justify-center items-center text-gray-500 ">
                    <p className="text-pry-gray text-xs">
                      Upload display picture
                    </p>
                    <p className="text-white  border mt-2 bg-pry-color hover:bg-opacity-80 px-5 py-1 rounded-md  duration-300">
                      Pick A Photo
                    </p>
                  </div>
                  <div className="  w-full   ">
                    {" "}
                    <input
                      // required
                      // value={DP}
                      onChange={async (e) => {
                        if (!e.target.files[0]) {
                          setUpdateResponse("You are yet to pick a file.");
                          return;
                        }
                        if (
                          e.target.files[0].type !== "image/png" &&
                          e.target.files[0].type !== "image/jpeg" &&
                          e.target.files[0].type !== "image/webp"
                        ) {
                          setUpdateResponse(
                            "Only png, jpg, and webp formats are allowed."
                          );
                          return;
                        }

                        const base64Image = await base64FileConverter(
                          e.target.files[0]
                        );
                        setDP(base64Image);
                        // console.log(a);
                      }}
                      // defaultValue={nationalID}
                      accept=".jpg,.png,.webp, .jpeg"
                      type="file"
                      className={` file:hidden text-xs sm:text-sm mt-2 w-full  text-transparent`}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:flex items-center justify-between gap-x-5">
            {/* //> First Name */}
            <div className="flex justify-center items-center lg:w-1/2 mt-5">
              <div className=" w-full flex flex-col">
                <label htmlFor="first_name" className="font-medium">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value.replace(/\s/g, ""));
                  }}
                  required
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                  placeholder="John"
                />
              </div>
            </div>

            {/* //> Last Name */}
            <div className="flex justify-center items-center lg:w-1/2 mt-5">
              <div className=" w-full flex flex-col">
                <label htmlFor="last_name" className="font-medium">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value.replace(/\s/g, ""));
                  }}
                  required
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                  placeholder="Sturgis"
                />
              </div>
            </div>
          </div>

          <div className="lg:flex items-center justify-between gap-x-5">
            {/* //> Phone  */}
            <div className="flex justify-center items-center w-full mt-5">
              <div className="w-full flex flex-col">
                <label htmlFor="phone">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <PhoneInput
                  //   inputComponent="textarea"
                  required
                  international
                  // country="US"
                  defaultCountry="NG"
                  countryCallingCodeEditable={true}
                  className=" border-gray-400  rounded py-2 px-3 text-xl font-medium placeholder:text-gray-400 border"
                  // placeholder="Phone"
                  value={phone}
                  onChange={setPhone}
                />
              </div>
            </div>

            {/* //> Email */}
            {/* <div className="flex justify-center items-center lg:w-1/2 mt-5">
              <div className=" w-full flex flex-col">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                  placeholder="example@gmail.com"
                />
              </div>
            </div> */}
          </div>

          <div className="lg:flex items-center justify-between gap-x-5">
            {/* //> Gender*/}
            <div className="flex justify-center items-center lg:w-1/2 mt-5">
              <div className=" w-full flex flex-col">
                <label htmlFor="gender" className="font-medium">
                  Gender
                </label>
                <select
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  name="gender"
                  id="gender"
                  className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                  placeholder=""
                >
                  <option value={gender ? gender : "Others"}>
                    {gender ? gender : "Others"}
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  {/* <option value="Others">Others</option> */}
                </select>
              </div>
            </div>

            {/* //> DOB*/}
            <div className="flex justify-center items-center lg:w-1/2 mt-5">
              <div className=" w-full flex flex-col">
                <label htmlFor="dob" className="font-medium">
                  Date of Birth
                </label>
                <input
                  ref={datePickerRef}
                  onFocus={() => {
                    datePickerRef.current.showPicker();
                  }}
                  value={DOB}
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                  max={today}
                  type="date"
                  name="dob"
                  id="dob"
                  className="border-gray-400 w-full rounded py-4 text-sm font-medium placeholder:text-gray-400"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //> Response */}
      <div
        className={`${
          updateResponse ? "flex" : "hidden"
        } justify-center items-center mt-5`}
      >
        <p
          // type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md  px-20    font-medium "
        >
          {updateResponse}
        </p>
      </div>

      {/* //> Edit Button */}
      <div className="mt-5 flex items-center justify-center w-full">
        <div className="lg:w-[80%] w-[98%] flex justify-between items-center gap-x-5">
          <button
            onClick={(e) => {
              editProfile(e);
            }}
            className="w-full bg-pry-color duration-300 hover:bg-opacity-80 rounded-md py-3
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

export default EditInformation;
