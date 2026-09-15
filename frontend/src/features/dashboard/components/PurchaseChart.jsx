/* ********************************************************* */
/* File: src/features/dashboard/components/PurchaseChart.jsx */
/* ********************************************************* */

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PurchaseChart = ({ data = [], loading = false }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const chartData = data.map((item) => ({
    ...item,
    name: item.date
      ? formatDate(item.date)
      : item.name || item.label || "",
    purchases: Number(
      item.purchases ??
        item.purchase ??
        item.amount ??
        item.total ??
        0
    ),
  }));

  if (loading) {
    return (
      <section className="chart-card">
        <div className="chart-card__header">
          <div>
            <h2>Purchase Overview</h2>
            <p>Purchase performance over time</p>
          </div>
        </div>

        <div className="chart-loading">
          <div className="dashboard-spinner" />
          <span>Loading purchase data...</span>
        </div>
      </section>
    );
  }

  if (!chartData.length) {
    return (
      <section className="chart-card">
        <div className="chart-card__header">
          <div>
            <h2>Purchase Overview</h2>
            <p>Purchase performance over time</p>
          </div>
        </div>

        <div className="chart-empty">
          <p>No purchase data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chart-card">
      <div className="chart-card__header">
        <div>
          <h2>Purchase Overview</h2>
          <p>Purchase performance over time</p>
        </div>
      </div>

      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="purchaseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#f59e0b"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="#f59e0b"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: 12,
              }}
              tickMargin={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                `$${Number(value).toLocaleString()}`
              }
              width={75}
            />

            <Tooltip
              cursor={{
                stroke: "#94a3b8",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
              formatter={(value) => [
                formatCurrency(value),
                "Purchases",
              ]}
              labelStyle={{
                color: "#111827",
                fontWeight: 600,
                marginBottom: 4,
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              iconType="circle"
              wrapperStyle={{
                fontSize: 13,
                color: "#4b5563",
              }}
            />

            <Area
              type="monotone"
              dataKey="purchases"
              name="Purchases"
              stroke="#f59e0b"
              strokeWidth={2.5}
              fill="url(#purchaseGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#f59e0b",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PurchaseChart;
