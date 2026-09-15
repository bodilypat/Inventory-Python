/* ***************************************************** */
/* File: src/features/reports/components/ReportTable.jsx */
/* ***************************************************** */

import React from "react";

const ReportTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No report data found.",
}) => {
  if (loading) {
    return (
      <div className="report-table-wrapper">
        <table className="report-table">
          <tbody>
            {[1, 2, 3, 4, 5].map(
              (row) => (
                <tr key={row}>
                  {columns.map(
                    (_, column) => (
                      <td
                        key={column}
                      >
                        <div className="table-skeleton" />
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="report-empty-state">
        <div>📊</div>

        <h3>
          No data available
        </h3>

        <p>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="report-table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            {columns.map(
              (column) => (
                <th
                  key={
                    column.key
                  }
                >
                  {column.label}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {data.map(
            (row, index) => (
              <tr
                key={
                  row.id ||
                  row._id ||
                  index
                }
              >
                {columns.map(
                  (column) => (
                    <td
                      key={
                        column.key
                      }
                    >
                      {column.render
                        ? column.render(
                            row
                          )
                        : row[
                            column.key
                          ] ?? "—"}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
