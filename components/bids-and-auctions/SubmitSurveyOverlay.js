import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCalendar, FaGavel, FaRegCalendar } from "react-icons/fa";
import {
  HiInformationCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiShare,
} from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFlash } from "react-icons/io5";
import secureLocalStorage from "react-secure-storage";

function SubmitSurveyOverlay() {
  const router = useRouter();

  const {
    setShareBidOverlay,
    setShowSubmitSurveyOverlay,
    showAlert,
    setShowAlert,
    setAlertText,
    triggerAlert,
    userToken,
    user,
    setIsSurvey,
  } = AllCtx();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [surveyCode, setSurveyCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [response, setResponse] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function generateCode() {
    try {
      setResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-survey-code`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: userToken,
            useremail: user?.email,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        setResponse(data.message);
        // console.log(data);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);

      // return;

      setSurveyCode(data.code);

      setConnecting(false);
      setResponse("Success!");
      setShowForm(true);
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  async function submitSurvey(e) {
    // e.preventDefault();

    const dataToSubmit = {
      code: surveyCode,
      name: fullName,
      experience: experience,
    };

    if (!surveyCode) {
      setResponse("You must generate a survey code.");
      // console.log(dataToSubmit);
      return;
    }

    if (
      !fullName ||
      fullName.trim() === "" ||
      !experience ||
      experience.trim() === ""
    ) {
      setResponse("Fill all inputs!");
      // console.log(dataToSubmit);
      return;
    }

    // console.log(dataToSubmit);

    // return;

    try {
      setResponse("Submitting survey...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/submit-survey`,
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
        setResponse(data.message);
        // console.log(data.message);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);

      // return

      // setSurveyCode("");
      // setFullName("");
      // setExperience("");
      triggerAlert({
        message: "Survey completed successfully!",
        color: "green",
      });
      setConnecting(false);
      setResponse("");

      router.push("/");
      setIsSurvey();
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  return (
    <div
      onClick={() => {
        setShowSubmitSurveyOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  bg-white  p-5"
      >
        <p className="text-4xl font-bold text-center">Generate Survey Code</p>

        {/* <p className="text-xl mt-2  text-center">
          When this Item starts bidding{" "}
        </p> */}

        {/* <div className="mt-9 flex gap-x-3 ">
          <Image
            className=""
            alt="Product image"
            src="/images/notification_product_image.png"
            width={101}
            height={76}
          />

          <div className="flex flex-col justify-between">
            <p className="text-lg font-medium">
              IPhone 11 Pro Max All Variants, Available for auction
            </p>
            <div className="flex gap-x-6 items-center mt-2">
              <div className="flex text-sm  items-center gap-x-2">
                <FaRegCalendar className="w-5 h-5 " /> Aug 15, 2024
              </div>
              <div className="flex  bg-white py-1  items-center gap-x-2 ">
                <HiOutlineClock className="w-5 h-5" />
                <p className="text-sm font-medium text-red-600">{`${hours}:${minutes}:${seconds}`}</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* //> Survey Code  */}
        <div className="flex flex-col mt-5">
          <p className="border-gray-400  rounded py-4 mt-5 text-sm font-medium placeholder:text-gray-400">
            {connecting && !surveyCode && (
              <p className="text-center">
                Generating your survey code... Please wait.
              </p>
            )}

            {!connecting && !surveyCode && (
              <p className="text-center">
                Generate survey code to fill your details and submit.
              </p>
            )}
          </p>
          {surveyCode && (
            <div className="flex items-center justify-center gap-x-4 ">
              <p>{surveyCode}</p>{" "}
              {/* <button className="bg-pry-color text-white p-2 rounded-md text-center flex justify-center items-center"
                onClick={async () => {
                  await navigator.clipboard.writeText(surveyCode);
                  setCopied(true);
                }}
              >
                {copied ? "COPIED" : "COPY CODE"}
              </button> */}
            </div>
          )}
        </div>

        {/* //> Response */}
        <div
          className={`${
            response ? "flex" : "hidden"
          } justify-center items-center mt-5`}
        >
          <p
            // type="button"
            className={`w-[95%]
          flex items-center justify-center ${
            response.includes("Success") ? "text-pry-color" : "text-red-600"
          }  rounded-md py-4 px-20    font-medium `}
          >
            {response}
          </p>
        </div>

        {/* //> Full Name */}
        {surveyCode && (
          <div className="flex justify-center items-center  mt-3">
            <div className=" w-full flex flex-col">
              <label htmlFor="full_name" className="font-medium">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                required
                type="text"
                name="full_name"
                id="full_name"
                className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                placeholder="John Smith"
              />
            </div>
          </div>
        )}

        {/* //> Experience */}
        {surveyCode && (
          <div className="flex justify-center items-center  mt-3">
            <div className=" w-full flex flex-col">
              <label htmlFor="experience" className="font-medium">
                Your Experience
              </label>
              <textarea
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                required
                rows="2"
                name="experience"
                id="experience"
                className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                placeholder="Input your overall experience."
              />
            </div>
          </div>
        )}

        {/* //>Generate code button */}
        {!surveyCode && (
          <button
            onClick={() => {
              generateCode();
              // triggerAlert({
              //   message: "You will be notified when bid starts",
              //   color: "green",
              // });
            }}
            className="rounded-md bg-pry-color hover:bg-opacity-80 duration-300 text-white text-lg font-semibold py-3 w-full mt-5"
          >
            Generate Code
          </button>
        )}

        {/* //>Submit survey button */}
        {surveyCode && (
          <button
            disabled={!surveyCode || !fullName || !experience}
            onClick={() => {
              submitSurvey();
            }}
            className="rounded-md bg-pry-color hover:bg-opacity-80 duration-300 text-white text-lg font-semibold py-3 w-full mt-5"
          >
            Submit Details
          </button>
        )}
      </div>
    </div>
  );
}

export default SubmitSurveyOverlay;
