/* ********************************************************** */
/* File: src/features/suppliers/components/SupplierSearch.jsx */
/* ********************************************************** */

import React from "react";
import { FiSearch } from "react-icons/fi";

const SupplierSearch = ({ onSearch }) => {
    return (
        <div className="supplier-search">
            <div className="input-group">
                <span className="input-group-text">
                    <FiSearch />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search suppliers..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SupplierSearch;
