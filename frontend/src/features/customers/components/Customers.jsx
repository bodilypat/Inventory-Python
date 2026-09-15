/* *********************************************** */
/* File: src/features/customers/pages/Customers.jsx*/
/* *********************************************** */

import React, { useState, useEffect } from "react";
import customersApi from "../services/customersApi";
import CustomerTable from "../components/CustomerTable";

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await customersApi.getCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await customersApi.deleteCustomer(id);
                setCustomers((currentCustomers) =>
                    currentCustomers.filter((customer) => customer.id !== id)
                );
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    return (
        <div>
            <h1>Customers</h1>
            <CustomerTable customers={customers} onDelete={handleDelete} />
        </div>
    );
};

export default Customers;
