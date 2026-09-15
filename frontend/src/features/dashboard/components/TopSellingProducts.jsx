/* *************************************************************** */
/* File: src/features/dashboard/components/TopSellingProducts.jsx  */
/* *************************************************************** */

import React from "react";
import {
  Trophy,
  Package,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const TopSellingProducts = ({
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);
  };

  const getProductName = (product) => {
    return (
      product.name ||
      product.productName ||
      product.title ||
      "Unknown Product"
    );
  };

  const getProductSku = (product) => {
    return (
      product.sku ||
      product.productSku ||
      product.code ||
      null
    );
  };

  const getUnitsSold = (product) => {
    return Number(
      product.unitsSold ??
        product.quantitySold ??
        product.soldQuantity ??
        product.quantity ??
        product.sales ??
        0
    );
  };

  const getRevenue = (product) => {
    return Number(
      product.revenue ??
        product.totalRevenue ??
        product.salesAmount ??
        product.total ??
        product.amount ??
        0
    );
  };

  const sortedProducts = [...products]
    .sort((a, b) => getUnitsSold(b) - getUnitsSold(a))
    .slice(0, 5);

  const totalUnitsSold = sortedProducts.reduce(
    (total, product) => total + getUnitsSold(product),
    0
  );

  const getSalesPercentage = (product) => {
    if (!totalUnitsSold) return 0;

    return (getUnitsSold(product) / totalUnitsSold) * 100;
  };

  const getRankClass = (index) => {
    if (index === 0) return "gold";
    if (index === 1) return "silver";
    if (index === 2) return "bronze";

    return "default";
  };

  if (loading) {
    return (
      <section className="top-selling-products-card">
        <div className="top-selling-products-card__header">
          <div className="top-selling-products-card__title">
            <div className="top-selling-products-card__icon">
              <Trophy size={20} />
            </div>

            <div>
              <h2>Top Selling Products</h2>
              <p>Best performing products</p>
            </div>
          </div>
        </div>

        <div className="top-selling-products-loading">
          <div className="dashboard-spinner" />
          <span>Loading products...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="top-selling-products-card">
      <div className="top-selling-products-card__header">
        <div className="top-selling-products-card__title">
          <div className="top-selling-products-card__icon">
            <Trophy size={20} />
          </div>

          <div>
            <h2>Top Selling Products</h2>
            <p>Best performing products</p>
          </div>
        </div>

        {products.length > 0 && (
          <button
            type="button"
            className="top-selling-products-card__view-all"
            onClick={onViewAll}
          >
            View All
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="top-selling-products-card__body">
        {!sortedProducts.length ? (
          <div className="top-selling-products-empty">
            <div className="top-selling-products-empty__icon">
              <Package size={28} />
            </div>

            <h3>No sales data</h3>

            <p>
              Product sales performance will appear here
              once sales are recorded.
            </p>
          </div>
        ) : (
          <div className="top-selling-products-list">
            {sortedProducts.map((product, index) => {
              const unitsSold = getUnitsSold(product);
              const revenue = getRevenue(product);
              const percentage =
                getSalesPercentage(product);

              const name = getProductName(product);
              const sku = getProductSku(product);

              return (
                <button
                  type="button"
                  key={
                    product.id ||
                    product._id ||
                    product.productId ||
                    sku ||
                    index
                  }
                  className="top-selling-product"
                  onClick={() =>
                    onProductClick?.(product)
                  }
                >
                  <div
                    className={`top-selling-product__rank top-selling-product__rank--${getRankClass(
                      index
                    )}`}
                  >
                    {index + 1}
                  </div>

                  <div className="top-selling-product__image">
                    {product.image ||
                    product.imageUrl ||
                    product.thumbnail ? (
                      <img
                        src={
                          product.image ||
                          product.imageUrl ||
                          product.thumbnail
                        }
                        alt={name}
                      />
                    ) : (
                      <Package size={22} />
                    )}
                  </div>

                  <div className="top-selling-product__content">
                    <div className="top-selling-product__top">
                      <div className="top-selling-product__name">
                        <strong>{name}</strong>

                        {sku && (
                          <span>SKU: {sku}</span>
                        )}
                      </div>

                      <div className="top-selling-product__revenue">
                        <strong>
                          {formatCurrency(revenue)}
                        </strong>

                        <span>
                          <TrendingUp size={13} />
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="top-selling-product__bottom">
                      <div className="top-selling-product__progress">
                        <div className="top-selling-product__progress-track">
                          <div
                            className="top-selling-product__progress-bar"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>

                      <span className="top-selling-product__units">
                        {formatNumber(unitsSold)}{" "}
                        {unitsSold === 1
                          ? "unit"
                          : "units"}{" "}
                        sold
                      </span>
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

export default TopSellingProducts;
