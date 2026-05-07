import Hero from "@/components/about-us/Hero";
import SecureAndProtected from "@/components/about-us/SecureAndProtected";
import WhatSetsUsApart from "@/components/about-us/WhatSetsUsApart";
import Head from "next/head";
import React from "react";

function AboutUs() {
  return (
    <div className="px-3 sm:px-8 lg:px-[5rem]">
      <Head>
        <title>About Asheville Garage Sales</title>
        <meta
          name="description"
          content="Welcome to Asheville Garage Sales, a part of the Bidclover family! We're your destination for unbeatable deals on premium items. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <WhatSetsUsApart />
      {/* <SecureAndProtected /> */}
    </div>
  );
}

export default AboutUs;
