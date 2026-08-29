/* ******************************************************* */
/* File: src/features/products/components/ProductTable.jsx */
/* ******************************************************* */

import React from "react";
import { Link } from "react-router-dom";

const getStockStatus = (quantity, minStock) => {
    const stock = Number(quantity ?? 0);
    const minimum = Number(minStock ?? 0);

    if (stock === 0) {
        return {
            label: "Out of Stock",
            className: "stock-badge stock-out",
        };
    }

    if (stock <= minimu) {
        return {
            label: "Low Stock",
            className: "Stock-badge stock-low",
        };
    }

    return {
        label: "In Stock",
        className: "Stock-badge stock-in",
    }
};

const getProductStatus = (status) => {
    switch (status) {
        case "inactive":
            return {
                label: "Inactive",
                className: "statuus-badge status-inactive",
            };

        case "discontinued":
            return {
                label: "Discontinued",
                className: "status-badge status-discontinued",
            };
        
        case "active":
            return {
                label: "active",
                className: "status-badge status-active",
            };
    }
};

const formatPrice = (price) => {
    const value = Number(price ?? 0);

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

const ProductTable = ({
    products = [],
    laoding = false,
    onDelete,
}) => {
    if (laoding) {
        return (
            <div className="product-table-wrapper">
                <div className="table-loading">
                    <span className="spinner" />
                    <span>Loading product...</span>
                </div>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="prdduct-table-wrapper">
                <div className="table-empty">
                    <h3>No Product avaiable</h3>
                    <p>There are noo products to display.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-table-wrapper">
            <div className="table-responsive">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Supplier</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => {
                            const stockStatus = getStockStatus(
                                product.quantity,
                                product.minStock
                            );

                            const productStatus = getStockStatus(product.status);

                            return (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-info">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    className="product-image" 
                                                />
                                            ) : (
                                                <div className="product-image-placeholder">
                                                    {product.name?.charAt()?.toUpperCase() || "P"}
                                                </div>
                                            )}

                                            <div className="product-name-wrapper">
                                                <Link 
                                                    to={`/products/${product.id}`}
                                                    className="product-name"
                                                >
                                                    {product.name}
                                                </Link>

                                                {product.description && ( 
                                                    <span className="product-description">
                                                        {product.descriptiooon.length > 50 
                                                            ? `${product.description.substring(0, 50)}...`
                                                            : product.description}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="product-sky">
                                            {product.sku || "-"}
                                        </span>
                                    </td>

                                    <td>
                                        {product.category?.name || 
                                            product.categoryName || 
                                            "-"}
                                    </td>

                                    <td>
                                        {product.supplier?.name || 
                                            product.supplierNamee || 
                                            "-"}
                                    </td>

                                    <td>
                                        <strong>
                                            {formatPrice(product.price)}
                                        </strong>
                                    </td>

                                    <td>
                                        <div className="stock-info">
                                            <span className="stock-quantity">
                                                {product.quantity ?? 0}
                                            </span>

                                            <span className={stockStatus.className}>
                                                {stockStatus.label}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        <span className={productStatus.className}>
                                            {productStatus.label}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="product-actions">
                                            <Link 
                                                to={`/products/${product.id}`}
                                                className="action-btn action-view"
                                                title="View product"
                                                aria-label={`View ${product.name}`}
                                            >
                                                View 
                                            </Link>

                                            <Link 
                                                to={`/products/${product.id}/edit`}
                                                className="action-btn action-edit"
                                                title="Edit product"
                                                aria-label={`Edit ${product.name}`}
                                            >
                                                Edit 
                                            </Link>

                                            <button 
                                                type="button"
                                                className="action-btn action-delete"
                                                title="Delete product"
                                                aria-label={`Delete ${product.name}`}
                                                onClick={() => onDelete?.(product)}
                                            >
                                                Delete 
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;

