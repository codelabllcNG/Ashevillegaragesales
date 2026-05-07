import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import {
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFlash } from "react-icons/io5";
import ShareBidCountdown from "../countdowns/ShareBidCountdown";
import toast from "react-hot-toast";

function ProductRequestOverlay() {
  const {
    setShowProductRequestOverlay,
    selectedProduct,
    productionShareLink,
    localHostShareLink,
    user,
    triggerAlert,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [newsletterEmail, setNewsletterEmail] = useState(
    user?.email ? user?.email : ""
  );
  const [productRequest, setProductRequest] = useState("");
  const [sending, setSending] = useState(false);

  async function requestProduct() {
  
    if (
      !newsletterEmail ||
      newsletterEmail.trim() === "" ||
      !productRequest ||
      productRequest.trim() === ""
    ) {
      triggerAlert({
        message: "Email or request field cannot be empty!",
        color: "red",
      });
      // console.log(dataToSubmit);
      return;
    }

    const dataToSubmit = {
      email: newsletterEmail,
      request: productRequest,
    };

    // console.log(dataToSubmit);
    // return
    try {
      setSending(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/product-request`,
        {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        triggerAlert({
          message: "An error ocurred.",
          color: "red",
        });
        setSending(false);
        return;
      }

      const data = await response.json();

      if (data.status === "success") {
        triggerAlert({
          message: "Request received, we will reach out to you. ",
          color: "green",
        });
        setSending(false);
        setProductRequest("")
        setShowProductRequestOverlay(false)
        return;
      }

      console.log("Something went wrong.");
      setSending(false);
      triggerAlert({
        message: "An error ocurred.",
        color: "red",
      });
    } catch (error) {
      console.log("An error occurred.");
      triggerAlert({
        message: "An error ocurred.",
        color: "red",
      });
      setSending(false);
    }
  }

  return (
    <div
      onClick={() => {
        setShowProductRequestOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white  border-pry-color border  pb-8"
      >
        <div className="flex relative items-center justify-start sm:justify-center px-32 sm:px-36 bg-pry-color rounded-t-md py-2 ">
          <div className="  text-white sm:text-xl flex items-center gap-x-2">
            Request for product(s)
          </div>

          <div className="absolute right-0 flex items-center justify-end">
            <div
              onClick={() => {
                setShowProductRequestOverlay(false);
              }}
              className="flex justify-center items-center p-1 mr-2  cursor-pointer rounded-full bg-white"
            >
              <IoIosCloseCircle className="w-7 h-7 text-pry-color" />
            </div>
          </div>
        </div>

        {/* <div className="flex gap-x-2 items- justify-center mt-2 ">
          <HiOutlineUserGroup className="w-5 lg:w-6 h-5 lg:h-6 !text-gray-600 " />{" "}
          <p className="">{selectedProduct.total_bidders} Bidder(s)</p>
        </div> */}

        <div className=" w- flex flex-col mt-8 mx-3">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            value={
              user?.email && !newsletterEmail ? user?.email : newsletterEmail
            }
            onChange={(e) => {
              setNewsletterEmail(e.target.value);
            }}
            required
            type="text"
            name="email"
            id="email"
            className="border-gray-400 w-full rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="Enter an email address we can reach you on."
          />
        </div>

        <div className=" w- flex flex-col mt-8 mx-3">
          <label htmlFor="product_request" className="font-medium">
            Your Request
          </label>
          <textarea
            value={productRequest}
            onChange={(e) => {
              setProductRequest(e.target.value);
            }}
            name="product_request"
            id="product_request"
            className="border-gray-400 w-full rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="e.g Hoodie with Pocket, Long Sleeve Tee "
          />
        </div>

        <div className="mt-8 flex justify-center items-center">
          <button disabled={sending}
            onClick={() => {
              requestProduct();
            }}
            className="bg-pry-color text-white p-2 rounded hover:bg-opacity-80 duration-300"
          >
            {sending ? "Please wait..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductRequestOverlay;
