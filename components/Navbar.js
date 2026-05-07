import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import logo from "@/public/images/stafford-logo.png";
import logo from "@/public/images/asheville-logo.png";
import navContactIcon from "@/public/images/nav_location-icon.svg";
import AllCtx from "@/util-functions/allCtx";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoMdLogOut, IoMdMenu } from "react-icons/io";
import { GrChatOption, GrMenu, GrNotification } from "react-icons/gr";
import { TiShoppingCart } from "react-icons/ti";
// import MobileNav from "./MobileNav";
import { FaAngleDown, FaAngleUp, FaConciergeBell } from "react-icons/fa";
import MobileNav from "./MobileNav";
import { HiBell, HiOutlineBell, HiOutlineChatAlt2 } from "react-icons/hi";
import secureLocalStorage from "react-secure-storage";
import SurveyBanner from "./SurveyBanner";
import SearchSuggestions from "./SearchSuggestions";
import ChangeCardOverlay from "./account/won-bids/ChangeCardOverlay";
import ChangeAddressOverlay from "./account/won-bids/ChangeAddressOverlay";
import BuyNowOverlay from "./account/won-bids/BuyNowOverlay";
import AppointmentOverlay from "./account/won-bids/AppointmentOverlay";
import SuccessfulClaimOverlay from "./account/won-bids/SuccessfulClaimOverlay";
import { Elements } from "@stripe/react-stripe-js";
import AddCardOverlay from "./account/card-information/AddCardOverlay";
import { loadStripe } from "@stripe/stripe-js";
import AddAddressOverlay from "./account/won-bids/AddAddressOverlay";
import BuyNowConfirmation from "./BuyNowConfirmation";
import NoticeForBuyNowOnly from "./NoticeForBuyNowOnly";
import { useCartStore } from "@/a-store/zustandStore/cartStore";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

