/* ********************************************************** */
/* File: src/features/warehouses/components/WarehouseTable.jsx */
/* ********************************************************** */
import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const WarehouseTable = ({ warehouses, onDelete }) => {
    return (
        <table className="warehouse-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {warehouses.map((warehouse) => (
                    <tr key={warehouse.id}>
                        <td>{warehouse.name}</td>
                        <td>{warehouse.location}</td>
                        <td>{warehouse.capacity}</td>
                        <td>{warehouse.status}</td>
                        <td>
                            <Link to={`/warehouses/${warehouse.id}/edit`} className="btn btn-secondary">    
                                <FiEdit />
                            </Link>
                            <button
                                onClick={() => onDelete(warehouse.id)}
                                className="btn btn-danger"
                            >
                                <FiTrash2 />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WarehouseTable;


