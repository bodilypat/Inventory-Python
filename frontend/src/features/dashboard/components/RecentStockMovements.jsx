/* **************************************************************** */
/* File: src/features/dashboard/components/RecentStockMovements.jsx */
/* **************************************************************** */

import React from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  ArrowRight,
  Package,
} from "lucide-react";

const RecentStockMovements = ({
  movements = [],
  loading = false,
  onViewAll,
  onMovementClick,
}) => {
  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(
      Number(value) || 0
    );
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
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const normalizeMovementType = (movement) => {
    const type =
      movement.type ||
      movement.movementType ||
      movement.transactionType ||
      movement.action ||
      "";

    return String(type)
      .toLowerCase()
      .replace(/[-_\s]/g, "");
  };

  const getMovementType = (movement) => {
    const type = normalizeMovementType(movement);

    if (
      [
        "stockin",
        "stockinward",
        "in",
        "receive",
        "received",
        "purchase",
      ].includes(type)
    ) {
      return "in";
    }

    if (
      [
        "stockout",
        "stockoutward",
        "out",
        "issue",
        "issued",
        "sale",
      ].includes(type)
    ) {
      return "out";
    }

    return "adjustment";
  };

  const getMovementLabel = (movement) => {
    const type = getMovementType(movement);

    if (type === "in") return "Stock In";
    if (type === "out") return "Stock Out";

    return "Adjustment";
  };

  const getMovementIcon = (movement) => {
    const type = getMovementType(movement);

    if (type === "in") {
      return <ArrowDownToLine size={18} />;
    }

    if (type === "out") {
      return <ArrowUpFromLine size={18} />;
    }

    return <RefreshCw size={18} />;
  };

  const getQuantity = (movement) => {
    return Math.abs(
      Number(
        movement.quantity ??
          movement.qty ??
          movement.units ??
          movement.change ??
          0
      )
    );
  };

  const getQuantityPrefix = (movement) => {
    const type = getMovementType(movement);

    if (type === "in") return "+";
    if (type === "out") return "-";

    const change = Number(
      movement.quantity ??
        movement.qty ??
        movement.units ??
        movement.change ??
        0
    );

    if (change > 0) return "+";
    if (change < 0) return "-";

    return "";
  };

  const getStatusClass = (status) => {
    const normalized = String(status || "")
      .toLowerCase()
      .replace(/[-_]/g, " ");

    switch (normalized) {
      case "completed":
      case "complete":
      case "approved":
        return "success";

      case "pending":
      case "processing":
        return "warning";

      case "cancelled":
      case "canceled":
      case "rejected":
        return "danger";

      default:
        return "neutral";
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return null;

    return String(status)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  if (loading) {
    return (
      <section className="recent-stock-movements-card">
        <div className="recent-stock-movements-card__header">
          <div className="recent-stock-movements-card__title">
            <div className="recent-stock-movements-card__icon">
              <RefreshCw size={20} />
            </div>

            <div>
              <h2>Recent Stock Movements</h2>
              <p>Latest inventory activity</p>
            </div>
          </div>
        </div>

        <div className="recent-stock-movements-loading">
          <div className="dashboard-spinner" />
          <span>Loading stock movements...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="recent-stock-movements-card">
      <div className="recent-stock-movements-card__header">
        <div className="recent-stock-movements-card__title">
          <div className="recent-stock-movements-card__icon">
            <RefreshCw size={20} />
          </div>

          <div>
            <h2>Recent Stock Movements</h2>
            <p>Latest inventory activity</p>
          </div>
        </div>

        {movements.length > 0 && (
          <button
            type="button"
            className="recent-stock-movements-card__view-all"
            onClick={onViewAll}
          >
            View All
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="recent-stock-movements-card__body">
        {!movements.length ? (
          <div className="recent-stock-movements-empty">
            <div className="recent-stock-movements-empty__icon">
              <Package size={28} />
            </div>

            <h3>No recent stock movements</h3>

            <p>
              Stock activity will appear here when
              inventory is received, issued, or adjusted.
            </p>
          </div>
        ) : (
          <div className="stock-movement-list">
            {movements.map((movement) => {
              const movementId =
                movement.id ||
                movement._id ||
                movement.movementId;

              const productName =
                movement.product?.name ||
                movement.productName ||
                movement.itemName ||
                "Unknown Product";

              const sku =
                movement.product?.sku ||
                movement.sku ||
                movement.productSku;

              const warehouseName =
                movement.warehouse?.name ||
                movement.warehouseName ||
                movement.locationName;

              const userName =
                movement.user?.name ||
                movement.userName ||
                movement.createdBy?.name ||
                movement.createdBy ||
                "System";

              const type = getMovementType(movement);
              const quantity = getQuantity(movement);
              const prefix = getQuantityPrefix(movement);

              const status =
                movement.status ||
                movement.movementStatus;

              const reason =
                movement.reason ||
                movement.notes ||
                movement.description;

              return (
                <button
                  type="button"
                  key={movementId}
                  className="stock-movement-item"
                  onClick={() =>
                    onMovementClick?.(movement)
                  }
                >
                  <div
                    className={`stock-movement-item__icon stock-movement-item__icon--${type}`}
                  >
                    {getMovementIcon(movement)}
                  </div>

                  <div className="stock-movement-item__content">
                    <div className="stock-movement-item__top">
                      <div className="stock-movement-product">
                        <strong>{productName}</strong>

                        {sku && (
                          <span>SKU: {sku}</span>
                        )}
                      </div>

                      <span
                        className={`stock-movement-quantity stock-movement-quantity--${type}`}
                      >
                        {prefix}
                        {formatNumber(quantity)}
                      </span>
                    </div>

                    <div className="stock-movement-item__details">
                      <span
                        className={`stock-movement-type stock-movement-type--${type}`}
                      >
                        {getMovementLabel(movement)}
                      </span>

                      {warehouseName && (
                        <span>
                          {warehouseName}
                        </span>
                      )}

                      {reason && (
                        <span className="stock-movement-reason">
                          {reason}
                        </span>
                      )}
                    </div>

                    <div className="stock-movement-item__bottom">
                      <span>
                        {formatDate(
                          movement.movementDate ||
                            movement.createdAt ||
                            movement.date
                        )}
                      </span>

                      <span>
                        By {userName}
                      </span>

                      {status && (
                        <span
                          className={`stock-movement-status stock-movement-status--${getStatusClass(
                            status
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentStockMovements;
