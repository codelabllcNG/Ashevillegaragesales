import AllCtx from "@/util-functions/allCtx";
import React from "react";

function Alert() {
  const { showAlert, setShowAlert, alertText, alertColor } = AllCtx();

  return (
    <div
      className={`fixed top-24 right-0   duration-700 p-3 rounded-md border ${
        alertColor === "green"
          ? "border-pry-color bg-emerald-100 text-pry-color"
          : alertColor === "red"
          ? "border-red-600 bg-red-100 text-red-600"
          : ""
      } ${showAlert ? " translate-x-0 mr-10" : "translate-x-full "} z-[20]`}
    >
      {alertText}
    </div>
  );
}

export default Alert;
