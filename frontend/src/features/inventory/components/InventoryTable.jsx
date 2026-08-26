/* ********************************************************** */
/* File: src/features/inventory/components/InventoryTable.jsx */ 
/* ********************************************************** */
import React from "react";
import StockStatus from "./StockStatus";

const InventoryTable = ({
    inventory = [],
    pagination = {},
}) => {
    const {
        page = 1,
        totalPages = 1,
        totalItems = inventory.length,
    } = pagination;

    return (
        <div className="inventory-table-wrapper">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Warehouse</th>
                        <th>Quantity</th>
                        <th>Reserved</th>
                        <th>Available</th>
                        <th>Reorder Level</th>
                        <th>Stock Value</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className="product-cell">
                                    {item.product?.image && (
                                        <img 
                                            src={item.product.image}
                                            alt={item.product.name}
                                            width="40"
                                            height="40"
                                        />
                                    )}

                                    <div>
                                        <strong>{item.product?.name || "Unknow Product"}</strong>
                                        <small>{item.product?.brand || ""}</small>
                                    </div>
                                </div>
                            </td>

                            <td>{item.product?.sku || "-"}</td>

                            <td>{item.warehouse?.name || "-"}</td>

                            <td>{item.quantity ?? 0}</td>

                            <td>{item.availableQuantity ?? 0}</td>

                            <td>{item.reorderLevel ?? 0}</td>

                            <td>
                                ${Number(item.stockValue || 0).toLocalString()}
                            </td>

                            <td>
                                <StockStatus inventory={item} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="inventory-pagination">
                <span>
                    {totalItems} inventory records 
                </span>

                <div>
                    <button 
                        type="button"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page -1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button 
                        type="button"
                        disabled={page >= totalPAges}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;


