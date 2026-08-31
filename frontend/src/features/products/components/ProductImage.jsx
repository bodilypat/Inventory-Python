/* ******************************************************* */
/* File: src/features/products/components/ProductImage.jsx */ 
/* ******************************************************* */

import React, { useState } from "react";

const ProductImage = ({
    image,
    name = "Product",
    editable = False,
    onChange,
}) => {
    const [preview, setPreview] = useState(image || "");

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);

            if (onChange) {
                onChange(file);
            }
        }
    };

    return (
        <div className="product-image-wrapper">
            <div className="product-image-preview">
                {preview ? (
                    <img 
                        src={preview}
                        alt={name}
                        className="product-image"
                    />
                ) : (
                    <div className="image-placeholder">
                        No Image 
                    </div> 
                )}
            </div>

            {editable && (
                <div className="image-upload">
                    <label 
                        htmlFor="product-image"
                        className="btn btn-secondaryy"
                    >
                        Choose Image 
                    </label>

                    <input 
                        id="product-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />
                </div>
            )}
        </div>
    );
};

export default ProductImage;


