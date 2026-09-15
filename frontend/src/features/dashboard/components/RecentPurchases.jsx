/* *********************************************************** */
/* File: src/features/dashboard/components/RecentPurchases.jsx */
/* *********************************************************** */

import React from "react";
import {
  ShoppingBag,
  ArrowRight,
  Package,
} from "lucide-react";

const RecentPurchases = ({
  purchases = [],
  loading = false,
  onViewAll,
  onPurchaseClick,
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getStatusClass = (status) => {
    const normalizedStatus = String(status || "")
      .toLowerCase()
      .replace(/[-_]/g, " ");

    switch (normalizedStatus) {
      case "completed":
      case "received":
      case "paid":
        return "success";

      case "pending":
      case "processing":
      case "ordered":
        return "warning";

      case "cancelled":
      case "canceled":
      case "rejected":
        return "danger";

      case "partial":
      case "partially received":
      case "partially paid":
        return "info";

      default:
        return "neutral";
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return "Unknown";

    return String(status)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  if (loading) {
    return (
      <section className="recent-purchases-card">
        <div className="recent-purchases-card__header">
          <div className="recent-purchases-card__title">
            <div className="recent-purchases-card__icon">
              <ShoppingBag size={20} />
            </div>

            <div>
              <h2>Recent Purchases</h2>
              <p>Latest purchase orders</p>
            </div>
          </div>
        </div>

        <div className="recent-purchases-loading">
          <div className="dashboard-spinner" />
          <span>Loading purchases...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="recent-purchases-card">
      <div className="recent-purchases-card__header">
        <div className="recent-purchases-card__title">
          <div className="recent-purchases-card__icon">
            <ShoppingBag size={20} />
          </div>

          <div>
            <h2>Recent Purchases</h2>
            <p>Latest purchase orders</p>
          </div>
        </div>

        {purchases.length > 0 && (
          <button
            type="button"
            className="recent-purchases-card__view-all"
            onClick={onViewAll}
          >
            View All
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="recent-purchases-card__body">
        {!purchases.length ? (
          <div className="recent-purchases-empty">
            <div className="recent-purchases-empty__icon">
              <Package size={28} />
            </div>

            <h3>No recent purchases</h3>

            <p>
              Purchase orders will appear here once
              they are created.
            </p>
          </div>
        ) : (
          <div className="recent-purchases-table-wrapper">
            <table className="recent-purchases-table">
              <thead>
                <tr>
                  <th>Purchase</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {purchases.map((purchase) => {
                  const purchaseId =
                    purchase.id ||
                    purchase._id ||
                    purchase.purchaseId ||
                    purchase.orderId;

                  const purchaseNumber =
                    purchase.purchaseNumber ||
                    purchase.poNumber ||
                    purchase.orderNumber ||
                    purchase.invoiceNumber ||
                    purchaseId ||
                    "—";

                  const supplierName =
                    purchase.supplier?.name ||
                    purchase.supplierName ||
                    purchase.supplier?.companyName ||
                    "Unknown Supplier";

                  const supplierEmail =
                    purchase.supplier?.email ||
                    purchase.supplierEmail;

                  const amount =
                    purchase.totalAmount ??
                    purchase.grandTotal ??
                    purchase.total ??
                    purchase.amount ??
                    0;

                  const status =
                    purchase.status ||
                    purchase.paymentStatus ||
                    "unknown";

                  const itemsCount =
                    purchase.itemsCount ??
                    purchase.totalItems;

                  return (
                    <tr
                      key={purchaseId || purchaseNumber}
                      className="recent-purchases-row"
                      onClick={() =>
                        onPurchaseClick?.(purchase)
                      }
                    >
                      <td>
                        <div className="purchase-reference">
                          <div className="purchase-reference__icon">
                            <ShoppingBag size={16} />
                          </div>

                          <div>
                            <strong>
                              {purchaseNumber}
                            </strong>

                            {itemsCount !== undefined && (
                              <span>
                                {itemsCount}{" "}
                                {itemsCount === 1
                                  ? "item"
                                  : "items"}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="supplier-info">
                          <strong>
                            {supplierName}
                          </strong>

                          {supplierEmail && (
                            <span>
                              {supplierEmail}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <span className="purchase-date">
                          {formatDate(
                            purchase.purchaseDate ||
                              purchase.orderDate ||
                              purchase.createdAt ||
                              purchase.date
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`purchase-status purchase-status--${getStatusClass(
                            status
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </td>

                      <td className="text-right">
                        <strong className="purchase-amount">
                          {formatCurrency(amount)}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPurchases;
