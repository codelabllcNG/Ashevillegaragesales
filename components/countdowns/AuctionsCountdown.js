import React, { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { format, parse } from "date-fns";
import AllCtx from "@/util-functions/allCtx";

function AuctionsCountdown({
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

    // console.log("Updating local time countdown");
    setStatefulCountdownHHMMSS(serverCountdownHHMMSS);
    setStatefulCountdownInSeconds(serverCountdownInSeconds);

    function runCountDown() {
      setStatefulCountdownInSeconds((prevSeconds) => {
        const secondsRemaining = prevSeconds - 1;
        // console.warn(statefulCountdownInSeconds);
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
    <div className="  flex  items-center gap-x-3 ">
      <HiOutlineClock className="sm:w-7 w-4 sm:h-7 h-4 text-pry-color " />
      <p
        //  ${
        //   serverCountdownInSeconds == "not-started"
        //     ? "text-pry-color"
        //     : "text-red-600"
        // }

        className={`text-base sm:text-2xl font-semibold ${
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

export default AuctionsCountdown;
