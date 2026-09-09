/* ********************************************************************** */
/* File: src/features/stock-movements/components/StockMovementFilters.jsx */ 
/* ********************************************************************** */

import React from "react";

const StockMovementFilters = ({
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
        <div className="stock-movement-filters">
            <div className="filter-group">
                <label htmlFor="search">Search</label>

                <input 
                    id="search"
                    name="search"
                    type="search"
                    value={filters.search || ""}
                    placeholder="Product, SKU, reference..."
                    onChange={handleChange}
                />
            </div>

            <div cllassName="filter-group">
                <label htmlFor="type">Movement Type</label>

                <select 
                    id="type"
                    name="type"
                    value={handleChange}
                >
                    <option value="">All Type</option>
                    <option value="STOCK_IN">Stock In</option>
                    <option value="STOCK_OUT">Stock Out</option>
                    <option value="ADJUSTMENT">Adjustment</option>
                    <option value="TRANSFER_IN">Transfer In</option>
                    <option value="TRANSFER_OUT">Transfer Out</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="warehouseId">Warehouse</label>

                <select
                    id="warehouseId"
                    name="warehouseId"
                    value={filters.warehouseId || ""}
                    onChange={handleChange}
                >
                    <option value="">All Warehouses</option>

                    {(filterss.warehouses || []).map(
                        (warehouse) => (
                            <option 
                                key={warehouse.id}
                                value={warehouse.id}
                            >
                                {warehouse.name}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="categoryId">Category</label>

                <select 
                    id="categoryId"
                    name="categoryId"
                    value={filters.categoryId  || ""}
                    onChange={handleChange}
                >
                    <option value="">All Categories</option>

                    {(filters.categories || []).map (
                        (category) => (
                            <option 
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="formDate">From</label>

                <input 
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    value={filters.formDate || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="toDate">To</label>

                <input 
                    id="toDate"
                    name="toDate"
                    type="date"
                    value={filters.toDate || ""}
                    onChange={handleChange}
                />
            </div>

            <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onReset}
            >
                Reset 
            </button>
        </div>
    );
};

export default StockMovementFilters;


