/* ****************************************************** */
/* File: src/features/dashboard/services/dashboardApi.js */
/* ****************************************************** */

import api from "../../../services/api";

const dashboardApi = {
  /*
   * Get dashboard overview data.
   *
   * @param {Object} filters
   * @param {string} filters.period
   * @param {string} filters.warehouseId
   * @param {string} filters.startDate
   * @param {string} filters.endDate
   */
  getDashboard: async (filters = {}) => {
    const params = {};

    if (filters.period) {
      params.period = filters.period;
    }

    if (
      filters.warehouseId &&
      filters.warehouseId !== "all"
    ) {
      params.warehouseId = filters.warehouseId;
    }

    if (filters.period === "custom") {
      if (filters.startDate) {
        params.startDate = filters.startDate;
      }

      if (filters.endDate) {
        params.endDate = filters.endDate;
      }
    }

    const response = await api.get("/dashboard", {
      params,
    });

    return response.data;
  },

  /* Get dashboard summary/statistics.*/
  getStats: async (filters = {}) => {
    const response = await api.get(
      "/dashboard/stats",
      {
        params: buildFilterParams(filters),
      }
    );

    return response.data;
  },

  /* Get sales chart data.*/
  getSalesData: async (filters = {}) => {
    const response = await api.get(
      "/dashboard/sales",
      {
        params: buildFilterParams(filters),
      }
    );

    return response.data;
  },

  /* Get purchase chart data. */
  getPurchaseData: async (filters = {}) => {
    const response = await api.get(
      "/dashboard/purchases",
      {
        params: buildFilterParams(filters),
      }
    );

    return response.data;
  },

  /* Get inventory chart data. */
  getInventoryData: async (filters = {}) => {
    const response = await api.get(
      "/dashboard/inventory",
      {
        params: buildFilterParams(filters),
      }
    );

    return response.data;
  },

  /* Get low-stock products. */
  getLowStockProducts: async (
    filters = {},
    limit = 10
  ) => {
    const response = await api.get(
      "/dashboard/low-stock",
      {
        params: {
          ...buildFilterParams(filters),
          limit,
        },
      }
    );

    return response.data;
  },

  /* Get recent sales. */
  getRecentSales: async (
    filters = {},
    limit = 5
  ) => {
    const response = await api.get(
      "/dashboard/recent-sales",
      {
        params: {
          ...buildFilterParams(filters),
          limit,
        },
      }
    );

    return response.data;
  },

  /* Get recent purchases. */
  getRecentPurchases: async (
    filters = {},
    limit = 5
  ) => {
    const response = await api.get(
      "/dashboard/recent-purchases",
      {
        params: {
          ...buildFilterParams(filters),
          limit,
        },
      }
    );

    return response.data;
  },

  /* Get recent stock movements. */
  getRecentStockMovements: async (
    filters = {},
    limit = 5
  ) => {
    const response = await api.get(
      "/dashboard/recent-stock-movements",
      {
        params: {
          ...buildFilterParams(filters),
          limit,
        },
      }
    );

    return response.data;
  },

  /* Get top-selling products. */
  getTopSellingProducts: async (
    filters = {},
    limit = 5
  ) => {
    const response = await api.get(
      "/dashboard/top-selling-products",
      {
        params: {
          ...buildFilterParams(filters),
          limit,
        },
      }
    );

    return response.data;
  },

  /* Get warehouses for the dashboard filter. */
  getWarehouses: async () => {
    const response = await api.get("/warehouses");

    return response.data;
  },
};

/*
 * Build query parameters shared by
 * individual dashboard endpoints.
 */
const buildFilterParams = (filters = {}) => {
  const params = {};

  if (filters.period) {
    params.period = filters.period;
  }

  if (
    filters.warehouseId &&
    filters.warehouseId !== "all"
  ) {
    params.warehouseId = filters.warehouseId;
  }

  if (filters.period === "custom") {
    if (filters.startDate) {
      params.startDate = filters.startDate;
    }

    if (filters.endDate) {
      params.endDate = filters.endDate;
    }
  }

  return params;
};

export default dashboardApi;
