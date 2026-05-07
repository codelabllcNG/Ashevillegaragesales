import AllCtx from "@/util-functions/allCtx";
import React from "react";
import CardList from "./CardList";

function CardInformation() {
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
      {selectedAccountTab === "card_information" && !accountTabChild && (
        <CardList/>
      )}
      {/* {selectedAccountTab === "my_account" &&
        accountTabChild === "edit_information" && <EditInformation />} */}
    </div>
  );
}

export default CardInformation;
