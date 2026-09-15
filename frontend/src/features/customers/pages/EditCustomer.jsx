/* *************************************************** */
/* File: src/features/customers/pages/EditCustomer.jsx */
/* *************************************************** */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customersApi from "../services/customersApi";

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active",
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await customersApi.getCustomer(id);
                setCustomerData(data);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await customersApi.updateCustomer(id, customerData);
            navigate(-1);
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Status:</label>
                <select
                    name="status"
                    value={customerData.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button type="submit">Update Customer</button>
        </form>
    );
};

export default EditCustomer;

