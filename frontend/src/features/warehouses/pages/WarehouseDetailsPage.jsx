/* ************************************************************ */
/* File: src/features/warehouses/pages/WarehouseDetailsPage.jsx */
/* ************************************************************ */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import StockTransfer from "../components/StockTransfer";
import {
  getWarehouse,
} from "../services/warehousesApi";

const WarehouseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [warehouse, setWarehouse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showTransfer, setShowTransfer] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState(
      location.state?.message || ""
    );

  /* Load Warehouse */

  const loadWarehouse = useCallback(async () => {
    let isCurrentRequest = true;

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
        response?.data ||
        response;

      if (isCurrentRequest) {
        setWarehouse(data);
      }
    } catch (err) {
      if (isCurrentRequest) {
        setError(
          err?.message ||
            "Unable to load warehouse."
        );
      }
    } finally {
      if (isCurrentRequest) {
        setLoading(false);
      }
    }
    return () => {
      isCurrentRequest = false;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    loadWarehouse();

    return () => {
      cancelled = true;
    };
  }, [loadWarehouse]);

  /* Clear Navigation Message */

  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, [location.state]);

  /* Warehouse Statistics */

  const stats = useMemo(() => {
    if (!warehouse) {
      return {
        products: 0,
        stock: 0,
        capacity: 0,
        capacityUsed: 0,
        capacityPercentage: 0,
      };
    }

    const products = Number(
      warehouse.productCount ??
        warehouse.totalProducts ??
        0
    );

    const stock = Number(
      warehouse.stockQuantity ??
        warehouse.totalStock ??
        0
    );

    const capacity = Number(
      warehouse.capacity ??
        warehouse.maxCapacity ??
        0
    );

    const capacityUsed = Number(
      warehouse.capacityUsed ??
        stock
    );

    const capacityPercentage =
      capacity > 0
        ? Math.min(
            (capacityUsed /
              capacity) *
              100,
            100
          )
        : 0;

    return {
      products,
      stock,
      capacity,
      capacityUsed,
      capacityPercentage,
    };
  }, [warehouse]);

  /* Status */

  const status = String(
    warehouse?.status ||
      "ACTIVE"
  ).toUpperCase();

  const isActive =
    status === "ACTIVE";

  /* Address */

  const address = [
    warehouse?.address,
    warehouse?.city,
    warehouse?.state,
    warehouse?.postalCode,
    warehouse?.country,
  ]
    .filter(Boolean)
    .join(", ");

  /* Refresh */

  const handleRefresh = async () => {
    await loadWarehouse();
  };

  /* Transfer Complete */

  const handleTransferComplete = async () => {
    setShowTransfer(false);

    setSuccessMessage(
      "Stock transfer completed successfully."
    );

    await loadWarehouse();
  };

  /* Loading State */

  if (loading) {
    return (
      <div className="warehouse-details-page">
        <header className="warehouse-details-page__header">
          <div>
            <div className="warehouse-breadcrumb">
              <Link to="/dashboard">
                Dashboard
              </Link>

              <span>/</span>

              <Link to="/warehouses">
                Warehouses
              </Link>

              <span>/</span>

              <span>Details</span>
            </div>

            <h1>
              Warehouse Details
            </h1>
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

  /* Error State */

  if (error || !warehouse) {
    return (
      <div className="warehouse-details-page">
        <header className="warehouse-details-page__header">
          <div>
            <div className="warehouse-breadcrumb">
              <Link to="/dashboard">
                Dashboard
              </Link>

              <span>/</span>

              <Link to="/warehouses">
                Warehouses
              </Link>

              <span>/</span>

              <span>Details</span>
            </div>

            <h1>
              Warehouse Details
            </h1>
          </div>
        </header>

        <section
          className="warehouse-error"
          role="alert"
        >
          <div className="warehouse-error__icon">
            ⚠
          </div>

          <h2>
            Unable to load warehouse
          </h2>

          <p>
            {error ||
              "The requested warehouse could not be found."}
          </p>

          <div className="warehouse-error__actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                navigate(
                  "/warehouses"
                )
              }
            >
              ← Warehouses
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={
                handleRefresh
              }
            >
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="warehouse-details-page">
      {/* HEADER */}

      <header className="warehouse-details-page__header">
        <div>
          <div className="warehouse-breadcrumb">
            <Link to="/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <Link to="/warehouses">
              Warehouses
            </Link>

            <span>/</span>

            <span>
              {warehouse.name}
            </span>
          </div>

          <div className="warehouse-title">
            <div className="warehouse-title__avatar">
              {(
                warehouse.name ||
                "W"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <div className="warehouse-title__row">
                <h1>
                  {warehouse.name}
                </h1>

                <span
                  className={`warehouse-status warehouse-status--${status.toLowerCase()}`}
                >
                  <span className="warehouse-status__dot" />
                  {status}
                </span>
              </div>

              <p>
                {warehouse.code ||
                  warehouse.warehouseCode ||
                  `WH-${warehouse.id}`}
              </p>
            </div>
          </div>
        </div>

        <div className="warehouse-details-page__actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate(
                "/warehouses"
              )
            }
          >
            ← Back
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRefresh}
          >
            ↻ Refresh
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate(
                `/warehouses/${id}/edit`
              )
            }
          >
            ✏ Edit Warehouse
          </button>
        </div>
      </header>

      {/* SUCCESS MESSAGE */}

      {successMessage && (
        <div
          className="page-alert page-alert--success"
          role="status"
        >
          <span>✓</span>

          <span>
            {successMessage}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {/* STATUS WARNING */}

      {!isActive && (
        <div
          className="page-alert page-alert--warning"
          role="status"
        >
          <span>⚠</span>

          <div>
            <strong>
              Warehouse is inactive
            </strong>

            <p>
              This warehouse should not be
              used for new inventory
              operations until it is
              activated.
            </p>
          </div>
        </div>
      )}

      {/* STATISTICS */}

      <section className="warehouse-details-stats">
        <div className="warehouse-detail-stat">
          <div className="warehouse-detail-stat__icon warehouse-detail-stat__icon--blue">
            📦
          </div>

          <div>
            <span>
              Products
            </span>

            <strong>
              {stats.products.toLocaleString()}
            </strong>
          </div>

          <small>
            Products stored
          </small>
        </div>

        <div className="warehouse-detail-stat">
          <div className="warehouse-detail-stat__icon warehouse-detail-stat__icon--green">
            📊
          </div>

          <div>
            <span>
              Stock Units
            </span>

            <strong>
              {stats.stock.toLocaleString()}
            </strong>
          </div>

          <small>
            Current inventory
          </small>
        </div>

        <div className="warehouse-detail-stat">
          <div className="warehouse-detail-stat__icon warehouse-detail-stat__icon--purple">
            🏗
          </div>

          <div>
            <span>
              Capacity
            </span>

            <strong>
              {stats.capacity
                ? stats.capacity.toLocaleString()
                : "—"}
            </strong>
          </div>

          <small>
            Maximum capacity
          </small>
        </div>

        <div className="warehouse-detail-stat">
          <div className="warehouse-detail-stat__icon warehouse-detail-stat__icon--orange">
            📈
          </div>

          <div>
            <span>
              Capacity Used
            </span>

            <strong>
              {stats.capacity
                ? `${stats.capacityPercentage.toFixed(
                    1
                  )}%`
                : "—"}
            </strong>
          </div>

          {stats.capacity > 0 && (
            <div className="warehouse-capacity-bar">
              <div
                style={{
                  width: `${stats.capacityPercentage}%`,
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* MAIN CONTENT */}

      <div className="warehouse-details-grid">
        {/* LEFT COLUMN */}

        <main>
          {/* Warehouse Details Component */}

          <section className="warehouse-content-card">
            <div className="warehouse-content-card__header">
              <div>
                <h2>
                  Warehouse Information
                </h2>

                <p>
                  Basic information about
                  this warehouse.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-link"
                onClick={() =>
                  navigate(
                    `/warehouses/${id}/edit`
                  )
                }
              >
                Edit
              </button>
            </div>

            <div className="warehouse-information-grid">
              <div>
                <span>
                  Warehouse Name
                </span>

                <strong>
                  {warehouse.name ||
                    "-"}
                </strong>
              </div>

              <div>
                <span>
                  Warehouse Code
                </span>

                <strong>
                  {warehouse.code ||
                    warehouse.warehouseCode ||
                    "-"}
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {status}
                </strong>
              </div>

              <div>
                <span>
                  Manager
                </span>

                <strong>
                  {warehouse.manager?.name ||
                    warehouse.managerName ||
                    "-"}
                </strong>
              </div>

              <div className="warehouse-information-grid__full">
                <span>
                  Description
                </span>

                <p>
                  {warehouse.description ||
                    "No description provided."}
                </p>
              </div>
            </div>
          </section>

          {/* Location */}

          <section className="warehouse-content-card">
            <div className="warehouse-content-card__header">
              <div>
                <h2>
                  Location & Contact
                </h2>

                <p>
                  Warehouse address and
                  contact information.
                </p>
              </div>
            </div>

            <div className="warehouse-location-detail">
              <div className="warehouse-location-detail__icon">
                📍
              </div>

              <div>
                <span>
                  Address
                </span>

                <strong>
                  {address ||
                    "No address provided."}
                </strong>
              </div>
            </div>

            <div className="warehouse-contact-grid">
              <div>
                <span>
                  Phone
                </span>

                {warehouse.phone ? (
                  <a
                    href={`tel:${warehouse.phone}`}
                  >
                    {warehouse.phone}
                  </a>
                ) : (
                  <strong>
                    Not provided
                  </strong>
                )}
              </div>

              <div>
                <span>
                  Email
                </span>

                {warehouse.email ? (
                  <a
                    href={`mailto:${warehouse.email}`}
                  >
                    {warehouse.email}
                  </a>
                ) : (
                  <strong>
                    Not provided
                  </strong>
                )}
              </div>

              <div>
                <span>
                  Manager
                </span>

                <strong>
                  {warehouse.manager?.name ||
                    warehouse.managerName ||
                    "Not assigned"}
                </strong>
              </div>
            </div>
          </section>

          {/* Recent Stock Activity */}

          <section className="warehouse-content-card">
            <div className="warehouse-content-card__header">
              <div>
                <h2>
                  Recent Stock Activity
                </h2>

                <p>
                  Latest inventory movements
                  for this warehouse.
                </p>
              </div>

              <Link
                to={`/stock-movements?warehouseId=${id}`}
                className="btn btn-link"
              >
                View All
              </Link>
            </div>

            {warehouse.recentMovements
                ?.length > 0 ? (
              <div className="warehouse-activity-list">
                {warehouse.recentMovements.map(
                  (movement) => (
                    <div
                      className="warehouse-activity-item"
                      key={
                        movement.id
                      }
                    >
                      <div
                        className={`warehouse-activity-item__icon warehouse-activity-item__icon--${String(
                          movement.type ||
                            "adjustment"
                        ).toLowerCase()}`}
                      >
                        {movement.type ===
                        "STOCK_IN"
                          ? "↓"
                          : movement.type ===
                            "STOCK_OUT"
                          ? "↑"
                          : "↔"}
                      </div>

                      <div className="warehouse-activity-item__content">
                        <strong>
                          {movement.product?.name ||
                            movement.productName ||
                            "Inventory"}
                        </strong>

                        <span>
                          {movement.type ||
                            "Adjustment"}
                        </span>
                      </div>

                      <div className="warehouse-activity-item__quantity">
                        <strong>
                          {movement.quantity >
                          0
                            ? "+"
                            : ""}
                          {Number(
                            movement.quantity ||
                              0
                          ).toLocaleString()}
                        </strong>

                        <small>
                          {movement.createdAt
                            ? new Date(
                                movement.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </small>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="warehouse-no-activity">
                <div>
                  📋
                </div>

                <h3>
                  No recent activity
                </h3>

                <p>
                  Stock movements for this
                  warehouse will appear here.
                </p>
              </div>
            )}
          </section>
        </main>

        {/* RIGHT COLUMN */}

        <aside>
          {/* Capacity */}

          <section className="warehouse-side-card">
            <div className="warehouse-side-card__header">
              <h2>
                Storage Capacity
              </h2>

              <span>
                {stats.capacity
                  ? `${stats.capacityPercentage.toFixed(
                      1
                    )}%`
                  : "N/A"}
              </span>
            </div>

            {stats.capacity > 0 ? (
              <>
                <div className="warehouse-large-capacity-bar">
                  <div
                    className={
                      stats.capacityPercentage >=
                      90
                        ? "danger"
                        : stats.capacityPercentage >=
                          75
                        ? "warning"
                        : ""
                    }
                    style={{
                      width: `${stats.capacityPercentage}%`,
                    }}
                  />
                </div>

                <div className="warehouse-capacity-values">
                  <div>
                    <span>
                      Used
                    </span>

                    <strong>
                      {stats.capacityUsed.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Available
                    </span>

                    <strong>
                      {Math.max(
                        stats.capacity -
                          stats.capacityUsed,
                        0
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Maximum
                    </span>

                    <strong>
                      {stats.capacity.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="warehouse-capacity-empty">
                <span>
                  No capacity limit configured.
                </span>
              </div>
            )}
          </section>

          {/* Quick Actions */}

          <section className="warehouse-side-card">
            <h2>
              Quick Actions
            </h2>

            <div className="warehouse-quick-actions">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/stock-movements/in?warehouseId=${id}`
                  )
                }
                disabled={!isActive}
              >
                <span>↓</span>

                <div>
                  <strong>
                    Stock In
                  </strong>

                  <small>
                    Receive inventory
                  </small>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/stock-movements/out?warehouseId=${id}`
                  )
                }
                disabled={!isActive}
              >
                <span>↑</span>

                <div>
                  <strong>
                    Stock Out
                  </strong>

                  <small>
                    Remove inventory
                  </small>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowTransfer(true)
                }
                disabled={!isActive}
              >
                <span>↔</span>

                <div>
                  <strong>
                    Transfer Stock
                  </strong>

                  <small>
                    Move between warehouses
                  </small>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/inventory?warehouseId=${id}`
                  )
                }
              >
                <span>📦</span>

                <div>
                  <strong>
                    View Inventory
                  </strong>

                  <small>
                    Browse warehouse stock
                  </small>
                </div>
              </button>
            </div>
          </section>

          {/* Warehouse Metadata */}

          <section className="warehouse-side-card">
            <h2>
              Warehouse Metadata
            </h2>

            <div className="warehouse-metadata">
              <div>
                <span>
                  Created
                </span>

                <strong>
                  {warehouse.createdAt
                    ? new Date(
                        warehouse.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </strong>
              </div>

              <div>
                <span>
                  Last Updated
                </span>

                <strong>
                  {warehouse.updatedAt
                    ? new Date(
                        warehouse.updatedAt
                      ).toLocaleDateString()
                    : "-"}
                </strong>
              </div>

              <div>
                <span>
                  Warehouse ID
                </span>

                <strong>
                  {warehouse.id}
                </strong>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* STOCK TRANSFER MODAL */}

      {showTransfer && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowTransfer(false);
            }
          }}
        >
          <div
            className="warehouse-transfer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stock-transfer-title"
          >
            <div className="warehouse-transfer-modal__header">
              <div>
                <h2 id="stock-transfer-title">
                  Transfer Stock
                </h2>

                <p>
                  Move inventory from{" "}
                  <strong>
                    {warehouse.name}
                  </strong>{" "}
                  to another warehouse.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowTransfer(false)
                }
                aria-label="Close transfer dialog"
              >
                ×
              </button>
            </div>

            <StockTransfer
              sourceWarehouseId={
                warehouse.id
              }
              sourceWarehouse={
                warehouse
              }
              onSuccess={
                handleTransferComplete
              }
              onCancel={() =>
                setShowTransfer(false)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseDetailsPage;