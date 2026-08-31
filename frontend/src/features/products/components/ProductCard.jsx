/* ****************************************************** */
/* File: src/features/products/components/ProductCard.jsx */
/* ****************************************************** */
import React from "react";
import { Link } from "react-router-dom";
import {
    FiEye,
    FiEdit,
    FiTrash2,
} from "react-icons/fi";

import ProductImage from "./ProductImage";

const ProductCard = ({
    product,
    onDelete,
}) => {
    if (!product) {
        return null;
    }

    return (
        <div className="product-card">

            {/* Product Image */}
            <div className="product-card-image">
                <ProductImage
                    image={product.image}
                    name={product.name}
                />
            </div>

            {/* Product Information */}
            <div className="product-card-content">
                <h3 className="product-name">{product.name}</h3>

                <p className="product-sku">SKU: {product.sku}</p>

                <div className="product-details">
                    <div>
                        <span>Category</span>
                        <strong>{product.category}</strong>
                    </div>

                    <div>
                        <span>Price</span>
                        <strong>${product.sellingPrice}</strong>
                    </div>

                    <div>
                        <span>Stock</span>
                        <strong>
                            {product.quantity} {product.unit}
                        </strong>
                    </div>
                </div>

                {/* Status */}
                <div className="product-status">
                    <span 
                        className={`status-badge ${product.status
                            ?.toLowerCase().replace(" ", "-")
                        }`}
                    >
                        {product.status}
                    </span>
                </div>

                {/* Actions */}
                <div className="product-card-actions">
                    <Link 
                        to={`/products/${product.id}`}
                        className="action-bttn view"
                        title="View Product"
                    >
                        <FiEye />

                    </Link>

                    <Link 
                        to={`/products/${product.id}/edit`}
                        className="action-btn edit"
                        title="Edit Product"
                    >
                        <FiEdit />

                    </Link>

                    <Button 
                        type="button"
                        className="action-btn delete"
                        title="Delete Product"
                        onClick={() => 
                            onDelete && onDelete(product.id)
                        }
                    >
                        <FiTrash2 />

                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

