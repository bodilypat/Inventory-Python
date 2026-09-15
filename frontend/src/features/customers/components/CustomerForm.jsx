/* ******************************************************** */
/* File: src/features/customers/components/CustomerForm.jsx */
/* ******************************************************** */

import React, { useState } from "react";
const CustomerForm = ({ initialData = {}, onSubmit }) => {
    const [customerData, setCustomerData] = useState({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        status: initialData.status || "active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(customerData);
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomerForm;

