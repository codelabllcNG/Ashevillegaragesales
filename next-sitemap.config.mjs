/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.ashvillegaragesale.com",
  generateRobotsTxt: false, // (optional)
  // ...other options
  generateIndexSitemap: false,
  autoLastmod: true,
  exclude: [
    "/cart/orders",
    "/2phone-verification2",
    "/account",
    "/add-card-mobile-page",
    "/auction-details",
    "/auctions",
    "/cart",
    "/cart/checkout",
    "/confirm-otp",
    "/continue-to-verify-email",
    "/continue-to-verify-phone",
    "/email-verification",
    "/forgot-password",
    "/login",
    "/phone-verification",
    "/privacy-policy",
    "/reset-password",
    "/signup",
    "/terms-and-conditions",
    "/verified",
  ],

  // robotsTxtOptions: {
  //   policies: [
  //     {
  //       userAgent: '*',
  //       allow: '/',
  //     },

  //     {
  //       userAgent: '*',
  //       disallow: ['/support/*', '/demo-test', '/take-a-test'],
  //     },
  //   ],
  //   additionalSitemaps: [
  //     `https://www.ashvillegaragesale.com/server-sitemap.xml`,
  //   //   'https://example.com/my-custom-sitemap-1.xml',
  //   //   'https://example.com/my-custom-sitemap-2.xml',
  //   //   'https://example.com/my-custom-sitemap-3.xml',
  //   ],
  // },
};

// module.exports = { config };

export default config;
