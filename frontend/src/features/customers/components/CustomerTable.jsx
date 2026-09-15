/* ******************************************************** */
/* File: src/features/customers/components/CustomerTable.jsx */
/* ******************************************************** */

import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CustomerTable = ({ customers, onDelete }) => {
    return (
        <table className="customer-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.status}</td>
                        <td>
                            <Link to={`/customers/${customer.id}/edit`}>
                                <FiEdit />
                            </Link>
                            <button onClick={() => onDelete(customer.id)}>
                                <FiTrash2 />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;
