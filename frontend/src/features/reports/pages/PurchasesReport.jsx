/* **************************************************** */
/* File: src/features/reports/pages/PurchasesReport.jsx */
/* **************************************************** */
import React from "react";

import ReportTable from "./ReportTable";

const PurchaseReport = ({
  data,
  loading,
}) => {
  const columns = [
    {
      key: "date",
      label: "Date",
      render: (row) =>
        row.date
          ? new Date(
              row.date
            ).toLocaleDateString()
          : "—",
    },
    {
      key: "purchaseOrder",
      label: "Purchase Order",
      render: (row) =>
        row.purchaseOrderNumber ||
        row.poNumber ||
        "—",
    },
    {
      key: "supplier",
      label: "Supplier",
      render: (row) =>
        row.supplier?.name ||
        row.supplierName ||
        "—",
    },
    {
      key: "items",
      label: "Items",
      render: (row) =>
        Number(
          row.items ||
            row.itemCount ||
            0
        ).toLocaleString(),
    },
    {
      key: "amount",
      label: "Amount",
      render: (row) =>
        `$${Number(
          row.amount ||
            row.total ||
            0
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
              "COMPLETED"
          ).toLowerCase()}`}
        >
          {row.status ||
            "COMPLETED"}
        </span>
      ),
    },
  ];

  return (
    <div className="report-card">
      <div className="report-card__header">
        <div>
          <h2>
            Purchase Details
          </h2>

          <p>
            Purchase transactions for
            the selected period.
          </p>
        </div>
      </div>

      <ReportTable
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage="No purchases were found for the selected filters."
      />
    </div>
  );
};

export default PurchaseReport;
