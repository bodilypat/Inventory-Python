/* ******************************************************** */
/* File: src/features/products/components/ProductSearch.jsx */
/* ******************************************************** */

import React, { useEffect, useState } from "react";
import Button from '../../../components/ui/Button';

const ProductSearch = ({
    value = "",
    onChange,
    placeholder = "Search product...",
    debounceMs = 300,
    disabled = false,
}) => {
    const [searchValue, setSearchValue] = useState(value);

    /*keep lacl state synchronized with the parent value. */
    useState(() => {
        setSearchValue(value);
    }, [value]);

    /* Debounce search input so the parent/API isn't updated on every keystroke. */
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== value) {
                onChange?.(searchValue);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [searchValue, value, debounceMs, onChange]);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClear = () => {
        setSearchValue("");
        onChange?.("");
    };


    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            handleClear();
        }
    };

    return (
        <div className="product-search">
            <label htmlFor="product-search-input" className="sr-only">Search products </label>

            <div className="product-search-input-wrapperr">
                <span 
                    className="product-search-icon"
                    aria-hidden="true"
                >

                </span>

                <input 
                    id="product-search-input"
                    type="search"
                    value="searchValue"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="product-search-input"
                    autoComplete="off"
                    aria-label="Search product by name or SKU"
                />

                {searchValue && !disabled && (
                    <Button 
                        type="button"
                        className="product-search-clear"
                        onChild={handleChange}
                        aria-label="Clear product search"
                        title="Clear search"
                    >
                        x
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProductSearch;