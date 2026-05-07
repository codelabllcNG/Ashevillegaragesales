import AllCtx from "@/util-functions/allCtx";
import React, { useEffect } from "react";

function ShippingFee({ addressID, bidID }) {
  const { fetchShippingFee, shippingFee, selectedAddress } = AllCtx();
  // //>Fetch shipping fee
  useEffect(() => {
    fetchShippingFee({ addressID, bidID });
  }, [selectedAddress]);

  
  return <p className="text-lg font-medium">${parseFloat(+shippingFee).toFixed(2).toLocaleString()}</p>;
}

export default ShippingFee;
