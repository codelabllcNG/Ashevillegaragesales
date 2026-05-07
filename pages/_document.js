/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        

        <script
          type="text/javascript"
          src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
        />
        <script type="text/javascript" src="/mc-script.js" />
        {/* GOOGLE ANALYTICS */}
        {/* <Script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js-na1.hs-scripts.com/22606943.js"
          ></Script> */}

        {/* Removed the below script because Kommunincate was firing twice */}
        {/* <script
          type="text/javascript"
          src="https://widget.kommunicate.io/v2/kommunicate.app"
          async
        /> */}

        {/* <script type="text/javascript" src="/kommunicate-script.js" /> */}
        <script type="text/javascript" src="/tawk.js" />
      </Head>
      {/* <script
        type="text/javascript"
        async
        defer
        // src="../path/to/flowbite/dist/flowbite.min.js"
        src="../path/to/flowbite/dist/datepicker.js"
      ></script>

      <script
        type="text/javascript"
        async
        defer
        src="../path/to/flowbite/dist/flowbite.min.js"
        // src="../path/to/flowbite/dist/datepicker.js"
      ></script> */}

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFP9GXSQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <script
          strategy="beforeInteractive"
          type="text/javascript"
          // async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY}&libraries=places`}
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
