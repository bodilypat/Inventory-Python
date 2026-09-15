/* ********************************************************* */
/* File: src/features/suppliers/components/SupplierTable.jsx */
/* ********************************************************* */
import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const SupplierTable = ({ suppliers, onDelete }) => {
    return (
        <table className="supplier-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                        <td>
                            <Link to={`/suppliers/${supplier.id}/edit`} className="btn btn-secondary">
                                <FiEdit />
                            </Link>
                            <button className="btn btn-danger" onClick={() => onDelete(supplier.id)}>
                                <FiTrash2 />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SupplierTable;

