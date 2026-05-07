import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import logo from "@/public/images/Asset 2@4x.png";

function Footer() {
  const router = useRouter();
  const { setSelectedNavLink, triggerAlert } = AllCtx();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [sending, setSending] = useState(false);

  const subscribe = async (e) => {
    // return
    // e.preventDefault();

    if (!newsletterEmail || newsletterEmail.trim() === "") {
      triggerAlert({ message: "Email cannot be empty!", color: "red" });
      // console.log(dataToSubmit);
      return;
    }

    const dataToSubmit = {
      email: newsletterEmail,
    };

    console.log(dataToSubmit);

    // return;

    try {
      // setNewsletterResponse("Please wait...");
      setSending(true);
      const response = await fetch("/api/subscribe", {
        // mode: "no-cors",
        method: "POST",
        body: JSON.stringify(dataToSubmit),
        headers: {
          "Content-Type": "application/json",
          Authorization: `api_key ${process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        triggerAlert({ message: data.message, color: "red" });
        // console.log(response);
        console.log("Response not OK");
        // console.log(data);
        setSending(false);
        return;
      }
      // console.log(response);

      // return;

      triggerAlert({
        message: data.message,
        color: "green",
      });
      setSending(false);
      // setNewsletterResponse("");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      triggerAlert({ message: "An error occurred!", color: "red" });
      setSending(false);
    }
  };

  return (
    <div className="mt-24 sm:mt-32 px-3 sm:px-8 lg:px-[5rem] py-3 sm:py-8 lg:py-[5rem]  bg-black text-white">
      <div className="  justify-between md:flex gap-x-10 items-  pt">
        <div className="md:w-[30%]">
          <div className={`cursor-pointer w-[212px] h-[89px]   relative `}>
            <Image
              src={logo}
              // src="/images/logo.svg"

              // src="/images/Asset 1@4x.png"
              alt="Logo"
              // width={140}
              // height={50}
              fill
            />
          </div>

          <p className="mt-6 text-gray-300">
            Summer&apos;s Here at Asheville Garage Sales! Get exclusive deals
            and find unique treasures today!
          </p>

          <div
            disabled={sending}
            className="border mt-2 rounded-md px-2 flex items-center justify-between"
          >
            <input
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
              }}
              type="text"
              placeholder="Enter your email"
              name="newsletter"
              id="newsletter"
              className="w-full rounded-md bg-transparent border-none focus:ring-0"
            />

            <div className="flex items-center justify-center p-2 rounded-md bg-green-400">
              <IoIosSend
                onClick={() => {
                  subscribe();
                }}
                className="min-w-8 min-h-8 text-white cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2  xl:grid-cols-3 gap-10 mt-8 md:mt-0">
          {/*  //> Company */}
          <div className="w-max">
            <p className="text-xl sm:text-[2rem] font-medium">Company</p>
            <div className="cursor-pointer select-none flex items-center gap-x-3 mt-4">
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p
                onClick={() => {
                  router.push("/");
                }}
                className="text-gray-300 sm:text-xl"
              >
                Home
              </p>
            </div>

            <div className="cursor-pointer select-none flex items-center gap-x-3 mt-4 ">
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p
                onClick={() => {
                  router.push("/about-us");
                }}
                className="text-gray-300 sm:text-xl"
              >
                About us
              </p>
            </div>

            <div className="cursor-pointer select-none flex items-center gap-x-3 mt-4">
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p
                onClick={() => {
                  setSelectedNavLink("products");
                  router.push("/#categories");
                }}
                className="text-gray-300 sm:text-xl"
              >
                Products
              </p>
            </div>

            {/* <div className="cursor-pointer select-none flex items-center gap-x-3 mt-4">
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p className="text-gray-300 sm:text-xl">Investors</p>
            </div> */}
          </div>

          {/*  //> Resources */}
          <div className="w- sm:w-max ">
            <p className="text-xl sm:text-[2rem] font-medium">Resources</p>
            <div className="cursor-pointer select-none flex items-center gap-x-3 mt-4">
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p
                onClick={() => {
                  router.push("/#how-it-works");
                }}
                className="text-gray-300 sm:text-xl"
              >
                How it works
              </p>
            </div>

            <div
              onClick={() => {
                router.push("/terms-and-conditions");
              }}
              className="cursor-pointer select-none flex items-center gap-x-3 mt-4"
            >
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p className="text-gray-300 sm:text-xl">Terms and conditions</p>
            </div>

            <div
              onClick={() => {
                router.push("/privacy-and-policy");
              }}
              className="cursor-pointer select-none flex items-center gap-x-3 mt-4"
            >
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p className="text-gray-300 sm:text-xl">Privacy Policy</p>
            </div>
          </div>

          {/*  //> Help */}
          <div className="w-max ">
            <p className="text-xl sm:text-[2rem] font-medium">Help</p>
            <div
              onClick={() => {
                router.push("/faq");
              }}
              className="cursor-pointer select-none flex items-center gap-x-3 mt-4"
            >
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p className="text-gray-300 sm:text-xl">FAQs</p>
            </div>

            <div
              onClick={() => {
                router.push("/contact-us");
              }}
              className="cursor-pointer select-none flex items-center gap-x-3 mt-4 "
            >
              <div className="bg-green-400 rounded-full p-[3px]"></div>{" "}
              <p className="text-gray-300 sm:text-xl">Contact us</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-8" />

      <div className="sm:flex space-y-3 sm:space-y-0 py-8 justify-between items-center">
        <p className="text-base font-light text-gray-300">
          Copyright &copy; {new Date().getFullYear()} Asheville Garage Sales{" "}
        </p>

        <div className="flex gap-x-3 items-center text-gray-300">
          We Accept{" "}
          <Image
            className=""
            alt="Payment methods"
            src="/images/payment.png"
            width={225}
            height={33}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default Footer;
