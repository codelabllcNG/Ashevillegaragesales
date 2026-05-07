import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import logo from "@/public/images/logo.svg";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoIosArrowDown, IoMdClose, IoMdMenu } from "react-icons/io";
import Image from "next/image";
import AllCtx from "@/util-functions/allCtx";
import { IoSearchOutline } from "react-icons/io5";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import SearchSuggestions from "./SearchSuggestions";

function MobileNav({ searchProduct }) {
  const router = useRouter();

  const {
    menuClicked,
    setMenuClicked,
    selectedAccordion,
    setSelectedAccordionChild,
    setSelectedAccordion,
    selectedAccordionChild,
    loggingOut,
    user,
    setOngoingBids,

    setUser,
    makeGeneralSearch,

    searchKeyword,
    setSearchKeyword,
    phone,
    firstName,
    setSelectedAuctionTab,
    lastName,

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
  } = AllCtx();

  //   const [whatWeDoExpanded, setWhatWeDoExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={` -mx-3 sm:-mx-8 lg:-mx-[5rem] 2xl:hidden duration-300 ${
        menuClicked ? "translate-x-0 " : " -translate-x-full "
      } -my-4 w-full h-screen flex   fixed   overflow-y-hidden z-[10] 
`}
    >
      <div
        className={`w-[90%] sm:w-[45%] h-screen pl-3 pr-3 400:pl-5 pt-10 bg-white shadow-md  `}
      >
        {/*//> Close icon and logo */}
        <div className="flex  items-center">
          <IoMdClose
            onClick={() => {
              setMenuClicked(false);
            }}
            className="w-12 h-10 mr-2 border px-2 py-1 text-pry-color border-pry-color rounded-md cursor-pointer 2xl:hidden"
          />

          <div
            onClick={() => {
              router.push("/");
              setMenuClicked(false);
            }}
            className={`cursor-pointer min-w-[140px] min-h-[50px]  relative`}
          >
            <Image
              src={logo}
              alt="Logo"
              // width={140}
              // height={50}
              fill
            />
          </div>
        </div>

        <hr className="my-2 -mx-3" />

        {/* //>  Sign in sign up */}

        {(!user || user?.status === "inactive") && (
          <div className="w-full flex justify-between gap-x-5">
            <button
              onClick={() => {
                router.push("/login");
                setMenuClicked(false);
              }}
              className="py-2 px-5 border border-pry-color rounded-md duration-300 hover:bg-gray-50 w-1/2"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                router.push("/signup");
                setMenuClicked(false);
              }}
              className=" w-1/2 py-2 px-5 border bg-pry-color rounded-md duration-300 hover:bg-opacity-80 text-white"
            >
              Sign up
            </button>
          </div>
        )}

        <hr className="my-2 -mx-3" />

        {/* //>  Search and filter */}
        <div className="relative">
          <div className="border rounded-full  flex justify-between items-center  px-2 py-1 h-12">
            <input
              className="border-none w-full rounded-md focus:ring-0 font-medium placeholder-gray-400"
              type="text"
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                searchProduct(e.target.value);
                // getRelatedSearch({e, catID});
              }}
            />

            <div
              onClick={() => {
                setSearchSuggestionList([]);
                setMenuClicked(false);
                setSelectedAuctionTab("categories");
                router.push("/#categories");
                // makeGeneralSearch({
                //   searchTerm: searchKeyword,
                //   categoryID: catID,
                // });
                searchProduct(searchKeyword);
                setMenuClicked(false);
              }}
              className="bg-pry-color flex justify-center items-center   -mr-2 rounded-r-full p-3 cursor-pointer  h-12"
            >
              <IoSearchOutline className="w-5 h-5 text-white " />
            </div>
          </div>
          <SearchSuggestions />
        </div>

        {/* //>  Nav links and accordions */}
        <div className="scrollbar-hide overflow-y-scroll h-[95%] ">
          <Accordion allowZeroExpanded className="mt-7 ">
            {/*  //>  HOME */}
            <AccordionItem
              onClick={() => {
                router.push("/");
                setMenuClicked(false);
                setSelectedAccordion("home");
              }}
              className={`mt-3 duration-300 select-none  rounded ${
                selectedAccordion === "home" ? "bg-white text-pry-color" : ""
              }   duration-300 ${
                selectedAccordion !== "home" ? "hover:bg-gray-50" : ""
              }`}
            >
              <AccordionItemHeading>
                <AccordionItemButton className={``}>
                  <p className="ml-2 py-2">Home</p>
                </AccordionItemButton>
              </AccordionItemHeading>
            </AccordionItem>

            {/*  //>  PRODUCTS */}
            <AccordionItem
              onClick={() => {
                router.push("/#categories");
                setMenuClicked(false);
                setSelectedAccordion("products");
              }}
              className={`mt-5 duration-300 select-none  rounded ${
                selectedAccordion === "products"
                  ? "bg-white text-pry-color"
                  : ""
              }   duration-300 ${
                selectedAccordion !== "products" ? "hover:bg-gray-50" : ""
              }`}
            >
              <AccordionItemHeading
                onClick={() => {
                  setSelectedAccordion("products");
                  // setSelectedAccordionChild("");
                  // toggleAppointmentArrow(!appointmentArrow);
                }}
              >
                <AccordionItemButton className={``}>
                  <p className="ml-2 py-2">Available Products</p>
                </AccordionItemButton>
              </AccordionItemHeading>
            </AccordionItem>

            {/*  //>  ABOUT US */}
            <AccordionItem
              onClick={() => {
                router.push("/about-us");
                setMenuClicked(false);
                setSelectedAccordion("about_us");
              }}
              className={`mt-5 duration-300 select-none  rounded ${
                selectedAccordion === "about_us"
                  ? "bg-white text-pry-color"
                  : ""
              }   duration-300 ${
                selectedAccordion !== "about_us" ? "hover:bg-gray-50" : ""
              }`}
            >
              <AccordionItemHeading
                onClick={() => {
                  setSelectedAccordion("about_us");
                  // setSelectedAccordionChild("");
                  // toggleAppointmentArrow(!appointmentArrow);
                }}
              >
                <AccordionItemButton className={``}>
                  <p className="ml-2 py-2">About Us</p>
                </AccordionItemButton>
              </AccordionItemHeading>
            </AccordionItem>

            {/*  //>  HOW IT WORKS  */}
            <AccordionItem
              onClick={() => {
                // setMenuClicked(false);
                setSelectedAccordion("how_it_works");
                router.push("/#how-it-works");
                setMenuClicked(false);
              }}
              className={`mt-5 duration-300 select-none  rounded ${
                selectedAccordion === "how_it_works"
                  ? "bg-white text-pry-color"
                  : ""
              }   duration-300 ${
                selectedAccordion !== "how_it_works" ? "hover:bg-gray-50" : ""
              }`}
            >
              <AccordionItemHeading
                onClick={() => {
                  // setSelectedAccordion("how_it_works");
                  // setSelectedAccordionChild("");
                  // toggleAppointmentArrow(!appointmentArrow);
                }}
              >
                <AccordionItemButton className={``}>
                  <p className="ml-2 py-2">How it Works? </p>
                </AccordionItemButton>
              </AccordionItemHeading>
            </AccordionItem>

            {/*  //>  CONTACT US */}
            <AccordionItem
              onClick={() => {
                router.push("/contact-us");
                setMenuClicked(false);
                setSelectedAccordion("contact_us");
              }}
              className={`mt-5 duration-300 select-none  rounded ${
                selectedAccordion === "contact_us"
                  ? "bg-white text-pry-color"
                  : ""
              }   duration-300 ${
                selectedAccordion !== "contact_us" ? "hover:bg-gray-50" : ""
              }`}
            >
              <AccordionItemHeading
                onClick={() => {
                  setSelectedAccordion("contact_us");
                  // setSelectedAccordionChild("");
                  // toggleAppointmentArrow(!appointmentArrow);
                }}
              >
                <AccordionItemButton className={``}>
                  <p className="ml-2 py-2">Contact us</p>
                </AccordionItemButton>
              </AccordionItemHeading>
            </AccordionItem>

            {/*  //>  FAQs & SUPPORT */}
            <AccordionItem
              onClick={() => {
                router.push("/faq");
                setMenuClicked(false);
                setSelectedAccordion("faq_and_support");
              }}
              className={`mt-5 duration-300 select-none  rounded ${
                selectedAccordion === "faq_and_support"
                  ? "bg-white text-pry-color"
                  : ""
              }   duration-300 ${
                selectedAccordion !== "faq_and_support"
                  ? "hover:bg-gray-50"
                  : ""
              }`}
            >
              <AccordionItemHeading
                onClick={() => {
                  setSelectedAccordion("faq_and_support");
                  // setSelectedAccordionChild("");
                  // toggleAppointmentArrow(!appointmentArrow);
                }}
              >
                <AccordionItemButton className={``}>
                  <p className="ml-2 py-2">FAQs & Support</p>
                </AccordionItemButton>
              </AccordionItemHeading>
            </AccordionItem>

            {/*  //>  BECOME A VENDOR */}
            <AccordionItem
              onClick={() => {
                // setMenuClicked(false);
                setSelectedAccordion("become_a_vendor");
                // toggleAppointmentArrow(!appointmentArrow);
                // setSelectedAccordionChild("all_appointments");
              }}
              className={`rounded-md mt-5 duration-300 select-none  ${
                selectedAccordion !== "become_a_vendor"
                  ? "hover:bg-gray-50"
                  : ""
              }`}
            >
              <AccordionItemHeading
                className={`rounded-md ${
                  selectedAccordion === "become_a_vendor"
                    ? "bg-white text-pry-color "
                    : ""
                }   duration-300 `}
              >
                <AccordionItemButton disabled className={``}>
                  <div className="flex items-center justify-between p-2">
                    {/* <p className=" ">
                      Become a <span className="text-pry-color">Vendor</span>
                    </p> */}
                    {/* <IoIosArrowDown className={` w-4 h-4`} /> */}
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>

              {/*  //<      Option One  */}
              <AccordionItemPanel
                onClick={(e) => {
                  e.stopPropagation(e);
                  // setMenuClicked(false);
                  setSelectedAccordionChild("option_one");
                }}
                className={` ml-4 duration-300   mt-4 cursor-pointer  p-2 rounded   ${
                  selectedAccordionChild !== "option_one"
                    ? "hover:bg-gray-50"
                    : ""
                }`}
              >
                <p className="text-sm">Option One</p>
              </AccordionItemPanel>

              {/*  //< Option Two */}
              <AccordionItemPanel
                onClick={(e) => {
                  e.stopPropagation(e);
                  // setMenuClicked(false);
                  setSelectedAccordionChild("option_two");
                }}
                className={` ml-4 duration-300   mt-2 cursor-pointer  p-2 rounded   ${
                  selectedAccordionChild !== "option_two"
                    ? "hover:bg-gray-50"
                    : ""
                }`}
              >
                <p className="text-sm">Option Two </p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div
        onClick={() => {
          setMenuClicked(false);
        }}
        className={`w-[10%] sm:w-[55%]    duration-300  h-screen`}
      ></div>
    </div>
  );
}

export default MobileNav;
