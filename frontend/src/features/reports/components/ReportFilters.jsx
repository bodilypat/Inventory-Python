/* ******************************************************* */
/* File: src/features/reports/components/ReportFilters.jsx */
/* ******************************************************* */

import React from "react";

const ReportFilters = ({
  filters,
  setFilters,
  onGenerate,
  loading,
}) => {
  const updateFilter = (
    name,
    value
  ) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const setDateRange = (range) => {
    const today =
      new Date();

    const start =
      new Date();

    if (range === "7") {
      start.setDate(
        today.getDate() - 7
      );
    }

    if (range === "30") {
      start.setDate(
        today.getDate() - 30
      );
    }

    if (range === "90") {
      start.setDate(
        today.getDate() - 90
      );
    }

    const formatDate = (
      date
    ) => {
      return date
        .toISOString()
        .split("T")[0];
    };

    setFilters((current) => ({
      ...current,
      startDate:
        formatDate(start),
      endDate:
        formatDate(today),
    }));
  };

  return (
    <div className="report-filters">
      <div className="report-filter">
        <label htmlFor="startDate">
          From
        </label>

        <input
          id="startDate"
          type="date"
          value={
            filters.startDate || ""
          }
          onChange={(event) =>
            updateFilter(
              "startDate",
              event.target.value
            )
          }
        />
      </div>

      <div className="report-filter">
        <label htmlFor="endDate">
          To
        </label>

        <input
          id="endDate"
          type="date"
          value={
            filters.endDate || ""
          }
          onChange={(event) =>
            updateFilter(
              "endDate",
              event.target.value
            )
          }
        />
      </div>

      <div className="report-filter">
        <label htmlFor="warehouse">
          Warehouse
        </label>

        <select
          id="warehouse"
          value={
            filters.warehouseId || ""
          }
          onChange={(event) =>
            updateFilter(
              "warehouseId",
              event.target.value
            )
          }
        >
          <option value="">
            All Warehouses
          </option>

          {filters.warehouses?.map(
            (warehouse) => (
              <option
                key={warehouse.id}
                value={warehouse.id}
              >
                {warehouse.name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="report-filter">
        <label htmlFor="category">
          Category
        </label>

        <select
          id="category"
          value={
            filters.categoryId || ""
          }
          onChange={(event) =>
            updateFilter(
              "categoryId",
              event.target.value
            )
          }
        >
          <option value="">
            All Categories
          </option>

          {filters.categories?.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="report-filter">
        <label htmlFor="status">
          Status
        </label>

        <select
          id="status"
          value={
            filters.status || ""
          }
          onChange={(event) =>
            updateFilter(
              "status",
              event.target.value
            )
          }
        >
          <option value="">
            All Statuses
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </select>
      </div>

      <div className="report-date-presets">
        <button
          type="button"
          onClick={() =>
            setDateRange("7")
          }
        >
          7 Days
        </button>

        <button
          type="button"
          onClick={() =>
            setDateRange("30")
          }
        >
          30 Days
        </button>

        <button
          type="button"
          onClick={() =>
            setDateRange("90")
          }
        >
          90 Days
        </button>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onGenerate}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Report"}
      </button>
    </div>
  );
};

export default ReportFilters;
