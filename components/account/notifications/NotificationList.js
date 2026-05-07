import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import secureLocalStorage from "react-secure-storage";

function NotificationList() {
  const router = useRouter();

  const {
    notificationArray,
    setNotificationArray,
    fetchingNotifications,
    setFetchingNotifications,
    setSelectedAuction,
    setSelectedBid,
    setShowPlaceBidOverlay,
    triggerAlert,
    user,
    userToken, selectedAccountTab
  } = AllCtx();

  //   const originalDate = new Date('2023-10-30');

  // Options for formatting the date
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  function shortenTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);

    // Determine AM or PM
    const period = hour >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour}:${minutes} ${period}`;
  }
  // Use toLocaleDateString to format the date
  //   const formattedDate = originalDate.toLocaleDateString('en-GB', options)

  // products navigation settings
  const itemsPerPage = 5;
  const [offset, setOffset] = useState(0);
  const endOfOffset = offset + itemsPerPage;
  const currentItems = notificationArray.slice(offset, endOfOffset);
  const pageCount = Math.ceil(notificationArray.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const listContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the top of the list when the currentPage changes
    if (listContainerRef.current) {
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage, selectedAccountTab]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset =
      (event.selected * itemsPerPage) % notificationArray.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  }; // products navigation settings end

  const [showDeleteTick, setShowDeleteTick] = useState(false);
  const [notificationIDsToDelete, setNotificationIDsToDelete] = useState([]);
  const [notificationToRead, setNotificationToRead] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState({});

  // //>Fetch Notifications
  useEffect(() => {
    async function fetchData() {
      // console.log("tihislslsls");
      try {
        // setLoginResponse("Please wait...");
        setFetchingNotifications(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-notifications`,
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
          setFetchingNotifications(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setFetchingNotifications(false);
          return;
        }
        // console.log(data);

        // return;

        setNotificationArray(data.notifications);
        // setDuplicatedActiveBids(data.notifications);

        setFetchingNotifications(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        setFetchingNotifications(false);
      }
    }
     if (user) {
      fetchData();
    }

    const intervalId = setInterval(
      () => {
         if (user) {
      fetchData();
    }
        // console.log("This code runs in an interval");
      },
      notificationArray.length === 0 ? 60000 : 60000
    ); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function checkAndUncheck(notification) {
    if (!notificationIDsToDelete.includes(notification?.id)) {
      setNotificationIDsToDelete((oldIDArray) => [
        ...oldIDArray,
        notification.id,
      ]);
    }
    if (notificationIDsToDelete.includes(notification.id)) {
      setNotificationIDsToDelete((oldIDArray) =>
        oldIDArray.filter((id) => notification?.id !== id)
      );
    }
  }

  // //>Delete notification handler
  async function deleteNotification(notificationIDArr) {
    // return

    let duplicateArray = [...notificationArray];

    const updatedArray = duplicateArray.filter(
      (notification) => !notificationIDArr.includes(notification.id)
    );

    let shouldDelete = confirm(
      "Do you really want to delete selected notification(s)?"
    );
    if (shouldDelete) {
      setNotificationArray(updatedArray);
      setShowDeleteTick(false);
      triggerAlert({
        message: "Notifications deleted successfully!",
        color: "green",
      });
    } else {
      return;
    }
    const dataToSubmit = { notification_id: notificationIDsToDelete.join(",") };
    // return

    try {
      const response = await fetch(
        // setConnecting(true);
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/remove-notification`,
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
        setNotificationArray(duplicateArray);
        triggerAlert({
          message: "Deleting notifications failed!",
          color: "red",
        });

        // setConnecting(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setNotificationArray(duplicateArray);
        triggerAlert({
          message: "Deleting notifications failed!",
          color: "red",
        });
        // setConnecting(false);
        return;
      }
      // console.log(data);

      // return;

      // setDefaultCardID(data.default);
      triggerAlert({
        message: "Notifications deleted successfully!",
        color: "green",
      });
      // setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setDefaultCardID(reservedCardID);
      setNotificationArray(duplicateArray);
      triggerAlert({
        message: "Deleting notifications failed!",
        color: "red",
      });
      // setConnecting(false);
    }
  }

  // //>Mark as read
  async function markAsRead(noti) {
    // return

    if (noti.status === "read") {
      return;
    }

    let reservedArray = [...notificationArray];
    let duplicateArray = [...notificationArray];

    // let notificationToRead = duplicateArray.find(
    //   (notif) => notif.id === noti.id
    // );

    noti.status = "read";
    // console.log(notificationToRead);
    setNotificationArray(duplicateArray);
    // return;

    const dataToSubmit = { notification_id: `${noti.id}`, status: "read" };
    // return

    try {
      const response = await fetch(
        // setConnecting(true);
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/update-notification`,
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
        setNotificationArray(reservedArray);
        // triggerAlert({
        //   message: "Marking as  failed!",
        //   color: "red",
        // });

        // setConnecting(false);
        return;
      }

      if (!response.ok) {
        // console.log(data);
        console.log("Response not OK");
        setNotificationArray(reservedArray);
        // triggerAlert({
        //   message: "Marking as  failed!",
        //   color: "red",
        // });
        // setConnecting(false);
        return;
      }
      // console.log(data);

      // return;
      // setNotificationArray(duplicateArray);
      // triggerAlert({
      //   message: "Notifications deleted successfully!",
      //   color: "green",
      // });
      // setConnecting(false);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      // setDefaultCardID(reservedCardID);
      setNotificationArray(reservedArray);
      // triggerAlert({
      //   message: "Deleting notifications failed!",
      //   color: "red",
      // });
      // setConnecting(false);
    }
  }

  return (
    <div ref={listContainerRef} className="w-full lg:w-[50%] scroll-mt-56 ">
      {fetchingNotifications && notificationArray.length === 0 && (
        <p className="mt-10 ">Loading notifications... Please wait.</p>
      )}

      {!fetchingNotifications && notificationArray.length === 0 && (
        <p className="text-red-600 mt-10 ">
          There is no notification here yet.{" "}
        </p>
      )}
      {notificationArray.length > 0 && (
        <div className="w-full  rounded-md border p-5 ">
          <div
            className={`flex ${
              notificationIDsToDelete.length <= 0 || !showDeleteTick
                ? "justify-end"
                : "justify-between"
            } items-center`}
          >
            {/* //>Delete button */}
            {notificationIDsToDelete.length > 0 && showDeleteTick && (
              <button
                onClick={() => {
                  deleteNotification(notificationIDsToDelete);
                }}
                className="py-2 px-3 bg-red-600 text-white rounded-md hover:bg-opacity-80 duration-300"
              >
                Delete Selected Item
                {notificationIDsToDelete.length > 1 ? "s" : ""}
              </button>
            )}

            {/* //>Delete icon */}
            {!showDeleteTick && (
              <Icon
                onClick={() => {
                  setShowDeleteTick(true);
                }}
                icon="fluent:delete-32-filled"
                className="w-6 h-6 text-red-600 cursor-pointer"
              />
            )}

            {showDeleteTick && (
              <Icon
                onClick={() => {
                  setShowDeleteTick(false);
                }}
                icon="carbon:close-filled"
                className="w-6 h-6 text-red-600 cursor-pointer"
              />
            )}
          </div>

          <div className="mt-5 ">
            {/* //>Notification item */}
            {currentItems.map((notification) => (
              <div
                onMouseOver={() => {
                  setSelectedNotification(notification);
                  notification.type === "bid"
                    ? setSelectedBid(notification.item)
                    : notification.type === "auction"
                    ? setSelectedAuction(notification.item)
                    : null;
                  // console.log(bid);
                }}
                onTouchStart={() => {
                  setSelectedNotification(notification);
                  notification.type === "bid"
                    ? setSelectedBid(notification.item)
                    : notification.type === "auction"
                    ? setSelectedAuction(notification.item)
                    : null;
                }}
                onClick={() => {
                  markAsRead(notification);
                }}
                key={notification.id}
                className={`${
                  notification.status === "unread" ? "bg-green-50" : ""
                } -mx-5 pr-5 pt-5 flex border-b pb-5 items-center gap-x-3 mt-5 cursor-pointer`}
              >
                {/* //<check box */}
                <div
                  onClick={() => {
                    checkAndUncheck(notification);
                  }}
                  className="rounded-sm border border-gray-400 flex justify-center items-center w-fit cursor-pointer"
                >
                  {showDeleteTick && (
                    <Icon
                      icon="typcn:tick"
                      className={`text-pry-color w-6 h-6 ${
                        notificationIDsToDelete.includes(notification?.id)
                          ? "visible"
                          : "invisible"
                      }`}
                    />
                  )}
                </div>

                <div>
                  {/* //<bell and text */}
                  <div className="flex gap-x-2">
                    <div className="pt-1">
                      <Icon
                        icon="basil:notification-solid"
                        className="w-6 h-6 text-pry-color"
                      />
                    </div>

                    <p className="text-lg">{notification.message}</p>
                  </div>
                  {/* //<time */}
                  <div className="flex justify-end items-center">
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(notification.date).toLocaleDateString(
                        "en-GB",
                        options
                      )}{" "}
                      - {shortenTime(notification.time)}
                    </p>
                  </div>

                  {/* //<buttons */}
                  {/* <div
                    onClick={(e) => {
                      // e.stopPropagation();
                      notification.type === "bid"
                        ? setShowPlaceBidOverlay(true)
                        : notification.type === "auction"
                        ? router.push("/auction-details")
                        : null;
                    }}
                    className="pl-8 w-fit"
                  >
                    {(notification.type === "bid" ||
                      notification.type === "auction") && (
                      <button className="rounded p-2 bg-pry-color duration-300 hover:bg-opacity-80 text-white">
                        Open Item
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {notificationArray.length > itemsPerPage && (
            <div className="overflow-x-auto flex mt-5 ">
              <ReactPaginate
                breakLabel="..."
                nextLabel=" Next "
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel=" Previous "
                renderOnZeroPageCount={null}
                className="flex  items-center text-gray-500 justify-center  space-x-2 md:space-x-3   font-semibold"
              activeClassName="text-white  !bg-pry-color rounded-md  flex justify-center items-center"
              disabledLinkClassName="border text-gray-200  py-2 px-4  rounded-md pointer-events-none select-none"
              pageClassName=""
              pageLinkClassName=" py-2 px-4 border rounded-md   flex justify-center items-center  cursor-pointer"
              previousLinkClassName="border text-black rounded-md   flex justify-center items-center  cursor-pointer py-2 px-4"
              nextLinkClassName="border rounded-md   flex justify-center items-center text-black cursor-pointer py-2 px-4"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationList;
