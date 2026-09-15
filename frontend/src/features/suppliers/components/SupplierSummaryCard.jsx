/* *************************************************************** */
/* File: src/features/suppliers/components/SupplierSummaryCard.jsx */ 
/* *************************************************************** */
import React from "react";

const SupplierSummaryCard = ({ supplier }) => {
    return (
        <div className="supplier-summary-card">
            <h2>{supplier.name}</h2>
            <p><strong>Company:</strong> {supplier.company}</p>
            <p><strong>Email:</strong> {supplier.email}</p>
            <p><strong>Phone:</strong> {supplier.phone}</p>
            <p><strong>Status:</strong> {supplier.status}</p>
        </div>
    );
}

export default SupplierSummaryCard;

