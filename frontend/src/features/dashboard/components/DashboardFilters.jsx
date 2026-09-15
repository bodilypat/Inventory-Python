/* ************************************************************ */
/* File: src/features/dashboard/components/DashboardFilters.jsx */
/* ************************************************************ */

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  RotateCcw,
  Filter,
  ChevronDown,
} from "lucide-react";

const DEFAULT_FILTERS = {
  period: "30d",
  warehouseId: "all",
  startDate: "",
  endDate: "",
};

const PERIOD_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "thisYear", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

const DashboardFilters = ({
  filters = DEFAULT_FILTERS,
  warehouses = [],
  loading = false,
  onChange,
  onReset,
}) => {
  const [localFilters, setLocalFilters] = useState({
    ...DEFAULT_FILTERS,
    ...filters,
  });

  useEffect(() => {
    setLocalFilters({
      ...DEFAULT_FILTERS,
      ...filters,
    });
  }, [filters]);

  const updateFilter = (name, value) => {
    const updatedFilters = {
      ...localFilters,
      [name]: value,
    };

    if (name === "period" && value !== "custom") {
      updatedFilters.startDate = "";
      updatedFilters.endDate = "";
    }

    setLocalFilters(updatedFilters);
    onChange?.(updatedFilters);
  };

  const handleReset = () => {
    setLocalFilters(DEFAULT_FILTERS);
    onReset?.(DEFAULT_FILTERS);
  };

  const handleStartDateChange = (event) => {
    updateFilter("startDate", event.target.value);
  };

  const handleEndDateChange = (event) => {
    updateFilter("endDate", event.target.value);
  };

  return (
    <section className="dashboard-filters">
      <div className="dashboard-filters__left">
        <div className="dashboard-filters__heading">
          <div className="dashboard-filters__icon">
            <Filter size={18} />
          </div>

          <div>
            <h2>Dashboard Filters</h2>
            <p>Filter dashboard data</p>
          </div>
        </div>

        <div className="dashboard-filters__controls">
          <div className="dashboard-filter">
            <label htmlFor="dashboard-period">
              Period
            </label>

            <div className="dashboard-filter__select">
              <CalendarDays size={16} />

              <select
                id="dashboard-period"
                value={localFilters.period}
                onChange={(event) =>
                  updateFilter(
                    "period",
                    event.target.value
                  )
                }
                disabled={loading}
              >
                {PERIOD_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          <div className="dashboard-filter">
            <label htmlFor="dashboard-warehouse">
              Warehouse
            </label>

            <div className="dashboard-filter__select">
              <select
                id="dashboard-warehouse"
                value={localFilters.warehouseId}
                onChange={(event) =>
                  updateFilter(
                    "warehouseId",
                    event.target.value
                  )
                }
                disabled={loading}
              >
                <option value="all">
                  All Warehouses
                </option>

                {warehouses.map((warehouse) => (
                  <option
                    key={
                      warehouse.id ||
                      warehouse._id
                    }
                    value={
                      warehouse.id ||
                      warehouse._id
                    }
                  >
                    {warehouse.name ||
                      warehouse.warehouseName ||
                      "Unnamed Warehouse"}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-filters__right">
        {localFilters.period === "custom" && (
          <div className="dashboard-custom-date">
            <div className="dashboard-filter">
              <label htmlFor="dashboard-start-date">
                From
              </label>

              <input
                id="dashboard-start-date"
                type="date"
                value={localFilters.startDate}
                max={localFilters.endDate || undefined}
                onChange={handleStartDateChange}
                disabled={loading}
              />
            </div>

            <div className="dashboard-filter">
              <label htmlFor="dashboard-end-date">
                To
              </label>

              <input
                id="dashboard-end-date"
                type="date"
                min={localFilters.startDate || undefined}
                value={localFilters.endDate}
                onChange={handleEndDateChange}
                disabled={loading}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          className="dashboard-filters__reset"
          onClick={handleReset}
          disabled={loading}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </section>
  );
};

export default DashboardFilters;
