import { useCartStore } from "@/a-store/zustandStore/cartStore";
import Image from "next/image";
import React, { useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import secureLocalStorage from "react-secure-storage";

const CartItem = ({ id, name, img, price, desc, qty, stock }) => {
  const [count, setCount] = useState(qty);
  const {
    removeFromServerCart,
    storageRemoveFromCart,
    storageUpdateQty,
    serverUpdateQty,
  } = useCartStore((state) => state);

  const removeHandler = (id) => {
    const userToken = secureLocalStorage.getItem("userToken");
    const userEmail = secureLocalStorage.getItem("user")?.email;

    if (userToken && userEmail) {
      const product = {
        productID: id,
        quantity: "0",
      };
      removeFromServerCart(product);
    } else {
      storageRemoveFromCart(id);
    }
  };

  const qtyChangeHandler = (e) => {
    setCount(e.target.value);
    const userToken = secureLocalStorage.getItem("userToken");
    const userEmail = secureLocalStorage.getItem("user")?.email;

    if (userToken && userEmail) {
      serverUpdateQty(id, e.target.value);
    } else {
      storageUpdateQty(id, e.target.value);
    }
  };

  return (
    <section className="flex justify-between items-center border-t border-solid border-gray-400 pt-6 mt-6">
      <div className="flex gap-3">
        <Image
          src={img || "/images/placeholder.jpg"}
          width={100}
          height={100}
          alt="cart item"
        />
        <div>
          <h4>{name} </h4>
          <div className="line-clamp-5">
            <p className="text-sm mt-2">{desc}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-6">
        <p>${price}</p>
        <div className="flex gap-2 ">
          <p>Qty</p>
          <select
            className="opacity-60 cursor-pointer border-none focus:ring-0 text-xs "
            name="count"
            id="count"
            value={count}
            onChange={qtyChangeHandler}
          >
            {[...Array(stock).keys()].map((number) => (
              <option key={number + 1} value={number + 1}>
                {number + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => removeHandler(id)}
          className="flex items-center gap-1 text-sm text-red-400"
        >
          Remove <IoTrashBinSharp />
        </button>
      </div>
    </section>
  );
};

export default CartItem;
