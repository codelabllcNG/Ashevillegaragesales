import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Error() {
  const router = useRouter();
  return (
    <div className="w-full   pb-20">
      <div className="flex w-full justify-center items-center">
        <Image
          className=""
          alt="404 Image"
          src="/images/error.png"
          width={400}
          height={400}
        />
      </div>
      <p className="text-center font-medium text-4xl">Something went wrong!</p>
      <p className="text-center font-semibold text-3xl mt-5">
        Why are you seeing this?
      </p>

      <p className="text-2xl  text-center mt-5 text-gray-500">
        - Something went wrong on our end and we are fixing it.
      </p>

      <p className="text-2xl  text-center mt-10 text-gray-500">
        Contact us by sending an mail to contact@ashevillegaragesales.com for
        further support and inquiries
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

export default Error;
