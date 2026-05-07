import React, { useEffect, useState } from "react";
import CategorisedBids from "./CategorisedBids";
import AllCtx from "@/util-functions/allCtx";
import secureLocalStorage from "react-secure-storage";

function CategoriesTab() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    setDuplicatedOngoingBids,
    setCategories,
    filterByCategory,
    duplicatedOngoingBids,
    ongoingBids,
    setOngoingBids,
    setDuplicatedCategories,
    handleFilter,
  } = AllCtx();
  // const CATEGORIES = [
  //   "All",
  //   "Jewelry",
  //   "Music",
  //   "Bikes",
  //   "Fitness",
  //   "Health",
  //   "Designers",
  //   "Cell Phones",
  //   "Gadgets",
  //   "Furniture",
  //   "Vintage",
  //   "Electronics",
  // ];

  const CONDITION = ["All", "New", "Old", "Fairly Used"];

  const PRICE = ["All", "Under $50", "$50 - $100", "Over $100"];

  const FORMAT = ["All Listings", "Buy Now"];

  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All Listings");
  const [fetchingCategories, setFetchingCategories] = useState(false);

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

  return (
    <div className="md:flex  justify-between  gap-x-5 mt-10">
      {/* //>Side filter */}
      <div className="hidden md:block">
        {/* //>Categories */}
        <div className="bg-[#f5f5f5] py-3 px-3 rounded-md">
          <p className="text-2xl font-medium underline underline-offset-[16px] mb-3">
            Categories
          </p>
          <p
            onClick={() => {
              setSelectedCategory("All");
              setOngoingBids(duplicatedOngoingBids);
            }}
            className={`duration-300 pt-3 text-lg select-none cursor-pointer ${
              selectedCategory === "All" ? "font-semibold italic" : ""
            }`}
          >
            All
          </p>
          {categories.map((category) => (
            <p
              // onMouseEnter={() => {
              //   console.log(category.name);
              // }}
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.name);
                handleFilter({
                  selectedFormat,
                  selectedCategory: category.name,
                  selectedCondition,
                  selectedPrice,
                });
                // filterByCategory({
                //   arrayToFilter: duplicatedOngoingBids,
                //   categoryName: category.name,
                //   setArrayToFilter: setOngoingBids,
                // });
              }}
              className={`duration-300 pt-3 text-lg select-none cursor-pointer ${
                category.name === selectedCategory ? "font-semibold italic" : ""
              }`}
            >
              {category.name}
            </p>
          ))}
        </div>

        {/* //>Condition */}
        <div className="bg-[#f5f5f5] py-3 px-3 rounded-md mt-4">
          <p className="text-2xl font-medium underline underline-offset-[16px] mb-3">
            Condition
          </p>
          {CONDITION.map((condition) => (
            <p
              key={condition}
              onClick={() => {
                setSelectedCondition(condition);
                handleFilter({
                  selectedFormat,
                  selectedCategory,
                  selectedCondition: condition === "Fairly Used" ? "used" : condition,
                  selectedPrice,
                });
              }}
              className={`duration-300 pt-3 text-lg select-none cursor-pointer ${
                condition === selectedCondition ? "font-semibold italic" : ""
              }`}
            >
              {condition}
            </p>
          ))}
        </div>

        {/* //>Retail Price */}
        <div className="bg-[#f5f5f5] py-3 px-3 rounded-md mt-4">
          <p className="whitespace-nowrap text-2xl font-medium underline underline-offset-[16px] mb-3">
            Retail Price
          </p>
          {PRICE.map((price) => (
            <p
              key={price}
              onClick={() => {
                setSelectedPrice(price);
                handleFilter({
                  selectedFormat,
                  selectedCategory,
                  selectedCondition,
                  selectedPrice: price,
                });
              }}
              className={`duration-300 pt-3 text-lg select-none cursor-pointer ${
                price === selectedPrice ? "font-semibold italic" : ""
              }`}
            >
              {price}
            </p>
          ))}
        </div>

        {/* //>Format */}
        <div className="bg-[#f5f5f5] py-3 px-3 rounded-md mt-4">
          <p className="text-2xl font-medium underline underline-offset-[16px] mb-3">
            Format
          </p>
          {FORMAT.map((format) => (
            <p
              key={format}
              onClick={() => {
                setSelectedFormat(format);
                handleFilter({
                  selectedFormat: format,
                  selectedCategory,
                  selectedCondition,
                  selectedPrice,
                });
              }}
              className={` duration-300 pt-3 text-lg select-none cursor-pointer ${
                format === selectedFormat ? "font-semibold italic" : ""
              }`}
            >
              {format}
            </p>
          ))}
        </div>
      </div>

      <CategorisedBids
        selectedCondition={selectedCondition}
        selectedPrice={selectedPrice}
        selectedFormat={selectedFormat}
        setSelectedCondition={setSelectedCondition}
        setSelectedPrice={setSelectedPrice}
        setSelectedFormat={setSelectedFormat}
      />
    </div>
  );
}

export default CategoriesTab;
