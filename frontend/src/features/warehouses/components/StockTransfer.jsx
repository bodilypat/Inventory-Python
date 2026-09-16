/* ********************************************************** */
/* File: src/features/warehouses/components/StockTransfer.jsx */
/* ********************************************************** */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStockTransfer } from "../services/warehousesApi";

import StockTransferForm from "./StockTransferForm";

const StockTransfer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError("");

        try {
            await createStockTransfer(formData);
            navigate("/warehouses");
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to create stock transfer."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="stock-transfer-page">
            <h1>Stock Transfer</h1>
            {error && (
                <div className="error-message" role="alert">
                    {error}
                </div>
            )}
            <StockTransferForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );
};

export default StockTransfer;




