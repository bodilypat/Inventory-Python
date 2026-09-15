/* ************************************************** */
/* File: src/features/warehouses/pages/Warehouses.jsx */
/* ************************************************** */

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getWarehouses,
  deleteWarehouse,
} from "../services/warehousesApi";

const INITIAL_FILTERS = {
  search: "",
  status: "ALL",
};

const Warehouses = () => {
  const navigate = useNavigate();

  const [warehouses, setWarehouses] = useState([]);
  const [filters, setFilters] =
    useState(INITIAL_FILTERS);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [viewMode, setViewMode] =
    useState("table");

  /* Load Warehouses */

  const loadWarehouses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getWarehouses();

      const data =
        response?.data ||
        response ||
        [];

      setWarehouses(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load warehouses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  /* Filter Handlers */

  const handleFilterChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  /* Filtered Warehouses */

  const filteredWarehouses = useMemo(() => {
    const search =
      filters.search
        .trim()
        .toLowerCase();

    return warehouses.filter(
      (warehouse) => {
        const matchesSearch =
          !search ||
          warehouse.name
            ?.toLowerCase()
            .includes(search) ||
          warehouse.code
            ?.toLowerCase()
            .includes(search) ||
          warehouse.warehouseCode
            ?.toLowerCase()
            .includes(search) ||
          warehouse.city
            ?.toLowerCase()
            .includes(search) ||
          warehouse.address
            ?.toLowerCase()
            .includes(search);

        const normalizedStatus =
          String(
            warehouse.status || "ACTIVE"
          ).toUpperCase();

        const matchesStatus =
          filters.status === "ALL" ||
          normalizedStatus ===
            filters.status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    warehouses,
    filters,
  ]);

  /* Statistics */

  const stats = useMemo(() => {
    const active = warehouses.filter(
      (warehouse) =>
        String(
          warehouse.status || "ACTIVE"
        ).toUpperCase() === "ACTIVE"
    ).length;

    const inactive = warehouses.filter(
      (warehouse) =>
        String(
          warehouse.status
        ).toUpperCase() === "INACTIVE"
    ).length;

    const totalProducts =
      warehouses.reduce(
        (total, warehouse) =>
          total +
          Number(
            warehouse.productCount ||
              warehouse.totalProducts ||
              0
          ),
        0
      );

    const totalStock =
      warehouses.reduce(
        (total, warehouse) =>
          total +
          Number(
            warehouse.stockQuantity ||
              warehouse.totalStock ||
              0
          ),
        0
      );

    return {
      total: warehouses.length,
      active,
      inactive,
      totalProducts,
      totalStock,
    };
  }, [warehouses]);

  /* Delete Warehouse */

  const handleDelete = async (warehouse) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${warehouse.name}"?`
      );

    if (!confirmed) return;

    try {
      setDeletingId(warehouse.id);
      setError("");
      setSuccess("");

      await deleteWarehouse(
        warehouse.id
      );

      setWarehouses((previous) =>
        previous.filter(
          (item) =>
            item.id !== warehouse.id
        )
      );

      setSuccess(
        "Warehouse deleted successfully."
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to delete warehouse."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* Status Badge */

  const renderStatus = (status) => {
    const normalized =
      String(
        status || "ACTIVE"
      ).toUpperCase();

    const label =
      normalized === "ACTIVE"
        ? "Active"
        : "Inactive";

    return (
      <span
        className={`warehouse-status warehouse-status--${normalized.toLowerCase()}`}
      >
        <span className="warehouse-status__dot" />
        {label}
      </span>
    );
  };

  /* Loading */

  if (loading) {
    return (
      <div className="warehouses-page">
        <div className="warehouses-page__header">
          <div>
            <h1>Warehouses</h1>
            <p>
              Manage your storage locations
              and inventory facilities.
            </p>
          </div>
        </div>

        <div className="warehouse-loading">
          <div className="warehouse-loading__spinner" />
          <span>
            Loading warehouses...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="warehouses-page">
      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <header className="warehouses-page__header">
        <div>
          <div className="warehouses-page__breadcrumb">
            <Link to="/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <span>Warehouses</span>
          </div>

          <h1>Warehouses</h1>

          <p>
            Manage warehouses, storage
            locations, and inventory capacity.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            navigate(
              "/warehouses/add"
            )
          }
        >
          <span>+</span>
          Add Warehouse
        </button>
      </header>

      {/* ======================================
          ALERTS
      ======================================= */}

      {error && (
        <div
          className="page-alert page-alert--error"
          role="alert"
        >
          <strong>Error:</strong>{" "}
          {error}

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div
          className="page-alert page-alert--success"
          role="status"
        >
          {success}

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
          >
            ×
          </button>
        </div>
      )}

      {/* STATISTICS */}

      <section className="warehouse-stats">
        <div className="warehouse-stat-card">
          <div className="warehouse-stat-card__icon warehouse-stat-card__icon--blue">
            🏢
          </div>

          <div>
            <span>
              Total Warehouses
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>
        </div>

        <div className="warehouse-stat-card">
          <div className="warehouse-stat-card__icon warehouse-stat-card__icon--green">
            ✓
          </div>

          <div>
            <span>
              Active Warehouses
            </span>

            <strong>
              {stats.active}
            </strong>
          </div>
        </div>

        <div className="warehouse-stat-card">
          <div className="warehouse-stat-card__icon warehouse-stat-card__icon--orange">
            ⏸
          </div>

          <div>
            <span>
              Inactive Warehouses
            </span>

            <strong>
              {stats.inactive}
            </strong>
          </div>
        </div>

        <div className="warehouse-stat-card">
          <div className="warehouse-stat-card__icon warehouse-stat-card__icon--purple">
            📦
          </div>

          <div>
            <span>
              Total Products
            </span>

            <strong>
              {stats.totalProducts.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="warehouse-stat-card">
          <div className="warehouse-stat-card__icon warehouse-stat-card__icon--cyan">
            📊
          </div>

          <div>
            <span>
              Total Stock Units
            </span>

            <strong>
              {stats.totalStock.toLocaleString()}
            </strong>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}

      <section className="warehouse-toolbar">
        <div className="warehouse-filters">
          {/* Search */}

          <div className="warehouse-search">
            <span className="warehouse-search__icon">
              🔍
            </span>

            <input
              type="search"
              name="search"
              value={
                filters.search
              }
              onChange={
                handleFilterChange
              }
              placeholder="Search warehouses..."
            />
          </div>

          {/* Status */}

          <div className="warehouse-filter">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={
                filters.status
              }
              onChange={
                handleFilterChange
              }
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>
          </div>

          {(filters.search ||
            filters.status !==
              "ALL") && (
            <button
              type="button"
              className="btn btn-link"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* View Toggle */}

        <div className="warehouse-view-toggle">
          <button
            type="button"
            className={
              viewMode === "table"
                ? "active"
                : ""
            }
            onClick={() =>
              setViewMode("table")
            }
            aria-label="Table view"
          >
            ☷
          </button>

          <button
            type="button"
            className={
              viewMode === "card"
                ? "active"
                : ""
            }
            onClick={() =>
              setViewMode("card")
            }
            aria-label="Card view"
          >
            ▦
          </button>
        </div>
      </section>

      {/* RESULT COUNT */}

      <div className="warehouse-results-info">
        <span>
          Showing{" "}
          <strong>
            {filteredWarehouses.length}
          </strong>{" "}
          of{" "}
          <strong>
            {warehouses.length}
          </strong>{" "}
          warehouses
        </span>
      </div>

      {/* EMPTY STATE */}

      {filteredWarehouses.length ===
        0 && (
        <div className="warehouse-empty-state">
          <div className="warehouse-empty-state__icon">
            🏢
          </div>

          <h2>
            {warehouses.length ===
            0
              ? "No warehouses yet"
              : "No warehouses found"}
          </h2>

          <p>
            {warehouses.length ===
            0
              ? "Create your first warehouse to start managing inventory locations."
              : "Try changing your search or filter criteria."}
          </p>

          {warehouses.length ===
            0 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/warehouses/add"
                )
              }
            >
              Add Warehouse
            </button>
          )}

          {warehouses.length >
            0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* TABLE VIEW */}

      {filteredWarehouses.length >
        0 &&
        viewMode === "table" && (
          <div className="warehouse-table-wrapper">
            <table className="warehouse-table">
              <thead>
                <tr>
                  <th>
                    Warehouse
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Manager
                  </th>

                  <th>
                    Products
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredWarehouses.map(
                  (warehouse) => (
                    <tr
                      key={
                        warehouse.id
                      }
                    >
                      {/* Warehouse */}

                      <td>
                        <div className="warehouse-table__name">
                          <div className="warehouse-table__avatar">
                            {(
                              warehouse.name ||
                              "W"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <Link
                              to={`/warehouses/${warehouse.id}`}
                              className="warehouse-table__title"
                            >
                              {
                                warehouse.name
                              }
                            </Link>

                            <span>
                              {warehouse.code ||
                                warehouse.warehouseCode ||
                                `WH-${warehouse.id}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}

                      <td>
                        <div className="warehouse-location">
                          <strong>
                            {warehouse.city ||
                              "-"}
                          </strong>

                          <span>
                            {warehouse.state ||
                              warehouse.country ||
                              warehouse.address ||
                              "-"}
                          </span>
                        </div>
                      </td>

                      {/* Manager */}

                      <td>
                        {warehouse.manager?.name ||
                          warehouse.managerName ||
                          warehouse.manager ||
                          "-"}
                      </td>

                      {/* Products */}

                      <td>
                        <strong>
                          {Number(
                            warehouse.productCount ||
                              warehouse.totalProducts ||
                              0
                          ).toLocaleString()}
                        </strong>
                      </td>

                      {/* Stock */}

                      <td>
                        <strong>
                          {Number(
                            warehouse.stockQuantity ||
                              warehouse.totalStock ||
                              0
                          ).toLocaleString()}
                        </strong>
                      </td>

                      {/* Status */}

                      <td>
                        {renderStatus(
                          warehouse.status
                        )}
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="warehouse-actions">
                          <button
                            type="button"
                            title="View"
                            onClick={() =>
                              navigate(
                                `/warehouses/${warehouse.id}`
                              )
                            }
                          >
                            👁
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/warehouses/${warehouse.id}/edit`
                              )
                            }
                          >
                            ✏
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            className="warehouse-actions__delete"
                            disabled={
                              deletingId ===
                              warehouse.id
                            }
                            onClick={() =>
                              handleDelete(
                                warehouse
                              )
                            }
                          >
                            {deletingId ===
                            warehouse.id
                              ? "..."
                              : "🗑"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

      {/* CARD VIEW */}

      {filteredWarehouses.length >
        0 &&
        viewMode === "card" && (
          <div className="warehouse-card-grid">
            {filteredWarehouses.map(
              (warehouse) => (
                <article
                  className="warehouse-card"
                  key={warehouse.id}
                >
                  <div className="warehouse-card__header">
                    <div className="warehouse-card__avatar">
                      {(
                        warehouse.name ||
                        "W"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    {renderStatus(
                      warehouse.status
                    )}
                  </div>

                  <div className="warehouse-card__body">
                    <h3>
                      {
                        warehouse.name
                      }
                    </h3>

                    <span className="warehouse-card__code">
                      {warehouse.code ||
                        warehouse.warehouseCode ||
                        `WH-${warehouse.id}`}
                    </span>

                    <div className="warehouse-card__location">
                      <span>
                        📍
                      </span>

                      <div>
                        <strong>
                          {warehouse.city ||
                            "-"}
                        </strong>

                        <small>
                          {warehouse.state ||
                            warehouse.country ||
                            warehouse.address ||
                            "-"}
                        </small>
                      </div>
                    </div>

                    <div className="warehouse-card__stats">
                      <div>
                        <span>
                          Products
                        </span>

                        <strong>
                          {Number(
                            warehouse.productCount ||
                              warehouse.totalProducts ||
                              0
                          ).toLocaleString()}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Stock
                        </span>

                        <strong>
                          {Number(
                            warehouse.stockQuantity ||
                              warehouse.totalStock ||
                              0
                          ).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="warehouse-card__footer">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/warehouses/${warehouse.id}`
                        )
                      }
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/warehouses/${warehouse.id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="danger"
                      disabled={
                        deletingId ===
                        warehouse.id
                      }
                      onClick={() =>
                        handleDelete(
                          warehouse
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
    </div>
  );
};

export default Warehouses;