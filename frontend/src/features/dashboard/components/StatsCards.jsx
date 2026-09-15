/* ******************************************************* */
/* File: src/features/dashboard/components/StatsCards.jsx  */
/* ******************************************************* */

import React from "react";
import {
  Package,
  Boxes,
  ShoppingCart,
  Truck,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const StatsCards = ({ data = {} }) => {
  const {
    totalProducts = 0,
    totalStock = 0,
    totalSales = 0,
    totalPurchases = 0,
    lowStockCount = 0,
    outOfStockCount = 0,
    salesChange = 0,
    purchasesChange = 0,
  } = data;

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value || 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  const formatPercentage = (value) => {
    const number = Number(value) || 0;

    return `${number > 0 ? "+" : ""}${number.toFixed(1)}%`;
  };

  const getChangeClass = (value) => {
    const number = Number(value) || 0;

    if (number > 0) return "stat-change stat-change--positive";
    if (number < 0) return "stat-change stat-change--negative";

    return "stat-change stat-change--neutral";
  };

  const getChangeIcon = (value) => {
    const number = Number(value) || 0;

    if (number > 0) {
      return <TrendingUp size={15} />;
    }

    if (number < 0) {
      return <TrendingDown size={15} />;
    }

    return null;
  };

  const stats = [
    {
      id: "products",
      title: "Total Products",
      value: formatNumber(totalProducts),
      icon: Package,
      color: "blue",
      description: "Products in catalog",
    },
    {
      id: "stock",
      title: "Total Stock",
      value: formatNumber(totalStock),
      icon: Boxes,
      color: "purple",
      description: "Units currently available",
    },
    {
      id: "sales",
      title: "Total Sales",
      value: formatCurrency(totalSales),
      icon: ShoppingCart,
      color: "green",
      description: "Total sales revenue",
      change: salesChange,
    },
    {
      id: "purchases",
      title: "Total Purchases",
      value: formatCurrency(totalPurchases),
      icon: Truck,
      color: "orange",
      description: "Total purchase value",
      change: purchasesChange,
    },
    {
      id: "low-stock",
      title: "Low Stock",
      value: formatNumber(lowStockCount),
      icon: AlertTriangle,
      color: "yellow",
      description: "Products need attention",
    },
    {
      id: "out-of-stock",
      title: "Out of Stock",
      value: formatNumber(outOfStockCount),
      icon: XCircle,
      color: "red",
      description: "Products unavailable",
    },
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.id}
            className={`stat-card stat-card--${stat.color}`}
          >
            <div className="stat-card__top">
              <div className="stat-card__icon">
                <Icon size={22} strokeWidth={2} />
              </div>

              {stat.change !== undefined && (
                <div className={getChangeClass(stat.change)}>
                  {getChangeIcon(stat.change)}
                  <span>{formatPercentage(stat.change)}</span>
                </div>
              )}
            </div>

            <div className="stat-card__content">
              <p className="stat-card__title">
                {stat.title}
              </p>

              <h2 className="stat-card__value">
                {stat.value}
              </h2>

              <p className="stat-card__description">
                {stat.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default StatsCards;
