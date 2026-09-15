/* ********************************************************** */
/* File: src/features/dashboard/components/InventoryChart.jsx */
/* ********************************************************** */

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const InventoryChart = ({ data = [], loading = false }) => {
  const COLORS = {
    "In Stock": "#22c55e",
    "Low Stock": "#f59e0b",
    "Out of Stock": "#ef4444",
  };

  const DEFAULT_DATA = [
    {
      name: "In Stock",
      value: 0,
    },
    {
      name: "Low Stock",
      value: 0,
    },
    {
      name: "Out of Stock",
      value: 0,
    },
  ];

  const normalizeData = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return DEFAULT_DATA;
    }

    return data.map((item) => {
      let name = item.name || item.label || item.status || "";

      const normalizedName = name
        .toLowerCase()
        .replace(/[-_]/g, " ")
        .trim();

      if (
        normalizedName === "in stock" ||
        normalizedName === "available"
      ) {
        name = "In Stock";
      } else if (
        normalizedName === "low stock" ||
        normalizedName === "low"
      ) {
        name = "Low Stock";
      } else if (
        normalizedName === "out of stock" ||
        normalizedName === "out of-stock" ||
        normalizedName === "out"
      ) {
        name = "Out of Stock";
      }

      return {
        name,
        value: Number(
          item.value ??
            item.count ??
            item.quantity ??
            0
        ),
      };
    });
  };

  const chartData = normalizeData();

  const total = chartData.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(
      Number(value) || 0
    );
  };

  const formatPercentage = (value) => {
    if (!total) return "0%";

    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const getColor = (name) => {
    return COLORS[name] || "#64748b";
  };

  if (loading) {
    return (
      <section className="chart-card inventory-chart">
        <div className="chart-card__header">
          <div>
            <h2>Inventory Overview</h2>
            <p>Current inventory status</p>
          </div>
        </div>

        <div className="chart-loading">
          <div className="dashboard-spinner" />
          <span>Loading inventory data...</span>
        </div>
      </section>
    );
  }

  if (!chartData.length || total === 0) {
    return (
      <section className="chart-card inventory-chart">
        <div className="chart-card__header">
          <div>
            <h2>Inventory Overview</h2>
            <p>Current inventory status</p>
          </div>
        </div>

        <div className="chart-empty">
          <p>No inventory data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chart-card inventory-chart">
      <div className="chart-card__header">
        <div>
          <h2>Inventory Overview</h2>
          <p>Current inventory status</p>
        </div>
      </div>

      <div className="inventory-chart__content">
        <div className="inventory-chart__visual">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={getColor(entry.name)}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${formatNumber(value)} products`,
                  name,
                ]}
                contentStyle={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  fontSize: 13,
                  color: "#4b5563",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="inventory-chart__center">
            <span>Total</span>
            <strong>{formatNumber(total)}</strong>
            <small>Products</small>
          </div>
        </div>

        <div className="inventory-chart__summary">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="inventory-status"
            >
              <div className="inventory-status__label">
                <span
                  className="inventory-status__dot"
                  style={{
                    backgroundColor: getColor(item.name),
                  }}
                />

                <span>{item.name}</span>
              </div>

              <div className="inventory-status__value">
                <strong>
                  {formatNumber(item.value)}
                </strong>

                <span>
                  {formatPercentage(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InventoryChart;
