import AllCtx from "@/util-functions/allCtx";
import React, { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";

function OngoingBidDesktopCountdown({
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

    // console.warn("Updating from server time...");
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
    <div className="bottom-0 absolute flex px-2 bg-white py-1 right-0 items-center gap-x-2 rounded-tl-lg">
      <HiOutlineClock className="w-5 h-5 text-pry-color" />
      <p
        className={`text-lg font-medium ${
          countdown?.hours < 1 && countdown?.minutes < 5
            ? "text-red-600"
            : "text-black"
        }`}
      >
        {serverCountdownInSeconds === "not-started"
          ? "Not Started"
          : serverCountdownInSeconds === "ended"
          ? "Bid Ended"
          : typeof countdown?.hours == "undefined"
          ? "__:__:__"
          : `${countdown?.hours}${countdown?.minutes}${countdown?.seconds}`}
      </p>
      {/* <p>{statefulCountdownHHMMSS}</p> */}
    </div>
  );
}

export default OngoingBidDesktopCountdown;
