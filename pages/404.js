import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function A404Page() {
  const router = useRouter();

  const { user, triggerAlert } = AllCtx();

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
        setProductRequest("");
        router.push("/#categories");
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
    <div className="w-full  px-3 sm:px-8 lg:px-[5rem] pb-20">
      <div className="flex w-full justify-center items-center">
        <Image
          className=""
          alt="404 Image"
          src="/images/Error404.png"
          width={500}
          height={200}
        />
      </div>
      <p className="text-center font-medium text-4xl">ERROR! Page not found!</p>

      {/* //> */}
      <div className="mt-5 flex justify-center">
        <div className="rounded-md w-full md:w-[60%] bg-white  border-pry-color border  pb-8">
          <div className="flex relative items-center justify-center px-2 bg-pry-color rounded-t-md py-2 ">
            <div className="  text-white sm:text-xl flex flex-col items-center gap-x-2">
              <p className="text-base text-center ">
                Can&apos;t find what you are looking for?
              </p>
              <p className="mt-3">Request for product(s)</p>
            </div>
          </div>

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
            <button
              disabled={sending}
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

      <p className="text-2xl  text-center mt-10 text-gray-500">
        Contact us by dialing +1 704-659-1055, or send a mail to
        contact@ashevillegaragesales.com for further support and inquiries
      </p>

      <div className="flex justify-center items-center gap-x-5 mt-5">
        <button
          className="border rounded-md border-pry-color text-pry-color bg-white duration-300 hover:bg-gray-50 py-2 px-4"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Back
        </button>

        <button
          className="border rounded-md text-white bg-pry-color duration-300 hover:bg-opacity-80 py-2 px-4"
          onClick={() => {
            router.push("/contact-us");
          }}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default A404Page;
