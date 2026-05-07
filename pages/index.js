// import MobileNav from "@/components/MobileNav";
// import SideNav from "@/components/SideNav";
import Head from "next/head";
import Image from "next/image";
// import Dashboard from "@/components/Dashboard";
import AllCtx from "@/util-functions/allCtx";
import { useEffect, useState } from "react";
import LandingPage from "@/components/landing-page/LandingPage";
import PlaceBidOverlay from "@/components/bids-and-auctions/PlaceBidOverlay";
import ShareBidOverlay from "@/components/bids-and-auctions/ShareBidOverlay";
import NotificationOverlay from "@/components/bids-and-auctions/NotificationOverlay";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";
import AuctionNotificationOverlay from "@/components/bids-and-auctions/AuctionNotificationOverlay";
import secureLocalStorage from "react-secure-storage";
import { Elements } from "@stripe/react-stripe-js";
import AddCardOverlay from "@/components/account/card-information/AddCardOverlay";
import AddAddressOverlay from "@/components/account/won-bids/AddAddressOverlay";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import ProductRequestOverlay from "@/components/bids-and-auctions/ProductRequestOverlay";
// import { Elements, CardElement } from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   "pk_test_51NzgztBmhO4zDj4nR5j1q5B5WqtAy4b2sc0GYPPfLnKSdj9ffBdzBXRiCbjtfgIASFJU7gjbBw7kcsiVRkJDORHf00rNQaKptf"
// );

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default function Home({ productsArray }) {
  const router = useRouter();
  const { source, bidID, bidid, action, ref } = router.query;

  const userToken = secureLocalStorage.getItem("userToken");
  const userEmail = secureLocalStorage.getItem("user")?.email;

  const {
    cart,
    categories,
    getCart,
    localCartToServer,
    getCategories,
    setCartDefCard,
  } = useCartStore((state) => state);

  //   useEffect(() => {
  //     if (userToken && userEmail && cart.length < 1) {
  //       getCart();
  //     }
  //   }, [getCart, cart, userToken, userEmail]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (userToken && userEmail) {
      getCart();
    }
  }, [getCart, userToken, userEmail]);

  // useEffect(() => {
  //   if (userToken && userEmail) {
  //     localCartToServer();
  //   }
  // }, [localCartToServer, userToken, userEmail]);

  //   useEffect(() => {
  //     if (!userToken && !userEmail) {
  //       logoutResetCart();
  //     }
  //   }, [logoutResetCart, userToken, userEmail]);

  const {
    selectedAccordion,
    dialPadOverlay,
    locateBidOutbid,
    locateBidWon,
    setATMcardArray,
    setDefaultCardID,
    setReferralCode,
    setMenuClicked,
    setMessageOverlay,
    auctionNotificationOverlay,
    showProductRequestOverlay,
    setSelectedCard,
    messageOverlay,
    setSelectedAccordion,
    setSelectedAccordionChild,
    selectedAccordionChild,
    FABdialPadOverlay,
    showAddAddressOverlay,
    addCardOverlay,
    FABmessageOverlay,
    title,
    setFABdialPadOverlay,
    setFABmessageOverlay,
    showFAB,
    showPlaceBidOverlay,
    setUserDropdown,
    shareBidOverlay,
    setIsSurvey,
    notificationOverlay,
    setNotificationOverlay,
    showAlert,
    helpDropdown,
    setHelpDropdown,
    setShowAlert,
    isSurvey,
    findBid,
    setSearchSuggestionList,
    notificationArray,
    setNotificationArray,
    fetchingNotifications,
    setFetchingNotifications,
    setDefaultAddressID,
    setDeliveryAddressArray,
    setSelectedAddress,
    user,
    fetchAddressList,
    fetchCardList,
  } = AllCtx();

  // useEffect(() => {
  //   source === "survey" || isSurvey ? setIsSurvey(true) : null;
  // }, []);

  useEffect(() => {
    if (router.isReady) {
      source === "survey" || isSurvey ? setIsSurvey(true) : null;

      // Referral check
      if (ref) {
        setReferralCode(ref);
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );
        if (isMobile) {
          // Attempt to open the app with the custom URI scheme
          window.location.href = `ashevillegaragesales://ref/${ref}`;
          // Set a timeout to check if the app was opened
          setTimeout(function () {
            // If the app was not opened, remain on web
            if (document.hidden) {
              router.push("/signup");
            }
          }, 1000);
        } else {
          router.push("/signup");
        }
      }
    }
  }, [router.isReady]);

  // //>Fetch addresses and card list
  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      fetchAddressList();
      fetchCardList();
    }
  }, []);

  return (
    <div
      onClick={() => {
        setUserDropdown(false);
        setHelpDropdown(false);
        setSearchSuggestionList([]);
      }}
      className="scroll-smooth px-3 sm:px-8 lg:px-[5rem] relative "
    >
      <Head>
        <title>Asheville Garage Sales</title>
        <meta
          name="description"
          content="Shop premium items for less! From home essentials to kids' games; Asheville Garage Sales offers unbeatable deals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage productsArray={productsArray} />
      {showPlaceBidOverlay && <PlaceBidOverlay />}
      {shareBidOverlay && <ShareBidOverlay />}
      {showProductRequestOverlay && <ProductRequestOverlay />}
      {notificationOverlay && <NotificationOverlay />}
      {auctionNotificationOverlay && <AuctionNotificationOverlay />}

      {/* <Alert/> */}
    </div>
  );
}

export async function getStaticProps(context) {
  // const slug = context.params.slug;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEW_API_BASE}/products`
  );
  const data = await response.json();
  const productsArray = data.product;

  return {
    props: {
      productsArray,
    },
    revalidate: 10,
  };
}
