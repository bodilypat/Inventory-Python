/* **************************************************** */
/* File: src/features/reports/pages/InventoryReport.jsx */
/* **************************************************** */
import React from "react";

import ReportHeader from "../components/ReportHeader";
import ReportFilters from "../components/ReportFilters";
import ReportSummary from "../components/ReportSummary";
import InventoryReportComponent from "../components/InventoryReport";
import InventoryChart from "../components/InventoryChart";

import { useReports } from "../hooks/useReports";

const InventoryReport = () => {
  const {
    report,
    summary,
    loading,
    error,
    filters,
    setFilters,
    generateReport,
    exportReport,
  } = useReports("inventory");

  return (
    <div className="report-page">
      <ReportHeader
        reportType="inventory"
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
        reportType="inventory"
      />

      <InventoryChart
        data={report?.chart || []}
        loading={loading}
      />

      <InventoryReportComponent
        data={report?.data || []}
        loading={loading}
      />
    </div>
  );
};

export default InventoryReport;
