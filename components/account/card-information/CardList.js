import AllCtx from "@/util-functions/allCtx";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

function CardList() {
  const [showMenu, setShowMenu] = useState(false);

  const { addCardOverlay, setAddCardOverlay } = AllCtx();

  const {
    ATMcardArray,
    setATMcardArray,
    user,
    userToken,
    defaultCardID,
    setDefaultCardID,
    selectedCard,
    setSelectedCard,
    triggerAlert,
  } = AllCtx();

  const { setCartDefCard } = useCartStore((state) => state);

  const [fetching, setFetching] = useState(false);

  // //>Fetching card
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetching(true);
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
          // console.log(data);
          // return
          if (data?.cards.length === 0) {
            setATMcardArray([]);
          }
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
        if (data.cards.length > 0) {
          const defaultCard = data.cards.find(
            (card) => card.id === data.default
          );
          setSelectedCard(defaultCard);
          secureLocalStorage.setItem("selectedCard", defaultCard)
          setCartDefCard(defaultCard);
        }
        setATMcardArray(data.cards);
        setDefaultCardID(data.default);
        // data.default

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

  function concealCard(cardNumber) {
    // Remove any non-digit characters and store the last group
    const lastGroup = cardNumber.replace(/\D/g, "").slice(-4);

    // Replace all digits with asterisks except the last group
    const concealedCard =
      "*".repeat(cardNumber.length - lastGroup.length) + lastGroup;

    // Add spaces after every four characters
    const formattedConcealedCard = concealedCard.replace(/(.{4})(?!$)/g, "$1 ");

    return formattedConcealedCard;
  }

  // //>Delete card handler
  async function deleteCard(cardID, cardType) {
    // return

    if (cardID === defaultCardID) {
      triggerAlert({
        message: "You cannot delete a default card.",
        color: "red",
      });
      return;
    }

    // if (ATMcardArray.length === 1 && cardID === defaultCardID) {
    //   triggerAlert({
    //     message: "You must have a default card.",
    //     color: "red",
    //   });
    //   return;
    // }

    let duplicateArray = ATMcardArray;

    const updatedArray = duplicateArray.filter((card) => card.id !== cardID);

    let shouldDelete = confirm("Do you really want to delete this card?");
    if (shouldDelete) {
      setATMcardArray(updatedArray);
      triggerAlert({ message: "Card deleted!", color: "green" });
    } else {
      return;
    }

    const dataToSubmit = { card_id: cardID, type: cardType };

    // return

    try {
      const response = await fetch(
        // setConnecting(true);
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/remove-card`,
        {
          method: "DELETE",
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
        setATMcardArray(duplicateArray);
        triggerAlert({
          message: "Deleting card failed!",
          color: "red",
        });

        // setConnecting(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setATMcardArray(duplicateArray);
        triggerAlert({
          message: "Deleting card failed!",
          color: "red",
        });
        // setConnecting(false);
        return;
      }
      // console.log(data);

      // return;

      setATMcardArray(data.cards);
      setDefaultCardID(data.default);
      // setDefaultCardID("3");
      triggerAlert({
        message: "Card deleted successfully!",
        color: "green",
      });
      // setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setDefaultCardID(reservedCardID);
      setATMcardArray(duplicateArray);
      triggerAlert({
        message: "Deleting card failed!",
        color: "red",
      });
      // setConnecting(false);
    }
  }

  // //>Set as default
  async function setAsDefault(cardID) {
    if (cardID === defaultCardID) {
      // console.log("ooooooooooooo");
      triggerAlert({
        message: "You must have a default card.",
        color: "red",
      });
      return;
    }

    if (ATMcardArray.length === 1 && cardID === defaultCardID) {
      triggerAlert({
        message: "You must have a default card.",
        color: "red",
      });
      return;
    }

    const reservedCardID = defaultCardID;
    setDefaultCardID(cardID);

    // return

    const dataToSubmit = {
      card_id: cardID,
    };

    // console.log(dataToSubmit);
    // return

    try {
      const response = await fetch(
        // setConnecting(true);
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/set-default-card`,
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
        setDefaultCardID(reservedCardID);
        triggerAlert({
          message: "Updating default card failed!",
          color: "red",
        });

        // setConnecting(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setDefaultCardID(reservedCardID);
        triggerAlert({
          message: "Updating default card failed!",
          color: "red",
        });
        // setConnecting(false);
        return;
      }
      // console.log(data);

      // return;

      // if (data.cards.length > 0) {
      //   const defaultCard = data.cards.find((card) => card.id === data.default);
      //   setSelectedCard(defaultCard);
      // }
      // setATMcardArray(data.cards);
      setDefaultCardID(data.default);

      // triggerAlert({
      //   message: "Default!",
      //   color: "green",
      // })
      // setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setDefaultCardID(reservedCardID);
      triggerAlert({
        message: "Updating default card failed!",
        color: "red",
      });
      // setConnecting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-10">
      {fetching && ATMcardArray.length === 0 && (
        <p>Loading cards... Please wait.</p>
      )}
      {ATMcardArray.length > 0 &&
        ATMcardArray.map((card, i) => (
          <div
            onMouseOver={() => {
              setSelectedCard(card);
              secureLocalStorage.setItem("selectedCard", card)
              // console.log(card);
            }}
            onTouchStart={() => {
              setSelectedCard(card);
              secureLocalStorage.setItem("selectedCard", card)
            }}
            key={card.id}
            className=""
          >
            <div
              onClick={() => {
                setShowMenu(false);
              }}
              onMouseLeave={() => {
                setShowMenu(false);
              }}
              className={`rounded-md p-3 ${
                card.id === defaultCardID
                  ? "bg-[#95c08b] text-gray-900   "
                  : "bg-gray-900 text-white"
              }`}
            >
              <div className="flex justify-end items-center">
                {/* <Icon icon="logos:mastercard" className="w-6 h-5" /> */}
                <div className=" relative">
                  <div className="flex justify-end items-center">
                    <Icon
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(!showMenu);
                      }}
                      icon="tabler:dots"
                      className="w-6 h-5 cursor-pointer"
                    />
                  </div>
                  {/* //> */}
                  {showMenu && card.id === selectedCard.id && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        // setShowMenu(!showMenu);
                      }}
                      className="bg-white border p-2 w-fit rounded-md  absolute right-0"
                    >
                      <p
                        onClick={() => {
                          deleteCard(card.id, card.type);
                        }}
                        className="text-sm font-medium text-gray-900 cursor-pointer select-none"
                      >
                        Delete Card
                      </p>
                      {/* <p className="text-sm mt-2 font-medium text-gray-900 cursor-pointer select-none">
                        Edit Details
                      </p> */}

                      <div
                        onClick={() => {
                          // setAsDefault(card.id);
                        }}
                        className="mt-2 cursor-pointer text-sm font-medium flex justify-between whitespace-nowrap items-center text-gray-900 gap-x-4"
                      >
                        Set Default
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            onChange={() => {
                              setAsDefault(card.id);
                            }}
                            checked={card.id === defaultCardID}
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
                  )}
                </div>
              </div>

              <div className="mt-16 flex justify-between gap-x-5">
                <p className="text-sm font-medium ">{card.name}</p>
                <p className="text-xm font-medium">
                  {" "}
                  {`${card.exp_month}/${card.exp_year
                    .toString()
                    .slice(-2)}`}{" "}
                </p>
              </div>

              <p className="mt-3 text-sm font-medium">
                {" "}
                {`**** **** **** ${card.last4}`}
              </p>
            </div>

            {card.id === defaultCardID && (
              <div className="mt-2 text-sm text-pry-color flex items-center gap-x-1">
                <Icon icon="ph:info-fill" className="w-4 h-4" /> This is the
                default card
              </div>
            )}
          </div>
        ))}

      {
        <div className="">
          <div
            onClick={() => {
              setAddCardOverlay(true);
            }}
            className={`rounded-md p-10 bg-[#f0f4f8] cursor-pointer`}
          >
            <div className="flex justify-center items-center">
              <Icon
                icon="ant-design:plus-circle-filled"
                className="w-10 h-12 text-[#74829e] "
              />
            </div>

            <p className="text-center text-xl text-[#74829e] mt-[0.62rem]">
              Add another card
            </p>
          </div>

          {/* {i === 0 && <div className="mt-2 text-sm text-pry-color flex items-center gap-x-1" >
         <Icon icon='ph:info-fill' className="w-4 h-4"/> This is the default card
          </div>} */}
        </div>
      }
    </div>
  );
}

export default CardList;
