import Image from "next/image";
import React, { useState } from "react";
import { IoFlash } from "react-icons/io5";
import { HiBell } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { useRouter } from "next/router";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import AllCtx from "@/util-functions/allCtx";

import secureLocalStorage from "react-secure-storage";

const CartCard = ({
  id,
  name,
  img,
  category,
  price,
  desc,
  showToolTip,
  slug,
  stock,
  stockStatus,
  show_desc,
}) => {
  const aProduct = {
    id,
    name,
    img,
    category,
    price,
    desc,
    showToolTip,
    slug,
    desc,
  };

  const { storageAddToCart, addToServerCart, addingToCart } = useCartStore(
    (state) => state
  );

  const {
    setShareBidOverlay,
    notificationOverlay,
    selectedProduct,
    setSelectedProduct,
    setNotificationOverlay,
  } = AllCtx();

  const router = useRouter();
  const routeHandler = () => {
    router.push(`/cart/product-details/${slug}`);
  };

  const cartHandler = () => {
    const userToken = secureLocalStorage.getItem("userToken");
    const userEmail = secureLocalStorage.getItem("user")?.email;

    if (userToken && userEmail) {
      const product = {
        productID: id,
        quantity: "1",
      };
      addToServerCart(product);
    } else {
      if (typeof window !== "undefined") {
        const product = {
          product_id: id,
          product_name: name,
          product_image: img,
          product_price: price,
          quantity: "1",
          product_desc: desc,
          stock: stock,
          stock_status: stockStatus,
        };
        storageAddToCart(product);
      }
    }
  };

  return (
    <div
      onTouchStart={() => setSelectedProduct(aProduct)}
      onMouseOver={() => {
        // setSelectedProduct(aProduct);
        // console.log(aProduct);
      }}
      onClick={() => setSelectedProduct(aProduct)}
      className="bg-white   rounded-md  cursor-pointer  duration-300 "
    >
      {/* //> product image */}
      <div className="relative" onClick={routeHandler}>
        <div className=" relative h-[224px] ">
          <Image
            unoptimized
            className="w-full object-cover rounded-md opacity-80"
            src={img || "/images/placeholder.jpg"}
            alt={"Image"}
            fill
          />
        </div>

        <div className="absolute top-0 mt-2 px-2 justify-between items-center flex w-full">
          <div className="invisible border border-pry-color px-2 py-1 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
            <p className=" sm:text-sm lg:text-xs xl:text-base font-semibold">
              Price: $100
            </p>
            <IoFlash className="w-4 h-4 text-yellow-400" />
          </div>
          {/* 
          <div className="w-fit h-fit rounded-full  flex justify-center items-center p-1 border border-pry-color cursor-pointer bg-white">
            <HiBell
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-5 h-5 text-pry-color"
            />
          </div> */}
        </div>

        {/* <p>In place of countdown</p> */}

        <div
          onTouchStart={() => setSelectedProduct(aProduct)}
          onMouseOver={() => {
            // setSelectedProduct(aProduct);
            // console.log(aProduct);
          }}
          onClick={(e) => {
            setSelectedProduct(aProduct);
            e.stopPropagation();
            setShareBidOverlay(true);
          }}
          className="ml-2 absolute bottom-0 -mb-5 w-fit bg-pry-color rounded-full flex justify-center items-center p-3 text-white hover:bg-green-700 cursor-pointer "
        >
          <IoIosShareAlt className="w-6 h-6" />
        </div>
      </div>

      <div className=" pt-8 shadow w-full  p-2" onClick={routeHandler}>
        <div className="flex gap-x-2 justify-between items-center text-pry-color font-medium">
          <p>{category}</p>
          <div className="flex items-center gax">
            {" "}
            <p>
              Price: <span className=" text-black font-medium">${price}</span>
            </p>
          </div>
        </div>

        {showToolTip ? (
          <p
            data-te-toggle="tooltip"
            title={name}
            className="font-medium my-2 overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md text-sm"
          >
            {name.slice(0, 15) + "..."}
          </p>
        ) : (
          <p className="font-medium my-2 overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </p>
        )}

        {show_desc ? (
          <div className="h-14 pb-2">
            <p className="text-sm break-all">
              {desc.length > 40 ? `${desc.substring(0, 100)}...` : desc}
            </p>
          </div>
        ) : null}

        <div className="flex justify-between items-center gap-x-2">
          <div className="relative w-1/2">{/* //>Proxy bid button */}</div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-y-3 rounded-b-md shadow py-3 px-2  ">
        <button
          disabled={addingToCart && selectedProduct.id === id}
          className="w-full border rounded font-medium px-1 py-2 bg-pry-color text-white hover:bg-opacity-80 duration-300"
          onClick={() => cartHandler()}
        >
          {addingToCart && selectedProduct.id === id
            ? "Please wait..."
            : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default CartCard;
