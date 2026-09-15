/* ******************************************** */
/* File: src/features/reports/pages/Reports.jsx */ 
/* ******************************************** */

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ReportFilters from "../components/ReportFilters";
import ReportHeader from "../components/ReportHeader";
import ReportSummary from "../components/ReportSummary";

import InventoryReport from "../components/InventoryReport";
import SalesReport from "../components/SalesReport";
import PurchaseReport from "../components/PurchaseReport";
import StockMovementReport from "../components/StockMovementReport";

import SalesChart from "../components/SalesChart";
import PurchaseChart from "../components/PurchaseChart";
import InventoryChart from "../components/InventoryChart";

import { useReports } from "../hooks/useReports";

const REPORT_TYPES = {
  INVENTORY: "inventory",
  SALES: "sales",
  PURCHASES: "purchases",
  STOCK_MOVEMENTS: "stock-movements",
};

const Reports = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialType =
    searchParams.get("type") ||
    REPORT_TYPES.INVENTORY;

  const [reportType, setReportType] =
    useState(initialType);

  const {
    report,
    summary,
    loading,
    error,
    filters,
    setFilters,
    generateReport,
    exportReport,
  } = useReports(reportType);

  useEffect(() => {
    setReportType(
      searchParams.get("type") ||
        REPORT_TYPES.INVENTORY
    );
  }, [searchParams]);

  const handleReportChange = (type) => {
    setReportType(type);

    setSearchParams({
      type,
    });
  };

  const handleGenerate = async () => {
    await generateReport();
  };

  const handleExport = async (
    format = "csv"
  ) => {
    await exportReport(format);
  };

  const renderReport = () => {
    switch (reportType) {
      case REPORT_TYPES.SALES:
        return (
          <>
            <div className="report-chart-grid">
              <SalesChart
                data={
                  report?.chart || []
                }
                loading={loading}
              />
            </div>

            <SalesReport
              data={
                report?.data || []
              }
              loading={loading}
            />
          </>
        );

      case REPORT_TYPES.PURCHASES:
        return (
          <>
            <div className="report-chart-grid">
              <PurchaseChart
                data={
                  report?.chart || []
                }
                loading={loading}
              />
            </div>

            <PurchaseReport
              data={
                report?.data || []
              }
              loading={loading}
            />
          </>
        );

      case REPORT_TYPES.STOCK_MOVEMENTS:
        return (
          <StockMovementReport
            data={
              report?.data || []
            }
            loading={loading}
          />
        );

      case REPORT_TYPES.INVENTORY:
      default:
        return (
          <>
            <div className="report-chart-grid">
              <InventoryChart
                data={
                  report?.chart || []
                }
                loading={loading}
              />
            </div>

            <InventoryReport
              data={
                report?.data || []
              }
              loading={loading}
            />
          </>
        );
    }
  };

  return (
    <div className="reports-page">
      {/* =====================================
          HEADER
      ====================================== */}

      <ReportHeader
        reportType={reportType}
        onExport={handleExport}
        loading={loading}
      />

      {/* =====================================
          BREADCRUMB
      ====================================== */}

      <div className="reports-breadcrumb">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <span>/</span>

        <span>Reports & Analytics</span>
      </div>

      {/* =====================================
          REPORT NAVIGATION
      ====================================== */}

      <nav className="report-tabs">
        <button
          type="button"
          className={
            reportType ===
            REPORT_TYPES.INVENTORY
              ? "active"
              : ""
          }
          onClick={() =>
            handleReportChange(
              REPORT_TYPES.INVENTORY
            )
          }
        >
          📦 Inventory
        </button>

        <button
          type="button"
          className={
            reportType ===
            REPORT_TYPES.SALES
              ? "active"
              : ""
          }
          onClick={() =>
            handleReportChange(
              REPORT_TYPES.SALES
            )
          }
        >
          💰 Sales
        </button>

        <button
          type="button"
          className={
            reportType ===
            REPORT_TYPES.PURCHASES
              ? "active"
              : ""
          }
          onClick={() =>
            handleReportChange(
              REPORT_TYPES.PURCHASES
            )
          }
        >
          🛒 Purchases
        </button>

        <button
          type="button"
          className={
            reportType ===
            REPORT_TYPES.STOCK_MOVEMENTS
              ? "active"
              : ""
          }
          onClick={() =>
            handleReportChange(
              REPORT_TYPES.STOCK_MOVEMENTS
            )
          }
        >
          🔄 Stock Movements
        </button>
      </nav>

      {/* =====================================
          FILTERS
      ====================================== */}

      <section className="report-card">
        <ReportFilters
          filters={filters}
          setFilters={setFilters}
          onGenerate={handleGenerate}
          loading={loading}
        />
      </section>

      {/* =====================================
          ERROR
      ====================================== */}

      {error && (
        <div
          className="report-alert report-alert--error"
          role="alert"
        >
          <span>⚠</span>

          <div>
            <strong>
              Failed to generate report
            </strong>

            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
          >
            Retry
          </button>
        </div>
      )}

      {/* =====================================
          SUMMARY
      ====================================== */}

      <section className="report-section">
        <ReportSummary
          summary={summary}
          loading={loading}
          reportType={reportType}
        />
      </section>

      {/* =====================================
          REPORT CONTENT
      ====================================== */}

      <section className="report-section">
        {renderReport()}
      </section>
    </div>
  );
};

export default Reports;
