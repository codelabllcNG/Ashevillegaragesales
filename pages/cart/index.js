import CartItem from "@/components/cart/CartItem";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import AllCtx from "@/util-functions/allCtx";
import Head from "next/head";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { getCart, getProducts, cart } = useCartStore((state) => state);

  const router = useRouter();

  const {
    user,
    userToken,
    ATMcardArray,
    deliveryAddressArray,
    triggerAlert,
    fetchAddressList,
    setShowAddAddressOverlay,
    setAddCardOverlay,
    fetchCardList,
  } = AllCtx();

  useEffect(() => {
    // if (
    //   secureLocalStorage.getItem("userToken") &&
    //   secureLocalStorage.getItem("user")?.email
    // ) {
    //   getProducts();
    // }
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    const prices = cart.map((item) => {
      return +item.product_price * +item.quantity;
    });
    const total = prices.reduce((acc, cur) => {
      return +acc + +cur;
    }, 0);

    setTotalAmount(total);
  }, [cart]);

  // //>Fetch addresses and card list
  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      fetchAddressList();
      fetchCardList();
    }
  }, []);

  const gotoCheckOut = () => {
    if (!userToken && !user?.email) {
      router.push("/login");
    } else {
      if (user?.status === "inactive") {
        router.push("/email-verification", "signup");
        return;
      }

      if (cart.length === 0) {
        triggerAlert({
          message: "Your cart is currently empty!",
          color: "red",
        });
        router.push("/");
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
      router.push("/cart/checkout");
    }
  };
  return (
    <div className="px-3 sm:px-8 lg:px-[5rem] pt-10">
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="Shop premium items for less! From home essentials to kids' games; Asheville Garage Sales offers unbeatable deals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-lg font-medium">Cart ({cart.length})</h3>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-10">
        <section className="md:col-span-2 p-3 rounded-sm bg-slate-50">
          {cart?.map((item) => (
            <CartItem
              key={item.product_id}
              id={item.product_id}
              name={item.product_name}
              img={item.product_image}
              price={item.product_price}
              desc={item.product_desc}
              qty={item.quantity}
              stock={item.stock}
            />
          ))}
          {cart.length === 0 && (
            <p className="text-pink-600 text-center">Cart is empty</p>
          )}
        </section>
        <section className="h-full relative">
          <div className="p-3 rounded-sm bg-slate-50 sticky top-[170px]">
            <h4 className="text-sm font-medium uppercase">cart Summary</h4>
            <div className="flex justify-between items-center my-6 border-y-1 border-solid border-gray-400">
              <p className="text-sm">Subtotal</p>
              <p className="text-bold text-xl">
                ${parseFloat(+totalAmount).toFixed(2).toLocaleString()}
              </p>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={gotoCheckOut}
              className="w-full bg-pry-color text-white rounded-sm py-2 duration-300 hover:bg-opacity-80 text-lg font-semibold text-center"
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
