/* *********************************************************** */
/* File: src/features/customers/components/CustomerSummary.jsx */
/* *********************************************************** */

import React, { useEffect, useState } from "react";
import customersApi from "../services/customersApi";
import CustomerStatus from "./CustomerStatus";

const CustomerSummary = () => {
    const [summary, setSummary] = useState({
        total: 0,
        active: 0,
        inactive: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await customersApi.getCustomerSummary();
                setSummary(data);
            } catch (error) {
                console.error("Error fetching customer summary:", error);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div>
            <h2>Customer Summary</h2>
            <p>Total Customers: {summary.total}</p>
            <p>Active Customers: {summary.active}</p>
            <p>Inactive Customers: {summary.inactive}</p>
        </div>
    );
};
export default CustomerSummary;

