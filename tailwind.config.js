// const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // 1410: "1410px",
      '2xl': "1410px",
      // "2xl": "1536px",
    },

    extend: {
      colors: {
        "pry-color": "#487354",
        "sec-color": "#94FFB2",
        "white-smoke": "#f5f5f5",
      },

      fontFamily: {
        inter: ["var(--font-inter)"],
        outfit: ["var(--font-outfit)"],
        manrope: ["var(--font-manrope)"],
        lora: ["var(--font-lora)"],
        montserrat: ["var(--font-montserrat)"],
      },

      screens: {
        600: { raw: "(min-width: 600px)" },
        700: { raw: "(min-width: 700px)" },
        750: { raw: "(min-width: 750px)" },
        320: { raw: "(min-width: 320px)" },
        350: { raw: "(min-width: 350px)" },
        380: { raw: "(min-width: 380px)" },
        470: { raw: "(min-width: 470px)" },
        450: { raw: "(min-width: 450px)" },
        500: { raw: "(min-width: 500px)" },

        560: { raw: "(min-width: 560px)" },
        340: { raw: "(min-width: 340px)" },
        800: { raw: "(min-width: 800px)" },
        890: { raw: "(min-width: 890px)" },
        900: { raw: "(min-width: 900px)" },
        930: { raw: "(min-width: 930px)" },
        1000: { raw: "(min-width: 1000px)" },
        1024: { raw: "(min-width: 1024px)" },
        1410: { raw: "(min-width: 1410px)" },
        1130: { raw: "(min-width: 1130px)" },
        1200: { raw: "(min-width: 1200px)" },
        1150: "1150px",
        400: "400px",
        427: "427px",
        420: "420px",
        540: "540px",
        510: "510px",
        750: "750px",

       
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("tailwind-scrollbar-hide"),
    // require("tw-elements/dist/plugin.cjs"),
    require("flowbite/plugin"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
