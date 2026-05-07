import ShareBidCountdown from "@/components/countdowns/ShareBidCountdown";
import AllCtx from "@/util-functions/allCtx";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { TimePicker } from "antd";
import { setHours, getHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es, en } from "date-fns/locale/es";
registerLocale("es", es);
registerLocale("en", en);

function AppointmentOverlay() {
  const datePickerRef = useRef();
  const timePickerRef = useRef();

  const {
    setShowAppointmentOverlay,
    selectedBid,
    pickUpDays,
    setPickUpDays,
    pickUpStartTime,
    setPickUpStartTime,
    pickUpEndTime,
    setPickUpEndTime,
    pickUpLocation,
    setPickUpLocation,
    convertDate,
    productionShareLink,
    localHostShareLink,
    selectedAccountTab,
    accountTitle,
    accountTabChild,
    setAccountTabChild,
    user,
    showAlert,
    triggerAlert,
    setShowAlert,
    userToken,
    setDeliveryAddressArray,
    deliveryAddressArray,
    setAppointmentDate,
    appointmentDate,
    setSelectedAddress,
    appointmentTime,
    setAppointmentTime,
    decorateDate,
  } = AllCtx();

  const [phone, setPhone] = useState(user?.phone_number || "");
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [addressResponse, setAddressResponse] = useState("");
  const [country, setCountry] = useState(
    user?.country || "United States of America"
  );
  const [city, setCity] = useState(user?.city || "");
  const [region, setRegion] = useState(user?.region || "");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("yes");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDateChange = (date) => {
    if (!pickUpDays.includes(date.getDay().toString())) {
      // Trigger your specific function for Sunday
      triggerAlert({
        message: "Pick any of the available pick-up days.",
        color: "red",
      });

      return;
    } else {
      setAppointmentDate(date);
      // console.log(convertDate(date));
    }
  };

  function handleAppointmentChange(selectedDay) {
    const dateString = selectedDay;
    const dateArray = dateString.split("-");
    const year = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1; // Months are zero-indexed
    const day = parseInt(dateArray[2], 10);

    const selectedDate = new Date(year, month, day);
    // const dayOfWeek = selectedDate.getDay();
    const dayOfTheWeek = selectedDate.getDay();
    // console.log(dayOfTheWeek);
    // return
    if (
      dayOfTheWeek === 2 ||
      dayOfTheWeek === 4 ||
      dayOfTheWeek === 6 ||
      dayOfTheWeek === 0
    ) {
      triggerAlert({
        message: "You can only pick up on Mondays, Wednesdays, and Fridays",
        color: "red",
      });
      return;
    } else {
      setAppointmentDate(selectedDay);
      // console.log(selectedDay);
    }
  }

  function formatTimeToAMPM(timeString) {
    const parsedTime = new Date(`1970-01-01T${timeString}:00`);
    return format(parsedTime, "hh:mm a");
  }

  const [startHourStr, startMinuteStr] = pickUpStartTime.split(":");
  const [endHourStr, endMinuteStr] = pickUpEndTime.split(":");

  const startHour = parseInt(startHourStr, 10);
  const startMinute = parseInt(startMinuteStr, 10);
  const endHour = parseInt(endHourStr, 10);
  const endMinute = parseInt(endMinuteStr, 10);

  // Function to filter out specific days of the week
  // const filterWeekdays = (date) => {
  //   // Exclude Sundays (day 0) and Saturdays (day 6)
  //   return date.getDay() !== 0 && date.getDay() !== 2 && date.getDay() !== 4 && date.getDay() !== 6;
  // };

  const handleTimeChange = (e) => {
    const inputTime = e.target.value;

    // Validate time within the desired range
    if (isValidTimeRange(inputTime)) {
      // console.log(inputTime);
      setAppointmentTime(inputTime);
    } else {
      triggerAlert({ message: "Pick between 10am and 7pm", color: "red" });
      // console.log('Invalid time');
      return;
    }
  };

  const isValidTimeRange = (time) => {
    const startTime = "10:00";
    const endTime = "19:00";

    // Check if the time is within the desired range
    return time >= startTime && time <= endTime;
  };

  return (
    <div
      onClick={() => {
        setShowAppointmentOverlay(false);
      }}
      className="fixed top-0 z-[11] left-0 h-screen w-full bg-black bg-opacity-30 justify-center items-center flex overflow-y-hidden  "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-md  max-h-[90%] border bg-white border-pry-color p-5  pb-8 sm:w-[70%] lg:w-[60%] w-[90%]"
      >
        <p className="text-xl font-medium text-center ">Pickup Instructions</p>

        <div className="flex justify-around items-center mt-5 ">
          <div>
            <p className="text-sm font-medium">
              <span className="border-b-2  ">PICK</span> UP DAYS
            </p>
            <p className="mt-1">
              {pickUpDays.map((day) =>
                day === "0"
                  ? "Sunday "
                  : day === "1"
                  ? "Monday "
                  : day === "2"
                  ? "Tuesday "
                  : day === "3"
                  ? "Wednesday "
                  : day === "4"
                  ? "Thursday "
                  : day === "5"
                  ? "Friday "
                  : day === "6"
                  ? "Saturday"
                  : ""
              )}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">
              <span className="border-b-2 ">START</span> TIME
            </p>
            <p className="mt-1">{formatTimeToAMPM(pickUpStartTime)}</p>

            <p className="text-sm font-medium mt-2">
              <span className="border-b-2 ">CLOSE</span> TIME
            </p>
            <p className="mt-1">{formatTimeToAMPM(pickUpEndTime)}</p>
          </div>
        </div>

        <p className="mt-6 text-center">
          PICK U<span className="border-b-2 ">P LOC</span>ATION
        </p>

        <p className="mt-1 text-pry-color text-center">{pickUpLocation}</p>

        {/* //> Appointment Date*/}
        <div className="flex justify-center items-center  mt-10 ">
          <div className=" w-full flex flex-col ">
            <label htmlFor="appointment-date" className="font-medium">
              Appointment Date
            </label>
            {/* <input
              ref={datePickerRef}
              onFocus={() => {
                datePickerRef.current?.showPicker();
              }}
              value={appointmentDate}
              onChange={(e) => {
                handleAppointmentChange(e.target.value);
              }}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              name="appointment_date"
              id="appointment_date"
              className="border-gray-400 w-full rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder=""
            /> */}
            <ReactDatePicker
              // showIcon
              selected={appointmentDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholderText="Pick a day"
              // showTimeInput
              // filterDate={filterWeekdays}
              className="w-full rounded border border-gray-500 !py-2"
            />
          </div>
        </div>

        {/* //> Appointment Time*/}
        <div className="flex justify-center items-center  mt-8">
          <div className=" w-full flex flex-col">
            <label htmlFor="dob" className="font-medium">
              Appointment Time
            </label>
            {/* <input
              ref={timePickerRef}
              onFocus={() => {
                timePickerRef.current.showPicker();
              }}
              value={appointmentTime}
              onChange={(e) => {
                handleTimeChange(e);
              }}
              min="10:00:00"
              max="19:00:00"
              type="time"
              name="appointment_time"
              id="appointment_time"
              className="border-gray-400 w-full rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder=""
            /> */}

            <ReactDatePicker
              selected={appointmentTime}
              onChange={(time) => {
                const hour = getHours(time);
                if (hour < startHour || hour > endHour) {
                  triggerAlert({
                    message: "Pick-up is not available during this time, check our pick-up time and pick again.",
                    color: "red",
                  });
                  return;
                } else setAppointmentTime(time);
              }}
              placeholderText="Pick time"
              minTime={setHours(setMinutes(new Date(), startMinute), startHour)}
              maxTime={setHours(setMinutes(new Date(), endMinute), endHour)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="w-full text-pry-color rounded border border-gray-500 !py-2"
              locale="en"
            />

            {/* <TimePicker
              onChange={(date, dateString) => {
                console.log(date);
                // setAppointmentTime(date);
              }}
              value={appointmentTime}
            /> */}
          </div>
        </div>

        {/* //> Setup Button */}
        <div className="mt-5 flex items-center justify-center w-full">
          <div className="lg:w-[80%] w-[98%] flex justify-between items-center gap-x-5">
            <button
              onClick={() => {
                setShowAppointmentOverlay(false);
              }}
              className="w-full bg-pry-color duration-300 hover:bg-opacity-80 rounded-md py-3
           flex items-center justify-center text-white gap-x-2 text-sm font-semibold"
            >
              {/* <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />{" "} */}
              Set Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentOverlay;
