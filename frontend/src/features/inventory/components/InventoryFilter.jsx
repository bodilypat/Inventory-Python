/* *********************************************************** */
/* File: src/features/inventory/components/InventoryFilter.jsx */ 
/* *********************************************************** */
import React from "react";

const InventoryFilters = ({
    filters,
    onChange,
    onReset, 
}) => {
    const handleChange = (event) => {
        const { name, value } = event.target;

        onChange({
            [name]: value,
            page: 1,
        });
    };

    return (
        <div className="inventory-filters">
            <div className="inventory-filters-search">
                <input 
                    type="search"
                    name="search"
                    value={filters.search || ""}
                    placeholder="Search product, SKU..."
                />
            </div>

            <select 
                name="warehouse"
                value={filters.warehouseId || ""}
                onChange={handleChange}
            >
                <option value="">All Warehouse</option>

                {filters.warehouse?.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                    </option>
                ))}
            </select>

            <select 
                name="categoryId"
                value={filters.categoryId || ""}
                onChange={handleChange}
            >
                <option value="">All Categories</option>

                {filters.categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <select 
                name="status"
                value={filters.status || ""}
                onChange={handleChange}
            >
                <option value="">All Stock Status</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="OVERFLOW">oVERSTOCK</option>
            </select>

            <button type="button" onClick={onReset}>
                Reset
            </button>
        </div>
    );
};

export default InventoryFilters;


