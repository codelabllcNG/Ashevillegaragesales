import { useCartStore } from "@/a-store/zustandStore/cartStore";
import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";

function SignUp() {
  const router = useRouter();

  const { localCartToServer } = useCartStore((state) => state);

  const {
    setShowPassword,referralCode, setReferralCode,
    setPhone,
    setFirstName,
    setLastName,
    setPassword,
    setConfirmPassword,
    setEmail,
    showPassword,
    phone,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    user,
    regResponse,
    setRegResponse,
    setUser,
    userToken,
    setUserToken,
  } = AllCtx();

  const [checked, setChecked] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      if (secureLocalStorage.getItem("user")?.status === "inactive") {
        router.push("/email-verification", "signup");
        // console.log(secureLocalStorage.getItem("user")?.email_verified);
        return;
      }

      if (secureLocalStorage.getItem("user")?.status === "active") {
        router.push("/");
        return;
      }

      // setUserToken(secureLocalStorage.getItem("userToken"));
      // console.log(secureLocalStorage.getItem("userToken"));
    }
  }, []);

  async function signUp(e) {
    e.preventDefault();

    const userDataObject = {
      fname: `${firstName} ${lastName}`,
      email: email,
      pnumber: phone.replace("+", ""),
      password: password,
      userRole: "user",
      ref_code: referralCode,
      registerFrom: "web"
    };

    if (
      !firstName ||
      firstName.trim() === "" ||
      !lastName ||
      lastName.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !phone ||
      phone.trim() === "" ||
      !password ||
      password.trim() === "" ||
      !confirmPassword ||
      confirmPassword.trim() === ""
    ) {
      setRegResponse("Fill all inputs!");
      // console.log(userDataObject);
      return;
    }

    if (password !== confirmPassword) {
      setRegResponse("Password does not match.");
      return;
    }

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(validEmailRegex)) {
      setRegResponse("Invalid email format!");
      return;
    }

    // console.log(userDataObject);

    // return;

    try {
      setRegResponse("Please wait...");
      setConnecting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/register`,
        {
          method: "POST",
          body: JSON.stringify(userDataObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        setRegResponse(data.message);
        // console.log(data.message);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setRegResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }
      // console.log(data);

      // return

      data.user_info.status === "active"
        ? router.push("/")
        : router.push("/continue-to-verify-email", "signup");
      setUser(data.user_info);
      setUserToken(data.security.token);
      secureLocalStorage.setItem("user", data.user_info);
      secureLocalStorage.setItem("userToken", data.security.token);
      setConnecting(false);
      setRegResponse("");
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setRegResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);

      try {
        // setRegResponse("Please wait...");
        // setConnecting(true);

        const response = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            // mode: 'NO-CORS',
            // method: "POST",
            // body: JSON.stringify(dataToSubmit),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const data = await response.json();

        // console.log(data);

        // return;

        if (!response.ok) {
          setRegResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setConnecting(false);
          return;
        }
        // console.log(data);

        // return
        // //>Submit to backend

        const dataToSubmit = {
          fname: data.name,
          email: data.email,
          pnumber: "",
          userRole: "user",
          socialId: data.sub,
          socialType: "google",
          socailImage: data.picture,
          registerFrom: "web"
        };
        setRegResponse("Please wait...");
        setConnecting(true);

        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/social-auth`,
          {
            // mode: 'NO-CORS',
            method: "POST",
            body: JSON.stringify(dataToSubmit),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data2 = await response2.json();

        if (data2.status === "fail") {
          setRegResponse(data2.message);
          // console.log(data.message);
          console.log("An error occurred.");
          setConnecting(false);
          return;
        }

        if (!response2.ok) {
          setRegResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          setConnecting(false);
          return;
        }

        // console.log(data2);

        // return;

        router.push("/");
        setUser(data2.user_info);
        setUserToken(data2.security.token);
        secureLocalStorage.setItem("user", data2.user_info);
        secureLocalStorage.setItem("userToken", data2.security.token);
        localCartToServer();
        setConnecting(false);
        setRegResponse("");
        triggerAlert({ message: "Logged in successfully!", color: "green" });
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        setRegResponse("An error occurred, retry.");
        setConnecting(false);
      }
    },
  });

  return (
    <form onSubmit={signUp} className="px-3 sm:px-8 lg:px-[5rem] mt-8">
      <h1 className="text-center text-4xl font-bold">Create your account</h1>

      {/* //> First Name */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="first_name">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value.replace(/\s/g, ""));
            }}
            required
            type="text"
            name="first_name"
            id="first_name"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="John"
          />
        </div>
      </div>

      {/* //> Last Name */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="last_name">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value.replace(/\s/g, ""));
            }}
            required
            type="text"
            name="last_name"
            id="last_name"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* //> Email Address  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="fullname">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            name="email"
            id="email"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder="example@gmail.com"
          />
        </div>
      </div>

      {/* //> Phone  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="phone">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            //   inputComponent="textarea"
            required
            international
            // country="US"
            // defaultCountry="US"
            countryCallingCodeEditable={true}
            className=" border-gray-400  rounded py-2 px-3 text-xl font-medium placeholder:text-gray-400 border"
            // placeholder="Phone"
            value={phone}
            onChange={setPhone}
          />
        </div>
      </div>

      {/* //> Password  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                const passwordPattern =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                // Use the test method to check if the password matches the pattern
                const isValid = passwordPattern.test(e.target.value);
                isValid ? setValidPassword(true) : setValidPassword(false);
              }}
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="border-none w-full focus:ring-0  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="****************************"
            />{" "}
            {showPassword ? (
              <FaRegEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            )}
          </div>
          {validPassword && (
            <p className="text-green-600 font-medium text-sm">
              Strong password!
            </p>
          )}

          {!validPassword && (
            <p className="text-red-600 font-medium text-xs">
              Password must contain at least an upper case, a lower case, a
              number, and minimum of eight characters long.
            </p>
          )}
        </div>
      </div>

      {/* //> Confirm Password  */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="confirm_password">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className=" border flex justify-between items-center    border-gray-400 rounded pr-2">
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              className="border-none w-full focus:ring-0  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="****************************"
            />{" "}
            {showPassword ? (
              <FaRegEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

        {/* //> Referral Code */}
        {/* <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
        >
          <label htmlFor="last_name">
            Referral Code <span className="">(optional)</span>
          </label>
          <input
            value={referralCode}
            onChange={(e) => {
              setReferralCode(e.target.value.replace(/\s/g, ""));
            }}
            required
            type="text"
            name="referral_code"
            id="referral_code"
            className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
            placeholder={referralCode}
          />
        </div>
      </div> */}

      {/* //> Agreement */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center  gap-x-2"
        >
          <input
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            type="checkbox"
            name="agreement"
            id="agreement"
            className="border-gray-400  rounded p-3 text-sm font-medium placeholder:text-gray-400"
          />{" "}
          <label htmlFor="agreement" className="text-sm ">
            I agree to the{" "}
            <span
              onClick={() => {
                router.push("/terms-and-conditions");
              }}
              className="underline"
            >
              Terms and Condition
            </span>{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
      </div>

      {/* //> Response */}
      <div
        className={`${
          regResponse ? "flex" : "hidden"
        } justify-center items-center mt-5`}
      >
        <p
          // type="button"
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
        >
          {regResponse}
        </p>
      </div>

      {/* //> Sign Up */}
      <div className="flex justify-center items-center mt-5">
        <button
          // type="button"
          disabled={!checked || connecting || !validPassword}
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
        >
          Sign Up
        </button>
      </div>

      {/* //> Or Register With */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-between  gap-x-3  "
        >
          <hr className="w-[25%] sm:w-1/3  border border-gray-500 bg-gray-600" />
          <p className="font-medium text-center">OR REGISTER WITH</p>
          <hr className="w-[25%] sm:w-1/3  border border-gray-500 bg-gray-600" />
        </div>
      </div>

      {/* //> Social Media Buttons */}
      <div className="flex justify-center items-center mt-5">
        <div
          className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center  gap-x-3  "
        >
          {/* <button className="w-1/3 gap-x-1 bg-white rounded-md border py-3 px-10 flex justify-center items-center">
            <FaApple className="w-6 h-6" /> Apple
          </button>
          <button className="w-1/3 gap-x-1 bg-white rounded-md border py-3 px-10 flex justify-center items-center">
            <FaFacebook className="w-6 h-6 text-blue-600" /> Facebook
          </button> */}
          <button
            onClick={async () => {
              loginWithGoogle();
            }}
            className="w-1/3 gap-x-1 bg-white rounded-md border py-3 px-10 flex justify-center items-center"
          >
            <Image
              src="/images/google_icon.svg"
              width={22}
              height={22}
              alt="Google icon"
            />{" "}
            Google
          </button>
        </div>
      </div>

      <p className="text-center select-none mt-14 mb-5 ">
        Already have an account?{" "}
        <span
          onClick={() => {
            router.push("/login");
          }}
          className="text-[#8BC0B7] font-medium cursor-pointer "
        >
          Log in
        </span>
      </p>
    </form>
  );
}

export default SignUp;
