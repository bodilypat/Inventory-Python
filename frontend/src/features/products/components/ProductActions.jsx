/* ******************************************************** */
/* File: src/features/products/components/ProductAction.jsx */ 
/* ******************************************************** */
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FiEye, 
    FiEdit,
    FiTrash2,
} from "react-icon/fi";

const ProductActions = ({
    productId,
    onDelete,
    showView = true ,
    showEdit = true,
    showDelete = true,
}) => {
    const handleDelete = () => {
        if (onDelete) {
            onDelete(productId);
        }
    };

    return (
        <div className="product-actions">
            {showView && (
                <Link   
                    to={`/products/${productId}`}
                    className="action-btn view"
                    titl="View product"
                >
                    <FiEye />

                </Link>
            )}

            {showEdit && (
                <Link 
                    to={`/products/${productId}/edit`}
                    className="action-btn edit"
                    title="edit Product"
                >
                    <FiEdit />

                </Link>
            )}

            {showDelete && (
                <button 
                    type="button"
                    className="action btn delete"
                    title="Delete Product"
                    onClick={handleDelete}
                >
                    <FiTrash2 />
            
                </button>
            )}
        </div>
    );
};

export default ProductActions;

