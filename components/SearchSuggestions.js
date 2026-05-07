import AllCtx from "@/util-functions/allCtx";
import { setSeconds } from "date-fns";
import { useRouter } from "next/router";
import React from "react";

function SearchSuggestions({  }) {
  const router = useRouter();

  const {
    setSearchKeyword,
    setSearchSuggestionList,
    searchKeyword,
    searchSuggestionList,
    setSelectedAuctionTab,catID, setCatID,
    makeGeneralSearch, setMenuClicked
  } = AllCtx();

  return (
    <div className="w-full">
      {searchSuggestionList.length > 0 && searchKeyword && (
        <div className="bg-white pl-3 mt-1 py-2 space-y-3 rounded-b-md shadow-md w-full">
          {searchSuggestionList.map((suggestion) => (
            <p
              key={suggestion}
              onClick={() => {
                setSearchKeyword(suggestion);
                setSearchSuggestionList([]); 
                setMenuClicked(false);
                setSelectedAuctionTab("categories");
                router.push("/auctions");
                makeGeneralSearch({
                  searchTerm: searchKeyword,
                  categoryID: catID,
                });
              }}
              className="cursor-pointer select-none"
            >
              {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchSuggestions;
