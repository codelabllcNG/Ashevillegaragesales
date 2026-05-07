import AllCtx from "@/util-functions/allCtx";
import React from "react";

function SurveyVideo() {
  const { showSurveyVideo } = AllCtx();

  return (
    <div
      className={`fixed top-24 left-0   duration-300 p-3 rounded-md border  ${
        showSurveyVideo ? " translate-x-0" : "-translate-x-full "
      } z-[20]`}
      controls
      width="300"
      height="100"
    >
     <iframe width="560" height="315" src="https://www.youtube.com/embed/-t1XHdvBMTI?si=x4qH5H8kdmoOkF_E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  );
}

export default SurveyVideo; 
