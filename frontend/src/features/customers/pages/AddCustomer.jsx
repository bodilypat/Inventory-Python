/* ******************************************************* */
/* File: src/features/customers/components/AddCustomer.jsx */
/* ******************************************************* */
import React, { useState } from "react";
import customersApi from "../services/customersApi";

const AddCustomer = ({ onCustomerAdded }) => {
    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active",
    });

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
            const newCustomer = await customersApi.createCustomer(customerData);
            onCustomerAdded(newCustomer);
            setCustomerData({
                name: "",
                email: "",
                phone: "",
                status: "active",
            });
        } catch (error) {
            console.error("Error adding customer:", error);
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
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default AddCustomer;
