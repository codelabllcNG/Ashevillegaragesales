import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

function AddressBookList() {
  const {
    setDeliveryAddressArray,
    deliveryAddressArray,
    user,
    userToken,
    triggerAlert,
    selectedAddress,
    setSelectedAddress,
    setAccountTabChild,
    defaultAddressID,
    setDefaultAddressID,
  } = AllCtx();

  const [fetching, setFetching] = useState(false);

  // //>Fetch addresses
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-address`,
          {
            cache: 'no-store',
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
          setFetching(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetching(false);
          return;
        }
        // console.log(data);

        // return;

        if (data.data.length > 0) {
          const defaultAddress = data.data.find(
            (address) => address.id === data.default
          );
          setSelectedAddress(defaultAddress);
          secureLocalStorage.setItem("selectedAddress", defaultAddress)
        }

        setDeliveryAddressArray(data.data);
        setDefaultAddressID(data.default);

        setFetching(false);
        // setLoginResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetching(false);
      }
    }
    
    if (secureLocalStorage.getItem("user")) {
      fetchData();
    }
  }, []);

  // //>Set as default
  async function setAsDefault(addressID) {
    if (addressID === defaultAddressID) {
      triggerAlert({
        message: "You must have a default address.",
        color: "red",
      });
      return;
    }

    if (deliveryAddressArray.length === 1 && addressID === defaultAddressID) {
      triggerAlert({
        message: "You must have a default address.",
        color: "red",
      });
      return;
    }

    let reservedAddressID = defaultAddressID;
    setDefaultAddressID(addressID);

    // return

    const dataToSubmit = {
      id: addressID,
    };

    // console.log(dataToSubmit);
    // return

    try {
      const response = await fetch(
        // setConnecting(true);
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/set-default-address`,
        {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // console.log(data);
        console.log("An error occurred.");
        setDefaultAddressID(reservedAddressID);
        triggerAlert({
          message: "Updating default address failed!",
          color: "red",
        });

        // setConnecting(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setDefaultAddressID(reservedAddressID);
        triggerAlert({
          message: "Updating default address failed!",
          color: "red",
        });
        // setConnecting(false);
        return;
      }
      // console.log(data);

      // return;
      if (data.addresses.length > 0) {
        const defaultAddress = data.addresses.find(
          (address) => address.id === data.default
        );
        setSelectedAddress(defaultAddress);
        secureLocalStorage.setItem("selectedAddress", defaultAddress)
      }
      setDeliveryAddressArray(data.addresses);
      setDefaultAddressID(data.default);
      // triggerAlert({
      //   message: "Default!",
      //   color: "green",
      // })
      // setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setDefaultAddressID(reservedAddressID);
      triggerAlert({
        message: "Updating default address failed!",
        color: "red",
      });
      // setConnecting(false);
    }
  }

  // //>Delete address HANDLER
  async function deleteAddress(addressID) {
    let duplicateArray = deliveryAddressArray;
    let reservedAddressID = defaultAddressID;

    const updatedArray = duplicateArray.filter(
      (address) => address.id !== addressID
    );

    let shouldDelete = confirm("Do you really want to delete this address?");
    if (shouldDelete) {
      setDeliveryAddressArray(updatedArray);
      triggerAlert({ message: "Address deleted!", color: "green" });
    } else {
      return;
    }

    // return

    try {
      const response = await fetch(
        // setConnecting(true);
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/remove-address?id=${selectedAddress.id}`,
        {
          method: "DELETE",
          // body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // console.log(data);
        console.log("An error occurred.");
        setDeliveryAddressArray(duplicateArray);
        triggerAlert({
          message: "Deleting address failed!",
          color: "red",
        });

        // setConnecting(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setDeliveryAddressArray(duplicateArray);
        triggerAlert({
          message: "Deleting address failed!",
          color: "red",
        });
        // setConnecting(false);
        return;
      }
      // console.log(data);

      // return;
      if (data.addresses.length > 0) {
        const defaultAddress = data.addresses.find(
          (address) => address.id === data.default
        );
        setSelectedAddress(defaultAddress);
        secureLocalStorage.setItem("selectedAddress", defaultAddress)
      }
      setDeliveryAddressArray(data.addresses);
      setDefaultAddressID(data.default);
      triggerAlert({
        message: "Address deleted successfully!",
        color: "green",
      });
      // setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setDeliveryAddressArray(duplicateArray);
      setDefaultAddressID(reservedAddressID);
      triggerAlert({
        message: "Deleting address failed!",
        color: "red",
      });
      // setConnecting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-7 mt-10">
      {fetching && deliveryAddressArray.length === 0 && (
        <p>Loading addresses... Please wait.</p>
      )}

      {!fetching && deliveryAddressArray.length === 0 && (
        <p>You have not added any delivery address.</p>
      )}

      {deliveryAddressArray.length > 0 &&
        deliveryAddressArray.map((address) => (
          <div
            onMouseOver={() => {
              setSelectedAddress(address);
              secureLocalStorage.setItem("selectedAddress", address)
              // console.log(address);
            }}
            onTouchStart={() => {
              setSelectedAddress(address);
              secureLocalStorage.setItem("selectedAddress", address)
            }}
            key={address.id}
            className="border  rounded p-2 "
          >
            <div className="flex justify-between items-center ">
              {address.first_name} {address.last_name}
              <div className="flex justify-end gap-x-3 items-center">
                <Icon
                  onClick={() => {
                    setAccountTabChild("edit_address");
                  }}
                  icon="clarity:edit-solid"
                  className="w-5 h-5 cursor-pointer"
                />
                <Icon
                  onClick={() => {
                    deleteAddress(address.id);
                  }}
                  icon="fluent:delete-20-filled"
                  className="w-5 cursor-pointer h-5"
                />
              </div>{" "}
            </div>

            <p className="text-lg font-medium text-pry-color mt-2">
              {address.delivery_address}
            </p>

            <p className="mt-2">{address.phone_number}</p>

            <div className="mt-2 py-2 flex justify-between items-center">
              Set Default
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  onChange={() => {
                    setAsDefault(address.id);
                    // const newProductArray = [...dashboardProductArray];
                    // const productToEdit = newProductArray.find(
                    //   (prod) => prod.id === product.id
                    // );
                    // // console.log(productToEdit.status);
                    // productToEdit.status === "publish"
                    //   ? (productToEdit.status = "draft")
                    //   : (productToEdit.status = "publish");
                    // // console.log(productToEdit.status);
                    // setDashboardProductArray(newProductArray);
                    // // return;
                    // updateProductStatus({
                    //   productName: product.name,
                    //   productID: product.id,
                    //   // productCategory: product.category[0].name,
                    //   // productImage: product.
                    //   productPrice: product.price,
                    //   // productQuantity,
                    //   // productDescription,
                    //   productStatus: productToEdit.status,
                    //   businessID: product.business_id,
                    //   // productSKU,
                    // });
                  }}
                  checked={address.id === defaultAddressID}
                  type="checkbox"
                  value=""
                  className="sr-only peer "
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-pry-color"></div>
                {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {item.status === "publish"
                        ? "Available"
                        : "Unavailable"}
                    </span> */}
              </label>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AddressBookList;
