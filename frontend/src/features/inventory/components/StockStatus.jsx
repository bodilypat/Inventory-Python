/* ******************************************************* */
/* File: src/features/inventory/components/StockStatus.jsx */ 
/* ******************************************************* */

import React from "react";
import { getStockStatus } from "../InventoryUtils";

const StockStatus = ({ inventory }) => {
    const status = getStockStatus(inventory);

    const label = {
        IN_STOCK: "In Stock",
        LOW_STOCK: "Low Stock",
        OUT_OF_STOCK: "OUT of Stock",
        OVERSTOCK: "Overstock"
    };

    return (
        <span classNamee={`stock-status stock-status--${status.toLowerCase()}`}>
            {labels[status] || status}
        </span>
    );
};

export default StockStatus;


