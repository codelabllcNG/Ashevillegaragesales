import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import logo from "@/public/images/stafford-logo.png";
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
import AccountNavItems from "../AccountNavItems";

function AccountMobileNav() {
  const router = useRouter();

  const {
    accountMobileNav,
    setAccountMobileNav,
    selectedAccordion,
    setSelectedAccordionChild,
    setSelectedAccordion,
    selectedAccordionChild,
    user,
  } = AllCtx();


  //   const [whatWeDoExpanded, setWhatWeDoExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={` -mx-3 sm:-mx-8 lg:-mx-[5rem]  sm:hidden duration-300  ${
        accountMobileNav ? "translate-x-0 " : " -translate-x-full "
      } -my-4 w-full h-screen flex   fixed   overflow-y-hidden z-[9] 
`}
    >
      <div
        className={`w-full mt-3 h-screen pl-3 pr-3 400:pl-5  overflow-y-scroll scrollbar-hide bg-white  `}
      >
       
        <div className=" mb-7 px-2 py-3 border bg-[#eafff0]  border-pry-color -mx-3 sm:-mx-8 lg:-mx-[5rem]">
          <p className="font-medium ">Welcome, {user?.first_name} {user?.last_name}</p>
          <p className="text-sm">{ user?.email}</p>
        </div>
 <AccountNavItems/>
      </div>

      {/* <div
        onClick={() => {
          setAccountMobileNav(false);
        }}
        className={`w-[10%] sm:w-[55%]    duration-300  h-screen`}
      ></div> */}
    </div>
  );
}

export default AccountMobileNav;
