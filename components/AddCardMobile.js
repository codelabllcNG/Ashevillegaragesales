import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCalendar, FaGavel, FaRegCalendar } from "react-icons/fa";
import {
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFlash } from "react-icons/io5";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";




// console.log(stripePromise);

function AddCardMobile() {
    const router = useRouter();
    const { paramToken, paramEmail } = router.query;
    
  const {
    setShareBidOverlay,
    setNotificationOverlay,
    showAlert,
    setShowAlert,
    setAlertText,
    triggerAlert,
    userToken,
    user,
    ATMcardArray,
    setATMcardArray,
    setAddCardOverlay,
    setSelectedCard,
  } = AllCtx();

  const cardOPtions = { hidePostalCode: true, disableLink: true };

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [cardResponse, setCardResponse] = useState("");
  const [connecting, setConnecting] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [tokenError, setTokenError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;

    //>CARD NUMBER
    if (name === "number") {
      const onlyNumeric = value.replace(/\D/g, "");
      const formattedCard = onlyNumeric.replace(/(.{4})/g, "$1 ");
      setCard((prev) => ({ ...prev, [name]: formattedCard }));
    }
    // > EXPIRY DATE
    else if (name === "expiry") {
      let onlyNumeric = value.replace(/\D/g, "");
      let formattedExpiryDate = "";

      // Extract and validate the month (MM)
      const month = onlyNumeric.slice(0, 2);
      if (month) {
        const numericMonth = parseInt(month, 10);
        if (numericMonth >= 1 && numericMonth <= 12) {
          formattedExpiryDate = month; // Remove leading zeros
        } else {
          // Handle invalid month input
          formattedExpiryDate = "0";
        }
      }

      // Extract the year (YY)
      const year = onlyNumeric.slice(2, 4);

      if (year) {
        formattedExpiryDate += `/${year}`;
      }

      setCard((prev) => ({ ...prev, [name]: formattedExpiryDate }));
    }
    // > CVV
    else if (name === "cvv") {
      const cvv = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      setCard((prev) => ({ ...prev, [name]: cvv.slice(0, 3) }));
    } else {
      setCard((prev) => ({ ...prev, [name]: value }));
    }

    // console.log(card);
  }

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // async function addCard(e) {
  //   // e.preventDefault();

  //   const dataToSubmit = {
  //     card_name: card.name,
  //     bank_name: "",
  //     card_type: "",
  //     card_number: card.number.replace(/\s+/g, ""),
  //     card_expiry: card.expiry,
  //     cvv: card.cvv,
  //   };

  //   if (
  //     !card.name ||
  //     card.name.trim() === "" ||
  //     !card.number ||
  //     card.number.trim() === "" ||
  //     !card.expiry ||
  //     card.expiry.trim() === ""
  //   ) {
  //     setCardResponse("Fill all inputs!");
  //     // console.log(dataToSubmit);
  //     return;
  //   }

  //   // console.log(dataToSubmit);

  //   // return;

  //   try {
  //     setCardResponse("Please wait...");
  //     setConnecting(true);
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-card`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify(dataToSubmit),
  //         headers: {
  //           "Content-Type": "application/json",
  //           usertoken: userToken,
  //           useremail: user?.email,
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status === "fail") {
  //       setCardResponse(data.message);
  //       // console.log(data.message);
  //       console.log("An error occurred.");
  //       setConnecting(false);
  //       return;
  //     }

  //     if (!response.ok) {
  //       setCardResponse("Something went wrong, retry!");
  //       // console.log(data);
  //       console.log("Response not OK");
  //       // console.log(data);
  //       setConnecting(false);
  //       return;
  //     }
  //     // console.log(data);

  //     // return
  //     if (data.cards.length > 0) {
  //       const defaultCard = data.cards.find((card) => card.id === data.default);
  //       setSelectedCard(defaultCard);
  //     }
  //     setATMcardArray(data.cards);
  //     setAddCardOverlay(false);
  //     triggerAlert({ message: "New card added successfully!", color: "green" });
  //     setConnecting(false);
  //     setCardResponse("");
  //   } catch (error) {
  //     // console.log(error);
  //     console.log("An error occurred.");
  //     setCardResponse("An error occurred, retry.");
  //     setConnecting(false);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!card.name || card.name.trim() === "") {
      setCardResponse("Fill all inputs!");
      // console.log(dataToSubmit);
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, or the Elements are not initialized
      return;
    }

    const cardElement = elements.getElement(CardElement);
    // cardElement.update({defaultValues: {}})
    const paymentElement = elements.getElement(PaymentElement);

    // Use stripe.createToken to send the card information to Stripe
    const { token, error } = await stripe.createToken(cardElement, {
      billingDetails: { name: card.name },
      name: card.name,
    });

    if (error) {
      setTokenError(error.message);
      setCardResponse(error.message);
      // console.log("Erreoe:", error);
        setConnecting(false);
        return
    } else {
      // Send the token to your server for further processing
      // console.log("Token:", token);

      // //> Sending to backend
      const dataToSubmit = {
        token: token.id,
        default: "yes",
      };

    //   console.log(dataToSubmit);

      // return;

      try {
        setCardResponse("Please wait...");
        setConnecting(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-card`,
          {
            method: "POST",
            body: JSON.stringify(dataToSubmit),
            headers: {
              "Content-Type": "application/json",
              usertoken: paramToken,
              useremail: paramEmail,
            },
          }
        );
        const data = await response.json();

        if (data.status === "fail") {
          setCardResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          setConnecting(false);
          return;
        }

        if (!response.ok) {
          setCardResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setConnecting(false);
          return;
        }
        // console.log(data);

        // return
