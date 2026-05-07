import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";

function SimilarProducts({ productsArray, selectedProduct }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    function showSimilarProducts() {
      const filteredArray = productsArray.filter((product) => {
        return product.category.some((category) =>
          selectedProduct.category[0].name.includes(category.name)
        );
      });

      setSimilarProducts(filteredArray);
    }
    showSimilarProducts();
  }, []);

  return (
    <div>
      {similarProducts.length > 0 && (
        <div id="ongoing-bids" className="mt-10 scroll-pt-[6rem]    ">
          {/* //> Products */}
          <div>
            <div className="  mt-8">
              <p
                id="similar_products"
                className=" text-[1.375rem] sm:text-[2.12rem] font-semibold select-none"
              >
                You may also like
              </p>
            </div>

            {/* //>Desktop Product list */}
            {/* {loading && productsArray.length === 0 && (
        <p>Loading... Please wait.</p>
      )} */}

            <div
              className={`duration-300 grid  md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-10 mt-4 `}
            >
              {
                similarProducts.slice(0, 10).map((product, i) => (
                  <CartCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    img={product.image}
                    category={product.category[0].name}
                    price={product.price}
                    desc={product.description}
                    slug={product.slug}
                    stock={product.stock}
                    stockStatus={product.stock_status}
                    show_desc={true}
                  />
                ))
                // .filter((bid, i) => i < 10)
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimilarProducts;
