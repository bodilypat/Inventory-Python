/* *********************************************************** */
/* File: src/features/suppliers/components/SupplierFilters.jsx */
/* *********************************************************** */

import React from "react";
import { FiFilter } from "react-icons/fi";

const SupplierFilters = ({ onFilter }) => {
    return (
        <div className="supplier-filters">
            <div className="input-group">
                <span className="input-group-text">
                    <FiFilter />
                </span>
                <select className="form-control" onChange={(e) => onFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
    );
};

export default SupplierFilters;


