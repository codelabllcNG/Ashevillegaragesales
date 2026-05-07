import AuctionNotificationOverlay from "@/components/bids-and-auctions/AuctionNotificationOverlay";
import CategoriesTab from "@/components/bids-and-auctions/CategoriesTab";
import ClosedAuctions from "@/components/bids-and-auctions/ClosedAuctions";
import CurrentAuctions from "@/components/bids-and-auctions/CurrentAuctions";
import NotificationOverlay from "@/components/bids-and-auctions/NotificationOverlay";
import UpcomingAuctions from "@/components/bids-and-auctions/UpcomingAuctions";
import AllCtx from "@/util-functions/allCtx";
import { set } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

function Auctions() {
  const TABS = [
    {
      name: "Current Auctions",
      id: "current_auctions",
    },

    {
      name: "Upcoming Auctions",
      id: "upcoming_auctions",
    },

    {
      name: "Closed Auctions",
      id: "closed_auctions",
    },

    {
      name: "Categories",
      id: "categories",
    },
  ];

  const router = useRouter();
  const { source } = router.query;

  const {
    selectedNavLink,
    setSelectedNavLink,
    notificationOverlay,
    currentAuctions,
    upcomingAuctions,
    closedAuctions,
    setCurrentAuctions,
    setUpcomingAuctions,
    setClosedAuctions,
    selectedAuctionTab,
    setSelectedAuctionTab,
    setSearchSuggestionList,
    auctionNotificationOverlay,
    setUserDropdown,
    setHelpDropdown,
  } = AllCtx();

  useEffect(() => {
    setSelectedNavLink("products");
  }, []);

  const [openTabItems, setOpenTabItems] = useState(false);
  const [fetching, setFetching] = useState(false);

  // //>Fetch lots
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoginResponse("Please wait... ");
        setFetching(true);
        // console.log("yyyyy");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-auction`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("ldldldl");
        const data = await response.json();

        if (data.status === "fail") {
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
        // console.log(data.auctions);
        // setFetching(false);
        // return;

        const current = data.auctions.filter(
          (auction) => auction.auction_status === "current"
        );
        const upcoming = data.auctions.filter(
          (auction) => auction.auction_status === "upcoming"
        );
        const closed = data.auctions.filter(
          (auction) => auction.auction_status === "closed"
        );

        setCurrentAuctions(current);
        setUpcomingAuctions(upcoming);
        setClosedAuctions(closed);
        // setDuplicatedOngoingBids(data.bids);

        setFetching(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetching(false);
      }
    }
    fetchData();

    const intervalId = setInterval(
      () => {
        fetchData();
        // console.log("This code runs in an interval");
      },
      currentAuctions.length === 0 ||
        upcomingAuctions.length === 0 ||
        closedAuctions.length ||
        0
        ? 60000
        : 10000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [
    selectedAuctionTab,
    closedAuctions.length,
    currentAuctions.length,
    upcomingAuctions.length,
  ]);

  return (
    <div
      onClick={() => {
        // throw new Error()
        setSearchSuggestionList([]);
        setUserDropdown(false);
        setHelpDropdown(false);
      }}
      className="scroll-smooth px-3 sm:px-8 lg:px-[5rem]"
    >
      {/* //>TABS */}
      <div className=" hidden sm:flex justify-center items-center mt-9">
        <div className="border whitespace-nowrap  rounded-full max-w-fit flex space-x-1 750:space-x-3  overflow-x-auto scrollbar-hide  ">
          {/* //> Current Auctions */}
          <div className=" flex justify-center items-center">
            <button
              onClick={() => {
                setSelectedAuctionTab("current_auctions");
                // setRightSideView("notes");
                // setShowMobileOverlay(false)
              }}
              className={` px-6 w-full rounded-full text-xs md:text-base xl:text-2xl font-medium py-2 hover:bg-opacity-60 duration-300 ${
                selectedAuctionTab === "current_auctions"
                  ? "bg-[#95c08b]  border border-gray-500"
                  : "border-none bg-white"
              } `}
            >
              Current Auctions
            </button>
          </div>
          <div className="bg-gray-300 w-[0.1rem]  my-1"></div>

          {/* //>Upcoming Auctions */}
          <div className=" flex justify-center items-center">
            <button
              onClick={() => {
                setSelectedAuctionTab("upcoming_auctions");
                // setRightSideView("notes");
                // setShowMobileOverlay(false)
              }}
              className={` px-6 w-full text-xs md:text-base xl:text-2xl rounded-full font-medium py-2 hover:bg-opacity-60 duration-300 ${
                selectedAuctionTab === "upcoming_auctions"
                  ? "bg-[#95c08b]  border border-gray-500 "
                  : "border-none bg-white"
              } `}
            >
              Upcoming Auctions
            </button>
          </div>
          <div className="bg-gray-300 w-[0.1rem]  my-1"></div>

          {/* //> Closed Auctions */}
          <div className=" flex justify-center items-center">
            <button
              onClick={() => {
                setSelectedAuctionTab("closed_auctions");
                // setRightSideView("notes");
                // setShowMobileOverlay(false)
              }}
              className={` px-6 w-full text-xs md:text-base xl:text-2xl rounded-full font-medium py-2 hover:bg-opacity-60 duration-300 ${
                selectedAuctionTab === "closed_auctions"
                  ? "bg-[#95c08b]  border border-gray-500 "
                  : "border-none bg-white"
              } `}
            >
              Closed Auctions
            </button>
          </div>
          <div className="bg-gray-300 w-[0.1rem]  my-1"></div>

          {/* //>  Categories */}
          <div className=" flex justify-center items-center">
            <button
              onClick={() => {
                setSelectedAuctionTab("categories");
                // setRightSideView("reminders");
                // setShowMobileOverlay(false)
              }}
              className={` px-6 w-full text-xs md:text-base xl:text-2xl rounded-full font-medium py-2 hover:bg-opacity-60 duration-300 ${
                selectedAuctionTab === "categories"
                  ? "bg-[#95c08b]  border border-gray-500 "
                  : "border-none bg-white"
              } `}
            >
              Categories
            </button>
          </div>
        </div>
      </div>

      {/* //>   MOBILE TABS */}
      <div className="mt-3 border border-pry-color rounded-md bg-[#eafff0] select-none  p-3  sm:hidden">
        <div
          onClick={() => {
            setOpenTabItems(!openTabItems);
          }}
          className=" rounded-md flex justify-between items-center cursor-pointer "
        >
          Browse Categories <FaAngleDown className="w-6 h-6" />{" "}
        </div>
        {openTabItems && (
          <div className="space-y-3 mt-3">
            {TABS.map((item) => (
              <p
                key={item.id}
                onClick={() => {
                  setSelectedAuctionTab(item.id);
                  setOpenTabItems(false);
                }}
                className="cursor-pointer select-none"
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
      </div>

      {selectedAuctionTab === "current_auctions" && (
        <CurrentAuctions fetching={fetching} />
      )}
      {selectedAuctionTab === "upcoming_auctions" && (
        <UpcomingAuctions fetching={fetching} />
      )}
      {selectedAuctionTab === "closed_auctions" && (
        <ClosedAuctions fetching={fetching} />
      )}
      {selectedAuctionTab === "categories" && <CategoriesTab />}
      {notificationOverlay && <NotificationOverlay />}
      {auctionNotificationOverlay && <AuctionNotificationOverlay />}
    </div>
  );
}

export default Auctions;