router.push("http://localhost:8099/cardAddedSuccessfully")
          
        // if (data.cards.length > 0) {
        //   const defaultCard = data.cards.find(
        //     (card) => card.id === data.default
        //   );
        //   setSelectedCard(defaultCard);
        // }
        // setATMcardArray(data.cards);
        // setAddCardOverlay(false);
        // triggerAlert({
        //   message: "New card added successfully!",
        //   color: "green",
        // });
        setConnecting(false);
        setCardResponse("");
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        setCardResponse("An error occurred, retry.");
        setConnecting(false);
      }
    }
  };

  return (
    <div
      onClick={() => {
        setAddCardOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-white  justify-center items-center flex overflow-y-hidden"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white  pt-3 pb-3 px-3 w-[90%] md:w-[60%]"
      >
        {/* //>header */}
        <div className="bg-pry-color rounded-t-md -mx-3 p-3 -mt-3 text-white">
          <p className="text-sm font-medium ">
            <span className="underline decoration-2 underline-offset-8">
              PRE-IN
            </span>
            SPECTED
          </p>

          <p className="text-2xl font-extrabold mt-2">CREATE NEW CARD</p>
        </div>
        {/* //>card name */}
        <label className="mt-">
          <p className="font-medium mt-5">Name on Card</p>
          <input
            value={card.name}
            onChange={handleChange}
            type="text"
            name="name"
            className="mt-1 w-full focus:ring-0 py-3 rounded text-sm font-medium border-gray-500"
            placeholder="Jonh Doe"
          />
        </label>

        {/* //>Stripe card number */}
        <label className="mt- ">
          <p className="font-medium mt-5">Card Details</p>
          <div className="w-full focus:ring-0 py-1 pl-3 rounded text-sm font-medium border-gray-500 border mt-1">
         
                      <CardElement
              options={cardOPtions}
              className="text-lg mt- focus:ring-0 py-3 rounded text- font-medium border-gray-500"
            />
          </div>
        </label>

        {/* //>old card number */}
        {/* <label className="">
          <p className="font-medium mt-5">Enter Card Number</p>
          <input
            value={card.number}
            onChange={handleChange}
            type="text"
            name="number"
            className="mt-1 w-full focus:ring-0 py-3 rounded text-sm font-medium border-gray-500"
            placeholder="0000 0000 0000 0000"
          />
        </label> */}

        {/* //>Expiry and CVV */}
        <div className="sm:flex  gap-x-5 items-center justify-between ">
          {/* //>expiry */}
          {/* <label className="mt-  sm:w-1/2">
            <p className="font-medium mt-5">Expiry Date</p>
            <input
              value={card.expiry}
              onChange={handleChange}
              type="text"
              name="expiry"
              className="mt-1 w-full focus:ring-0 py-3 rounded text-sm font-medium border-gray-500"
              placeholder="MM/YY"
            />
          </label> */}

          {/* //>cvv */}
          {/* <label className="mt-  sm:w-1/2">
            <p className="font-medium mt-5">CVV</p>
            <input
              value={card.cvv}
              onChange={handleChange}
              type="text"
              name="cvv"
              className="mt-1 w-full focus:ring-0 py-3 rounded text-sm font-medium border-gray-500"
              placeholder="123"
            />
          </label> */}
        </div>

        {/* //> Response */}
        <div
          className={`${
            cardResponse ? "flex" : "hidden"
          } justify-center items-center mt-5`}
        >
          <p
            // type="button"
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
          >
            {cardResponse}
          </p>
        </div>

        <button
          // onClick={(e) => {
          //   addCard(e);
          // }}
          type="submit"
          className=" rounded-md w-full bg-pry-color text-white duration-300 hover:bg-opacity-80 mt-4 py-4"
        >
          Create Card
        </button>
      </form>
    </div>
  );
}

export default AddCardMobile;
