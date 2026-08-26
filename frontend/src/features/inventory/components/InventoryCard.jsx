/* ********************************************************* */
/* File: src/features/inventory/components/InventoryCard.jsx */ 
/* ********************************************************* */

import React from "react";
import StockStatus from "./StockStatus";

const InventoryCard = ({ inventory }) => {
    const product = inventory.product || {};
    const warehouse = inventory.warehouse || {};

    return (
        <article className="inventory-card">
            {product.image && (
                <img 
                    src={product.image}
                    alt={product.name}
                    className="inventory-card-image"
                />
            )}

            <div className="inventory-card-body">
                <div className="inventory-card-header">
                    <div>
                        <h3>{product.name || "Unknown Product"}</h3>
                        <p>SKU: {product.sku || "-"}</p>
                    </div>

                    <StockStatus inventory={inventory} />
                </div>

                <div className="inventory-card-warehosue">
                    <strong>Warehouse:</strong> {warehouse.name || "-"}
                </div>

                <div className="inventory-card-stats">
                    <div>
                        <span>Quantity</span>
                        <strong>{inventory.quantity ?? 0}</strong>
                    </div>

                    <div>
                        <span>Reserved</span>
                        <strong>{inventory.reservedQuantity ?? 0}</strong>
                    </div>

                    <div>
                        <span>Available</span>
                        <strong>{inventory.availableQuantity ?? 0}</strong>
                    </div>
                </div>

                <div className="inventory-card-footer">
                    <span>Reorder: {inventory.reorderLevel ?? 0}</span>

                    <strong>
                        ${Number(inventory.stockValue || 0).toLocaleString()}
                    </strong>
                </div>
            </div>
        </article>
    );
};

export default InventoryCard;


