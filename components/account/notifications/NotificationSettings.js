import AllCtx from "@/util-functions/allCtx";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";

function NotificationSettings() {
  const {
    emailNotificationStatus,
    setEmailNotificationStatus,
    notificationChoices,
    setNotificationChoices,
    setNotificationPreference,
    fetchNotificationPreference,user
  } = AllCtx();

  const staticNotificationsChoices = [
    "bid",
    "auction",
    "payment",
    "refund",
    "other",
  ];

  // async function togglePreference() {
  //   if (emailNotificationStatus === "on") {
  //     setEmailNotificationStatus("off");
  //     setNotificationChoices([]);
  //   } else {
  //     setEmailNotificationStatus("on");
  //     setNotificationChoices(staticNotificationsChoices);
  //   }

  // }

  // //>Fetch Preference
  useEffect(() => {
    if (user) {
      fetchNotificationPreference();
    }
  }, []);

  return (
    <div className="w-full   h-fit lg:w-[50%] mt-10 lg:mt-0 rounded-md border p-3">
      {/* //>Inner top div */}
      <div className="flex gap-x-5">
        <div className="w-1/2">
          <p className="text-sm font-medium">Email Notifications</p>
          <p className="mt-4 text-gray-500 text-xs ">
            You can select what you want to be notified about.
          </p>
        </div>

        <div className="w-1/2">
          {/* //>On and off */}
          <div className="mt- py-2 flex gap-5 items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={() => {
                  setNotificationPreference({
                    currentChoice: "",
                    // status: emailNotificationStatus,
                  });
                }}
                checked={emailNotificationStatus === "on"}
                type="checkbox"
                value=""
                className="sr-only peer "
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-pry-color"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {emailNotificationStatus === "on" ? "On" : "Off"}
              </span>
            </label>
          </div>

          {/* //>preference\ */}
          <div className="space-y-5 mt-8">
            {staticNotificationsChoices.slice(2).map((choice) => (
              <div key={choice} className="flex items-center gap-x-3 ">
                {/* //<check box */}
                <div
                  onClick={() => {
                    setNotificationPreference({
                      currentChoice: choice,
                      // status: emailNotificationStatus,
                    });
                  }}
                  className="rounded-sm border border-gray-400 flex justify-center items-center w-fit cursor-pointer"
                >
                  <Icon
                    icon="typcn:tick"
                    className={`bg-pry-color text-white w-6 h-6 ${
                      notificationChoices.includes(choice)
                        ? "visible"
                        : "invisible"
                    }`}
                  />
                </div>

                <p className="text-sm">{`Notify me on ${choice}s`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
