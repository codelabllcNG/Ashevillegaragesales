import ShareBidCountdown from "@/components/countdowns/ShareBidCountdown";
import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import {
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFlash } from "react-icons/io5";
import PhoneInput from "react-phone-number-input";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { COUNTRIES } from "@/util-functions/COUNTRIES";
import secureLocalStorage from "react-secure-storage";
// import ShareBidCountdown from "../countdowns/ShareBidCountdown";

function AddAddressOverlay() {
  const {
    setShowAddAddressOverlay,
    selectedBid,
    productionShareLink,
    localHostShareLink,
    selectedAccountTab,
    accountTitle,
    accountTabChild,
    setAccountTabChild,
    user,
    showAlert,
    triggerAlert,
    setShowAlert,
    userToken,
    setDeliveryAddressArray,
    deliveryAddressArray,
    setSelectedAddress,
  } = AllCtx();

  const [phone, setPhone] = useState(user?.phone_number || "");
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [addressResponse, setAddressResponse] = useState("");
  const [country, setCountry] = useState(
    user?.country || "United States of America"
  );
  const [city, setCity] = useState(user?.city || "");
  const [region, setRegion] = useState(user?.region || "");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("yes");
  const [connecting, setConnecting] = useState(false);
  // const [gender, setGender] = useState("");
  // const [email, setEmail] = useState("");

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: ["us"] },
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
    // console.log(value);
  });

  const handleInput = (e) => {
    // Update the keyword of the input element

    setDeliveryAddress(e.target.value);
    // secureLocalStorage.setItem("address", e.target.value)
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setDeliveryAddress(description);
      setValue(description, false);
      clearSuggestions();
      // console.log(description);

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        // console.log(" Coordinates: ", { lat, lng });
        setLatitude(lat);
        setLongitude(lng);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <span
          onClick={() => {
            // setValidAddressPicked(true)
          }}
          key={place_id}
        >
          <li
            className="cursor-pointer hover:bg-gray-50"
            onClick={handleSelect(suggestion)}
          >
            <span className="font-semibold">{main_text}</span>{" "}
            <span>{secondary_text}</span>
          </li>
        </span>
      );
    });

  async function addNewAddress(e) {
    e.preventDefault();

    const dataToSubmit = {
      first_name: firstName,
      last_name: lastName,
      delivery_address: deliveryAddress,
      phone_number: phone,
      postal_code: postalCode,
      city: city,
      region: region,
      country: country,
      latitude: latitude,
      longitude: longitude,
      default: defaultAddress,
    };

    if (!latitude || !longitude) {
      setAddressResponse(
        "While typing your address in Delivery Address input box, ensure to pick from the suggested addresses..!"
      );
      // console.log(dataToSubmit);
      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      setAddressResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-address`,
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
        setAddressResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setAddressResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");

        setConnecting(false);
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
      setAddressResponse("");
      triggerAlert({
        message: "New address added successfully!",
        color: "green",
      });
      setConnecting(false);
      setAccountTabChild("");
      setShowAddAddressOverlay(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setAddressResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [copied, setCopied] = useState(false);

  return (
    <div
      onClick={() => {
        setShowAddAddressOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden  "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  max-h-[90%]  bg-white overflow-y-scroll border-pry-color border  pb-8"
      >
        <div className="flex relative items-center justify-start sm:justify-center px-32 sm:px-36 bg-pry-color rounded-t-md py-2 ">
          <div className="  text-white sm:text-xl flex items-center gap-x-2">
            Add new address
          </div>

          <div className="absolute right-0 flex items-center justify-end">
            <div
              onClick={() => {
                setShowAddAddressOverlay(false);
              }}
              className="flex justify-center items-center p-1 mr-2  cursor-pointer rounded-full bg-white"
            >
              <IoIosCloseCircle className="w-7 h-7 text-pry-color" />
            </div>
          </div>
        </div>

        <form onSubmit={addNewAddress} className=" w-full">
          <div className="mt-2 flex items-center justify-center w-full">
            <div className="w-full pb-5  rounded-md px-5 border-gray-400">
              <div className="lg:flex items-center justify-between gap-x-5">
                {/* //> First Name */}
                <div className="flex justify-center items-center lg:w-1/2 mt-3">
                  <div className=" w-full flex flex-col">
                    <label htmlFor="first_name" className="font-medium">
                      First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                      placeholder="John"
                    />
                  </div>
                </div>

                {/* //> Last Name */}
                <div className="flex justify-center items-center lg:w-1/2 mt-3">
                  <div className=" w-full flex flex-col">
                    <label htmlFor="last_name" className="font-medium">
                      Last Name
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                      placeholder="Sturgis"
                    />
                  </div>
                </div>
              </div>

              {/* //> Phone  */}
              <div className="flex justify-center items-center  mt-3">
                <div className="w-full flex flex-col">
                  <label htmlFor="phone">Phone Number</label>
                  <PhoneInput
                    //   inputComponent="textarea"
                    required
                    international
                    // country="US"
                    defaultCountry="US"
                    countryCallingCodeEditable={true}
                    className=" border-gray-400  rounded py-2 px-3 text-xl font-medium placeholder:text-gray-400 border"
                    // placeholder="Phone"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
              </div>

              {/* //> Country*/}
              <div className="flex justify-center items-center mt-3">
                <div className=" w-full flex flex-col">
                  <label htmlFor="country" className="font-medium">
                    Country
                  </label>
                  <select
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    required
                    name="country"
                    id="country"
                    className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                    placeholder=""
                  >
                    <option value={country}>United States of America</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lg:flex items-center justify-between gap-x-5">
                {/* //> City*/}
                <div className="flex justify-center items-center lg:w-1/2 mt-3">
                  <div className=" w-full flex flex-col">
                    <label htmlFor="city" className="font-medium">
                      City
                    </label>
                    <input
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      type="text"
                      required
                      name="city"
                      id="city"
                      className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                      placeholder="Input your region"
                    />
                  </div>
                </div>

                {/* //> Region */}
                <div className="flex justify-center items-center lg:w-1/2 mt-3">
                  <div className=" w-full flex flex-col">
                    <label htmlFor="region" className="font-medium">
                      Region
                    </label>
                    <input
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                      }}
                      required
                      type="text"
                      name="region"
                      id="region"
                      className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                      placeholder="Input your region"
                    />
                  </div>
                </div>
              </div>

              {/* //> Delivery Address */}
              <div
                ref={ref}
                className="flex justify-center items-center mt-3 relative"
              >
                <div className=" w-full flex flex-col">
                  <label htmlFor="delivery_address" className="font-medium">
                    Delivery Address
                  </label>
                  <input
                    value={deliveryAddress}
                    onChange={handleInput}
                    required
                    type="text"
                    name="delivery_address"
                    id="delivery_address"
                    className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                    placeholder="Enter delivery address"
                  />
                </div>
                {status === "OK" && (
                  <ul className="absolute bg-white w-full top-20 px-3 rounded-xl shadow-lg pb-3 text-base z-10 space-y-2">
                    {renderSuggestions()}
                  </ul>
                )}
              </div>

              {/* //> Postal Code */}
              <div className="flex justify-center items-center  mt-3">
                <div className=" w-full flex flex-col">
                  <label htmlFor="postal_code" className="font-medium">
                    Postal Code
                  </label>
                  <input
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                    required
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                    placeholder="Enter postal code"
                  />
                </div>
              </div>

              {/* //>  */}
              <div
                onClick={() => {
                  setDefaultAddress(defaultAddress === "yes" ? "no" : "yes");
                }}
                className="select-none  cursor-pointer flex justify-between items-center  mt-5"
              >
                Set as Default Address
                <label
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    onChange={() => {
                      setDefaultAddress(
                        defaultAddress === "yes" ? "no" : "yes"
                      );
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
                    checked={defaultAddress === "yes"}
                    type="checkbox"
                    value={defaultAddress}
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
          </div>

          {/* //> Response */}
          <div
            className={`${
              addressResponse ? "flex" : "hidden"
            } justify-center items-center mt-5`}
          >
            <p
              // type="button"
              className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
            >
              {addressResponse}
            </p>
          </div>

          {/* //> Save Button */}
          <div className="mt-5 flex items-center justify-center w-full">
            <div className="lg:w-[80%] w-[98%] flex justify-between items-center gap-x-5">
              <button
                // onClick={() => {
                //   setAccountTabChild("");
                //   triggerAlert({message: "New Address Saved!", color: "green"});
                // }}
                disabled={connecting}
                className="bg-pry-color text-white hover:bg-opacity-80 duration-300 text-sm font-semibold px-5
            lg:px-7 py-3 md:py-3 rounded-md flex justify-center items-center gap-x-2 w-full"
              >
                {" "}
                <Icon icon="mdi:location" className="w-5 h-5 text-white" /> Save
                New Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAddressOverlay;
