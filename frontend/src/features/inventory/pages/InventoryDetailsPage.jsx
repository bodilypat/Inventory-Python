/* ********************************************************** */
/* File:src/features/inventory/pages/InventoryDetailsPage.jsx */ 
/* ********************************************************** */
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import InventoryDetails from "../components/InventoryDetails";
import StockStatus from "../components/StockStatus";
import InventoryStats from "../components/InventoryStats";

import {
    getInventoryById,
    getInventoryStats,
} from "../services/inventoryApi";

const InventoryDetailsPage = () => {
    const { id }  = useParams();
    const navigate = useNavigate();

    const [inventory, setInventory] = useState(null);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        const loadInventory = async () => {
            try {
                setLoading(true);
                setError("");

                const [inventoryResponse, statsResponse] = 
                    await Promise.all([
                        getInventoryById(id),
                        getInventoryStats(), 
                    ]);

                if (!mounted) return;

                setInventory(
                    inventoryResponse?.data || inventoryResponse 
                );

                setStats(statsResponse?.data || {});
            } catch (err) {
                if (!mounted) return;

                setError(
                    err?.message || "Unable tol load inventory details."
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        if (id) {
            loadInventory();
        }

        return () => {
            mounted = false;
        };
    }, [id]);

    const product = inventory?.product || {};
    const warehouse = inventory?.warehouse || {};

    const availableQuantity = useMemo(() => {
        if (!inventory) return 0;

        if (inventory.availableQuantity !== undefined && inventory.availableQuantity !== null) {
            return Number(inventory.availableQuantity);
        }

        return Math.max(
            Number(inventory.quantity || 0) - Number(inventory.reservedQuantity || 0),
            0 
        );
    }, [inventory]);

    const stockValue = useMemo(() => {
        if (!inventory) return 0;

        if(inventory.stockValue !== undefined) {
            return Number(inventory.stockValue);
        }

        return(
            Number(inventory.quantity || 0) * Number(inventory.unitConst || 0)
        );
    }, [inventory]);

    const handleAdjustStock = () => {
        navigate(`/inventory/${id}/adjust`);
    };

    if (loading) {
        return (
            <div className="inventory-details-page">
                <div className="inventory-details-page-loading">
                    Loading inventory details... 
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="inventory-details-page">
                <div 
                    className="inventory-details-page-error"
                    role="alert"
                >
                    <h2>Unable to load inventory</h2>
                    <p>{error}</p>

                    <button 
                        type="button"
                        onClick={() => navigate("/inventory")}
                    >
                        Back to Inventory 
                    </button>
                </div>
            </div>
        );
    }

    if (!inventory) {
        return (
            <div className="inventory-details-page">
                <div className="inventory-details-page-empty">
                    <h2>Inventory record not found</h2>

                    <button 
                        type="button"
                        onClick={() => navigate("/inventory")}
                    >
                        Back to Inventory 
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="inventory-details-page">

            {/* Header */}
            <header className="inventory-details-page-header">
                <div>
                    <div className="inventory-details-page-breadcrumb">
                        <Link to="/inventory">Inventory</Link>

                        <span>/</span>
                        <span>{product.name || "Details"}</span>
                    </div>

                    <div className="inventory-details-page-title">
                        <div>
                            <h1>{product.name || "Unknow Product"}</h1>

                            <p>
                                SKU:{" "}
                                <strong>
                                    {product.sku || "-"}
                                </strong>
                            </p>
                        </div>

                        <StockStatus inventory={inventory} />
                    </div>
                </div>

                <div className="inventory-details-page-actions">
                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/inventory")}
                    >
                        Back
                    </button>

                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAdjustStock}
                    >
                        Adjust Stock 
                    </button>
                </div>
            </header>

            {/* Product / Warehouse Summary */}
            <section className="inventory-details-page-summary">
                <div className="inventory-summary-card">
                    <span>Product</span>

                    <strong>
                        {product.name || "-"}
                    </strong>

                    <small>
                        {product.brand || "No brand"}
                    </small>
                </div>

                <div className="inventory-summary-card">
                    <span>Warehouse</span>
                    <strong>
                        {warehouse.name || "-"}
                    </strong>

                    <small>
                        {warehouse.warehouseCode || ""}
                    </small>
                </div>

                <div className="inventory-summary-card">
                    <span>Inventory Value</span>
                    <strong>
                        ${stockValue.toLocaleString()}
                    </strong>

                    <small>
                        Unit cost: $
                        {Number(
                            inventory.unitCost || 0 
                        ).toLocaleString()}
                    </small>
                </div>
            </section>

            {/* Inventory Statistics */}
            <InventoryStats stats={stats} />

            {/* Main Details */}
            <main className="inventory-details-page-content">
                <section className="inventory-details-page-main">
                    <InventoryDetails inventory={inventory} />
                </section>

                <aside className="inventory-details-page-sidebar">
                    <div className="inventory-info-card">
                        <h2>Stock Information</h2>

                        <div className="inventory-info-row">
                            <span>Total Quantity</span>

                            <strong>
                                {inventory.quantity ?? 0}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Reserved Quantity</span>
                            <strong>
                                {inventory.reservedQuantity ?? 0}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Available Quantity</span>
                            <storng>
                                {availableQuantity}
                            </storng>
                        </div>

                        <div className="inventory-info-row">
                            <span>Reorder Level</span>
                            <strong>
                                {inventory.reorderLevel ?? 0}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Maximum Stock</span>
                            <strong>
                                {inventory.maximumStockLevel ?? 0}
                            </strong>
                        </div>
                    </div>

                    <div className="inventory-info-card">
                        <h2>Product Information</h2>

                        <div className="inventory-info-row">
                            <span>SKU</span>
                            <strong>
                                {product.sku || "-"}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Barcode</span>
                            <strong>
                                {product.barcode || "-"}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Category</span>
                            <strong>
                                {product.category?.name || "--"}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Supplier</span>
                            <strong>
                                {product.supplier?.name || "-"}
                            </strong>
                        </div>

                        <div className="inventory-info-row">
                            <span>Unit</span>
                            <strong>
                                {product.unit || "-"}
                            </strong>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Last Updated */}
            <footer className="inventory-details-page-footer">
                <span>
                    Last updated:{" "}
                    {inventory.updatedAt
                        ? new Date(
                              inventory.updatedAt 
                          ).toLocaleDateString()
                        : "-"}
                </span>

                <button 
                    type="button"
                    onClick={() => window.location.reload()}
                >
                    Refresh 
                </button>
            </footer>
        </div>
    );
};

export default InventoryDetailsPage;
