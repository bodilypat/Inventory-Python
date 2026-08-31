/* ************************************************************* */
/* File: src/features/products/components/ProductDeleteModal.jsx */ 
/* ************************************************************* */

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ProductDeleteModal = ({
    product = null,
    open = false,
    loading = false,
    onCancel,
    onConfirm, 
}) => {
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !loading) {
                onCancel?.();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        /* Prevent background scrolling while the modal is open.*/
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        /* Focus the safe action when the dialog opens. */
        cancelButtonRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        }
    }, [[open, loading, onCancel]]);

    if (!open || !product) {
        return null;
    }

    const productName = product.name || "this product";

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget && !loading) {
            onCancel?.();
        }
    };

    const handleConfirm = () => {
        if (!loading) {
            onConfirm?.(product);
        }
    };

    const modal = (
        <div 
            className="product-delete-modal-backdrop"
            role="presentation"
            onMouseDown={handleBackdropClick}
        >
            <div 
                className="product-delete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-product-title"
                aria-describedby="delete-product-description"
            >
                <div className="product-delete-modal-icon" aria-hidden="true">
                    ! 
                </div>

                <div className="product-delete-modal-content">
                    <h2 id="delete-product-title">Delete Product</h2>

                    <p id="delete-product-description">
                        Are you sure you want to delete{" "} 
                        <strong>{productName}</strong>?
                    </p>

                    <p className="delete-warning">
                        This action cannot be undone.
                    </p>
                </div>

                <div className="product-delete-modal-actions">
                    <button 
                        ref={cancelButtonRef}
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button 
                        type="button"
                        className="btn btn-danger"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                            <span 
                                className="spinner spinner-small" 
                                aria-hidden="true" 
                            />
                            Deleting... 
                            </>
                        ) : (
                            "Delete Product"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
};

export default ProductDeleteModal;