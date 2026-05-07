import { useCartStore } from "@/a-store/zustandStore/cartStore";
import SimilarProducts from "@/components/cart/SimilarProducts";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { Carousel } from "flowbite-react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ProductDetails = ({ slug, selectedProduct, productsArray }) => {
  const router = useRouter();
  // const slug = router.query.slug;

  const {
    productDetails,
    getProductDetails,
    addToServerCart,
    storageAddToCart,
  } = useCartStore((state) => state);

  // useEffect(() => {
  //   if (slug) {
  //     getProductDetails(slug);
  //   }
  // }, [getProductDetails, slug]);

  const cartHandler = () => {
    const userToken = secureLocalStorage.getItem("userToken");
    const userEmail = secureLocalStorage.getItem("user")?.email;

    if (userToken && userEmail) {
      const product = {
        productID: selectedProduct.id,
        quantity: "1",
      };
      addToServerCart(product);
    } else {
      if (typeof window !== "undefined") {
        const product = {
          product_id: selectedProduct.id,
          product_name: selectedProduct.name,
          product_image: selectedProduct.image,
          product_price: selectedProduct.price,
          product_desc: selectedProduct.description,
          quantity: "1",
          stock: selectedProduct.stock,
          stock_status: selectedProduct.stock_status,
        };
        console.log(product);
        storageAddToCart(product);
      }
    }
  };

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  console.log("kkkkkkkkkk", selectedProduct);

  return (
    <>
      <div className="px-3 sm:px-8 lg:px-[5rem] pt-10">
        {" "}
        <Head>
          <title>{selectedProduct.name}</title>
          <meta name="description" content={selectedProduct.desc} />

          <meta
            property="og:url"
            content={`https://www.ashevillegaragesales.com/cart/product-details/${slug}`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={selectedProduct.name} />
          <meta property="og:description" content={selectedProduct.name} />
          <meta property="og:image" content={selectedProduct.image} />

          <link rel="icon" href="/favicon.ico" />
          <link
            rel="canonical"
            content={`https://www.ashevillegaragesales.com/cart/product-details/${slug}`}
          />
        </Head>
        <div className=" md:flex  gap-10">
          <div className=" md:col-span-2 md:!w-[40%] flex justify-center items-center p-3 rounded-sm bg-slate-0">
            {selectedProduct?.product_images?.length > 0 ? (
              <AliceCarousel
                // className="bg-red-700 w-[45%]"
                disableButtonsControls={true}
                keyboardNavigation={true}
                autoPlay={true}
                infinite={true}
                autoPlayInterval={10000}
              >
                {selectedProduct?.product_images?.map((image, index) => (
                  <Image
                  unoptimized
                    className="rounded-sm w-full object-cover"
                    key={index}
                    src={image}
                    width={400}
                    height={400}
                    alt={selectedProduct.name}
                  />
                ))}
              </AliceCarousel>
            ) : (
              <Image
              unoptimized
                src={selectedProduct.image}
                width={400}
                height={400}
                alt={selectedProduct.name}
              />
            )}
          </div>
          <div className="w-[100%] md:w-[60%]">
            <h3 className="text-xl font-medium">{selectedProduct.name}</h3>
            <p className="mt-7">{selectedProduct?.description}</p>
            <p className="font-bold text-3xl my-7">${selectedProduct.price}</p>
            <button
              onClick={cartHandler}
              className="w-full border rounded font-semibold px-2 py-2 bg-pry-color text-white hover:bg-opacity-80 duration-300"
            >
              Add to cart
            </button>
          </div>
        </div>
        <SimilarProducts
          selectedProduct={selectedProduct}
          productsArray={productsArray}
        />
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEW_API_BASE}/products`
  );
  const data = await response.json();
  const productsArray = data.product;

  function productFinder() {
    return productsArray.find((prod) => prod.slug == slug);
  }
  const selectedProduct = productFinder(slug);
  // console.log(selectedProduct)

  // if (!selectedProduct) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      slug,
      productsArray,
      selectedProduct,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEW_API_BASE}/products`
  );
  const data = await response.json();

  const productsArray = data.product;

  const productsPaths = productsArray.map((product) => product.slug);

  return {
    paths: productsPaths.map((slug) => ({
      params: { slug: slug.toString() },
    })),
    fallback: true,
  };
}

export default ProductDetails;
