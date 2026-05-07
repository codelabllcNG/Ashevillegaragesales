import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { COUNTRIES } from "@/util-functions/COUNTRIES";
import Paid from "@/components/Paid";
import secureLocalStorage from "react-secure-storage";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import { useRouter } from "next/router";
import Head from "next/head";

function Checkout() {
  const {
    setSelectedBid,

    setPickUpDays,
    pickUpStartTime,
    setPickUpStartTime,
    pickUpEndTime,
    setPickUpEndTime,
    pickUpLocation,
    setPickUpLocation,
    selectedBid,
    selectedCard,
    setSelectedCard,
    selectedAddress,

    user,
    showAlert,
    setShowAppointmentOverlay,
    triggerAlert,
    setShowSuccessfulClaimOverlay,
    appointmentDate,
    setAppointmentDate,
    appointmentTime,
    setAppointmentTime,
    setShowAlert,
    decorateDate,
    convertDate,
    userToken,
    setDeliveryAddressArray,
    deliveryAddressArray,
    setSelectedClaimedBid,
    setSelectedAddress,
    setShowChangeAddressOverlay,
    setShowChangeCardOverlay,
    deliveryType,
    setDeliveryType,
    updateSelectedBid,
    setAddCardOverlay,
    routeToOrders,
  } = AllCtx();

  const { cart, cartFees, checkout, cartDefCard, makingPayment } = useCartStore(
    (state) => state
  );
  const router = useRouter();

  var grandTotal = 0;
  const [addressType, setAddressType] = useState("saved");
  // const [pickupAppointment, setPickupAppointment] = useState("");
  const [phone, setPhone] = useState(selectedAddress?.phone_number || "");
  const [firstName, setFirstName] = useState(selectedAddress?.first_name || "");
  const [lastName, setLastName] = useState(selectedAddress?.last_name || "");
  const [addressResponse, setAddressResponse] = useState("");
  const [country, setCountry] = useState(
    selectedAddress?.country || "United States of America"
  );
  const [city, setCity] = useState(selectedAddress?.city || "");
  const [region, setRegion] = useState(selectedAddress?.region || "");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentResponse, setPaymentResponse] = useState("");
  // const [makingPayment, setMakingPayment] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [postalCode, setPostalCode] = useState(
    selectedAddress?.postal_code || ""
  );
  const [defaultAddress, setDefaultAddress] = useState("no");
  const [connecting, setConnecting] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTax, setCartTax] = useState(10.0);
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
    clearSuggestions();
    // console.log(value);
  });

  const handleInput = (e) => {
    setDeliveryAddress(e.target.value);
    // secureLocalStorage.setItem("address", e.target.value)
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setDeliveryAddress(description);
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
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

  async function confirmAddress(e) {
    // return;
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
      default: "yes",
    };

    if (!latitude || !longitude) {
      setAddressResponse(
        "While typing your address in Delivery Address input box, ensure to pick from the suggested addresses."
      );
      // console.log(dataToSubmit);
      return;
    }

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
        setConnecting(false);
        return;
      }

      if (data.addresses.length > 0) {
        const currentAddress = data.addresses.find(
          (address) => address.id === data.current
        );
        setSelectedAddress(currentAddress);
        secureLocalStorage.setItem("selectedAddress", currentAddress);
      }
      setDeliveryAddressArray(data.addresses);
      setAddressResponse("");
      setAddressType("saved");
      triggerAlert({
        message: "Address confirmed successfully!",
        color: "green",
      });
      setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setAddressResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  // //>Make Payment
  const paymentHandler = () => {
    if (deliveryType === "doorstep") {
      if (!selectedAddress?.id || !selectedCard?.id) {
        setPaymentResponse(
          "Make sure you've selected card and delivery address."
        );
        // console.log(selectedCard);
        return;
      }
    }

    if (deliveryType === "pick_up") {
      if (!appointmentDate || !appointmentTime) {
        setPaymentResponse(
          "You missed entering your appointment details. Please select a pickup schedule before you proceed."
        );
        // console.log(selectedCard);
        return;
      }
    }

    if (!userToken && !user?.email) {
      router.push("/login");
      return;
    }

    if (user?.status === "inactive") {
      router.push("/email-verification", "signup");
      return;
    }

    if (cart.length === 0) {
      router.push("/");
      return;
    }

    const dataToSubmit = {
      card_id: selectedCard?.id,
      shipping: deliveryType === "doorstep" ? "delivery" : "pick-up",
      pick_up:
        deliveryType === "pick_up"
          ? `${convertDate(
              appointmentDate
            )} ${appointmentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : "",
      address_id: deliveryType === "doorstep" ? selectedAddress?.id : "",
      platform: "web",
    };

    // console.log(dataToSubmit);
    checkout({ data: dataToSubmit, routeToOrders });
  };

  useEffect(() => {
    if (secureLocalStorage.getItem("selectedBid")) {
      setSelectedBid(secureLocalStorage.getItem("selectedBid"));
      updateSelectedBid(secureLocalStorage.getItem("selectedBid").bid_id);
    }
  }, []);

  useEffect(() => {
    if (
      !secureLocalStorage.getItem("userToken") &&
      !secureLocalStorage.getItem("user")?.email
    ) {
      router.push("/login");
    }

    if (secureLocalStorage.getItem("user")?.status === "inactive") {
      router.push("/email-verification", "signup");
      return;
    }

    if (cart.length === 0) {
      router.push("/");
    }
  }, [router]);

  // //>Fetching delivery instruction
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        // setFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-pickup-instruction`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              usertoken: secureLocalStorage.getItem("userToken"),
              useremail: secureLocalStorage.getItem("user")?.email,
            },
          }
        );

        const data = await response.json();
        // return;
        if (data.status === "fail") {
          console.log("An error occurred.");
          return;
        }

        if (!response.ok) {
          console.log("Response not OK");
          return;
        }

        setPickUpDays(data.pickup_days);
        setPickUpStartTime(data.pickup_start_time);
        setPickUpEndTime(data.pickup_end_time);
        setPickUpLocation(data.pickup_location);
        // data.default

        // setFetching(false);
        // setLoginResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        // setFetching(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const amounts = cart.map((amount) => amount.line_subtotal);
    const subtotal = amounts.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setCartSubtotal(subtotal);
  }, [cart]);

  return (
    <div className="px-3 sm:px-8 lg:px-[5rem] pt-10">
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="Shop premium items for less! From home essentials to kids' games; Asheville Garage Sales offers unbeatable deals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-5 xl:flex  gap-5 justify-between w-full h-full  ">
        {/* //> */}
        <div className="w-full xl:w-1/2 mt-8 xl:mt-0">
          <p className="text-2xl font-semibold">Checkout</p>
          {/* //>Shipping Option */}
          <div className="p-4 mt-5 rounded-md border first-letter:">
            <p className="text-base font-medium">Shipping Option </p>

            {/* //>doorstep delivery */}
            <div
              onClick={() => {
                setDeliveryType("doorstep");
              }}
              className="flex mt-3 justify-between gap-x-4 px-3 py-2 rounded-md border cursor-pointer"
            >
              <div className="flex items-center gap-x-3">
                {/* //>radio */}
                <div className="cursor-pointer flex items-center justify-center rounded-full h-4 w-4 bg-white border border-gray-500 ">
                  <div
                    className={`h-3 w-3  rounded-full ${
                      deliveryType === "doorstep" ? "bg-pry-color" : ""
                    } `}
                  ></div>
                </div>
                {/* //>front of radio */}
                <div className="">
                  <p className="text-base font-medium">Doorstep Delivery</p>

                  <p className="text-sm font-medium text-gray-500 mt-3">
                    Items are shipped to you billing address
                  </p>
                </div>
              </div>

              {/* <div>
              <p className="px-3 text-center flex items-center py-1 rounded-full border border-pry-color bg-green-50 cursor-default select-none">
                Default
              </p>
            </div> */}
            </div>

            {/* //>pick-up item */}
            <div
              onClick={() => {
                setDeliveryType("pick_up");
              }}
              className="flex mt-3 justify-between gap-x-4 px-3 py-2 rounded-md border "
            >
              <div className="flex items-center gap-x-3 w-full">
                {/* //>radio */}
                <div className="cursor-pointer flex items-center justify-center rounded-full h-4 w-4 bg-white border border-gray-500 ">
                  <div
                    className={`h-3 w-3  rounded-full ${
                      deliveryType === "pick_up" ? "bg-pry-color" : ""
                    }`}
                  ></div>
                </div>
                {/* //>front of radio */}
                <div className=" w-full">
                  <div className="flex justify-between items-center ">
                    {" "}
                    <p className="text-base font-medium">Pick-up Item</p>{" "}
                    <p
                      onClick={(e) => {
                        setShowAppointmentOverlay(true);
                      }}
                      className="text-sm text-pry-color select-none cursor-pointer font-semibold"
                    >
                      Set Appointment
                    </p>
                  </div>

                  <p className="text-sm font-medium text-gray-500 mt-3">
                    You can pick up items from the pick-up center.
                  </p>
                </div>
              </div>

              {/* <div>
              <p className="px-3 text-center flex items-center py-1 rounded-full border border-pry-color bg-green-50 cursor-default select-none">
                Default
              </p>
            </div> */}
            </div>
          </div>

          {/* //>Pickup Schedule */}
          {deliveryType === "pick_up" && (
            <div className="p-4 relative mt-5 rounded-md border first-letter: ">
              <div
                onClick={() => {
                  setShowAppointmentOverlay(true);
                }}
                className="absolute p-2 rounded-tr-md bg-pry-color rounded-bl-md right-0 top-0 cursor-pointer"
              >
                <Icon icon="ic:baseline-edit" className="w-5 h-5 text-white" />{" "}
              </div>

              <p className="text-base  font-medium">Pickup Schedule </p>

              {/* //> */}
              {appointmentDate && appointmentTime && (
                <div>
                  <p className="mt-5 text-lg">{convertDate(appointmentDate)}</p>

                  <p className="mt-2 text-lg">
                    {appointmentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="mt-2 text-sm font-medium text-pry-color">
                  8425 Old Statesville Rd Charlotte, NC 28269
                  </p>
                </div>
              )}
              {/* //> */}
              {(!appointmentDate || !appointmentTime) && (
                <p className="mt-2 text-sm font-medium text-amber-500">
                  You are yet to set appointment.
                </p>
              )}
            </div>
          )}

          {/* //>Billing Address */}
          {deliveryType === "doorstep" && (
            <div className="p-4 mt-5 rounded-md border first-letter:">
              <div className="flex justify-between items-center">
                <p className="text-base font-medium">Billing Address</p>

                <button
                  onClick={() => {
                    addressType === "saved"
                      ? setAddressType("new")
                      : (setAddressType("saved"),
                        setShowChangeAddressOverlay(true));
                  }}
                  className=" rounded-md px-5 py-3 flex border items-center gap-x-3 bg-blue-50 text-gray-800 text-base"
                >
                  {/* <Icon icon="ion:card" className="w-5 h-5" /> */}
                  {addressType === "saved"
                    ? "Change Address"
                    : " Pick From Address Book"}
                </button>
              </div>
              {/* <p className="mt-8 select-none"> Same as you default address</p> */}
              {/* //>address form */}
              {deliveryType === "doorstep" && addressType === "new" && (
                <form onSubmit={confirmAddress} className=" w-full">
                  <div className="mt-5 flex items-center justify-center w-full">
                    <div className="w-full pb-5 border rounded-md px-5 border-gray-400">
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
                            <option value={country}>
                              United States of America
                            </option>
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
                          <label
                            htmlFor="delivery_address"
                            className="font-medium"
                          >
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
         flex items-center justify-center text-red-600  rounded-md py-4     font-medium "
                    >
                      {addressResponse}
                    </p>
                  </div>

                  {/* //> Confirm Address Button */}
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
                        <Icon
                          icon="mdi:location"
                          className="w-5 h-5 text-white"
                        />{" "}
                        Confirm Address
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {deliveryType === "doorstep" && addressType === "saved" && (
                <div className="border mt-3 rounded p-2 ">
                  <p className=" ">
                    {selectedAddress?.first_name} {selectedAddress?.last_name}
                  </p>

                  <p className="text-lg font-medium text-pry-color mt-2">
                    {selectedAddress?.delivery_address}
                  </p>

                  <p className="mt-2">{selectedAddress?.phone_number}</p>
                </div>
              )}
            </div>
          )}

          {/* //>Card */}
          {(deliveryType === "doorstep" ||
            (deliveryType === "pick_up" && !selectedBid?.bid_payment)) && (
            <div className="mt-10">
              <div className="p-4 mt-5 rounded-md border first-letter:">
                <div className="flex justify-between items-center">
                  <p className="text-base font-medium">
                    Verify Payment Methods
                  </p>

                  <button
                    onClick={() => {
                      setShowChangeCardOverlay(true);
                    }}
                    className=" rounded-md px-5 py-3 flex items-center gap-x-3 bg-blue-50 text-gray-800 text-base border"
                  >
                    <Icon icon="ion:card" className="w-5 h-5" /> Change Card
                  </button>
                  {/* <button
                    onClick={() => {
                      setAddCardOverlay(true);
                    }}
                    className=" rounded-md px-5 py-3 flex items-center gap-x-3 bg-blue-50 text-gray-800 text-base border"
                  >
                    +
                  </button> */}
                </div>
                <div className="flex mt-3 justify-between gap-x-4 px-3 py-2 rounded-md border ">
                  <div className="flex items-center gap-x-3">
                    {/* //>radio */}
                    <div className="cursor-pointer flex items-center justify-center rounded-full h-4 w-4 bg-white border border-gray-500 ">
                      <div className="h-3 w-3 bg-pry-color rounded-full"></div>
                    </div>
                    {/* //>card details */}
                    <div className="flex items-center gap-x-3">
                      {/* <Icon icon="logos:mastercard" className="w-7 h-5" /> */}

                      <div>
                        <p
                          // onMouseOver={() => {
                          //   console.log(selectedBid);
                          // }}
                          className="text-base font-medium"
                        >
                          {selectedCard?.name}
                        </p>

                        <p className="text-sm font-medium text-gray-500 mt-3">
                          **** **** **** {selectedCard?.last4}{" "}
                          <span className="ml-3">{`${
                            selectedCard?.exp_month
                          }/${selectedCard?.exp_year
                            ?.toString()
                            ?.slice(-2)}`}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                <p className="px-3 text-center flex items-center py-1 rounded-full border border-pry-color bg-green-50 cursor-default select-none">
                  Default
                </p>
              </div> */}
                </div>
                <Image
                  className="mt-6"
                  src="/images/PngItem_3532675.png"
                  width={400}
                  height={70}
                  alt="secured by stripe"
                />
              </div>
            </div>
          )}
        </div>

        {/* //> Item details */}
        <div className="w-full xl:w-1/2 mt-5 xl:mt-0">
          <div className=" border rounded p-4">
            <p className="font-semibold text-2xl">Cart Items</p>

            {cart?.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between items-center   overflow-x-scroll scrollbar-hide  gap-x-3 mt-7 w-full"
              >
                <Image
                  unoptimized
                  className="rounded-md"
                  alt="Product Image"
                  src={item.product_image || "/images/placeholder.jpg"}
                  width={80}
                  height={70}
                />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-center gap-x-5">
                    <p className=" font-medium ">{item.product_name}</p>
                    <p className="text-xs font-medium ">qty: {item.quantity}</p>
                    <p className=" text-xl font-semibold text-pry-color">
                      $
                      {parseFloat(item.line_subtotal)
                        .toFixed(2)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-dashed my-5 border-gray-400"></div>

            <div className="flex items-center justify-between gap-x-5 mt-3">
              <div className="flex">
                <p className="text-lg text-gray-500 font-medium">Tax</p>
              </div>
              <p className="text-lg font-medium">
                ${cartFees?.tax}{" "}
                <span className="text-xs">({cartFees?.tax_percentage}%)</span>
              </p>
            </div>

            <div className="flex items-center justify-between gap-x-5 mt-3">
              <div className="flex">
                <p className="text-lg text-gray-500 font-medium">Subtotal</p>
              </div>
              <p className="text-lg font-medium">
                ${parseFloat(cartFees?.cart_total).toFixed(2).toLocaleString()}
              </p>
            </div>

            {deliveryType === "doorstep" && (
              <div className="flex items-center justify-between gap-x-5 mt-3">
                <p className="text-lg text-gray-500 font-medium">Delivery</p>
                {/* <ShippingFee
              addressID={selectedAddress?.id}
              bidID={selectedBid.bid_id}
            /> */}

                <p className="text-lg font-medium">
                  $
                  {parseFloat(cartFees?.shipping_fee)
                    .toFixed(2)
                    .toLocaleString()}
                </p>
              </div>
            )}

            <div className="border-t border-dashed my-5 border-gray-400"></div>

            <div className="flex items-center justify-between gap-x-5 mt-3">
              <div className="flex">
                <p className="text-lg text-gray-500 font-medium">Grand Total</p>
                {/* {selectedBid?.bid_payment && <Paid />} */}
              </div>
              <p className="text-lg font-medium">
                $
                {deliveryType === "doorstep"
                  ? parseFloat(
                      +cartFees?.cart_total +
                        +cartFees?.tax +
                        +cartFees?.shipping_fee
                    )
                      .toFixed(2)
                      .toLocaleString()
                  : parseFloat(+cartFees?.cart_total + +cartFees?.tax)
                      .toFixed(2)
                      .toLocaleString()}
              </p>
            </div>
            {/* 
            <div className="flex items-center justify-between gap-x-5 mt-3">
              <p className="text-lg text-gray-600 font-medium">Grand Total</p>
              {selectedBid?.bid_payment &&
                // <ShippingFee
                //   addressID={selectedAddress?.id}
                //   bidID={selectedBid.bid_id}
                // />

                (deliveryType === "doorstep"
                  ? ((grandTotal = parseFloat(+selectedBid?.shipping_fee)
                      .toFixed(2)
                      .toLocaleString()),
                    (<p className="text-lg font-medium">${grandTotal}</p>))
                  : ((grandTotal = 0),
                    (<p className="text-lg font-medium">${grandTotal}</p>)))}
              {!selectedBid?.bid_payment &&
                ((grandTotal = parseFloat(
                  +selectedBid?.current_bid +
                    +selectedBid?.lot_fee +
                    // +selectedBid?.buyers_premium +
                    +selectedBid?.bid_tax +
                    (deliveryType === "doorstep"
                      ? +selectedBid?.shipping_fee
                      : 0)
                )
                  .toFixed(2)
                  .toLocaleString()),
                (
                  <p className="text-lg font-medium text-pry-color">
                    ${grandTotal}
                  </p>
                ))}
            </div> */}

            {/* //>Payment Response */}
            <div
              className={`${
                paymentResponse ? "flex" : "hidden"
              } justify-center items-center mt-5`}
            >
              <p
                // type="button"
                className="w-[95%] 
          flex items-center justify-center text-red-600  rounded-md py-4 px-2    font-medium "
              >
                {paymentResponse}
              </p>
            </div>

            <button
              disabled={makingPayment}
              onClick={() => {
                paymentHandler();
              }}
              className="py-2 mt-5 w-full rounded-md bg-pry-color text-white duration-300 hover:bg-opacity-80 text-lg font-semibold"
            >
              {/* {grandTotal > 0 ? "Make Payment" : "Proceed"} */}
              {makingPayment ? "Making payment..." : " Make Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
