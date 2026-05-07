import { AllContextProvider } from "@/a-store/context-store/AllContext";
// import Navbar from "@/components/Navbar";
import { Inter, Manrope, Montserrat, Outfit } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/phone-input.css";

import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import SurveyVideo from "@/components/SurveyVideo";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Fragment, useEffect } from "react";
import Head from "next/head";
import { useCartStore } from "@/a-store/zustandStore/cartStore";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  // useEffect(() => {
  //   // Add a parameter to the URL for all pages
  //   const paramValue = 'yourParamValue';
  //   const currentPath = router.asPath;

  //   // Check if the parameter is already present to avoid infinite redirection
  //   if (!currentPath.includes('source=')) {
  //     router.push(`${currentPath}${currentPath.includes('?') ? '&' : '?'}source=survey`);
  //   }
  // }, []);

  return (
    <main className={`${montserrat.variable} font-montserrat`}>
      <SessionProvider session={session}>
        <AllContextProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="google-site-verification"
              content={`${process.env.NEXT_PUBLIC_GOOGLE_CONSOLE}`}
            />

            <meta
              name="trustpilot-domain-verification"
              content={`${process.env.NEXT_PUBLIC_TRUST_PILOT}`}
            />
          </Head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
          <ErrorBoundary>
            <GoogleOAuthProvider
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            >
              {/* GOOGLE TAG MANAGER  */}
              <Script
                strategy="afterInteractive"
                id="gtag-base"
                dangerouslySetInnerHTML={{
                  __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WFP9GXSQ');
              `,
                }}
              />

              <Script id="google-analytics" strategy="afterInteractive">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} 
        gtag('js', new Date());

        gtag('config', "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}");
        `}
              </Script>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
              <Alert />
              <Toaster />
              <SurveyVideo />
            </GoogleOAuthProvider>
          </ErrorBoundary>
        </AllContextProvider>
      </SessionProvider>
    </main>
  );
}
