/** @type {import('next').NextConfig} */

require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    scrollRestoration: true,
  },

  images: {
    domains: ["picsum.photos", "api.bidclover.com", "bidclover.com", "bidcloverapi.com", "lh3.googleusercontent.com", "bidclovercloud.com", "api.bidclovercloud.com", "go-upc.s3.amazonaws.com", "*"],
  },

  // env: {
  //   NEXT_PRIVATE_WELCOME_EMAIL_ADDRESS: process.env.WELCOME_EMAIL_ADDRESS,
  //   WELCOME_EMAIL_PASSWORD: process.env.WELCOME_EMAIL_PASSWORD,
  // },
};

module.exports = nextConfig;
