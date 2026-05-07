import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function Verified() {
  const {
    phone,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    setUser,
  } = AllCtx();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      if (secureLocalStorage.getItem("user")?.status === "inactive") {
        router.push("/email-verification", "signup");
        // console.log(secureLocalStorage.getItem("user")?.email_verified);
        return;
      }

      // if (secureLocalStorage.getItem("user")?.status === "active") {
      //   router.push("/");
      //   return;
      // }

      // setUserToken(secureLocalStorage.getItem("userToken"));
      // console.log(secureLocalStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div className="px-3 sm:px-8 lg:px-[5rem] mt-5">
      <h1 className="text-center text-4xl font-bold">You are verified</h1>
      <p className="mt-5 text-center text-gray-500">
      Now you can start enjoying great deals.
      </p>

      <div className="flex justify-center items-center my-12">
        <Image
          className=""
          alt="Verification Image"
          src="/images/verified_illustration.png"
          width={300}
          height={200}
        />
      </div>

      {/* //> Continue */}
      <div className="flex justify-center items-center mt-9 gap-x-5">
        <button
          onClick={(e) => {
            router.replace("/");
          }}
          className="
          flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-10 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Browse Items
        </button>

        <button
          onClick={(e) => {
            router.replace("/cart");
          }}
          className="
          flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-5 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Goto Cart
        </button>
      </div>
    </div>
  );
}

export default Verified;
