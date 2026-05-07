import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { format, parseISO } from "date-fns";
const AllContext = createContext();

export function AllContextProvider(props) {
  const [menuClicked, setMenuClicked] = useState(false);
  const [selectedAccordion, setSelectedAccordion] = useState("");
  const [selectedAccordionChild, setSelectedAccordionChild] = useState("");
  const [showPlaceBidOverlay, setShowPlaceBidOverlay] = useState(false);
  const [emailNotificationStatus, setEmailNotificationStatus] = useState("on");
  const [notificationChoices, setNotificationChoices] = useState([
    "bid",
    "auction",
    "payment",
    "refund",
    "other",
  ]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [reservedNotificationChoices, setReservedNotificationChoices] =
    useState(["bid", "auction", "payment", "refund", "other"]);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [pickUpDays, setPickUpDays] = useState(["1", "2", "3", "4", "5"]);
  const [pickUpStartTime, setPickUpStartTime] = useState("10:00");
  const [pickUpEndTime, setPickUpEndTime] = useState("18:00");
  const [pickUpLocation, setPickUpLocation] = useState(
    "8425 Old Statesville Rd Charlotte, NC 28269"
  );
  const [deliveryType, setDeliveryType] = useState("pick_up");
  const [showBuyNowConfirmation, setShowBuyNowConfirmation] = useState(false);
  const [ongoingBidsCountdownString, setOngoingBidsCountdownString] =
    useState("");
  const [activeBidsCountdownString, setActiveBidsCountdownString] =
    useState("");
  const [auctionCountdownString, setAuctionCountdownString] = useState("");
  const [heroCountdownString, setHeroCountdownString] = useState("");
  const [placeBidCountdownString, setPlaceBidCountdownString] = useState("");
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState("");
  const [fetchingOngoingBids, setFetchingOngoingBids] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [userDropdown, setUserDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [ongoingBids, setOngoingBids] = useState([]);
  const [duplicatedOngoingBids, setDuplicatedOngoingBids] = useState([]);
  const [notificationArray, setNotificationArray] = useState([]);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const [trendingBids, setTrendingBids] = useState([]);
  const [duplicatedTrendingBids, setDuplicatedTrendingBids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [duplicatedCategories, setDuplicatedCategories] = useState([]);
  const [wonBids, setWonBids] = useState([]);
  const [isSurvey, setIsSurvey] = useState(false);
  const [showSubmitSurveyOverlay, setShowSubmitSurveyOverlay] = useState(false);
  const [duplicatedWonBids, setDuplicatedWonBids] = useState([]);
  const [helpDropdown, setHelpDropdown] = useState(false);
  const [buyNowResponse, setBuyNowResponse] = useState("");
  const [buying, setBuying] = useState(false);
  const [itemBought, setItemBought] = useState(false);
  const [pastBids, setPastBids] = useState([]);
  const [auctionLots, setAuctionLots] = useState([]);
  const [duplicatedPastBids, setDuplicatedPastBids] = useState([]);
  const [auctionDetails, setAuctionDetails] = useState([]);
  const [activeBids, setActiveBids] = useState([]);
  const [duplicatedActiveBids, setDuplicatedActiveBids] = useState([]);

  const [regResponse, setRegResponse] = useState("");

  const [shareBidOverlay, setShareBidOverlay] = useState(false);
  const [showProductRequestOverlay, setShowProductRequestOverlay] =
    useState(false);
  const [notificationOverlay, setNotificationOverlay] = useState(false);
  const [auctionNotificationOverlay, setAuctionNotificationOverlay] =
    useState(false);

  const [selectedNavLink, setSelectedNavLink] = useState("home");
  const [selectedAccountTab, setSelectedAccountTab] = useState("my_account");
  const [accountTitle, setAccountTitle] = useState("My Account");
  const [accountTabChild, setAccountTabChild] = useState("");
  const [accountMobileNav, setAccountMobileNav] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [addCardOverlay, setAddCardOverlay] = useState(false);
  const [showChangeAddressOverlay, setShowChangeAddressOverlay] =
    useState(false);
  const [showBuyNowOverlay, setShowBuyNowOverlay] = useState(false);
  const [alertText, setAlertText] = useState("green");
  const [alertColor, setAlertColor] = useState("");

  const [deliveryAddressArray, setDeliveryAddressArray] = useState([]);
  const [ATMcardArray, setATMcardArray] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState([]);
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [closedAuctions, setClosedAuctions] = useState([]);

  const [deliveryAddress, setDeliveryAddress] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchSuggestionList, setSearchSuggestionList] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [bidType, setBidType] = useState("quick");
  const [defaultAddressID, setDefaultAddressID] = useState("");
  const [defaultCardID, setDefaultCardID] = useState("");
  const [selectedBid, setSelectedBid] = useState({});
  const [itemCategories, setItemCategories] = useState({});
  const [highestBid, setHighestBid] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searching, setSearching] = useState(false);
  const [showSurveyVideo, setShowSurveyVideo] = useState(false);
  const [showChangeCardOverlay, setShowChangeCardOverlay] = useState(false);
  const [showAddAddressOverlay, setShowAddAddressOverlay] = useState(false);
  const [selectedClaimedBid, setSelectedClaimedBid] = useState(false);
  const [showSuccessfulClaimOverlay, setShowSuccessfulClaimOverlay] =
    useState(false);
  const [showAppointmentOverlay, setShowAppointmentOverlay] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [catID, setCatID] = useState("");
  const [shippingType, setShippingType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [shippingFee, setShippingFee] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});

  const [bidResponse, setBidResponse] = useState(
    bidType === "proxy"
      ? "Enhance winning odds by placing a maximum bid; Asheville Garage Sales raises bids incrementally until the set limit is reached."
      : ""
  );

  const [localHostShareLink, setLocalHostShareLink] = useState(
    "https://ashvillegaragesale.com"
  );

  const referralBaseUrl = "https://ashvillegaragesale.com/?ref=";

  const [productionShareLink, setProductionShareLink] = useState(
    "https://ashvillegaragesale.com"
  );

  const [selectedAuctionTab, setSelectedAuctionTab] =
    useState("current_auctions");

  const router = useRouter();

  const context = {
    menuClicked,
    deliveryType,
    convertDate,
    setDeliveryType,
    filteredProducts,
    setFilteredProducts,
    selectedProduct,
    setSelectedProduct,
    referralCode,
    setReferralCode,
    showAddAddressOverlay,
    fetchingOngoingBids,
    setFetchingOngoingBids,
    reservedNotificationChoices,
    defaultCardID,
    shippingType,
    auctionNotificationOverlay,
    showBuyNowConfirmation,
    setShowBuyNowConfirmation,
    notificationArray,
    buyNowResponse,
    setBuyNowResponse,
    buying,
    setBuying,
    itemBought,
    setItemBought,
    fetchingNotifications,
    showChangeCardOverlay,
    searching,
    selectedClaimedBid,
    bidResponse,
    showBuyNowOverlay,
    buyNowTrigger,
    pickUpDays,
    setPickUpDays,
    pickUpStartTime,
    setPickUpStartTime,
    showProductRequestOverlay,
    setShowProductRequestOverlay,
    pickUpEndTime,
    setPickUpEndTime,
    pickUpLocation,
    setPickUpLocation,
    emailNotificationStatus,
    notificationChoices,
    showSuccessfulClaimOverlay,
    loginResponse,
    currentAuctions,
    showAppointmentOverlay,
    catID,
    selectedAuctionTab,
    helpDropdown,
    showSurveyVideo,
    searchKeyword,
    searchSuggestionList,
    upcomingAuctions,
    closedAuctions,
    selectedCategory,
    localHostShareLink,
    referralBaseUrl,
    routeToOrders,
    productionShareLink,
    selectedCard,
    showChangeAddressOverlay,
    showSubmitSurveyOverlay,
    auctionLots,
    duplicatedOngoingBids,
    duplicatedTrendingBids,
    wonBids,
    duplicatedWonBids,
    selectedAuction,
    activeBids,
    categories,
    duplicatedCategories,
    auctionDetails,
    highestBid,
    selectedAddress,
    selectedBid,
    deliveryAddressArray,
    defaultAddressID,
    shippingFee,
    ATMcardArray,
    deliveryAddress,
    bidType,
    alertColor,
    duplicatedActiveBids,
    shareBidOverlay,
    userToken,
    ongoingBids,
    alertText,
    showAlert,
    accountMobileNav,
    accountTabChild,
    notificationOverlay,
    selectedAccountTab,
    isSurvey,
    accountTitle,
    loggingOut,
    showPassword,
    regResponse,
    userDropdown,
    phone,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    addCardOverlay,
    trendingBids,
    selectedAccordion,
    selectedAccordionChild,
    showPlaceBidOverlay,
    appointmentDate,
    appointmentTime,
    isLoggedIn,
    user,
    selectedNavLink,
    pastBids,
    duplicatedPastBids,

    // Demarcation
    setMenuClicked,
    setLocalHostShareLink,
    updateCountdownSelectedBid,
    setShippingType,
    setLoginResponse,
    setShowChangeCardOverlay,
    updateCountdownOngoingBids,
    setHelpDropdown,
    setCurrentAuctions,
    decorateDate,
    setNotificationChoices,
    setShowBuyNowOverlay,
    routeToClaimPage,
    setEmailNotificationStatus,
    setDefaultCardID,
    setSearching,
    setShowChangeAddressOverlay,
    updateAuctionDetails,
    setSelectedCard,
    setAuctionNotificationOverlay,
    setReservedNotificationChoices,
    setShowAddAddressOverlay,
    setUpcomingAuctions,
    setShowSurveyVideo,
    setNotificationArray,
    setFetchingNotifications,
    setSearchKeyword,
    setSearchSuggestionList,
    setBidResponse,
    setClosedAuctions,
    setAuctionLots,
    setCategories,
    setDuplicatedCategories,
    setAuctionDetails,
    setProductionShareLink,
    setSelectedClaimedBid,
    setSelectedAuction,
    setDuplicatedOngoingBids,
    setDuplicatedTrendingBids,
    setIsSurvey,
    setTrendingBids,
    setCatID,
    setSelectedBid,
    setWonBids,
    setDuplicatedWonBids,
    findBid,
    locateBidOutbid,
    locateBidWon,
    setBidType,
    setLoggingOut,
    setDefaultAddressID,
    setPastBids,
    setSelectedAuctionTab,
    setDuplicatedPastBids,
    formatDOB,
    setDeliveryAddressArray,
    setATMcardArray,
    setDuplicatedActiveBids,
    setUserToken,
    setShowAlert,
    setAlertText,
    buyNow,
    setRegResponse,
    setShowPassword,
    setAlertColor,
    setSelectedAccountTab,
    setOngoingBids,
    setShowSubmitSurveyOverlay,
    logOut,
    setSelectedCategory,
    setAccountTitle,
    setActiveBids,
    setShareBidOverlay,
    setSelectedNavLink,
    setNotificationOverlay,
    setPhone,
    setSelectedAddress,
    setShippingFee,
    fetchShippingFee,
    setShowSuccessfulClaimOverlay,
    setDeliveryAddress,
    setFirstName,
    resendOTP,
    setAccountMobileNav,
    setLastName,
    setPassword,
    setConfirmPassword,
    setEmail,
    updateTrendingBids,
    setSelectedAccordion,
    setSelectedAccordionChild,
    setHighestBid,
    setShowPlaceBidOverlay,
    setIsLoggedIn,
    setAddCardOverlay,
    setUser,
    setUserDropdown,
    setAccountTabChild,
    updateSelectedBid,
    triggerAlert,
    setAppointmentDate,
    setAppointmentTime,
    formatDate,
    filterByCategory,
    refreshOngoingAndTrendingBids,
    setShowAppointmentOverlay,
    getRelatedSearch,
    makeGeneralSearch,
    fetchAddressList,
    fetchCardList,
    convertCountdownToSeconds,
    updateOngoingBids,
    handleFilter,
    setNotificationPreference,
    fetchNotificationPreference,
  };

  ////> Update user profile
  useEffect(() => {
    async function fetchData() {
      // console.log(formatDOB(user?.dob));
      try {
        // setLoginResponse("Please wait...");
        // setFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-profile`,
          {
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
          // setFetching(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          // setFetching(false);
          return;
        }
        // console.log(data);

        // return;

        setUser(data.user_details);
        // setUserToken(data.security.token);
        secureLocalStorage.setItem("user", data.user_details);
        // secureLocalStorage.setItem("userToken", data.security.token);
        setFetching(false);
        // setLoginResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        // setFetching(false);
      }
    }
    if (user) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    // if (secureLocalStorage.getItem("isLoggedIn")) {
    //   setIsLoggedIn(secureLocalStorage.getItem("isLoggedIn"));
    // }

    if (secureLocalStorage.getItem("user")) {
      setUser(secureLocalStorage.getItem("user"));
    }

    if (secureLocalStorage.getItem("selectedCard")) {
      setSelectedCard(secureLocalStorage.getItem("selectedCard"));
    }

    if (secureLocalStorage.getItem("selectedAddress")) {
      setSelectedAddress(secureLocalStorage.getItem("selectedAddress"));
    }

    if (secureLocalStorage.getItem("selectedAuction")) {
      setSelectedAuction(secureLocalStorage.getItem("selectedAuction"));
    }

    if (!secureLocalStorage.getItem("userToken")) {
      secureLocalStorage.removeItem("user");
      setUserToken("");
    }

    if (secureLocalStorage.getItem("userToken")) {
      setUserToken(secureLocalStorage.getItem("userToken"));
    }

    // console.log(secureLocalStorage.getItem("user"));
  }, []);

  // useEffect(() => {
  //   const handleBackButtonClick = (e) => {
  //     alert("Back button clicked!");
  //     e.preventDefault();
  //   };

  //   alert("Adding event listener");
  //   // Attach the event listener to the window's popstate event
  //   window.addEventListener("beforeunload", handleBackButtonClick);

  //   // Clean up the event listener when the component is unmounted
  //   return () => {
  //     alert("Removing event listener");
  //     window.removeEventListener("beforeunload", handleBackButtonClick);
  //   };
  // }, []);

  return (
    <AllContext.Provider value={context}>{props.children}</AllContext.Provider>
  );

  // functions below

  async function fetchAddressList() {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-address`,
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

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data);

      // return;

      if (data.data.length > 0) {
        const defaultAddress = data.data.find(
          (address) => address.id === data.default
        );
        setSelectedAddress(defaultAddress);
        secureLocalStorage.setItem("selectedAddress", defaultAddress);
      }

      setDeliveryAddressArray(data.data);
      setDefaultAddressID(data.default);

      // setFetching(false);
      // setLoginResponse("");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function fetchCardList() {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-card`,
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

      if (data.status === "fail") {
        console.log(data);
        // return
        if (data?.cards.length === 0) {
          setATMcardArray([]);
        }
        // setLoginResponse(data.message);

        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data);

      // return;
      if (data.cards.length > 0) {
        const defaultCard = data.cards.find((card) => card.id === data.default);
        setSelectedCard(defaultCard);
        secureLocalStorage.setItem("selectedCard", defaultCard);
      }

      setATMcardArray(data.cards);
      setDefaultCardID(data.default);
      // data.default

      // setFetching(false);
      // setLoginResponse("");
    } catch (error) {
      console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function setNotificationPreference({ currentChoice }) {
    var oldArray = [...notificationChoices];
    var notiArray;

    if (currentChoice && !notificationChoices.includes(currentChoice)) {
      //  //> Checking
      // let oldArray = [...notificationChoices];
      notiArray = [...oldArray, currentChoice];
      setNotificationChoices(notiArray);
      if (notiArray.length > 0) {
        setEmailNotificationStatus("on");
      }
    }

    if (notificationChoices.includes(currentChoice)) {
      //  //> Unchecking
      // let oldArray = [...notificationChoices];
      notiArray = oldArray.filter((noti) => currentChoice !== noti);
      setNotificationChoices(notiArray);

      if (notiArray.length === 0) {
        setEmailNotificationStatus("off");
      }
    }

    if (!currentChoice) {
      if (emailNotificationStatus === "on") {
        setEmailNotificationStatus("off");
        notiArray = [];
        setNotificationChoices(notiArray);
      } else {
        setEmailNotificationStatus("on");
        notiArray = ["bid", "auction", "payment", "refund", "other"];
        setNotificationChoices(notiArray);
      }
    }

    const dataToSubmit = {
      push_notification: notiArray.length === 0 ? "off" : "on",
      email_notification: notiArray.join(","),
    };

    // console.log(dataToSubmit);

    // return;

    try {
      // setAddressResponse("Please wait...");
      setSearching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/set-preference`,
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
        // setAddressResponse(data.message);
        // console.log(data);
        console.log("An error occurred. Updating preference failed.");
        setNotificationChoices(oldArray);
        triggerAlert({ message: "Updating preference failed", color: "red" });
        // setSearching(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setNotificationChoices(oldArray);
        triggerAlert({ message: "Updating preference failed", color: "red" });
        // setSearching(false);
        return;
      }
      // console.log(data);

      // return;

      setOngoingBids(data.bids);
      // setAddressResponse("");
      // setSearching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setNotificationChoices(oldArray);
      triggerAlert({ message: "Updating preference failed", color: "red" });
      // setAddressResponse("An error occurred, retry.");
      // setSearching(false);
    }
  }

  async function fetchNotificationPreference() {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-preference`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data.bids);

      // return;

      setEmailNotificationStatus(data.push_notification);
      setNotificationChoices(data.email_notification);
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function fetchShippingFee({ addressID, bidID }) {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-shipping-fee?address_id=${addressID}&bid_id=${bidID}`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data.bids);

      // return;

      setShippingFee(data.fee);
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  function decorateDate(dateString) {
    const date = parseISO(dateString);
    const dayOfWeek = format(date, "EEEE");
    const dayOfMonth = format(date, "do");
    const monthYear = format(date, "MMMM yyyy");

    return `${dayOfWeek} - ${dayOfMonth} ${monthYear}`;
  }

  function convertDate(dateString) {
    // Parse the dateString into a Date object
    const date = new Date(dateString);

    // Define arrays for days and months
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, and year
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    // Function to get the suffix for the day
    function getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    // Format the date
    const formattedDate = `${dayOfWeek} - ${dayOfMonth}${getDaySuffix(
      dayOfMonth
    )} ${month} ${year}`;

    return formattedDate;
  }

  function triggerAlert({ message, color }) {
    setAlertText(message);
    setAlertColor(color);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  async function resendOTP({
    setConnecting,
    setSeconds,
    setCanResendEmail,
    type,
    sendTo,
  }) {
    if (!userToken) {
      router.push("/login");

      return;
    }

    // console.log(sendTo);
    // console.log(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/request-2fa?type=phone&id=${user?.phone_number}`);

    // return;

    try {
      setRegResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/request-2fa?type=${type}&id=${sendTo}`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        setRegResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setRegResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }

      // console.log(data);
      setConnecting(false);
      setRegResponse(data.message);

      setCanResendEmail(false);
      setSeconds(120);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setRegResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  async function logOut({ userMail }) {
    if (!userMail || !userToken) {
      await router.push("/");
      setLoggingOut(true);
      secureLocalStorage.removeItem("userToken");
      secureLocalStorage.removeItem("user");
      setUserToken("");
      //   logoutResetCart();
      localStorage.removeItem("storageCart");
      localStorage.removeItem("cart");
      showAlert("Logged out successfully!");
      setUser(null);
      setLoggingOut(false);
      return;
    }

    try {
      setLoggingOut(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API_BASE}/logout`,
        {
          method: "POST",
          // body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
            usertoken: `${userToken}`,
            useremail: `${userMail}`,
          },
        }
      );

      const data = await response.json();
      console.log("Logged out");

      if (data.status === "error") {
        setLoggingOut(true);
        await router.push("/");
        secureLocalStorage.removeItem("userToken");
        secureLocalStorage.removeItem("user");
        setUserToken("");
        setUser(null);
        // logoutResetCart();
        localStorage.removeItem("storageCart");
        localStorage.removeItem("cart");
        triggerAlert({ message: "Logged out successfully!", color: "green" });

        setLoggingOut(false);
        return;
      }

      if (!response.ok) {
        setLoggingOut(true);
        await router.push("/");
        secureLocalStorage.removeItem("userToken");
        secureLocalStorage.removeItem("user");
        setUserToken("");
        setUser(null);
        // logoutResetCart();
        localStorage.removeItem("storageCart");
        localStorage.removeItem("cart");
        triggerAlert({ message: "Logged out successfully!", color: "green" });

        setLoggingOut(false);
        return;
      }

      setLoggingOut(true);
      await router.push("/");
      secureLocalStorage.removeItem("userToken");
      secureLocalStorage.removeItem("user");
      //   logoutResetCart();
      localStorage.removeItem("storageCart");
      localStorage.removeItem("cart");
      setUserToken("");
      setUser(null);
      triggerAlert({ message: "Logged out successfully!", color: "green" });

      setLoggingOut(false);
    } catch (error) {
      setLoggingOut(true);
      await router.push("/");
      secureLocalStorage.removeItem("userToken");
      secureLocalStorage.removeItem("user");
      //   logoutResetCart();
      localStorage.removeItem("storageCart");
      localStorage.removeItem("cart");
      setUserToken("");
      setUser(null);
      triggerAlert({ message: "Logged out successfully!", color: "green" });

      setLoggingOut(false);
    }
  }

  async function updateSelectedBid(bidID) {
    // console.warn("Updating selected bids...");
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids?bid_id=${bidID}`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data.bids);

      // return;

      if (
        data.bids.leading_bidder === "leading" &&
        data.bids.bid_won != user?.ID
      ) {
        setBidResponse("You are currently the leading bidder!");
      }

      if (
        data.bids.leading_bidder === "no_bid" &&
        data.bids.bid_won != user?.ID
      ) {
        bidType === "proxy"
          ? setBidResponse(
              "Enhance winning odds by placing a maximum bid; Asheville Garage Sales raises bids incrementally until the set limit is reached."
            )
          : setBidResponse("");
      }

      if (
        data.bids.leading_bidder === "outbid" &&
        data.bids.bid_won != user?.ID
      ) {
        setBidResponse("You have been outbid!");
      }

      if (data.bids.bid_won == user?.ID) {
        setBidResponse(
          "You have won this bid! Go to your dashboard to claim item."
        );
      }
      // console.log("error");
      setHighestBid(data.bids.current_bid);
      setSelectedBid((prevSelectedBid) => ({
        ...data.bids,
        bid_countdown: prevSelectedBid.bid_countdown,
        bid_countdown_seconds: prevSelectedBid.bid_countdown_seconds,
      }));
      // setFetching(false);
    } catch (error) {
      // console.log("error");
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function updateCountdownSelectedBid(bidID) {
    // console.warn("Selected Bid - updating to to server time");
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids?bid_id=${bidID}`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data.bids);

      // return;

      if (
        data.bids.leading_bidder === "leading" &&
        data.bids.bid_won != user?.ID
      ) {
        setBidResponse("You are currently the leading bidder!");
      }

      if (
        data.bids.leading_bidder === "no_bid" &&
        data.bids.bid_won != user?.ID
      ) {
        bidType === "proxy"
          ? setBidResponse(
              "Enhance winning odds by placing a maximum bid; Asheville Garage Sales raises bids incrementally until the set limit is reached."
            )
          : setBidResponse("");
      }

      if (
        data.bids.leading_bidder === "outbid" &&
        data.bids.bid_won != user?.ID
      ) {
        setBidResponse("You have been outbid!");
      }

      if (data.bids.bid_won == user?.ID) {
        setBidResponse(
          "You have won this bid! Go to your dashboard to claim item."
        );
      }

      setHighestBid(data.bids.current_bid);
      setSelectedBid(data.bids);
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function updateOngoingBids() {
    // console.warn("Updating ongoing bids...");
    try {
      // setLoginResponse("Please wait...");
      setFetchingOngoingBids(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setFetchingOngoingBids(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setFetchingOngoingBids(false);
        return;
      }
      // console.warn("Updating");

      // return;
      // //>  Start
      // const mergedBids = ongoingBids.map((ongoingBid) => {
      //   const updatedBid = data.bids.find(
      //     (newBid) => newBid.bid_id == ongoingBid.bid_id
      //   );

      //   if (updatedBid) {
      //     // Spread the properties of ongoingBid and update only bid_countdown_seconds and bid_countdown

      //     return {
      //       ...ongoingBid,
      //       bid_countdown_seconds: ongoingBid.bid_countdown_seconds,
      //       bid_countdown: ongoingBid.bid_countdown,
      //     };
      //   }

      //   // If there is no corresponding bid in data.bids, keep the ongoingBid as is

      //   return ongoingBid;
      // });

      // // If data.bids has additional items, append them to the mergedBids array
      // data.bids.forEach((newBid) => {
      //   if (!mergedBids.find((bid) => bid.bid_id === newBid.bid_id)) {
      //     mergedBids.push(newBid);
      //   }
      // });
      // console.warn(mergedBids);
      // //>  End

      selectedCategory === "All" ? setOngoingBids(data.bids) : null;
      selectedCategory === "All" ? setDuplicatedOngoingBids(data.bids) : null;
      // console.log("Loaded");

      setFetchingOngoingBids(false);
    } catch (error) {
      // console.log("error");
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      setFetchingOngoingBids(false);
    }
  }

  async function updateAuctionDetails() {
    // console.warn("Updating auctions bids...");
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids?lot=${
          secureLocalStorage.getItem("selectedAuction")?.auction_lot
        }`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.warn("Updating");

      // return;

      setAuctionDetails(data.bids);

      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function updateCountdownOngoingBids() {
    // console.warn("Ongoing Bids - updating to to server time");
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.warn("Updating");

      // return;

      selectedCategory === "All" ? setOngoingBids(data.bids) : null;
      selectedCategory === "All" ? setDuplicatedOngoingBids(data.bids) : null;

      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  } //Currently not using it

  async function updateTrendingBids() {
    // console.warn("Updating trending bids...");
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/trending-bids`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.warn("Updating");

      // return;

      selectedCategory === "All" ? setTrendingBids(data.bids) : null;
      selectedCategory === "All" ? setDuplicatedTrendingBids(data.bids) : null;

      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function findBid(bidID) {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids?bid_id=${bidID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data.bids);

      // return;

      setSelectedBid(data.bids);
      setShowPlaceBidOverlay(true);
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function locateBidOutbid(bidID) {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids?bid_id=${bidID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }

      // console.log(data.bids);

      // return;

      setSelectedBid(data.bids);
      setShowPlaceBidOverlay(true);
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function locateBidWon(bidID) {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids?bid_id=${bidID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }

      // console.log(data.bids);

      // return;

      setSelectedBid(data.bids);
      await router.push("/account");

      setSelectedAccountTab("won_bids");

      setAccountTabChild("claim_item");
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function refreshOngoingAndTrendingBids() {
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-bids`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/trending-bids`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const data2 = await response2.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (data2.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data2);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }

      if (!response2.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data2);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data.bids);

      // return;

      setOngoingBids(data.bids);
      // console.log("Updated1");
      setDuplicatedOngoingBids(data.bids);

      setTrendingBids(data2.bids);
      // console.log("Updated2");

      setDuplicatedTrendingBids(data2.bids);
      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function buyNow(bidID) {
    // return;

    let confirmed = confirm("Do you want to buy this item?");
    if (confirmed) {
      setItemBought(false);
      if (!user) {
        router.push("/login");
        return;
      }

      if (user?.status === "inactive") {
        router.push("/email-verification", "signup");
        return;
      }

      if (ATMcardArray.length === 0) {
        triggerAlert({
          message: "You must add a card to proceed.",
          color: "red",
        });
        // setSelectedAccountTab("card_information");
        // setAccountTabChild("");
        setAddCardOverlay(true);
        return;
      }

      setShowBuyNowConfirmation(true);

      const dataToSubmit = {
        bid_id: bidID,
        platform: "website",
      };

      // console.log(dataToSubmit);

      // return;

      try {
        setBuyNowResponse("Please wait...");
        setBuying(true);
        // return
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/buy-now`,
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
          setBuyNowResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          setBuying(false);
          return;
        }

        if (!response.ok) {
          setBuyNowResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");

          setBuying(false);
          return;
        }
        // console.log(data);

        // return;

        setBuyNowResponse("Item bought successfully!");

        triggerAlert({
          message: "Item bought successfully!",
          color: "green",
        });
        setBuying(false);
        setItemBought(true);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        setBuyNowResponse("An error occurred, retry.");
        setBuying(false);
      }
    } else {
      return;
    }

    // e.preventDefault();
  }

  async function routeToClaimPage() {
    await router.push("/account");

    setSelectedAccountTab("won_bids");

    setAccountTabChild("claim_item");
  }

  async function routeToOrders() {
    setAccountTitle("Your Orders");
    setSelectedAccountTab("your_orders");
    setAccountTabChild("");
    setAccountMobileNav(false);
    await router.push("/account");
    // setAccountTabChild("claim_item");
  }

  function formatDate(inputDate) {
    // const date = new Date(inputDate);
    // const day = date.getDate();
    // const month = date.getMonth(); // Note: Months are zero-based, so January is 0, February is 1, etc.
    // const year = date.getFullYear();

    const dateParts = inputDate?.split("/");
    if (dateParts?.length !== 3) {
      return "Invalid Date";
    }

    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Adjust month to be zero-based
    const year = parseInt(dateParts[2]);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return "Invalid Date";
    }

    // Function to add "st," "nd," "rd," or "th" to the day
    const getDayWithSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    // Array of month abbreviations
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Create the formatted date string
    const formattedDate = `${monthAbbreviations[month]}. ${getDayWithSuffix(
      day
    )}  ${year}`;

    return formattedDate;
  }

  function handleFilter({
    selectedFormat,
    selectedCategory,
    selectedCondition,
    selectedPrice,
  }) {
    var filteredBids;

    //> Check for all empty
    if (
      (!selectedCondition || selectedCondition === "All") &&
      (!selectedCategory || selectedCategory === "All") &&
      (!selectedPrice || selectedPrice === "All") &&
      (!selectedFormat || selectedFormat === "All Listings")
    ) {
      setOngoingBids(duplicatedOngoingBids);
      return;
    }

    //> ALL CATEGORIES
    if (!selectedCategory || selectedCategory === "All") {
      filteredBids = duplicatedOngoingBids;
      setOngoingBids(duplicatedOngoingBids);
      //   return
    }

    //> FILLED CATEGORY
    if (selectedCategory && selectedCategory !== "All") {
      filteredBids = duplicatedOngoingBids.filter((bid) => {
        return bid.bid_category.some((cat) => cat.name === selectedCategory);
      });

      setOngoingBids(filteredBids);

      // return
    }

    //> ALL CONDITIONS
    if (!selectedCondition || selectedCondition === "All") {
      setOngoingBids(filteredBids);
      //   return
    }

    //> FILLED CONDITION
    if (selectedCondition && selectedCondition !== "All") {
      filteredBids = filteredBids.filter(
        (bid) =>
          bid.bid_condition.toLowerCase() === selectedCondition.toLowerCase()
      );
      setOngoingBids(filteredBids);

      // return
    }

    //> ALL PRICE
    if (!selectedPrice || selectedPrice === "All") {
      setOngoingBids(filteredBids);
      //   return
    }

    //> FILLED PRICE
    if (selectedPrice && selectedPrice !== "All") {
      filteredBids = filteredBids.filter((bid) =>
        selectedPrice === "Under $50"
          ? +bid.current_bid < 50
          : selectedPrice === "$50 - $100"
          ? +bid.current_bid >= 50 && +bid.current_bid <= 100
          : +bid.current_bid > 100
      );
      setOngoingBids(filteredBids);
      // return
    }

    //> ALL LISTINGS
    if (!selectedFormat || selectedFormat === "All Listings") {
      setOngoingBids(filteredBids);
      //   return
    }

    //> FILLED LISTING
    if (selectedFormat && selectedFormat !== "All Listings") {
      filteredBids = filteredBids.filter(
        (bid) => +bid.buy_now_price >= +bid.current_bid
      );
      setOngoingBids(filteredBids);
      // return
    }
  }

  function buyNowTrigger() {
    // return;
    if (!user) {
      router.push("/login");
      return;
    }

    if (user?.status === "inactive") {
      router.push("/email-verification", "signup");
      return;
    }

    if (ATMcardArray.length === 0) {
      triggerAlert({
        message: "You must add a card to proceed.",
        color: "red",
      });
      // setSelectedAccountTab("card_information");
      // setAccountTabChild("");
      setAddCardOverlay(true);
      return;
    }

    if (deliveryAddressArray.length === 0) {
      triggerAlert({
        message: "You must add an address before you proceed.",
        color: "red",
      });
      setShowAddAddressOverlay(true);
      return;
    }

    setShowBuyNowOverlay(true);
  }

  function filterByCategory({ arrayToFilter, categoryName, setArrayToFilter }) {
    if (categoryName.toLowerCase() === "all") {
      setArrayToFilter(arrayToFilter);
      return;
    }
    const filteredArray = arrayToFilter.filter((product) => {
      return product.category.some(
        (category) => category.name === categoryName
      );
    });

    setArrayToFilter(filteredArray);
  }

  async function getRelatedSearch({ e, catID }) {
    // console.log(e.target.value);
    setSearchKeyword(e.target.value);
    try {
      // setLoginResponse("Please wait...");
      // setFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-related?search_term=${e.target.value}&cat_id=${catID}`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        // setLoginResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        // setFetching(false);
        return;
      }

      if (!response.ok) {
        // setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        // setFetching(false);
        return;
      }
      // console.log(data);

      // return;

      setSearchSuggestionList(data.data);

      // setFetching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setLoginResponse("An error occurred, retry.");
      // setFetching(false);
    }
  }

  async function makeGeneralSearch({ searchTerm, categoryID }) {
    // e.preventDefault();

    const dataToSubmit = {
      search_term: searchTerm,
      cat_id: categoryID,
    };

    if (!searchTerm || searchTerm.trim() === "") {
      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      // setAddressResponse("Please wait...");
      setSearching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/bid-search`,
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
        // setAddressResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setSearching(false);
        return;
      }

      if (!response.ok) {
        // setAddressResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");

        setSearching(false);
        return;
      }
      console.log(data);

      // return;

      setOngoingBids(data.bids);
      setDuplicatedOngoingBids(data.bids);
      setSearching(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setAddressResponse("An error occurred, retry.");
      setSearching(false);
    }
  }

  function formatDOB(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are 0-based, so we add 1.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function convertCountdownToSeconds(serverCountdownInSeconds) {
    const [hours, minutes, seconds] = serverCountdownInSeconds
      .split(":")
      .map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}

export default AllContext;
