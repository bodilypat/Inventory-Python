/* ********************************************************** */
/* File: src/features/customers/pages/CustomerDetailsPage.jsx */
/* ********************************************************** */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customersApi from "../services/customersApi";

const CustomerDetailsPage = () => {
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
            <h1>Customer Details</h1>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Status:</strong> {customer.status}</p>
        </div>
    );
};

export default CustomerDetailsPage;

