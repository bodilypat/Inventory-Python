/* ********************************************************** */
/* File: src/features/inventory/pages/StockAdjustmentPage.jsx */
/* ********************************************************** */

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    adjustStock,
    getInventoryById, 
} from "../services/inventoryApi";

import StockStatus from "../components/StockStatus";

const StockAdjustmentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inventory, setInventory] = useState(null);

    const [form, setForm] = useState({
        adjustmentType: "ADO",
        quantity: "",
        reason: "",
        notes: "",
        reference: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let mounted = true;

        const loadInventory = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getInventoryById(id);

                if (!mounted) return;

                setInventory(response?.data || response);
            } catch (err) {
                if (mounted) {
                    setError(
                        err?.message || "Unable to load inventory information."
                    );
                }
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

    const currentQuantity = Number(
        inventory?.quantity || 0 
    );

    const reservedQuantity = Number(
        inventory?.reservedQuantity || 0
    );

    const currentAvailable = Math.max(
        currentQuantity - reservedQuantity,
        0 
    );

    const projectedQuantity = useMemo(() => {
        if (form.adjustmentType === "ADD") {
            return currentQuantity + adjustmentQuantity;
        }

        if (form.adjustmentType === "REMOVE") {
            return currentQuantity - adjustmentQuantity
        }
        
        return adjustmentQuantity;
    }, [
        currentQuantity,
        adjustmentQuantity,
        form.adjustmentType,
    ]);

    const projectedAvailable = Math.max(
        projectedQuantity - reservedQuantity,
        0 
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const validateForm = () => {
        if (!form.quantity) {
            return "Adjustment quantity is required.";
        }

        if (adjustmentQuantity <= 0) {
            return "Adjustment quantity must be greater than zero.";
        }

        if (form.adjustmentType === "REMOVE" && adjustmentQuantity > currentAvailable) {
            return `You cannot remove more than the available stock (${currentAvailable}).`;
        }

        if (form.adjustmentType === "SET" && adjustmentQuantity < reservedQuantity) {
            return `Stock cannot be set below the reserved quantity (${reservedQuantity})`;
        }

        return null;
    };

    const handleSuubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            const payload = {
                inventoryId: id,
                adjustmentType: form.adjustmentType,
                quantity: adjustmentQuantity,
                reason: form.reason.trim(),
                notes: form.notes.trim(),
                reference: form.reference.trim(),
            };

            await adjustStock(payload);

            setSuccess(
                "Stock adjustment completed successfully."
            );

            /* Reload inventory so the displayed quantities are current. */
            const response = await getInventoryById(id);

            setInventory(response?.data || response);

            setForm({
                adjustmentType: "ADD",
                quantity: "",
                reason: "",
                reference: "",
            });
        } catch (err) {
            setError(
                err?.message || "Unable to complete stock adjustment."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(`/inventory/${id}`);
    };

    if (loading) {
        return (
            <div className="stock-adjustment-page">
                <div className="stock-adjustment-page-loading">
                    Loading inventory...
                </div>
            </div>
        );
    }

    if (error && !inventory){
        return (
            <div className="stock-adjustmen-page">
                <div 
                    className="stock-adjustment-page-error"
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
            <div className="stock-adjustment-page">
                <h2>Inventory record not found</h2>

                <button 
                    type="button"
                    onClick={() => navigate("/inventory")}
                >
                    Back to Inventory 
                </button>
            </div>
        );
    }

    const product = inventory.product || {};
    const warehouse = inventory.warehhouse || {};

    return (
        <div className="stock-adjustment-page">

            {/* Header */}
            <header className="stock-adjustment-page-header">
                <div>
                    <div className="stock-adjustment-page-header">
                        <Link to="/inventory">Inventory</Link>
                        <span>/</span>

                        <Link to={`/inventory/${id}`}>
                            {product.name || "Inventory Details"}
                        </Link>

                        <span>/</span>
                        <span>Adjust Stock</span>
                    </div>

                    <h1>Adjust Stock</h1>

                    <p>Manually increase, decrease, or set the inventory quantity.</p>

                </div>
            </header>

            {/* Product Summary */}
            <section className="stock-adjustment-page-product">
                <div className="stock-adjustment-product">
                    {product.image ? (
                        <img 
                            src={product.image}
                            alt={product.name}
                            className="stock-adjustment-product-image"
                        />
                    ) : (
                        <div className="stock-adjustment-product-placeholder">
                            {product.name?.charAt(0) || "P"}
                        </div>
                    )}

                    <div>
                        <h2>{product.name || "Unknow Product"}</h2>

                        <p>SKU: <strong>{product.skku || "-"}</strong></p>

                        <p>Warehouse:{" "}<strong>{warehouse.name || "-"}</strong></p>
                    </div>

                    <StockStatus inventory={inventory} />
                </div>
            </section>

            {/* Current Stock */}
            <section className="stock-adjustment-page-current">
                <div className="sttock-metric">
                    <span>Current Stock</span>
                    <strong>{currentQuantity}</strong>
                </div>

                <div className="stock-metric">
                    <span>Reserved</span>
                    <strong>{reservedQuantity}</strong>
                </div>

                <div className="stock-metric">
                    <span>Available</span>
                    <strong>{currentAvailable}</strong>
                </div>

                <div className="stock-metric">
                    <span>Reorder Level</span>
                    <strong>{inventory.reorderLevel ?? 0}</strong>
                </div>
            </section>

            {/* Adjustment Form */}
            <form 
                className="stock-adjustment-form"
                onSubmit={handleSubmit}
            >
                <div className="stock-adjustment-form-header">
                    <h2>Stock Adjustment</h2>

                    <p>Every adjustment shoulld have a clear reason for audit purposes.</p>
                </div>

                {error && (
                    <div 
                        className="form-alert form-alert-error"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div 
                        className="form-alert form-alert-success"
                        role="status"
                    >
                        {success}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="adjustmentType">
                        Adjustment Type 
                    </label>

                    <select 
                        id="adjustmentType"
                        name="adjustmentType"
                        value={form.adjustmentType}
                        onChange={handleChange}
                        disabled={submitting}
                    >
                        <option value="ADD">
                            Add Stock
                        </option>

                        <option value="REMOVE">
                            Remove Stock 
                        </option>

                        <option value="SET">
                            Set Stock Quantity 
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">
                        Quantity
                    </label>

                    <input 
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        step="1"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        disabled={submitting}
                    />

                    <small>
                        {form.adjustmentType === "ADD" && "Quantitiy will be added to the current stock"}

                        {form.adjustmentType === "REMOVE" && "Quantity will be removed from available stock."}

                        {form.adjustmentType == "SET" && "The inventory will be replaced with with this value."}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="reason">
                        Reason <span aria-hidden="true">*</span>
                    </label>

                    <select 
                        id="reason"
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        disabled={submitting}
                    >
                        <option value="">
                            Select a reason
                        </option>

                        <option value="STOCK_COUNT">
                            Stock Count 
                        </option>

                        <option value="DAMAGED">
                            Damaged Stock 
                        </option>

                        <option value="LOST">
                            Lost Stock
                        </option>

                        <option value="FOUND">
                            Found Stock 
                        </option>

                        <option value="EXPIRED">
                            Expired Stock 
                        </option>

                        <option value="DATA_CORRECTION">
                            Data Correction
                        </option>
                        
                        <option value="OTHER">
                            Other 
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="reference">
                        Reference
                    </label>

                    <input
                        id="reference"
                        name="reference"
                        type="text"
                        value={form.reference}
                        placeholder="Adjustment reference / document number"
                        disabled={submitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">
                        Notes 
                    </label>

                    <textarea 
                        id="notes"
                        name="notes"
                        rows="4"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Add additional information.."
                        disabled={submitting}
                    />
                </div>
                {/* Preview */}
                <section className="stock-adjustment-preview">
                    <h3>Adjustment Preview</h3>

                    <div className="stock-adjustment-preview-row">
                        <span>Current Quantity</span>
                        <strong>{currentQuantity}</strong>
                    </div>

                    <div className="stock-adjustment-preview-row">
                        <span>Adjustment</span>

                        <strong  
                            className={
                                form.adjustmentType === "REMOVE"
                                    ? "text-danger"
                                    : "text-success"
                                }
                            >
                                {form.adjustmentType === "ADD" && "+"}
                                {form.adjustmentType === "REMOVE" && "-"}
                                {form.adjustmentType === "SET"
                                    ? adjustmentQuantity
                                    : adjustmentQuantity}
                        </strong>
                    </div>

                    <div className="stock-adjustment-preview-row stock-adjustment-preview-total">
                        <span>Projected Quantity</span>
                        <strong>{projectedQuantity}</strong>
                    </div>

                    <div className="stock-adjustment-preview-row">
                        <span>Product Available</span>
                        <strong>{projectedAvailable}</strong>
                    </div>
                </section>

                {/* Actions */}
                <div className="stock-adjustment-form-actions">
                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>

                    <button 
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting 
                            ? "Saving Adjustment..."
                            : "Save Adjustment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StockAdjustmentPage;
