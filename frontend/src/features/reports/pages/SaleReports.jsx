/* ************************************************ */
/* File: src/features/reports/pages/SaleReports.jsx */ 
/* ************************************************ */
import React from "react";

import ReportHeader from "../components/ReportHeader";
import ReportFilters from "../components/ReportFilters";
import ReportSummary from "../components/ReportSummary";
import SalesReport from "../components/SalesReport";
import SalesChart from "../components/SalesChart";

import { useReports } from "../hooks/useReports";

const SaleReports = () => {
  const {
    report,
    summary,
    loading,
    error,
    filters,
    setFilters,
    generateReport,
    exportReport,
  } = useReports("sales");

  return (
    <div className="report-page">
      <ReportHeader
        reportType="sales"
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
        reportType="sales"
      />

      <SalesChart
        data={report?.chart || []}
        loading={loading}
      />

      <SalesReport
        data={report?.data || []}
        loading={loading}
      />
    </div>
  );
};

export default SaleReports;
