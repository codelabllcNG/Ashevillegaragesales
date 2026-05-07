import { useCartStore } from "@/a-store/zustandStore/cartStore";
import Image from "next/image";
import React, { useEffect } from "react";

const Orders = () => {
  const { orders, getOrders } = useCartStore((state) => state);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  console.log(orders);
  return (
    <div className="px-3 sm:px-8 lg:px-[5rem] pt-10">
      <h2 className="text-2xl font-medium mb-4">Orders</h2>
      <hr />
      <section className="relative mt-6">
        <div className="w-full">
          <div className=" ">
            <div className="w-full">
              {orders.map((order) => (
                <div key={order.id} className="grid grid-cols-1 gap-6 mb-5">
                  <div className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                    <div className="img-box ">
                      <Image
                        src={order.product_image || "/images/about-hero.png"}
                        alt="Denim Jacket image"
                        width={122}
                        height={122}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                      <div>
                        <h2 className="font-medium text-xl leading-8 text-black mb-3">
                          {order.product_name}
                        </h2>
                        <p className="font-normal text-lg leading-8 text-gray-500 ">
                          qty: {order.product_qty}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        {/* Your pricing and icons */}
                        {/* Icons */}
                        <div className="flex items-center gap-3">
                          {/* Repeat for each icon */}
                        </div>
                        {/* Price */}
                        <h6 className="font-medium text-xl leading-8">
                          ${order.product_price}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Product Component 2 */}
            {/* Fill in similar code for your other products */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;
