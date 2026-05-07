import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useState } from "react";
import {
  BsGrid,
  BsCalendarEvent,
  BsAlarm,
  BsPrescription,
} from "react-icons/bs";
import { BiEditAlt, BiCalendar, BiAnalyse } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import {
  GiStarsStack,
  GiNotebook,
  GiMedicines,
  GiTakeMyMoney,
} from "react-icons/gi";
import { RiMedicineBottleLine } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { GoGraph, GoStack } from "react-icons/go";
import {
  MdOutlineStorefront,
  MdOutlineContactMail,
  MdGroups2,
} from "react-icons/md";
import { PiBriefcase } from "react-icons/pi";
import {
  TbBrandAirtable,
  TbDeviceAnalytics,
  TbPhoneCall,
  TbUsersGroup,
} from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { PiChats } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Icon } from "@iconify/react";

function AccountNavItems() {
  const {
    setMenuClicked,
    setSelectedAccountTab,
    selectedAccountTab,
    selectedAccountTabChild,
    setAccountMobileNav,
    setAccountTabChild,
    logOut,
    user,referralBaseUrl,
    // setSelectedAccountTabChild,
    setAccountTitle,
  } = AllCtx();

  const [copied, setCopied] = useState(false)

  return (
    <div className="scrollbar-hide overflow-y-scroll h-[95%] pb-72">
      <Accordion allowZeroExpanded className=" bg-r !font-light">
        {/* //<profile */}
        <div>
          <p className="text-sm sm:text-gray-300 text-gray-500">Profile</p>
          {/*  //>  MY ACCOUNT */}
          <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("My Account");
              setSelectedAccountTab("my_account");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_my_account");
            }}
            className={`mt-2 rounded duration-300 select-none  ${
              selectedAccountTab !== "my_account" ? "sm:hover:bg-gray-600" : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "my_account"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <BsGrid
                      className={`${
                        selectedAccountTab === "my_account"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-6 h-6`}
                    />
                    <p className="ml-2 text-sm font-medium">My Account</p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>

          {/*  //>  ADDRESS BOOK */}
          <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Address Book");
              setSelectedAccountTab("address_book");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_address_book");
            }}
            className={`mt-4 rounded duration-300 select-none  ${
              selectedAccountTab !== "address_book"
                ? "sm:hover:bg-gray-600"
                : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "address_book"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="icon-park-solid:address-book"
                      className={`${
                        selectedAccountTab === "address_book"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-7 h-7`}
                    />
                    <p className="ml-2 text-sm font-medium whitespace-nowrap">
                      Address Book
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>

          {/*  //>  CARD INFORMATION */}
          <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Card Information");
              setSelectedAccountTab("card_information");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_card_information");
            }}
            className={`mt-2 rounded duration-300 select-none  ${
              selectedAccountTab !== "card_information"
                ? "sm:hover:bg-gray-600"
                : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "card_information"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="ph:credit-card"
                      className={`${
                        selectedAccountTab === "card_information"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-6 h-6`}
                    />
                    <p className="ml-2 text-sm font-medium whitespace-nowrap">
                      Card Information
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>
        </div>

        {/* //<bids */}
        <div className="mt-8">
          <p className="text-sm sm:text-gray-300 text-gray-500">Orders</p>
          {/*  //>  ACTIVE BIDS */}
          {/* <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Active Bids");
              setSelectedAccountTab("active_bids");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_active_bids");
            }}
            className={`mt-2 rounded duration-300 select-none  ${
              selectedAccountTab !== "active_bids" ? "sm:hover:bg-gray-600" : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "active_bids"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="ph:gavel-light"
                      className={`-rotate-90 ${
                        selectedAccountTab === "active_bids"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-6 h-6`}
                    />
                    <p className="ml-2 text-sm font-medium">Active Bids</p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem> */}

          {/*  //>  WON BIDS */}
          {/* <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Won Bids");
              setSelectedAccountTab("won_bids");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_won_bids");
            }}
            className={`mt-4 rounded duration-300 select-none  ${
              selectedAccountTab !== "won_bids" ? "sm:hover:bg-gray-600" : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "won_bids"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="ph:gavel-light"
                      className={`-rotate-90 ${
                        selectedAccountTab === "won_bids"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-7 h-7`}
                    />
                    <p className="ml-2 text-sm font-medium whitespace-nowrap">
                      Won Bids
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem> */}

          {/*  //>  PAST BIDS */}
          {/* <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Past Bids");
              setSelectedAccountTab("past_bids");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_past_bids");
            }}
            className={`mt-4 rounded duration-300 select-none  ${
              selectedAccountTab !== "past_bids" ? "sm:hover:bg-gray-600" : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "past_bids"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3 ">
                  <div className="flex items-center ">
                    <Icon
                      icon="ph:gavel-light"
                      className={`-rotate-90 ${
                        selectedAccountTab === "past_bids"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-7 h-7`}
                    />
                    <p className="ml-2 text-sm font-medium whitespace-nowrap">
                      Past Bids
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem> */}

             {/*  //>  YOUR ORDERS */}
             <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Your Orders");
              setSelectedAccountTab("your_orders");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_won_bids");
            }}
            className={`mt-4 rounded duration-300 select-none  ${
              selectedAccountTab !== "your_orders" ? "sm:hover:bg-gray-600" : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "your_orders"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="ph:gavel-light"
                      className={`-rotate-90 ${
                        selectedAccountTab === "your_orders"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-7 h-7`}
                    />
                    <p className="ml-2 text-sm font-medium whitespace-nowrap">
                      Your Orders
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>
        </div>

        {/* //<settings */}
        <div className="mt-8">
          <p className="text-sm sm:text-gray-300 text-gray-500">Settings</p>
          {/*  //>  SECURITY */}
          <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Security");
              setSelectedAccountTab("security");
              setAccountTabChild("");
              setAccountMobileNav(false);
            }}
            className={`mt-2 rounded duration-300 select-none  ${
              selectedAccountTab !== "security" ? "sm:hover:bg-gray-600" : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "security"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="fluent:shield-task-24-regular"
                      className={`${
                        selectedAccountTab === "security"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-6 h-6`}
                    />
                    <p className="ml-2 text-sm font-medium">Security</p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>
          {/*  //>  NOTIFICATIONS*/}
          <AccordionItem
            onClick={() => {
              // setMenuClicked(false);
              setAccountTitle("Notifications");
              setSelectedAccountTab("notifications");
              setAccountTabChild("");
              setAccountMobileNav(false);
              // toggleAppointmentArrow(!appointmentArrow);
              // setSelectedAccountTabChild("all_notifications");
            }}
            className={`mt-4 rounded duration-300 select-none  ${
              selectedAccountTab !== "notifications"
                ? "sm:hover:bg-gray-600"
                : ""
            }`}
          >
            <AccordionItemHeading
              className={`rounded ${
                selectedAccountTab === "notifications"
                  ? "bg-white text-gray-900"
                  : "sm:text-gray-200"
              }   duration-300 `}
            >
              <AccordionItemButton className={``}>
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center ">
                    <Icon
                      icon="ph:bell"
                      className={` ${
                        selectedAccountTab === "notifications"
                          ? "text-gray-900"
                          : "smtext-white"
                      } w-6 h-6`}
                    />
                    <p className="ml-2 text-sm font-medium whitespace-nowrap">
                      Notifications
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>
        </div>

        {/* <div className="hidden sm:block mt-10 border border-pry-color rounded-md bg-gray-50 p-2">
          <p className="text-pry-color font-medium text-xl">
            Refer your friends
          </p>
          <p className="text-pry-color text-base mt-1">
            Share your unique link with your friends and receive up to{" "}
          </p>
          <p className="text-pry-color">
            <span className="font-bold">$10</span> store credit
          </p>

          <button
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${referralBaseUrl}${user.my_referral_code}`
              );
              setCopied(true);
            }}
            className="bg-pry-color text-white rounded-md w-full mt-6 py-3 duration-300 hover:bg-opacity-80"
          >
          {copied ? "Copied" : "Copy Link"}
          </button>
        </div> */}

        {/*  //> LOG OUT
         */}
        <AccordionItem
          onClick={() => {
            logOut({ userMail: user?.email });
            setMenuClicked(false);
            // setAccountTitle("Dashboard");
            // setSelectedAccountTab("logout");
          }}
          className={`mt-8 duration-300  select-none  rounded ${
            selectedAccountTab === "logout"
              ? "bg-white text-red-600"
              : "text-red-600"
          }   duration-300 ${
            selectedAccountTab !== "logout" ? "sm:hover:bg-gray-600" : ""
          }`}
        >
          <AccordionItemHeading>
            <AccordionItemButton className={``}>
              <div className="flex p-2 items-center ">
                <AiOutlineLogout className={`text-red-600 w-6 h-6`} />
                <p className="ml-2 text-sm font-medium">Log Out</p>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          {/* <AccordionItemPanel>
           <p>Item1</p>
         </AccordionItemPanel> */}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccountNavItems;
