import AllCtx from "@/util-functions/allCtx";
import React from "react";
// import ViewAccount from './ViewAccount';
// import EditInformation from './EditInformation';
// import AddressBookList from "./AddressBookList";
// import ViewAccount from "../my-account/ViewAccount";
// import AddNewAddress from "./AddNewAddress";
import BidList from "./BidList";

function ActiveBidsIndex() {
  const {
    user,
    selectedAccountTab,
    accountTabChild,
    setAccountTabChild,
    setAccountMobileNav,
    accountTitle,
  } = AllCtx();

  return (
    <div>
    
      {selectedAccountTab === "active_bids" && !accountTabChild && (
        <BidList />
      )}


    </div>
  );
}

export default ActiveBidsIndex;
