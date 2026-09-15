/* ********************************************************* */
/* File: src/features/reports/components/InventoryReport.jsx */
/* ********************************************************* */

import React from "react";

import ReportTable from "./ReportTable";

const InventoryReport = ({
  data,
  loading,
}) => {
  const columns = [
    {
      key: "product",
      label: "Product",
      render: (row) =>
        row.product?.name ||
        row.productName ||
        "—",
    },
    {
      key: "sku",
      label: "SKU",
      render: (row) =>
        row.sku ||
        row.product?.sku ||
        "—",
    },
    {
      key: "warehouse",
      label: "Warehouse",
      render: (row) =>
        row.warehouse?.name ||
        row.warehouseName ||
        "—",
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (row) =>
        Number(
          row.quantity || 0
        ).toLocaleString(),
    },
    {
      key: "minimumStock",
      label: "Min. Stock",
      render: (row) =>
        Number(
          row.minimumStock || 0
        ).toLocaleString(),
    },
    {
      key: "value",
      label: "Value",
      render: (row) =>
        `$${Number(
          row.value || 0
        ).toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
          }
        )}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`report-status report-status--${String(
            row.status ||
              "IN_STOCK"
          ).toLowerCase()}`}
        >
          {row.status ||
            "IN STOCK"}
        </span>
      ),
    },
  ];

  return (
    <div className="report-card">
      <div className="report-card__header">
        <div>
          <h2>
            Inventory Details
          </h2>

          <p>
            Current inventory by
            product and warehouse.
          </p>
        </div>
      </div>

      <ReportTable
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage="There is no inventory data for the selected filters."
      />
    </div>
  );
};

export default InventoryReport;
