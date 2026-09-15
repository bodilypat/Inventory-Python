/* *************************************************************** */
/* File: src/features/suppliers/components/SupplierReportTable.jsx */
/* *************************************************************** */
import React from "react";

const SupplierReportTable = ({ suppliers }) => {
    return (
        <table className="supplier-report-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.company}</td>
                        <td>{supplier.email}</td>   
                        <td>{supplier.phone}</td>
                        <td>{supplier.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default SupplierReportTable;


