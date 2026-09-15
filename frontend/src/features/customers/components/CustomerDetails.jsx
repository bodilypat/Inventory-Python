/* *********************************************************** */
/* File: src/features/customers/components/CustomerDetails.jsx */
/* *********************************************************** */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customersApi from "../services/customersApi";

const CustomerDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await customersApi.getCustomer(id);
                setCustomer(data);
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        };

        fetchCustomer();
    }, [id]);

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Status: {customer.status}</p>
        </div>
    );
};

export default CustomerDetails;
