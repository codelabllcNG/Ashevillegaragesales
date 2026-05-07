import AllCtx from "@/util-functions/allCtx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import React from "react";
// import HeaderBanner from "../components/HeaderBanner";

function FaqPage(props) {
  const { setSearchSuggestionList, setUserDropdown, setHelpDropdown } =
    AllCtx();
  //   const { faqs } = props;
  const FAQ = [
    {
      question: "How does Asheville Garage Sales work? ",
      answer:
        "Asheville Garage Sales operates as a buy-only e-commerce platform. Simply browse our selection, add items to your cart, and proceed to checkout to purchase. ",
    },
    {
      question: "What types of items can I find on Asheville Garage Sales?  ",
      answer:
        "We offer a wide range of products, including household essentials, fashion items, electronics, sporting goods, kids' toys and much more. Our inventory is constantly updated to bring you the best deals. ",
    },
    {
      question: "How do I pay for my purchases? ",
      answer:
        "We accept various payment methods, including credit/debit cards and secure online payment gateways, ensuring a convenient checkout process. ",
    },
    {
      question: "Can I pick up my order instead of having it delivered?  ",
      answer:
        "Yes, we offer convenient pickup options for local customers. Simply select the pickup option during checkout and choose a convenient time to collect your items.",
    },
    {
      question:
        "Is my personal information secure when shopping on Asheville Garage Sales?",
      answer:
        "Absolutely. We take the security and protection of your personal information seriously. Our website is equipped with encryption technology to ensure your data is safe and secure. ",
    },
    {
      question: "What if I have an issue with my order? ",
      answer:
        "Customer satisfaction is our top priority. If you have any issues with your order, please contact our customer service team contact@ashevillegaragesales.com, and we'll do our best to resolve it promptly.",
    },
    {
      question: "Where is your location? ",
      answer:
        "We are based in 8425 Old Statesville Rd Charlotte, NC 28269",
    },
    {
      question:
        "Do you offer shipping? What are the shipping options and costs? ",
      answer:
        "Yes, we offer shipping. Shipping options and costs vary based on the item's size, weight, and destination. Specific details are provided at checkout. ",
    },
    {
      question: "What forms of payment do you accept? ",
      answer:
        "We accept various payment methods, including major credit/debit cards. ",
    },
    {
      question: "Do you take down payments? ",
      answer:
        "No, we do not accept down payments. Full payment is required at the time of purchase. ",
    },
    {
      question: "Can I return or exchange my purchase if I'm not satisfied? ",
      answer:
        "Yes, we have a return and exchange policy. If you're not satisfied with your purchase, please contact our customer service team for assistance.",
    },
    {
      question: "Do you have a physical store location I can visit?",
      answer: "Yes, you can visit our location and pick up items.",
    },
    {
      question: "Are there any discounts or promotions available?",
      answer:
        "Yes, we frequently offer discounts and promotions. Be sure to subscribe to our newsletter and follow us on social media to stay updated on the latest deals. ",
    },
    {
      question:
        "Do you offer gift wrapping or personalized messages for gifts? ",
      answer:
        "At this time, we do not offer gift wrapping or personalized messages for gifts.",
    },
    {
      question: "Are your products made locally or imported? ",
      answer:
        "Our products come from a variety of sources, including both local and international suppliers. Each product listing provides specific details.",
    },
    {
      question: "Are there any upcoming sales or new product releases? ",
      answer:
        "Yes, we regularly update our inventory with new products and sales. Keep an eye on our website and subscribe to our newsletter for the latest updates. ",
    },
  ];

  const router = useRouter();

  return (
    <div
      onClick={() => {
        setSearchSuggestionList([]);
        setUserDropdown(false);
        setHelpDropdown(false);
      }}
      className=" bg-white px-3 sm:px-8 lg:px-[5rem]"
    >
      <Head>
        <title>Asheville Garage Sales Frequently Asked Questions</title>
        <meta
          name="description"
          content="What does Asheville Garage Sales offer?
          From home essentials to kids' games; Asheville Garage Sales offers unbeatable deals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <HeaderBanner text={"FAQ"} /> */}

      <div className="flex  justify-center md:mb-2 font-bold text-xs 320:text-base 350:text-2xl sm:text-2xl md:text-4xl  text-center text-pry-color mt-6">
        Questions People Ask
      </div>

      <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {FAQ.map((faq) => (
          <div key={faq.question} className="">
            <p className="text-pry-color text-2xl mt-5 font-medium ">
              {faq.question}
            </p>

            <p className=" text-lg  mt-3">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 py-10 text-2xl 900:-mr-10 lg:-mr-20 lg:-ml-4  font-semibold text-center bg-pry-color text-white">
        HAVE MORE QUESTIONS?{" "}
        <span className="text-base ">
          Reach out to us at contact@ashevillegaragesales.com
        </span>
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_DEV_API_BASE}/api/ecart/v1/faqs`
//   );
//   const data = await response.json();

//   const faqs = data.faqs;

//   return {
//     props: {
//       faqs,
//     },
//     revalidate: 300,
//   };
// }

export default FaqPage;
