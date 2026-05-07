import React, { useEffect, useRef } from "react";
import NotificationList from "./NotificationList";
import NotificationSettings from "./NotificationSettings";
import AllCtx from "@/util-functions/allCtx";

function Notifications() {
  const { selectedAccountTab } = AllCtx();


  
  return (
    <div  className=""  >
      {selectedAccountTab === "notifications" && (
        <div className="lg:flex mt-5 justify-between gap-x-5 scroll-pt-96">
          <NotificationList />
          <NotificationSettings />
        </div>
      )}
    </div>
  );
}

export default Notifications;
