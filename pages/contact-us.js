import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

function ContactUs() {
  const {
    userToken,
    user,
    setSearchSuggestionList,
    setUserDropdown,
    setHelpDropdown,
  } = AllCtx();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [contactUsResponse, setContactUsResponse] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    const dataToSubmit = {
      name: name,
      phone: phone,
      email: email,
      message: message,
    };

    // console.log(dataToSubmit);

    // return;

    try {
      setContactUsResponse("Please wait...");
      setSendingMessage(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/contact-us`,
        {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        setContactUsResponse(data.message);
        // console.log(data.message);
        console.log("An error occurred.");
        setSendingMessage(false);
        return;
      }

      if (!response.ok) {
        setContactUsResponse("Something went wrong, retry!");
        console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setSendingMessage(false);
        return;
      }
      console.log(data);

      // return

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      setSendingMessage(false);
      setContactUsResponse("Message sent successfully!");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setContactUsResponse("An error occurred, retry.");
      setSendingMessage(false);
    }
  }

  return (
    <div
      onClick={() => {
        setUserDropdown(false);
        setHelpDropdown(false);
        setSearchSuggestionList([]);
      }}
      className="px-3 sm:px-8 lg:px-[5rem] pt-10   "
    >
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Shop premium items for less! From home essentials to kids' games; Asheville Garage Sales offers unbeatable deals. Send us a message and we'll attend to it immediately"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-[1.375rem] sm:text-[2.12rem] font-semibold text-center">
        Contact Us
      </h1>
      <h2 className="sm:text-xl text-center">
        Send us a message and we&apos;ll attend to it immediately
      </h2>

      <div className="mt-10 md:flex justify-between ">
        {/* //>Left */}
        <div className="md:w-1/2  p-3 flex flex-col justify-between gap-y-10 bg-pry-color text-white rounded-l-md rounded-r-md md:rounded-r-none">
          <p className="font-bold text-xl md:text-2xl">Contact Information</p>
          <div className="space-y-5">
            <div className="flex gap-x-3 items-center">
              <Icon icon="fluent:location-20-regular" className="w-7 h-7" />
              <div>
                <p className="text-lg">Location</p>
                <p className="mt-2 text-lg font-medium">
                8425 Old Statesville Rd Charlotte, NC 28269
                </p>
              </div>
            </div>

            <div className="flex gap-x-3 items-center">
              <Icon icon="iconamoon:email-thin" className="w-7 h-7" />
              <div>
                <p className="text-lg">Email Address</p>
                <Link
                  className="mt-2 underline text-lg font-medium"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="mailto:contact@ashevillegaragesales.com"
                >
                  contact@ashevillegaragesales.com
                </Link>
              </div>
            </div>

            <div className="flex gap-x-3 items-center">
              <Icon icon="ph:phone-call-thin" className="w-7 h-7" />
              <div>
                <p className="text-lg">Phone Number</p>
                <Link
                  className="mt-2 underline text-lg font-medium"
                  href="tel:+17046591055"
                >
                  {" "}
                  +1 704-659-1055{" "}
                </Link>
              </div>
            </div>
          </div>

          <p className="text-lg">
            For any inquiries or support, our team is ready to assist. Reach out
            via our Contact Form or drop us an email at <br />{" "}
            <Link
              className=" underline"
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:contact@ashevillegaragesales.com"
            >
              contact@ashevillegaragesales.com
            </Link>{" "}
          </p>
        </div>

        {/* //>Right */}
        <form
          onSubmit={sendMessage}
          className="md:w-1/2 border space-y-8 rounded-r-md p-5"
        >
          {/* //> Name */}
          <div className="w-full flex flex-col">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              type="text"
              name="name"
              id="name"
              className="border-gray-400 mt-1 rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* //> Phone Number */}
          <div className="w-full flex flex-col">
            <label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
              type="text"
              name="phone"
              id="phone"
              className="border-gray-400 mt-1 rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="Enter your phone number"
            />
          </div>

          {/* //> Email */}
          <div className="w-full flex flex-col">
            <label htmlFor="email">
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
              className="border-gray-400 mt-1 rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="Enter your email address"
            />
          </div>

          {/* //>Message */}
          <div className=" w-full flex flex-col">
            <label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
              rows="2"
              name="message"
              id="message"
              className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="Type your message here"
            />
          </div>

          {/* //> Response */}
          <div
            className={`${
              contactUsResponse ? "flex" : "hidden"
            }  justify-center items-center`}
          >
            <p
              // type="button"
              className={`w-[95%]
          flex items-center justify-center   rounded-md py-4 px-20    font-medium ${
            contactUsResponse.includes("success")
              ? "text-pry-color"
              : "text-red-600"
          }  `}
            >
              {contactUsResponse}
            </p>
          </div>

          {/* //>Send Message Button */}
          <div className="flex justify-end items-center ">
            <button className="py-2 px-5 rounded-md bg-pry-color text-white duration-300 hover:bg-opacity-80">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
