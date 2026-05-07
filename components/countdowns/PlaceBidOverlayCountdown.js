import AllCtx from "@/util-functions/allCtx";
import React, { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";

function PlaceBidOverlayCountdown({
  serverCountdownInSeconds,
  serverCountdownHHMMSS,
}) {
  const [countdown, setCountdown] = useState(
    serverCountdownHHMMSS == "ended" ? "Bid Ended" : "__:__:__"
  );

  const [statefulCountdownInSeconds, setStatefulCountdownInSeconds] = useState(
    serverCountdownInSeconds
  );
  const [statefulCountdownHHMMSS, setStatefulCountdownHHMMSS] = useState(
    serverCountdownHHMMSS
  );

  useEffect(() => {
    // console.warn(serverCountdownHHMMSS)

    // console.warn("Updating from server time... on Place Bid Overlay");
    setStatefulCountdownHHMMSS(serverCountdownHHMMSS);
    setStatefulCountdownInSeconds(serverCountdownInSeconds);

    function runCountDown() {
      setStatefulCountdownInSeconds((prevSeconds) => {
        const secondsRemaining = prevSeconds - 1;
        // console.warn(prevSeconds);
        if (prevSeconds > 0) {
          const hours = Math.floor(secondsRemaining / 3600);
          const minutes = Math.floor((secondsRemaining % 3600) / 60);
          const seconds = secondsRemaining % 60;
          const formattedHours = `${String(hours).padStart(2, "0")}h:`;
          const noColonFormattedHours = `${String(hours).padStart(2, "0")}h`;
          const formattedMinutes = `${String(minutes).padStart(2, "0")}m`;
          const formattedSeconds = `:${String(seconds).padStart(2, "0")}s`;
          setCountdown({
            hours: `${
              hours > 0 && minutes > 0
                ? formattedHours
                : hours > 0 && minutes < 1
                ? noColonFormattedHours
                : ""
            }`,
            minutes: `${
              minutes > 0
                ? formattedMinutes
                : minutes < 1 && hours < 1
                ? formattedMinutes
                : ""
            }`,
            seconds: `${
              hours < 1
                ? formattedSeconds
                : hours > 0 && minutes < 1
                ? formattedSeconds
                : ""
            }`,
          });
          // console.warn(prevSeconds);
          return secondsRemaining;
        } else {
          return prevSeconds;
        }
      });
    }

    const timerInterval = setInterval(() => {
      runCountDown();
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [serverCountdownInSeconds, serverCountdownHHMMSS]);

  return (
    <div className=" flex px-2    items-center gap-x-2 ">
      <HiOutlineClock className="w-4 h-4  " />
      <p className={`text-sm sm:text-lg font-medium ${countdown?.hours < 1 && countdown?.minutes < 5 ? "text-red-600" : "text-black"}`}>
        {serverCountdownInSeconds === "not-started"
          ? "Not Started"
          : serverCountdownInSeconds === "ended"
          ? "Bid Ended"
          : typeof countdown?.hours == "undefined"
          ? "__:__:__"
          : `${countdown?.hours}${countdown?.minutes}${countdown?.seconds}`}
      </p>
    </div>
  );
}

export default PlaceBidOverlayCountdown;
