/* *********************************************************** */
/* File: src/features/customers/components/CustomerFilters.jsx */
/* *********************************************************** */

import React, { useState } from "react";
import customersApi from "../services/customersApi";

const CustomerFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        status: "",
        search: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div>
            <label>Status:</label>
            <select name="status" value={filters.status} onChange={handleChange}>
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <label>Search:</label>
            <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
            />
        </div>
    );
};

export default CustomerFilters;


