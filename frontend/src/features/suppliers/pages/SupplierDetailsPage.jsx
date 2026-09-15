/* ********************************************************** */
/* File: src/features/suppliers/pages/SupplierDetailsPage.jsx */
/* ********************************************************** */

import React, { useEffect, useState } from "react";

import SupplierSummaryCard from "../components/SupplierSummaryCard";
import SupplierChart from "../components/SupplierChart";
import SupplierReportTable from "../components/SupplierReportTable";
import SupplierFilter from "../components/SupplierFilter";

import "./../styles/suppliers.css";

const SupplierReport = () => {
    const [report, setReport] = useState(null);
    const [supplierFilter, setSupplierFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("month");
    const [loading, setLoading] = useState(true);

    const handleReset = () => {
        setSupplierFilter("");
        setDateFilter("month");
    };

    useEffect(() => {
        const fetchSupplierReport = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `/api/supplier-report?supplier=${encodeURIComponent(
                        supplierFilter
                    )}&dateFilter=${encodeURIComponent(dateFilter)}`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        `Failed to load supplier report (${response.status})`
                    );
                }

                setReport(data);
            } catch (error) {
                console.error("Error loading supplier report:", error);
                setReport(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplierReport();
    }, [supplierFilter, dateFilter]);

    const summary = report?.summary ?? {
        totalSuppliers: 0,
        activeSuppliers: 0,
        totalPurchases: 0,
        totalAmount: 0,
    };

    const chartData = report?.chartData ?? [];
    const supplierRows = report?.suppliers ?? [];

    if (loading) {
        return (
            <div className="suppliers-page">
                <p>Loading supplier report...</p>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="suppliers-page">
                <div className="page-header">
                    <div>
                        <h1>Supplier Reports</h1>
                        <p>
                            Analyze supplier performance,
                            purchasing activity and
                            spending trends.
                        </p>
                    </div>
                </div>

                <div className="page-toolbar">
                    <SupplierFilter
                        supplier={supplierFilter}
                        dateFilter={dateFilter}
                        suppliers={[
                            "ABC Suppliers",
                            "Global Traders",
                            "Tech Wholesale",
                        ]}
                        onSupplierChange={setSupplierFilter}
                        onDateChange={setDateFilter}
                        onReset={handleReset}
                        hideStatus
                    />
                </div>

                <div className="empty-state">
                    Unable to load supplier report data.
                </div>
            </div>
        );
    }

    return (
        <div className="suppliers-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1>Supplier Reports</h1>
                    <p>
                        Analyze supplier performance,
                        purchasing activity and
                        spending trends.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="page-toolbar">
                <SupplierFilter
                    supplier={supplierFilter}
                    dateFilter={dateFilter}
                    suppliers={[
                        "ABC Suppliers",
                        "Global Traders",
                        "Tech Wholesale",
                    ]}
                    onSupplierChange={setSupplierFilter}
                    onDateChange={setDateFilter}
                    onReset={handleReset}
                    hideStatus
                />
            </div>

            {/* Summary Cards */}
            <div className="summary-grid">
                <SupplierSummaryCard
                    title="Total Suppliers"
                    value={summary.totalSuppliers}
                    type="suppliers"
                />
                <SupplierSummaryCard
                    title="Active Suppliers"
                    value={summary.activeSuppliers}
                    type="active"
                />
                <SupplierSummaryCard
                    title="Purchase Orders"
                    value={summary.totalPurchases}
                    type="orders"
                />
                <SupplierSummaryCard
                    title="Purchase Amount"
                    value={`$${Number(summary.totalAmount || 0).toLocaleString()}`}
                    type="amount"
                />
            </div>

            {/* Chart */}
            <div className="chart-section">
                <SupplierChart
                    title="Monthly Supplier Purchases"
                    data={chartData}
                    dataKey="purchases"
                    xAxisKey="month"
                />
            </div>

            {/* Supplier Performance Table */}
            <div className="table-section">
                <SupplierReportTable suppliers={supplierRows} />
            </div>
        </div>
    );
};

export default SupplierReport;