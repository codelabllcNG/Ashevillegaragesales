import AllCtx from "@/util-functions/allCtx";
import React from "react";
import ViewAccount from "./ViewAccount";
import EditInformation from "./EditInformation";

function MyAccount() {
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
      {selectedAccountTab === "my_account" && !accountTabChild && (
        <ViewAccount />
      )}
      {selectedAccountTab === "my_account" &&
        accountTabChild === "edit_information" && <EditInformation />}
    </div>
  );
}

export default MyAccount;
