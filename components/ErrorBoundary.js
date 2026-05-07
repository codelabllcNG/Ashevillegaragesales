import React from "react";
import { withRouter } from "next/router";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false, canRoute: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
    // Sentry.captureException(error); // Uncomment if using Sentry
  }

  handleGoBack = () => {
    this.setState({ hasError: false });
    // this.setState({ hasError: false });
    // console.log(this.state.hasError);
    // return
    this.props.router.push("/");
  };

  // handleCanRoute = () => {

  //   this.setState({ canRoute: true });
  //   // console.log(this.state.hasError);
  //   // return
  //   // this.props.router.push("/");
  // };

  handleContactUs = () => {
    this.setState({ hasError: false });
    this.props.router.push("/contact-us");
  };

  renderErrorUI() {
    return (
      <div className="px-3 sm:px-8 lg:px-[5rem]">
        <div className="w-full pb-20 ">
          <div className="flex justify-center items-center ">
            <Image
              className=""
              alt="Error Image"
              src="/images/error.png"
              width={400}
              height={400}
            />
          </div>
          <p className="text-center font-medium text-4xl">
            Something went wrong!
          </p>
          <p className="text-center font-semibold text-3xl mt-5">
            Why are you seeing this?
          </p>

          <p className="text-2xl text-center mt-5 text-gray-500">
            - Something went wrong on our end and we are fixing it.
          </p>

          <p className="text-2xl text-center mt-10 text-gray-500">
            Contact us by dialing +1 704-659-1055, or send a mail to
            contact@ashevillegaragesales.com for further support and inquiries
          </p>

          <div className="flex justify-center items-center gap-x-5 mt-5">
            <button
              className="border rounded-md border-pry-color text-pry-color bg-white duration-300 hover:bg-gray-50 py-2 px-4"
              // onMouseOver={this.handleCanRoute}
              onClick={this.handleGoBack}
            >
              Go Back
            </button>

            <button
              className="border rounded-md text-white bg-pry-color duration-300 hover:bg-opacity-80 py-2 px-4"
              onClick={this.handleContactUs}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
