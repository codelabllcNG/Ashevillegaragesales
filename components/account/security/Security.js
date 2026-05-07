import AllCtx from "@/util-functions/allCtx";
import React, { useEffect, useRef } from "react";
import ChangePassword from "./ChangePassword";

function Security() {
  const {
    user,
    selectedAccountTab,
    accountTabChild,
    setAccountTabChild,
    setAccountMobileNav,
    accountTitle,
  } = AllCtx();
  

  return (
    <div  className="">
      {selectedAccountTab === "security" && !accountTabChild && (
        <ChangePassword />
      )}
     
    </div>
  );
}

export default Security;
