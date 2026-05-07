import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import secureLocalStorage from "react-secure-storage";
import { signIn, useSession } from "next-auth/react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useCartStore } from "@/a-store/zustandStore/cartStore";
import Head from "next/head";

function Login() {
  const { data: session } = useSession();

  // console.log(session);
  const router = useRouter();
  const { source } = router.query;

  const { localCartToServer } = useCartStore((state) => state);

  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    phone,
    firstName,
    lastName,
    confirmPassword,
    setUserToken,
    triggerAlert,
  } = AllCtx();

  const [showPassword, setShowPassword] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (secureLocalStorage.getItem("user")) {
      if (secureLocalStorage.getItem("user")?.status === "inactive") {
        router.push("/email-verification", "signup");

        return;
      }

      router.push("/");
      // setUserToken(secureLocalStorage.getItem("userToken"));
      // console.log(secureLocalStorage.getItem("userToken"));
    }
  }, []);

  async function loginHandler(e) {
    e.preventDefault();

    const dataToSubmit = {
      email: email,
      password: password,
    };

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      setLoginResponse("Fill all inputs!");
      // console.log(dataToSubmit);
      return;
    }

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(validEmailRegex)) {
      setLoginResponse("Invalid email format!");
      return;
    }

    // console.log(dataToSubmit);
    // return;

    try {
      setLoginResponse("Please wait...");
      setConnecting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEW_API_BASE}/login`,
        {
          // mode: 'NO-CORS',
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // console.log(data);

      // return;

      if (data.status === "fail") {
        setLoginResponse(data.message);
        // console.log(data.message);
        console.log("An error occurred.");
        setConnecting(false);
        return;
      }

      if (!response.ok) {
        setLoginResponse("Something went wrong, retry!");
        // console.log(data);
        console.log("Response not OK");
        // console.log(data);
        setConnecting(false);
        return;
      }

      // console.log(data);

      // return

      if (data.user_info?.status === "active") {
        router.back();
        // router.push("/");

        setUser(data.user_info);
        setUserToken(data.security.token);
        secureLocalStorage.setItem("user", data.user_info);
        secureLocalStorage.setItem("userToken", data.security.token);

        setConnecting(false);
        setLoginResponse("");
        localCartToServer();
        triggerAlert({ message: "Logged in successfully!", color: "green" });
        return;
      }

      if (data.user_info?.status === "inactive") {
        setUser(data.user_info);
        setUserToken(data.security.token);
        await secureLocalStorage.setItem("user", data.user_info);
        secureLocalStorage.setItem("userToken", data.security.token);

        setConnecting(false);
        setLoginResponse("");
        router.push("/email-verification", "signup");
        triggerAlert({ message: "Verify your email address!", color: "red" });
        // console.log(secureLocalStorage.getItem("user")?.email_verified);
        return;
      }
    } catch (error) {
      // console.log(error);
      console.log("An error occurred.");
      setLoginResponse("An error occurred, retry.");
      setConnecting(false);
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);

      try {
        // setLoginResponse("Please wait...");
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
          setLoginResponse("Something went wrong, retry!");
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
          registerFrom: "web",
        };
        setLoginResponse("Please wait...");
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
          setLoginResponse(data2.message);
          // console.log(data.message);
          console.log("An error occurred.");
          setConnecting(false);
          return;
        }

        if (!response2.ok) {
          setLoginResponse("Something went wrong, retry!");
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
        setConnecting(false);
        setLoginResponse("");
        localCartToServer();
        triggerAlert({ message: "Logged in successfully!", color: "green" });
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        setLoginResponse("An error occurred, retry.");
        setConnecting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login to your Asheville Garage Sales account"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={loginHandler} className="px-3 sm:px-8 lg:px-[5rem] mt-5">
        <h1 className="text-center text-4xl font-bold">Welcome back!</h1>

        {/* //> Email Address  */}
        <div className="flex justify-center items-center mt-5">
          <div
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex flex-col"
          >
            <label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              // required
              type="email"
              name="email"
              id="email"
              className="border-gray-400  rounded py-4 text-sm font-medium placeholder:text-gray-400"
              placeholder="example@gmail.com"
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="border-none w-full focus:ring-0  rounded py-4 text-sm font-medium placeholder:text-gray-400"
                placeholder="********************"
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

        {/* //> Remember */}
        <div className="flex justify-center items-center mt-5">
          <div className="flex justify-between items-center  sm:w-[80%] lg:w-[60%] w-[95%]">
            <div
              className="
         flex items-center  gap-x-2"
            >
              <input
                type="checkbox"
                name="agreement"
                id="agreement"
                className="border-gray-400  rounded p-3 text-sm font-medium placeholder:text-gray-400"
              />{" "}
              <label htmlFor="agreement" className="text-sm ">
                Remember me
              </label>
            </div>

            <p
              onClick={(e) => {
                router.push("/forgot-password");
              }}
              className="font-medium text-pry-color select-none cursor-pointer"
            >
              Forgot Password
            </p>
          </div>
        </div>

        {/* //> Response */}
        <div
          className={`${
            loginResponse ? "flex" : "hidden"
          } justify-center items-center mt-5`}
        >
          <p
            // type="button"
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center text-red-600  rounded-md py-4 px-20    font-medium "
          >
            {loginResponse}
          </p>
        </div>

        {/* //> Log In */}
        <div className="flex justify-center items-center mt-5">
          <button
            // type="button"
            // onClick={() => {
            //   loginHandler();
            // }}
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center bg-pry-color text-white rounded-md py-4 px-20 duration-300 hover:bg-opacity-80 text-xl font-semibold "
          >
            Log in
          </button>
        </div>

        {/* //> Or Continue With */}
        <div className="flex justify-center items-center mt-5">
          <div
            className="w-[95%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-between  gap-x-3  "
          >
            <hr className="w-[25%] sm:w-1/3  border border-gray-500 bg-gray-600" />
            <p className="font-medium">OR CONTINUE WITH</p>
            <hr className="w-[25%] sm:w-1/3  border border-gray-500 bg-gray-600" />
          </div>
        </div>

        {/* //> Social Media Buttons */}
        <div className="flex justify-center items-center mt-5">
          <div
            className="w-[90%]
         sm:w-[80%] lg:w-[60%] flex items-center justify-center  gap-x-3  "
          >
            {/* <button className="w-1/3 gap-x-1 bg-white rounded-md border py-3 px-10 flex justify-center items-center">
            <FaApple className="w-6 h-6" /> Apple
          </button>
          <button className="w-1/3 gap-x-1 bg-white rounded-md border py-3 px-10 flex justify-center items-center">
            <FaFacebook className="w-6 h-6 text-blue-600" /> Facebook
          </button> */}
            <button
              type="button"
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
          New to Asheville Garage Sales?{" "}
          <span
            onClick={() => {
              router.push("/signup");
            }}
            className="text-[#8BC0B7] font-medium cursor-pointer "
          >
            Create account
          </span>
        </p>
      </form>
    </>
  );
}

export default Login;
