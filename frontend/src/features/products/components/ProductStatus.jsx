/* ********************************************* */
/* File: src/features/products/ProductStatus.jsx */ 
/* ********************************************* */

import React from "react";
const ProductStatus = ({
    status = "Unknow",
}) => {
    const getStatusClass = () => {
        switch (status.toLowerCase()) {
            case "in stock":
                return "in-stock";

            case "low stock":
                return "low-stock";

            case "out of stock":
                return "out-of-stock";

            case "discontinued":
                return "disccontiued";

            default:
                return "unknown";
        }
    };

    return (
        <span 
            className={`product-status-badge ${getStatusClass()}`}
        >
            {status}
        </span>
    );
};

export default ProductStatus;

