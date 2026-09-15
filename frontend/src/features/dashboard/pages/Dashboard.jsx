/* ************************************************ */
/* File: src/features/dashboard/pages/Dashboard.jsx */
/* ************************************************ */

import React from "react";

import StatsCards from "../components/StatsCards";
import SalesChart from "../components/SalesChart";
import PurchaseChart from "../components/PurchaseChart";
import InventoryChart from "../components/InventoryChart";
import LowStockProducts from "../components/LowStockProducts";
import RecentSales from "../components/RecentSales";
import RecentPurchases from "../components/RecentPurchases";
import RecentStockMovements from "../components/RecentStockMovements";
import TopSellingProducts from "../components/TopSellingProducts";
import DashboardFilters from "../components/DashboardFilters";

import useDashboard from "../hooks/useDashboard";

import "../styles/dashboard.css";

const Dashboard = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useDashboard();

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-loading">
          <div className="dashboard-spinner" />
          <p>Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-error">
          <h2>Unable to load dashboard</h2>
          <p>
            Something went wrong while loading the dashboard data.
          </p>

          <button
            type="button"
            className="dashboard-retry-button"
            onClick={refetch}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            Overview of your inventory, sales, purchases and stock.
          </p>
        </div>

        <DashboardFilters />
      </header>

      {/* Statistics */}
      <section className="dashboard-section">
        <StatsCards data={data?.summary} />
      </section>

      {/* Charts */}
      <section className="dashboard-grid dashboard-grid--charts">
        <div className="dashboard-card dashboard-card--large">
          <SalesChart data={data?.sales} />
        </div>

        <div className="dashboard-card">
          <PurchaseChart data={data?.purchases} />
        </div>
      </section>

      {/* Inventory */}
      <section className="dashboard-grid dashboard-grid--inventory">
        <div className="dashboard-card">
          <InventoryChart data={data?.inventory} />
        </div>

        <div className="dashboard-card">
          <LowStockProducts
            products={data?.lowStockProducts}
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="dashboard-grid dashboard-grid--activity">
        <div className="dashboard-card">
          <RecentSales
            sales={data?.recentSales}
          />
        </div>

        <div className="dashboard-card">
          <RecentPurchases
            purchases={data?.recentPurchases}
          />
        </div>
      </section>

      {/* Stock Movements */}
      <section className="dashboard-section">
        <div className="dashboard-card">
          <RecentStockMovements
            movements={data?.recentStockMovements}
          />
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="dashboard-section">
        <div className="dashboard-card">
          <TopSellingProducts
            products={data?.topSellingProducts}
          />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
