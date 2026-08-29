/* ********************************************************* */
/* File: src/features/products/components/ProductFilter.jsx */ 
/* ********************************************************* */

import React, { useEffect, useState } from "react";
import Button from '../../../components/ui/Button';

const  DEFAULT_FILTERS = {
    category: "",
    supplier: "",
    stockStatus: "",
    status: "",
};

const ProductFilter = ({
    filters = DEFAULT_FILTERS,
    categories = [],
    suppliers = [],
    onChange,
    onReset,
    disabled = false,
}) => {
    const [localFilters, setLocalFitlers] = useState({
        ...DEFAULT_FILTERS,
        ...filters ,
    });

    useEffect(() => {
        setLocalFitlers({
            ...DEFAULT_FILTERS,
            ...filters,
        });
    }, [filters]);

    const handleChange = (event) => {
        const { name, value} = event.target;

        const updatedFilters = {
            ...localFilters,
            [name]: value,
        };

        setLocalFitlers(updatedFilters);
        onChange?.(updatedFilters);
    };

    const handleReset = () => {
        const resetValues = { ...DEFAULT_FILTERS};

        setLocalFitlers(resetValues);
        onReset?.();
        onChange?.(resetValues);
    };

    const hasActiveFilters = Object.values(localFilters).some(
        (value) => value !== "" 
    );

    return (
        <div className="product-filter">
            <div className="product-filter-header">
                <h3>Filters</h3>

                {hasActiveFilters && (
                    <Button 
                        type="button"
                        className="filter-reset-btn"
                        onClick={handleReset}
                        disabled={disabled}
                    >
                        Reset 
                    </Button>
                )}
            </div>

            <div className="product-filter-fields">
                {/* Category */}
                <div className="filter-field">
                    <label htmlFor="product-category-filter">Category</label>

                    <select 
                        id="product-category-filter"
                        name="category"
                        value={localFilters.category}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => {
                            const id = category.id ?? category.value;
                            const name = categories.name ?? category.label;

                            return (
                                <option key={id} value={id}>{name}</option>
                            );
                        })}
                    </select>
                </div>

                {/* Supplier */}
                <div className="filter-field">
                    <label htmlFor="product-supplier-filter">Supplier</label>

                    <select 
                        id="product-supplier-filter"
                        name="supplier"
                        value={localFilters.supplier}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        <option value="">All Supppliers</option>

                        {suppliers.map((supplier) => {
                            const id = supplier.id ?? supplier.value;
                            const name = supplier.name ?? supplier.label;

                            return (
                                <option key={id} value={id}>{name}</option>
                            );
                        })}
                    </select>
                </div>

                {/* Stock Status */}
                <div className="filter-field">
                    <label htmlFor="product-stock-filter">Stock Status</label>

                    <select 
                        id="product-stock-filter"
                        name="stockStatus"
                        value={localFilters.stockStatus}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        <option value="">All Stock</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                </div>

                {/* Product Stock */}
                <div className="filter-field">
                    <label htmlFor="product-status-filter">Product Status</label>

                    <select 
                        id="product-status-fitler"
                        name="status"
                        value={localFilters.status}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="discontinued">Discontinued</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;