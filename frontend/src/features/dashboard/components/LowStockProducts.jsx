/* ************************************************************ */
/* File: src/features/dashboard/components/LowStockProducts.jsx */
/* ************************************************************ */

import React from "react";
import { AlertTriangle, Package, ArrowRight } from "lucide-react";

const LowStockProducts = ({
  products = [],
  loading = false,
  onViewAll,
  onProductClick,
}) => {
  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(
      Number(value) || 0
    );
  };

  const getStockLevel = (quantity, minimumStock) => {
    const stock = Number(quantity) || 0;
    const minimum = Number(minimumStock) || 0;

    if (stock <= 0) {
      return "out";
    }

    if (minimum > 0 && stock <= minimum) {
      return "low";
    }

    return "normal";
  };

  const getStockPercentage = (quantity, minimumStock) => {
    const stock = Number(quantity) || 0;
    const minimum = Number(minimumStock) || 0;

    if (!minimum) return 0;

    return Math.min((stock / minimum) * 100, 100);
  };

  if (loading) {
    return (
      <section className="low-stock-card">
        <div className="low-stock-card__header">
          <div>
            <h2>Low Stock Products</h2>
            <p>Products that need restocking</p>
          </div>
        </div>

        <div className="low-stock-loading">
          <div className="dashboard-spinner" />
          <span>Loading products...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="low-stock-card">
      <div className="low-stock-card__header">
        <div className="low-stock-card__title">
          <div className="low-stock-card__icon">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h2>Low Stock Products</h2>
            <p>Products that need restocking</p>
          </div>
        </div>

        {products.length > 0 && (
          <button
            type="button"
            className="low-stock-card__view-all"
            onClick={onViewAll}
          >
            View All
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="low-stock-card__body">
        {!products.length ? (
          <div className="low-stock-empty">
            <div className="low-stock-empty__icon">
              <Package size={28} />
            </div>

            <h3>Inventory looks good</h3>

            <p>
              There are currently no products that need
              restocking.
            </p>
          </div>
        ) : (
          <div className="low-stock-list">
            {products.map((product) => {
              const quantity = Number(
                product.stockQuantity ??
                  product.quantity ??
                  product.stock ??
                  0
              );

              const minimumStock = Number(
                product.minimumStock ??
                  product.minStock ??
                  product.reorderLevel ??
                  0
              );

              const status = getStockLevel(
                quantity,
                minimumStock
              );

              const percentage = getStockPercentage(
                quantity,
                minimumStock
              );

              return (
                <button
                  type="button"
                  key={product.id}
                  className="low-stock-item"
                  onClick={() =>
                    onProductClick?.(product)
                  }
                >
                  <div className="low-stock-item__image">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    ) : (
                      <Package size={22} />
                    )}
                  </div>

                  <div className="low-stock-item__info">
                    <div className="low-stock-item__top">
                      <div>
                        <h3>{product.name}</h3>

                        {product.sku && (
                          <span>
                            SKU: {product.sku}
                          </span>
                        )}
                      </div>

                      <span
                        className={`stock-badge stock-badge--${status}`}
                      >
                        {status === "out"
                          ? "Out of Stock"
                          : "Low Stock"}
                      </span>
                    </div>

                    <div className="low-stock-item__bottom">
                      <div className="stock-progress">
                        <div className="stock-progress__track">
                          <div
                            className={`stock-progress__bar stock-progress__bar--${status}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="stock-quantity">
                        <strong>
                          {formatNumber(quantity)}
                        </strong>

                        <span>
                          / {formatNumber(minimumStock)}
                        </span>
                      </div>
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

export default LowStockProducts;
