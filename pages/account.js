import AccountNav from "@/components/account/AccountNav";
import AccountNavItems from "@/components/account/AccountNavItems";
import AddCardOverlay from "@/components/account/card-information/AddCardOverlay";
import AddressBook from "@/components/account/address-book/AddressBook";
import CardInformation from "@/components/account/card-information/CardInformation";

import AccountMobileNav from "@/components/account/my-account/AccountMobileNav";
import EditInformation from "@/components/account/my-account/EditInformation";
import MyAccount from "@/components/account/my-account/MyAccount";
import ViewAccount from "@/components/account/my-account/ViewAccount";
import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import ActiveBidsIndex from "@/components/account/active-bids/ActiveBidsIndex";
import secureLocalStorage from "react-secure-storage";
import PlaceBidOverlay from "@/components/bids-and-auctions/PlaceBidOverlay";
import PastBidsIndex from "@/components/account/past-bids/PastBidsIndex";
import SubmitSurveyOverlay from "@/components/bids-and-auctions/SubmitSurveyOverlay";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import Security from "@/components/account/security/Security";
import ChangeCardOverlay from "@/components/account/won-bids/ChangeCardOverlay";
import AddAddressOverlay from "@/components/account/won-bids/AddAddressOverlay";
import ChangeAddressOverlay from "@/components/account/won-bids/ChangeAddressOverlay";
import AppointmentOverlay from "@/components/account/won-bids/AppointmentOverlay";
import Notifications from "@/components/account/notifications/Notifications";
import SuccessfulClaimOverlay from "@/components/account/won-bids/SuccessfulClaimOverlay";
import OrdersIndex from "@/components/account/orders/OrdersIndex";
import WonBidsIndex from "@/components/account/won-bids/WonBidsIndex";
import Head from "next/head";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

function AccOUNT() {
  const {
    user,
    selectedAccountTab,
    showSuccessfulClaimOverlay,
    accountTabChild,
    setAccountTabChild,
    setAccountMobileNav,
    accountTitle,
    setAddCardOverlay,
    showPlaceBidOverlay,
    addCardOverlay,
    notificationOverlay,
    showSubmitSurveyOverlay,
    setUserDropdown,
    setHelpDropdown,
    setSearchSuggestionList,
    showAppointmentOverlay,
    isSurvey,
    showChangeCardOverlay,
    showAddAddressOverlay,
    showChangeAddressOverlay,
  } = AllCtx();
  const router = useRouter();

  // //>Redirect if not authorized
  useEffect(() => {
    if (!secureLocalStorage.getItem("user")) {
      router.push("/");
    }

    // //>Redirect if not authorized
    if (secureLocalStorage.getItem("user")?.status === "inactive") {
      router.push("/email-verification");
      return;
    }
  }, []);

  // console.log(isSurvey);

  return (
    <div
      onClick={() => {
        setUserDropdown(false);
        setHelpDropdown(false);
        setSearchSuggestionList([]);
      }}
      className="px-3 sm:px-8 lg:px-[5rem] h- screen flex relative -mb-32 gap-x-8 "
    >
      <Head>
        <title>Account</title>
        <meta
          name="description"
          content="Shop premium items for less! From home essentials to kids' games; Asheville Garage Sales offers unbeatable deals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountMobileNav />
      {/* //>LEFT SIDE */}
      <AccountNav />
      {/* //>RIGHT SIDE */}

      <div className="w-full scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-rounded-md overflow-y- auto pb-10">
        {/* //>Title */}
        <div className="flex items-center justify-between mt-8">
          {/* //>left */}
          <div className=" flex gap-x-2 items-center">
            {accountTabChild && (
              <Icon
                onClick={() => {
                  setAccountTabChild("");
                }}
                icon="formkit:arrowleft"
                className="cursor-pointer"
              />
            )}
            {!accountTabChild && (
              <Icon
                onClick={() => {
                  setAccountMobileNav(true);
                }}
                icon="formkit:arrowleft"
                className="sm:hidden cursor-pointer"
              />
            )}
            <p className="text-xl lg:text-[2rem] font-semibold">
              {" "}
              {accountTitle}
            </p>
          </div>

          {/* //>right */}
          {selectedAccountTab === "address_book" && !accountTabChild && (
            <button
              onClick={() => {
                setAccountTabChild("add_new_address");
              }}
              className="bg-pry-color text-white hover:bg-opacity-80 duration-300 text-sm font-semibold px-5
            lg:px-7 py-2 lg:py-3 rounded-md flex justify-center items-center gap-x-2"
            >
              {" "}
              <Icon icon="mdi:location" className="w-5 h-5 text-white" /> Add
              New Address
            </button>
          )}
        </div>

        {/* //>Body */}
        <MyAccount />

        <AddressBook />

        <CardInformation />

        {/* <ActiveBidsIndex /> */}

        {/* <WonBidsIndex /> */}
        <OrdersIndex />

        {/* <PastBidsIndex /> */}

        <Security />

        <Notifications />
      </div>

      {showPlaceBidOverlay && <PlaceBidOverlay />}
      {showSubmitSurveyOverlay && <SubmitSurveyOverlay />}
      {showChangeCardOverlay && <ChangeCardOverlay />}
      {showChangeAddressOverlay && <ChangeAddressOverlay />}
    </div>
  );
}

export default AccOUNT;