function Navbar() {
  const router = useRouter();
  const { source } = router.query;
  const [scroll, setScroll] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { cart, logoutResetCart, products } = useCartStore((state) => state);

  const {
    menuClicked,
    setMenuClicked,
    setUser,
    user,
    showChangeAddressOverlay,
    showAddAddressOverlay,
    showAppointmentOverlay,
    showSuccessfulClaimOverlay,
    showBuyNowConfirmation,
    showChangeCardOverlay,
    addCardOverlay,
    showBuyNowOverlay,
    setSelectedAuctionTab,
    searchKeyword,
    setSearchKeyword,
    makeGeneralSearch,
    phone,
    firstName,
    lastName,
    notificationArray,
    loggingOut,
    password,
    userDropdown,
    setUserDropdown,
    email,
    selectedNavLink,
    setSelectedNavLink,
    setShowAlert,
    showAlert,
    logOut,
    setAccountMobileNav,
    setAccountTabChild,
    setSelectedAccountTab,
    setAccountTitle,
    isSurvey,
    helpDropdown,
    setHelpDropdown,
    getRelatedSearch,
    setSearchSuggestionList,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    categories,
    catID,
    setCatID,
    filterByCategory,
    duplicatedOngoingBids,
    setOngoingBids,
    setFetchingNotifications,
    setNotificationArray,
    selectedBid,
    filteredProducts,
    setFilteredProducts,
  } = AllCtx();

  const [unreadNotification, setUnreadNotification] = useState(false);

  useEffect(() => {
    // console.log(user);
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  // //>Fetch categories
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        // setFetchingCategories(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-category`,
          {
            headers: {
              "Content-Type": "application/json",
              usertoken: secureLocalStorage.getItem("userToken"),
              useremail: secureLocalStorage.getItem("user")?.email,
            },
          }
        );

        const data = await response.json();

        if (data.status === "fail") {
          // setLoginResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          // setFetchingCategories(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          // setFetchingCategories(false);
          return;
        }
        // console.log(data);

        // return;

        setCategories(data.categories);
        // setDuplicatedCategories(data.categories);

        // setFetchingCategories(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        // setFetchingCategories(false);
      }
    }
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      // console.log("This code runs in an interval");
    }, 60000); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // //>Fetch Notifications
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetchingNotifications(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-notifications`,
          {
            headers: {
              "Content-Type": "application/json",
              usertoken: secureLocalStorage.getItem("userToken"),
              useremail: secureLocalStorage.getItem("user")?.email,
            },
          }
        );
        // console.log(response);
        const data = await response.json();

        if (data.status === "fail") {
          // setLoginResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          setFetchingNotifications(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetchingNotifications(false);
          return;
        }
        // console.log(data);

        // return;

        // const reducedNotifications = data.notifications

        setNotificationArray(data.notifications);
        setUnreadNotification(
          data.notifications.some((item) => item.status === "read")
        );
        //  console.log(reducedNotifications);
        // setDuplicatedActiveBids(data.notifications);

        setFetchingNotifications(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetchingNotifications(false);
      }
    }
    if (user) {
      fetchData();
    }

    const intervalId = setInterval(
      () => {
        if (user) {
          fetchData();
        }
        // console.log("This code runs in an interval");
      },
      notificationArray.length === 0 ? 60000 : 2000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // const reservedProducts = filteredProducts

  function searchProduct(text) {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  // console.log(notificationArray);

  return (
    <nav
      onClick={() => {
        setUserDropdown(false);
        setSearchSuggestionList([]);
      }}
      className={`z-[10] px-3 sm:px-8 lg:px-[5rem] pt-2 sticky top-0 bg-white  ${
        scroll ? "shadow-md shadow-gray-400" : ""
      }`}
    >
      <MobileNav searchProduct={searchProduct} />

      {(source === "survey" || isSurvey) && <SurveyBanner />}

      {/* //>  TOP OF NAV ITEMS */}
      <div className="flex justify-between items-center">
        {/* //> Contact Info */}
        <div className="flex gap-x-2 items-center p-2">
          <Image
            src={navContactIcon}
            alt="Location Icon"
            width={24}
            height={24}
          />

          <div>
            <p className="text-xs font-medium">+1 704-659-1055</p>
            <p className="text-xs font-medium">ashevillegaragesales@gmail.com</p>
            <p className="text-xs font-medium">
            8425 Old Statesville Rd Charlotte, NC 28269
            </p>
          </div>
        </div>

        {/* //> App Download Icons */}
        <div className="flex items-center gap-x-5">
          <select
            className="pointer-events-none opacity-60 cursor-pointer border-none focus:ring-0 text-xs "
            name="language"
            id="language"
          >
            <option value="en">EN</option>
          </select>

          <div className="sm:flex gap-x-5 space-y-1 sm:space-y-0">
            <a
              href=""
              // target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                // onClick={() => {
                //   router.push(
                //     "https://play.google.com/store/apps/details?id=com.bidclover",
                //     { target: "_blank" }
                //   );
                // }}
                src="/images/playstore-icon.svg"
                alt="Playstore Icon"
                width={135}
                height={40}
                className="cursor-pointer"
              />
            </a>

            <a
              href=""
              // target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                // onClick={() => {
                //   router.push(
                //     "https://apps.apple.com/ng/app/bidclover/id6468889236",
                //     { target: "_blank" }
                //   );
                // }}
                src="/images/appstore-icon.svg"
                alt="Appstore Icon"
                width={135}
                height={40}
                className="cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
      <hr className="-mx-3 sm:-mx-8 lg:-mx-[5rem]" />
      {/* <NoticeForBuyNowOnly /> */}
      {/* //> NAV ITEMS */}
      <div className="flex justify-between items-center  py-2 ">
        {/* //>menu  and  logo*/}
        <div className="flex justify-between items-center">
          <IoMdMenu
            onClick={() => {
              setMenuClicked(true);
            }}
            className="2xl:w-12 2xl:h-10 w-9 h-8 mr-1 border px-2 py-1 text-pry-color border-pry-color rounded-md cursor-pointer xl:hidden"
          />

          <div
            // onMouseOver={() => {
            //   console.log(selectedBid);
            // }}
            onClick={() => {
              setSelectedNavLink("home");
              router.push("/");
            }}
            className={`cursor-pointer min-w-[80px] min-h-[50px]  relative mr-7`}
          >
            <Image
              src={logo}
              alt="Logo"
              // width={140}
              // height={50}
              fill
            />
          </div>

          {/* //> nav links */}
          <ul className="appearance-none hidden md:flex gap-x-4 text-xs font-medium [&_*]:cursor-pointer  ">
            <li
              onClick={() => {
                setSelectedNavLink("home");
                router.push("/");
              }}
              className={`hidden lg:block ${
                selectedNavLink === "home"
                  ? "underline"
                  : "underline decoration-transparent"
              } underline-offset-8 duration-300 `}
            >
              Home
            </li>

            <li
              onClick={() => {
                setSelectedNavLink("how_it_works");
                router.push("/#how-it-works");
              }}
              className={`lg:hidden whitespace-nowrap ${
                selectedNavLink === "how_it_works"
                  ? "underline"
                  : "underline decoration-transparent"
              } underline-offset-8 duration-300`}
            >
              How it Works
            </li>
            <li
              onClick={() => {
                setSelectedNavLink("contact_us");
                router.push("/contact-us");
              }}
              className={`lg:hidden whitespace-nowrap ${
                selectedNavLink === "contact_us"
                  ? "underline"
                  : "underline decoration-transparent"
              } underline-offset-8 duration-300`}
            >
              Contact us
            </li>
          </ul>
        </div>

        <div className="flex justify-end items-center gap-x-3 xl:gap-x-4 w-full">
          {/* //>  Search and filter */}
          <div className="hidden lg:block relative w-[20rem] max-w-[20rem]">
            <div className="border rounded-full  hidden lg:flex justify-between items-center  px-2 py-1 h-10 w-full">
              <input
                data-te-toggle="tooltip"
                title={searchKeyword}
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  // console.log(e.target.value);
                  // getRelatedSearch({ e, catID });
                  searchProduct(e.target.value);
                }}
                className="border-none max-w-[7rem]   focus:ring-0 font-medium placeholder-gray-400 text-xs"
                type="text"
                placeholder="Search"
              />
              {/* <select
                value={selectedCategory}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setSelectedCategory(e.target.value);
                  e.target.value === "All"
                    ? setCatID("")
                    : setCatID(
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "cat_id"
                        )
                      );
                  // filterByCategory({
                  //   arrayToFilter: duplicatedOngoingBids,
                  //   categoryName: e.target.value,
                  //   setArrayToFilter: setOngoingBids,
                  // });
                  // console.log();
                }}
                className="text-xs border-none  overflow-x-hidden focus:ring-0"
                name="category_select"
                id="category_select"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option
                    data-te-toggle="tooltip"
                    title={category.name}
                    key={category.id}
                    value={category.name}
                    cat_id={category.id}
                  >
                    {category.name.length > 18
                      ? category.name.slice(0, 18 - 3) + "..."
                      : category.name}
                  </option>
                ))}
              </select> */}

              <div
                onClick={() => {
                  router.push("/#categories");
                  setSelectedAuctionTab("categories");
                  // makeGeneralSearch({
                  //   searchTerm: searchKeyword,
                  //   categoryID: catID,
                  // });
                  searchProduct(searchKeyword);
                }}
                className="bg-pry-color flex justify-center items-center cursor-pointer  -mr-2 rounded-r-full p-3  h-10"
              >
                <IoSearchOutline className="w-5 h-5 text-white " />
              </div>
            </div>
            {/* //>search suggestions */}
            {/* <div className="absolute w-full">
              <SearchSuggestions />
            </div> */}
          </div>

          <div className="flex items-center gap-x-3">
            {/* //> Become a vendor */}
            {/* <select
              className="pointer-events-none opacity-60 hidden xl:block border-none appearance-none focus:ring-0 text-xs font-medium"
              name="select"
              id="select"
            >
              <option className="appearance-none  " value="">
                Become a Vendor
              </option>
            </select> */}

            <div
              className="relative w-fit h-fit rounded-full justify-center items-center p-2 cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <div
                className={`px-[0.3rem] text-white font-semibold text-[10px] bg-red-600 rounded-full absolute top-[0.1rem] right-1`}
              >
                {cart.length}
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <TiShoppingCart size="3rem" className="w-8 h-8" />
              </div>
            </div>

            {/* //> Help dropdown */}
            {
              <div className="relative hidden xl:flex flex-col items-center w-fit ">
                <div
                  onClick={() => {
                    setUserDropdown(false);
                    setHelpDropdown(!helpDropdown);
                  }}
                  className="flex text-xs font-medium items-center gap-x-2 cursor-pointer"
                >
                  Help <IoIosArrowDown className="w-4 h-4 " />
                </div>

                {helpDropdown && (
                  <div className="w-fit absolute bg-white border rounded-md shadow top-8 p-3">
                    <p
                      onClick={() => {
                        router.push("/faq");
                        setHelpDropdown(false);
                      }}
                      className="whitespace-nowrap top-10 text-xs font-medium cursor-pointer select-none mt-2"
                    >
                      FAQs & Support
                    </p>

                    <p
                      onClick={() => {
                        setHelpDropdown(false);
                        router.push("/#how-it-works");
                      }}
                      className="whitespace-nowrap top-10 text-xs font-medium cursor-pointer select-none mt-4"
                    >
                      How it works
                    </p>

                    <p
                      onClick={() => {
                        setHelpDropdown(false);
                        router.push("/contact-us");
                      }}
                      className="whitespace-nowrap top-10 text-xs font-medium cursor-pointer select-none mt-4"
                    >
                      Contact us
                    </p>

                    <hr className="mt-3 border-t-2 " />
                    {/* 
                    <button className="text-white whitespace-nowrap px-5 py-2 mt-3 items-center flex justify-center gap-x-2 text-sm bg-pry-color rounded-md">
                      {" "}
                      <HiOutlineChatAlt2 className="  w-4 h-4 !text-white" />{" "}
                      LIVE CHAT
                    </button> */}
                  </div>
                )}
              </div>
            }

            {/* //> Sign in sign up */}
            {(!user || user?.status === "inactive") && (
              <div className="flex items-center gap-x-3 xl:gap-x-5">
                <div
                  onClick={() => {
                    setMenuClicked(true);
                  }}
                  className="bg-pry-color flex sm:hidden justify-center items-center  cursor-pointer  rounded-r-full rounded-bl-full p-3  h-12"
                >
                  <IoSearchOutline className="w-5 h-5 text-white " />
                </div>

                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="py-2 px-2 427:px-2 border border-pry-color rounded-md duration-300 hover:bg-gray-50"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    router.push("/signup");
                  }}
                  className="hidden sm:block py-2 px-2 border bg-pry-color rounded-md duration-300 hover:bg-opacity-80 text-white"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* //> Notification */}
            {user?.status === "active" && (
              <div
                onClick={() => {
                  setAccountTitle("Notifications");
                  setSelectedAccountTab("notifications");
                  setAccountTabChild("");
                  setAccountMobileNav(false);
                  router.push("/account");
                  setUserDropdown(false);
                }}
                className="  w-fit h-fit rounded-full relative md:flex justify-center items-center p-2   cursor-pointer bg-gray-50"
              >
                <div
                  className={`p-[0.4rem] ${
                    unreadNotification ? "bg-pry-color" : "bg-transparent"
                  } rounded-full absolute top-1 right-1`}
                ></div>
                <GrNotification className="w-6 h-6 !text-gray-500 " />
              </div>
            )}

            {/* //> User profile */}
            {user?.status === "active" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="relative  flex flex-col items-center w-fit ml-3"
              >
                <div className="flex items-center justify-center gap-x-3">
                  <div
                    onClick={() => {
                      setHelpDropdown(false);
                      setUserDropdown(!userDropdown);
                    }}
                    className="rounded-full relative h-[40px] w-[40px]"
                  >
                    <Image
                      className="rounded-full"
                      alt="User DP"
                      // width={40}
                      // height={40}
                      fill
                      src={
                        user?.img && user?.img !== "none"
                          ? user?.img
                          : "/images/profile-dp.webp"
                      }
                    />
                  </div>
                  <div
                    onClick={() => {
                      setHelpDropdown(false);
                      setUserDropdown(!userDropdown);
                    }}
                    className="flex text-xs font-semibold items-center gap-x-2 cursor-pointer"
                  >
                    <span className="hidden 500:block">{user?.first_name}</span>{" "}
                    <IoIosArrowDown className="w-4 h-4 " />
                  </div>
                </div>

                {userDropdown && (
                  <div className="w-fit right-0 absolute bg-white border rounded-md shadow top-11 p-3">
                    <p
                      onClick={() => {
                        router.push("/account");
                        setUserDropdown(false);
                      }}
                      className="whitespace-nowrap top-10 text-xs font-medium cursor-pointer select-none mt-2"
                    >
                      My Account
                    </p>

                    <p
                      onClick={() => {
                        setAccountTitle("Your Orders");
                        setSelectedAccountTab("your_orders");
                        setAccountTabChild("");
                        setAccountMobileNav(false);
                        router.push("/account");
                        setUserDropdown(false);
                      }}
                      className="whitespace-nowrap top-10 text-xs font-medium cursor-pointer select-none mt-4"
                    >
                      Orders
                    </p>

                    <p
                      onClick={() => {
                        setAccountTitle("Notifications");
                        setSelectedAccountTab("notifications");
                        setAccountTabChild("");
                        setAccountMobileNav(false);
                        router.push("/account");
                        setUserDropdown(false);
                      }}
                      className="whitespace-nowrap top-10 text-xs font-medium cursor-pointer select-none mt-4"
                    >
                      Settings
                    </p>

                    <hr className="mt-3 border-t-2 " />

                    <button
                      disabled={loggingOut}
                      onClick={() => {
                        logOut({ userMail: user?.email });
                        logoutResetCart();
                      }}
                      className="text-red-600 whitespace-nowrap px-8 py-2 mt-3 items-center flex justify-center gap-x-2 text-sm bg-white  rounded-md"
                    >
                      {" "}
                      <IoMdLogOut className="  w-5 h-5 !text-red-600" /> Log Out{" "}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showBuyNowOverlay && <BuyNowOverlay />}
      {showChangeCardOverlay && <ChangeCardOverlay />}
      {showChangeAddressOverlay && <ChangeAddressOverlay />}
      {showAppointmentOverlay && <AppointmentOverlay />}
      {showSuccessfulClaimOverlay && <SuccessfulClaimOverlay />}
      {showBuyNowConfirmation && <BuyNowConfirmation />}

      <Elements stripe={stripePromise}>
        {addCardOverlay && <AddCardOverlay />}
      </Elements>
      {showAddAddressOverlay && <AddAddressOverlay />}
    </nav>
  );
}

export default Navbar;
