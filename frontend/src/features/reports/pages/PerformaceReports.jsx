/* ******************************************************* */
/* File: src/features/reports/pages/PerformanceReports.jsx */
/* ******************************************************* */

import React from "react";

import ReportHeader from "../components/ReportHeader";
import ReportFilters from "../components/ReportFilters";
import ReportSummary from "../components/ReportSummary";
import SalesChart from "../components/SalesChart";
import PurchaseChart from "../components/PurchaseChart";

import { useReports } from "../hooks/useReports";

const PerformanceReports = () => {
  const {
    report,
    summary,
    loading,
    error,
    filters,
    setFilters,
    generateReport,
    exportReport,
  } = useReports("performance");

  return (
    <div className="report-page">
      <ReportHeader
        reportType="performance"
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
        reportType="performance"
      />

      <div className="report-chart-grid">
        <SalesChart
          data={report?.sales || []}
          loading={loading}
        />

        <PurchaseChart
          data={report?.purchases || []}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PerformanceReports;
