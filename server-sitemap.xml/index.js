// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEW_API_BASE}/products`);
  const data = await res.json();

  const productsArray = data.product;

  const productsSitemaps = productsArray.map((product) => ({
    loc: `https://www.ashvillegaragesale.com/cart/product-details/${product.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 1,
  }));

  return await getServerSideSitemap(ctx, productsSitemaps);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
