import AllCtx from "@/util-functions/allCtx";
import React from "react";
// import ViewAccount from './ViewAccount';
// import EditInformation from './EditInformation';
import AddressBookList from "./AddressBookList";
import ViewAccount from "../my-account/ViewAccount";
import AddNewAddress from "./AddNewAddress";
import EditAddress from "./EditAddress";

function AddressBook() {
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
      {selectedAccountTab === "address_book" && !accountTabChild && (
        <AddressBookList />
      )}

      {selectedAccountTab === "address_book" &&
        accountTabChild === "add_new_address" && <AddNewAddress />}

      {selectedAccountTab === "address_book" &&
        accountTabChild === "edit_address" && <EditAddress />}
    </div>
  );
}

export default AddressBook;
