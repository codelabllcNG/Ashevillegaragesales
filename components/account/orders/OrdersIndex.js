import AllCtx from "@/util-functions/allCtx";
import React from "react";
// import ViewAccount from './ViewAccount';
// import EditInformation from './EditInformation';
// import AddressBookList from "./AddressBookList";
// import ViewAccount from "../my-account/ViewAccount";
// import AddNewAddress from "./AddNewAddress";
import OrdersList from "./OrdersList";

function OrdersIndex() {
  const {
    user,
    selectedAccountTab,
    accountTabChild,
    setAccountTabChild,
    setAccountMobileNav,
    accountTitle,
  } = AllCtx();

  return (
    <div className="">
      {selectedAccountTab === "your_orders" && !accountTabChild && <OrdersList />}
{/* 
      {selectedAccountTab === "your_orders" &&
        accountTabChild === "claim_item" && <ClaimItem />} */}
    </div>
  );
}

export default OrdersIndex;
