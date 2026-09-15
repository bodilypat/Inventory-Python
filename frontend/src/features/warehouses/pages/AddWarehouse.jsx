/* **************************************************** */
/* File: src/features/warehouses/pages/AddWarehouse.jsx */
/* **************************************************** */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import WarehouseForm from "../components/WarehouseForm";
import { createWarehouse } from "../services/warehousesApi";

const AddWarehouse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const successMessage = "Warehouse created successfully.";

  const redirectAfterCreate = (warehouse) => {
    const targetPath = warehouse?.id
      ? `/warehouses/${warehouse.id}`
      : "/warehouses";

    navigate(targetPath, {
      replace: true,
      state: {
        message: successMessage,
      },
    });
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const response = await createWarehouse(formData);
      const warehouse = response?.data ?? response;

      redirectAfterCreate(warehouse);
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to create warehouse. Please try again.";

      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/warehouses");
  };

  return (
    <div className="warehouse-page warehouse-page--add">
      {/* Header */}

      <header className="warehouse-page__header">
        <div>
          <div className="warehouse-page__breadcrumb">
            <Link to="/dashboard">Dashboard</Link>

            <span>/</span>

            <Link to="/warehouses">Warehouses</Link>

            <span>/</span>

            <span>Add Warehouse</span>
          </div>

          <h1>Add Warehouse</h1>
          <p>
            Create a new warehouse or storage
            location for your inventory.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          ← Back to Warehouses
        </button>
      </header>

      {/* Error */}

      {error && (
        <div
          className="page-alert page-alert--error"
          role="alert"
        >
          <div>
            <strong>Unable to create warehouse</strong>
            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Close error"
          >
            ×
          </button>
        </div>
      )}

      {/* Form */}

      <main className="warehouse-form-layout">
        <section className="warehouse-form-card">
          <div className="warehouse-form-card__header">
            <div>
              <h2>Warehouse Information</h2>
              <p>
                Enter the basic information
                for this warehouse.
              </p>
            </div>
          </div>

          <WarehouseForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            error={error}
            mode="create"
          />
        </section>

        {/* Information Panel */}

        <aside className="warehouse-info-card">
          <div className="warehouse-info-card__icon">
            🏢
          </div>

          <h2>Warehouse Setup</h2>
          <p>
            A warehouse represents a physical
            location where products are stored
            and inventory is managed.
          </p>

          <div className="warehouse-info-card__section">
            <h3>Recommended information</h3>

            <ul>
              <li>
                <span>✓</span>
                Unique warehouse name
              </li>

              <li>
                <span>✓</span>
                Warehouse code
              </li>

              <li>
                <span>✓</span>
                Complete location
              </li>

              <li>
                <span>✓</span>
                Contact information
              </li>

              <li>
                <span>✓</span>
                Warehouse manager
              </li>
            </ul>
          </div>

          <div className="warehouse-info-card__notice">
            <strong>Inventory tracking</strong>
            <p>
              Once created, this warehouse can
              be used for stock receiving,
              transfers, adjustments, and
              inventory tracking.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default AddWarehouse;