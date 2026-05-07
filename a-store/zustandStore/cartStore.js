import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import CartCard from "@/components/cart/CartCard";

export const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        reservedProducts: [],
        productDetails: {},
        categories: [],
        orders: [],
        cart:
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("storageCart")) || []
            : [],
        cartFees: {},
        cartDefCard: null,
        loading: false,
        makingPayment: false,
        addingToCart: false,
        fetchingOrders: false,
        pdLoading: false,

        setCartDefCard: (card) => {
          set({ cartDefCard: card });
        },

        getProducts: () => {
          set({ loading: true });

          fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              set({ loading: false });
              set({ products: res.product });
              set({ reservedProducts: res.product });
              console.log(res.product)
                // toast.success("Success fetching products!");
              //   if (res.status === "success") {
              //     set({ products: res });
              //   } else {
              //     toast.error("Failed to fetch products!");
              //   }
            })
            .catch((err) => {
              set({ loading: false });
              console.log("Failed to fetch products!");
              console.log(err);
            });
        },

        getProductDetails: (id) => {
          console.log("id is" + id);
          set({ pdLoading: true });

          fetch(
            `https://bidcloverapi.com/ashevillegaragesales/dev/bidcloverapi/bidclover/v1/products/?product_ID=${id}`,
            {
              //   fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/?product_ID=${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((res) => {
              set({ pdLoading: false });
              set({ productDetails: res.product[0] });
              // toast.success("Success fetching details!");
              // return;
              // if (res.status === "success") {
              //   set({ products: res });
              // } else {
              //   toast.error("Failed to fetch products!");
              // }
            })
            .catch((err) => {
              set({ pdLoading: false });
              console.log("Failed to fetch product details!");
              console.log(err);
            });
        },

        //  * GET CART
        getCart: () => {
          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;

          if (userToken && userEmail) {
            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-cart`, {
              method: "GET",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.status === "success") {
                  set({ cart: res.cart });
                  localStorage.setItem("storageCart", JSON.stringify(res.cart));
                  set({
                    cartFees: {
                      shipping_fee: res.shipping_fee,
                      cart_total: res.cart_total,
                      tax: res.tax,
                      tax_percentage: res.tax_percentage,
                    },
                  });

                  // toast.success("Cart fetched from the server");
                } else {
                  console.log("Something went wrong");
                }
              })
              .catch((err) => {
                console.error("Error fetching cart:", err);
              });
          }
        },

        //  * STORAGE ADD TO CART
        storageAddToCart: (product) => {
          const { product_id } = product;
          const { cart } = get();

          if (cart.find((item) => item.product_id === product_id)) {
            toast.error("Item already in cart");
            return;
          }

          const updatedCart = [...cart, product];
          localStorage.setItem("storageCart", JSON.stringify(updatedCart));
          set({ cart: updatedCart });
          toast.success("Item added to cart!");
        },

        //  * STORAGE REMOVE FROM CART
        storageRemoveFromCart: (id) => {
          const { cart, getCart } = get();

          const updatedCart = cart.filter((item) => item.product_id !== id);

          set({ cart: updatedCart });
          localStorage.setItem("storageCart", JSON.stringify(updatedCart));

          toast.success("Item removed from cart!");
        },

        //  * STORAGE UPDATE ITEM QTY
        storageUpdateQty: (id, qty) => {
          const { cart } = get();
          const updatedCart = cart.map((item) => {
            if (item.product_id === id) {
              return { ...item, quantity: qty };
            }
            return item;
          });

          set({ cart: updatedCart });
        },

        //  * ADD TO CART LOCAL API
        localCartToServer: () => {
          const { cart, getCart } = get();

          if (cart.length < 1) {
            // toast.error("no item to push");
            return;
          }

          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;

          if (userToken && userEmail) {
            const requestData = cart.map((item) => {
              return {
                productID: item.product_id,
                quantity: item.quantity,
              };
            });

            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-to-cart`, {
              method: "POST",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "add_local",
                items: requestData,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.status === "success") {
                  // toast.success("Cart sent to server");

                  //   set({ cart: res.cart });
                  //   localStorage.setItem("storageCart", JSON.stringify(res.cart));
                  getCart();
                } else {
                  console.log("Something went wrong!");
                }
              })
              .catch((err) => {
                console.log("Failed to send to the server!");
                console.log(err);
              });
          }
        },

        //  * ADD TO CART  UPDATE ITEM API
        addToServerCart: (product) => {
          const { productID } = product;
          const { cart, getCart } = get();

          if (cart.find((item) => item.product_id == productID)) {
            toast.error("Item already in cart");
            return;
          }

          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;

          if (userToken && userEmail) {
            set({ cart: [...cart, product] });
            toast.success("Item added to the cart!");
            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-to-cart`, {
              method: "POST",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "update_item",
                items: [product],
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.status === "success") {
                  getCart();
                } else {
                  getCart();
                   toast.error(res.message);
                  console.log(res.message);
                }
              })
              .catch((err) => {
                 getCart();
                 toast.error("Failed to send to the server!");
                console.log(err);
              });
          }
        },

        //  * REMOVE FROM SERVER CART
        removeFromServerCart: (product) => {
          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;
          const { getCart } = get();

          if (userToken && userEmail) {
            const { cart } = get();
            let c = [...cart];
            const filtered = c.filter(
              (p) => p.product_id !== product.productID
            );
            set({ cart: filtered });
            toast.success("Item removed from the cart");

            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-to-cart`, {
              method: "POST",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "update_item",
                items: [product],
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.status === "success") {
                  getCart(); //to update with server cart
                } else {
                  getCart();
                  console.log(res);
                  toast.error("Something went wrong!");
                }
              })
              .catch((err) => {
                toast.error("Failed to send to the server!");
                console.log(err);
              });
          }
        },

        //  * SERVER UPDATE ITEM QTY
        serverUpdateQty: (id, qty) => {
          const { getCart, storageUpdateQty } = get();
          storageUpdateQty(id, qty);
          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;

          if (userToken && userEmail) {
            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/add-to-cart`, {
              method: "POST",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "update_item",
                items: [
                  {
                    productID: id,
                    quantity: qty,
                  },
                ],
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log("updated quantity", res);
                if (res.status === "success") {
                  console.log("Updated qty from the server cart");

                  getCart();

                  //   set({ cart: res.cart });
                  //   localStorage.setItem("storageCart", JSON.stringify(res.cart));
                } else {
                  toast.error(res.message);
                  getCart();
                }
              })
              .catch((err) => {
                toast.error("Failed to send to the server!");
                getCart();
                console.log(err);
              });
          }
        },
        //  * CHECKOUT
        checkout: ({ data, routeToOrders }) => {
          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;
          const { getCart } = get();

          if (userToken && userEmail) {
            set({ makingPayment: true });
            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/checkout`, {
              method: "POST",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((res) => {
                // console.log("resoooooo", res);
                // return;
                if (res.status === "success") {
                  // toast.success("Updated qty from the server cart");
                  getCart();
                  set({ makingPayment: false });
                  toast.success("Payment successfully made!");

                  // router.push("/")
                  routeToOrders();

                  //   set({ cart: res.cart });
                  //   localStorage.setItem("storageCart", JSON.stringify(res.cart));
                } else {
                  toast.error(res.message);
                  set({ makingPayment: false });
                  console.log(res);
                }
              })
              .catch((err) => {
                toast.error("Failed to make payment!");
                set({ makingPayment: false });
                console.log(err);
              });
          }
        },

        //  * RESET
        logoutResetCart: () => {
          set({ cart: [] });
        },

        getCategories: () => {
          fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/product-category`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              // toast.success("Success fetching categories!");
              if (res.status === "success") {
                set({ categories: res.category });
              } else {
                console.log("Failed to fetch categories!");
              }
            })
            .catch((err) => {
              console.log("Failed to fetch categories!");
              console.log(err);
            });
        },

        //  * GET ORDERS
        getOrders: () => {
          const userToken = secureLocalStorage.getItem("userToken");
          const userEmail = secureLocalStorage.getItem("user")?.email;

          if (userToken && userEmail) {
            set({ fetchingOrders: true });
            fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-orders`, {
              method: "GET",
              headers: {
                usertoken: userToken,
                useremail: userEmail,
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((res) => {
                // toast.success("Success fetching orders!");
                // console.log("res");
                set({ fetchingOrders: false });
                set({ orders: res.orders });
                return;
                if (res.status === "success") {
                  set({ categories: res.category });
                } else {
                  toast.error("Failed to fetch categories!");
                }
              })
              .catch((err) => {
                set({ fetchingOrders: false });
                toast.error("Failed to fetch orders!");
                console.log(err);
              });
          }
        },
      }),
      { name: "cart", skipHydration: true }
    )
  )
);
