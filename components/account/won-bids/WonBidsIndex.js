import AllCtx from "@/util-functions/allCtx";
import React from "react";
import BidList from "./BidList";
import ClaimItem from "./ClaimItem";
// import ViewAccount from './ViewAccount';
// import EditInformation from './EditInformation';
// import AddressBookList from "./AddressBookList";
// import ViewAccount from "../my-account/ViewAccount";
// import AddNewAddress from "./AddNewAddress";
// import BidList from "./BidList";
// import ClaimItem from "../orders/ClaimItem";

function WonBidsIndex() {
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
    
      {selectedAccountTab === "won_bids" && !accountTabChild && (
        <BidList />
      )}

{selectedAccountTab === "won_bids" && accountTabChild === "claim_item" && (
        <ClaimItem />
      )}


    </div>
  );
}

export default WonBidsIndex;
