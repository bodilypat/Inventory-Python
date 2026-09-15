/* ***************************************************** */
/* File: src/features/warehouses/pages/EditWarehouse.jsx */
/* ***************************************************** */

import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import WarehouseForm from "../components/WarehouseForm";
import {
  getWarehouse,
  updateWarehouse,
} from "../services/warehousesApi";

const EditWarehouse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [warehouse, setWarehouse] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

  /* Load Warehouse */

    useEffect(() => {
        let mounted = true;

        const loadWarehouse = async () => {

        try {
            setLoading(true);
            setError("");

            if (!id) {
                throw new Error(
                "Warehouse ID is missing."
            );
        }

        const response =
          await getWarehouse(id);

        const data =
            response?.data?.data ||
            response?.data ||
            response;

            if (!data || typeof data !== "object") {
                throw new Error(
                "Invalid warehouse data received."
            );
        }

        if (!mounted) return;
            setWarehouse(data);
        } catch (err) {
            if (!mounted) return;
                setError(
                    err?.message ||
                    "Unable to load warehouse."
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadWarehouse();

        return () => {
            mounted = false;
        };
    }, [id]);

  /* Update Warehouse */

    const handleSubmit = async (
        formData
    ) => {
        try {
            setSaving(true);
            setError("");

        const response =
            await updateWarehouse(
                id,
                formData
            );

        const updatedWarehouse =
            response?.data?.data ||
            response?.data ||
            response;

        if (!updatedWarehouse || typeof updatedWarehouse !== "object") {
            throw new Error(
            "Invalid warehouse data received after update."
        );
    }

    /*  Keep local state in sync before leaving the page. */
    setWarehouse(updatedWarehouse);

    navigate(
        `/warehouses/${id}`,
        {
            replace: true,
            state: {
                message:
                    "Warehouse updated successfully.",
                },
            }
        );

    } catch (err) {
      setError(
        err?.message ||
          "Unable to update warehouse. Please try again."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSaving(false);
    }
  };

  /* Cancel */

  const handleCancel = () => {
    navigate(`/warehouses/${id}`);
  };

  /* Loading State */

  if (loading) {
    return (
      <div className="warehouse-page">
        <header className="warehouse-page__header">
          <div>
            <div className="warehouse-page__breadcrumb">

              <Link to="/dashboard">Dashboard</Link>
              <span>/</span>

              <Link to="/warehouses">Warehouses</Link>
              <span>/</span>

              <span>Edit</span>
            </div>

            <h1>Edit Warehouse</h1>

            <p>
              Update warehouse information
              and settings.
            </p>
          </div>
        </header>

        <div className="warehouse-loading">
          <div className="warehouse-loading__spinner" />

          <span>
            Loading warehouse...
          </span>
        </div>
      </div>
    );
  }

  /* Error / Not Found */

  if (error && !warehouse) {
    return (
      <div className="warehouse-page">
        <header className="warehouse-page__header">
          <div>
            <div className="warehouse-page__breadcrumb">

              <Link to="/dashboard">Dashboard</Link>
              <span>/</span>

              <Link to="/warehouses">Warehouses</Link>
              <span>/</span>

              <span>Edit Warehouse</span>
            </div>

            <h1>Edit Warehouse</h1>
          </div>
        </header>

        <div
          className="page-alert page-alert--error"
          role="alert"
        >
        <div>
            <strong>Unable to load warehouse</strong>
            <p>{error}</p>
        </div>
    </div>

    <div className="warehouse-error-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate(
                "/warehouses"
              )
            }
          >
            ← Back to Warehouses
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="warehouse-page warehouse-page--edit">
      {/* Header */}

      <header className="warehouse-page__header">
        <div>
          <div className="warehouse-page__breadcrumb">

            <Link to="/dashboard">Dashboard</Link>

            <span>/</span>

            <Link to="/warehouses">Warehouses</Link>

            <span>/</span>

            <Link
              to={`/warehouses/${id}`}
            >
              {warehouse?.name ||
                "Warehouse"}
            </Link>

            <span>/</span>

            <span>Edit</span>
          </div>

          <h1>Edit Warehouse</h1>
          <p>
            Update the information for{" "}
            <strong>
              {warehouse?.name ||
                "this warehouse"}
            </strong>
            .
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={saving}
        >
          ← Back to Details
        </button>
      </header>

      {/* Error */}

      {error && (
        <div
          className="page-alert page-alert--error"
          role="alert"
        >
          <div>
            <strong>Unable to update warehouse</strong>
            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            aria-label="Close error"
          >
            ×
          </button>
        </div>
      )}

      {/* Form Layout */}
      <main className="warehouse-form-layout">
        <section className="warehouse-form-card">
          <div className="warehouse-form-card__header">
            <div>
              <h2>Warehouse Information</h2>
              <p>
                Update the warehouse
                information below.
              </p>
            </div>

            <span className="warehouse-edit-badge">Editing</span>
          </div>

          <WarehouseForm
            initialValues={{
              name:
                warehouse?.name ||
                "",
              code:
                warehouse?.code ||
                warehouse?.warehouseCode ||
                "",
              description:
                warehouse?.description ||
                "",
              address:
                warehouse?.address ||
                "",
              city:
                warehouse?.city ||
                "",
              state:
                warehouse?.state ||
                "",
              postalCode:
                warehouse?.postalCode ||
                "",
              country:
                warehouse?.country ||
                "",
              phone:
                warehouse?.phone ||
                "",
              email:
                warehouse?.email ||
                "",
              managerName:
                warehouse?.manager?.name ||
                warehouse?.managerName ||
                "",
              status:
                warehouse?.status ||
                "ACTIVE",
            }}
            onSubmit={
              handleSubmit
            }
            onCancel={
              handleCancel
            }
            loading={saving}
            error={error}
            mode="edit"
          />
        </section>

        {/* Current Warehouse Information */}

        <aside className="warehouse-info-card">
          <div className="warehouse-info-card__icon">
            🏢
          </div>

          <h2>
            {warehouse?.name ||
              "Warehouse"}
          </h2>

          <p>
            {warehouse?.description ||
              "Warehouse information and inventory location."}
          </p>

          <div className="warehouse-info-card__details">
            <div>
              <span>Warehouse Code</span>
              <strong>
                {warehouse?.code ||
                  warehouse?.warehouseCode ||
                  "-"}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong
                className={
                  String(
                    warehouse?.status ||
                      "ACTIVE"
                  ).toUpperCase() ===
                  "ACTIVE"
                    ? "text-success"
                    : "text-muted"
                }
              >
                {String(
                  warehouse?.status ||
                    "ACTIVE"
                ).toUpperCase()}
              </strong>
            </div>

            <div>
              <span>Products</span>
              <strong>
                {Number(
                  warehouse?.productCount ||
                    warehouse?.totalProducts ||
                    0
                ).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Stock Units</span>
              <strong>
                {Number(
                  warehouse?.stockQuantity ||
                    warehouse?.totalStock ||
                    0
                ).toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="warehouse-info-card__notice">
            <strong>Important</strong>

            <p>
              Changing warehouse information
              does not automatically move or
              modify its inventory. Stock
              transfers should be performed
              through the Stock Transfer
              functionality.
            </p>
          </div>

          <Link
            to={`/warehouses/${id}`}
            className="warehouse-info-card__link"
          >
            View Warehouse Details →
          </Link>
        </aside>
      </main>
    </div>
  );
};

export default EditWarehouse;