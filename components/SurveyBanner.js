import Image from "next/image";
import React from "react";
import navContactIcon from "@/public/images/nav_location-icon.svg";
import AllCtx from "@/util-functions/allCtx";

function SurveyBanner() {
  const { showSurveyVideo,setShowSurveyVideo } = AllCtx();

  return (
    <div className="flex justify-center items-center bg-red-600 text-white -mx-3 sm:-mx-8 lg:-mx-[5rem] p-3 text-center  ">
      You are currently in a test mode. Click
      <button
        className="mx-1 underline  font-medium"
        onClick={() => {
          setShowSurveyVideo(!showSurveyVideo);
        }}
      >
        here
      </button>
      to <span className="mx-1">{ showSurveyVideo ? " hide the video." : " watch a video."}</span>
    </div>
  );
}

export default SurveyBanner;
