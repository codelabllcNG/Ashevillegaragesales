import AllCtx from "@/util-functions/allCtx";
import React, { useState } from "react";

function MobileSideCategories({
  showCategories,
  setShowCategories,
  selectedCondition,
  selectedPrice,
  selectedFormat,
  setSelectedCondition,
  setSelectedPrice,
  setSelectedFormat,
}) {
  const {
    setShowPlaceBidOverlay,
    setShareBidOverlay,
    notificationOverlay,
    setNotificationOverlay,
    ongoingBids,
    setTrendingBids,
    duplicatedTrendingBids,
    setOngoingBids,
    setSelectedBid,
    selectedBid,
    updateSelectedBid,
    setCategories,
    categories,
    duplicatedOngoingBids,
    setDuplicatedOngoingBids,
    setBidType,
    setDuplicatedCategories,
    filterByCategory,
    handleFilter,
    triggerAlert,
    selectedCategory,
    setSelectedCategory,
    user,
  } = AllCtx();
  const CATEGORIES = [
    "All",
    "Jewelry",
    "Music",
    "Bikes",
    "Fitness",
    "Health",
    "Designers",
    "Cell Phones",
    "Gadgets",
    "Furniture",
    "Vintage",
    "Electronics",
  ];

  const CONDITION = ["All", "New", "Old", "Fairly Used"];

  const PRICE = ["All", "Under $50", "$50 - $100", "Over $100"];

  const FORMAT = ["All Listings", "Buy Now"];

  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [selectedCondition, setSelectedCondition] = useState("All");
  // const [selectedPrice, setSelectedPrice] = useState("All");
  // const [selectedFormat, setSelectedFormat] = useState("All Listings");

  return (
    <div
      onClick={() => {
        setShowCategories(!showCategories);
      }}
      className={`fixed md:hidden h-[80%] top-24 scrollbar-hide overflow-y-scroll left-0 w-full   duration-700 p-3     ${
        showCategories ? "translate-x-0 " : " -translate-x-full"
      } z-[20]`}
    >
      <div className="">
        {/* //>Categories */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-[#f5f5f5] py-3 px-3 rounded-md w-1/2"
        >
          <p className="text-2xl font-medium underline underline-offset-[16px] mb-3">
            Categories
          </p>
          <p
            onClick={() => {
              setSelectedCategory("All");
              setOngoingBids(duplicatedOngoingBids);
              setShowCategories(false);
            }}
            className={`duration-300 pt-3 text-lg select-none cursor-pointer ${
              selectedCategory === "All" ? "font-semibold italic" : ""
            }`}
          >
            All
          </p>
          {categories.map((category) => (
            <p
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.name);
                handleFilter({
                  selectedFormat,
                  selectedCategory: category.name,
                  selectedCondition,
                  selectedPrice,
                });
                setShowCategories(false);
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
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-[#f5f5f5] py-3 px-3 rounded-md w-1/2 mt-2"
        >
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
                setShowCategories(false);
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
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-[#f5f5f5] py-3 px-3 rounded-md w-1/2 mt-2"
        >
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
                setShowCategories(false);
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
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-[#f5f5f5] py-3 px-3 rounded-md w-1/2 mt-2"
        >
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
                setShowCategories(false);
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
    </div>
  );
}

export default MobileSideCategories;
