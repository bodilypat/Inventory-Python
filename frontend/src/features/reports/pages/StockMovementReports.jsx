/* ********************************************************* */
/* File: src/features/reports/pages/StockMovementReports.jsx */
/* ********************************************************* */

import React from "react";

import ReportHeader from "../components/ReportHeader";
import ReportFilters from "../components/ReportFilters";
import ReportSummary from "../components/ReportSummary";
import StockMovementReport from "../components/StockMovementReport";

import { useReports } from "../hooks/useReports";

const StockMovementReports = () => {
  const {
    report,
    summary,
    loading,
    error,
    filters,
    setFilters,
    generateReport,
    exportReport,
  } = useReports("stock-movements");

  return (
    <div className="report-page">
      <ReportHeader
        reportType="stock-movements"
        onExport={exportReport}
        loading={loading}
      />

      <ReportFilters
        filters={filters}
        setFilters={setFilters}
        onGenerate={generateReport}
        loading={loading}
      />

      {error && (
        <div className="report-alert report-alert--error">
          {error}
        </div>
      )}

      <ReportSummary
        summary={summary}
        loading={loading}
        reportType="stock-movements"
      />

      <StockMovementReport
        data={report?.data || []}
        loading={loading}
      />
    </div>
  );
};

export default StockMovementReports;
