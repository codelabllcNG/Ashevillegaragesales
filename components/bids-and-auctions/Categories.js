import AllCtx from "@/util-functions/allCtx";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import secureLocalStorage from "react-secure-storage";

function Categories({productsArray}) {
  const {
    setShowPlaceBidOverlay,
    catID,
    setShareBidOverlay,
    notificationOverlay,
    setNotificationOverlay,
    ongoingBids,
    showPlaceBidOverlay,
    buyNow,
    setTrendingBids,
    duplicatedTrendingBids,
    setOngoingBids,
    setSelectedBid,
    selectedBid,
    updateSelectedBid,
    setShowBuyNowOverlay,
    setCategories,
    categories,
    duplicatedOngoingBids,
    setDuplicatedOngoingBids,
    setBidType,
    setDuplicatedCategories,
    filterByCategory,
    triggerAlert,
    selectedCategory,
    updateCountdownOngoingBids,
    setSelectedCategory,
    setSelectedAuctionTab,
    updateOngoingBids,
    fetchingOngoingBids,
    setFetchingOngoingBids,
    user,setFilteredProducts
  } = AllCtx();

  const scrollRef = useRef();

  const { categories: cats } = useCartStore((state) => state);

  function scroll(value) {
    scrollRef.current.scrollLeft += value;
  }

  // //>Fetch categories
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait...");
        setFetchingCategories(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-category`,
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
          setFetchingCategories(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetchingCategories(false);
          return;
        }
        // console.log(data);

        // return;

        setCategories(data.categories);
        setDuplicatedCategories(data.categories);

        setFetchingCategories(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetchingCategories(false);
      }
    }
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      // console.log("This code runs in an interval");
    }, 60000); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);
   
  const [openCategory, setOpenCategory] = useState(false);
  // const [fetching, setFetching] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);

  return (
    <div id="categories" className="mt-5 scroll-mt-56 w-full">
      <div className="hidden sm:flex w-full ">
        <div className="flex cursor-pointer items-center">
          {" "}
          <FaAngleLeft
            className="opacity-50 hover:opacity-100 text-pry-color"
            onClick={() => {
              scroll(-200);
            }}
            size={20}
          /> 
        </div>
        <div
          ref={scrollRef}
          className="flex scroll-smooth  overflow-x-scroll justify-between items-center scrollbar-hide "
        >
          <div
            onClick={() => {
              setSelectedCategory("All");
              filterByCategory({
                arrayToFilter: productsArray.slice(3),
                categoryName: "All",
                setArrayToFilter: setFilteredProducts,
              });
              // setOngoingBids(duplicatedOngoingBids);
            }}
            className={`px-2 py-1 cursor-pointer rounded-full select-none ${
              selectedCategory === "All"
                ? "bg-pry-color text-white"
                : "bg-gray-200  "
            }`}
          >
            All
          </div>
          {cats?.map((category, i) => (
            <div
              className="mx-3  relative justify-between     "
              key={category.name}
            >
              <div
                onClick={() => {
                  setSelectedCategory(category.name);
                  filterByCategory({
                    arrayToFilter: productsArray,
                    categoryName: category.name,
                    setArrayToFilter: setFilteredProducts,
                  });
               
                }}
                key={category.term_id}
                className={`px-2 py-1 cursor-pointer rounded-full select-none whitespace-nowrap ${
                  selectedCategory === category.name
                    ? "bg-pry-color text-white"
                    : "bg-gray-200  "
                }`}
              >
                {category.name}
              </div>
            </div>
          ))}
        </div>
        <div className="flex cursor-pointer items-center bg-transparent ">
          {" "}
          <FaAngleRight
            className="opacity-50 hover:opacity-100 text-pry-color"
            onClick={() => {
              scroll(200);
            }}
            size={20}
          />
        </div>
      </div>

   

      {/* //>   Mobile categories */}
      <div className="mt-3 border border-pry-color rounded-md bg-[#eafff0] select-none  p-3  sm:hidden">
        <div
          onClick={() => {
            setOpenCategory(!openCategory);
            setSelectedCategory("All");
            filterByCategory({
              arrayToFilter: productsArray.slice(3),
              categoryName: "All",
              setArrayToFilter: setFilteredProducts,
            });
          }}
          className=" rounded-md flex justify-between items-center cursor-pointer "
        >
          {selectedCategory} <FaAngleDown className="w-6 h-6" />{" "}
        </div>
        {openCategory && (
          <div className="space-y-3 mt-3">
            {cats.map((category) => (
              <p
                key={category.term_id}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setOpenCategory(false);
                  filterByCategory({
                    arrayToFilter: productsArray,
                    categoryName: category.name,
                    setArrayToFilter: setFilteredProducts,
                  });
                }}
                className="cursor-pointer select-none"
              >
                {category.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
