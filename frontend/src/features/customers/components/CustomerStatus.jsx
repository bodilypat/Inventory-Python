/* *********************************************************** */
/* File: src/features/customers/components/CustomerStatus.jsx */
/* *********************************************************** */

import React from "react";

const CustomerStatus = ({ status }) => {
    return (
        <span
            style={{
                color: status === "active" ? "green" : "red",
                fontWeight: "bold",
            }}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};
export default CustomerStatus;


