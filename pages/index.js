import React from "react";

import { client } from "@/lib/client";
import { BestProduct, FooterBanner, HeroBanner } from "@/components";

const Home = ({ bestProducts, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      <div className="products-heading">
        {console.log(bannerData)}
        <h2>Best Selling Products</h2>
        <p>These are a few of our great products on sale!</p>
        <h3>
          Want to see more? Click on All Products to see all of out products!
        </h3>
      </div>
      <div className="products-container">
        {bestProducts?.map((product) => (
          <BestProduct key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[1]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "bestproduct"]';
  const bestProducts = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { bestProducts, bannerData },
  };
};

export default Home;
