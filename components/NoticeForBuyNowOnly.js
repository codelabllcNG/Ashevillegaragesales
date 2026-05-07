import { Icon } from "@iconify/react";
import React, { useState } from "react";

function NoticeForBuyNowOnly() {
  const [show, setShow] = useState(true);
  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } first-line:relative bg-red-500 text-white px-3 text-sm py-2 text-center -mx-3 sm:-mx-8 lg:-mx-[5rem]  items-center justify-center overflow-x-scroll scrollbar-hide`}
    >
      <Icon icon="mdi:megaphone" className="text-3xl mr-4" />{" "}
      <p className="text-sm mr-5">
        We are currently on buy-only service, the bidding system will be back
        soon!
      </p>{" "}
      <Icon
        onClick={() => {
          setShow(false);
        }}
        icon="material-symbols-light:close"
        className="absolute right-3 cursor-pointer text-3xl"
      />
    </div>
  );
}

export default NoticeForBuyNowOnly;
