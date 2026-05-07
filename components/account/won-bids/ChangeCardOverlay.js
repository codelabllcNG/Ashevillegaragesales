import ShareBidCountdown from "@/components/countdowns/ShareBidCountdown";
import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
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
import secureLocalStorage from "react-secure-storage";
// import ShareBidCountdown from "../countdowns/ShareBidCountdown";
import { MdAddCircle } from "react-icons/md";

function ChangeCardOverlay() {
  const {
    setShowChangeCardOverlay,
    selectedBid,
    productionShareLink,
    localHostShareLink,
    deliveryAddressArray,
    setSelectedAddress,
    ATMcardArray,
    setSelectedCard,
    defaultCardID,
    selectedCard,
    setShowChangeAddressOverlay,
    setAddCardOverlay,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={() => {
        setShowChangeCardOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black px-3 bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white border-pry-color border  pb-8 "
      >
        <div className="flex relative items-center justify-start sm:justify-center px-32 sm:px-36 bg-pry-color rounded-t-md py-2 ">
          <div className="  text-white sm:text-xl flex items-center gap-x-2">
            Saved Cards
          </div>

          <div className="absolute right-0 flex items-center justify-end">
            <div
              onClick={() => {
                setShowChangeCardOverlay(false);
              }}
              className="flex justify-center items-center p-1 mr-2  cursor-pointer rounded-full bg-white"
            >
              <IoIosCloseCircle className="w-7 h-7 text-pry-color" />
            </div>
          </div>
        </div>
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-7 mt-10">
          {ATMcardArray.map((card, i) => (
            <div
              onMouseOver={() => {
                setSelectedCard(card);
                secureLocalStorage.setItem("selectedCard", card);
                // console.log(card);
              }}
              onTouchStart={() => {
                setSelectedCard(card);
                secureLocalStorage.setItem("selectedCard", card);
              }}
              onClick={() => {
                setSelectedCard(card);
                secureLocalStorage.setItem("selectedCard", card);
                setShowChangeCardOverlay(false);
              }}
              key={card.id}
              className="cursor-pointer"
            >
              <div
                onClick={() => {
                  setShowMenu(false);
                }}
                onMouseLeave={() => {
                  setShowMenu(false);
                }}
                className={`rounded-md p-3 ${
                  card.id === defaultCardID
                    ? "bg-[#95c08b] text-gray-900   "
                    : "bg-gray-900 text-white"
                }`}
              >
                <div className="flex justify-end items-center">
                  {/* <Icon icon="logos:mastercard" className="w-6 h-5" /> */}
                  <div className=" relative">
                    <div className="flex justify-end items-center">
                      <Icon
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(!showMenu);
                        }}
                        icon="tabler:dots"
                        className="w-6 h-5 cursor-pointer"
                      />
                    </div>
                    {/* //> */}
                    {showMenu && card.id === selectedCard.id && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          // setShowMenu(!showMenu);
                        }}
                        className="bg-white border p-2 w-fit rounded-md  absolute right-0"
                      >
                        <p
                          onClick={() => {
                            setSelectedCard(card);
                            secureLocalStorage.setItem("selectedCard", card);
                            setShowChangeCardOverlay(false);
                          }}
                          className="text-sm font-medium text-gray-900 cursor-pointer select-none whitespace-nowrap"
                        >
                          Select Card
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-16 flex justify-between gap-x-5">
                  <p className="text-sm font-medium ">{card.name}</p>
                  <p className="text-xm font-medium">
                    {" "}
                    {`${card.exp_month}/${card.exp_year
                      .toString()
                      .slice(-2)}`}{" "}
                  </p>
                </div>

                <p className="mt-3 text-sm font-medium">
                  {" "}
                  {`**** **** **** ${card.last4}`}
                </p>
              </div>
              {card.id === defaultCardID && (
                <>
                  <div className="mt-2 text-sm text-pry-color flex items-center gap-x-1">
                    <Icon icon="ph:info-fill" className="w-4 h-4" /> This is the
                    default card
                  </div>
                </>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              setAddCardOverlay(true);
            }}
            className="flex items-center justify-center"
          >
            <MdAddCircle color="#487354" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeCardOverlay;
