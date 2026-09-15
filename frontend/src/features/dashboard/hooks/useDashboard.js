/* *************************************************** */
/* File: src/features/dashboard/hooks/useDashboard.js  */
/* *************************************************** */

import { useCallback, useEffect, useState } from "react";
import dashboardApi from "../services/dashboardApi";

const DEFAULT_FILTERS = {
  period: "30d",
  warehouseId: "all",
  startDate: "",
  endDate: "",
};

const DEFAULT_DASHBOARD_DATA = {
  stats: {
    totalSales: 0,
    totalPurchases: 0,
    totalProducts: 0,
    totalInventoryValue: 0,
    lowStockCount: 0,
  },
  salesData: [],
  purchaseData: [],
  inventoryData: [],
  lowStockProducts: [],
  recentSales: [],
  recentPurchases: [],
  recentStockMovements: [],
  topSellingProducts: [],
};

const normalizeResponse = (response) => {
  const data = response?.data ?? response ?? {};

  return {
    stats:
      data.stats ??
      data.summary ??
      DEFAULT_DASHBOARD_DATA.stats,

    salesData:
      data.salesData ??
      data.sales ??
      data.salesChart ??
      [],

    purchaseData:
      data.purchaseData ??
      data.purchases ??
      data.purchaseChart ??
      [],

    inventoryData:
      data.inventoryData ??
      data.inventory ??
      data.inventoryChart ??
      [],

    lowStockProducts:
      data.lowStockProducts ??
      data.lowStock ??
      [],

    recentSales:
      data.recentSales ??
      data.latestSales ??
      [],

    recentPurchases:
      data.recentPurchases ??
      data.latestPurchases ??
      [],

    recentStockMovements:
      data.recentStockMovements ??
      data.stockMovements ??
      data.recentMovements ??
      [],

    topSellingProducts:
      data.topSellingProducts ??
      data.topProducts ??
      [],
  };
};

const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.message) {
    return error.message;
  }

  return "Failed to load dashboard data.";
};

const useDashboard = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [data, setData] = useState(
    DEFAULT_DASHBOARD_DATA
  );

  const [warehouses, setWarehouses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(
    async (currentFilters = filters, options = {}) => {
      const isRefresh = options.refresh === true;

      try {
        setError(null);

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response =
          await dashboardApi.getDashboard(
            currentFilters
          );

        const normalizedData =
          normalizeResponse(response);

        setData(normalizedData);

        return normalizedData;
      } catch (err) {
        const message = getErrorMessage(err);

        setError(message);

        throw err;
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters]
  );

  const fetchWarehouses = useCallback(async () => {
    try {
      if (
        typeof dashboardApi.getWarehouses !==
        "function"
      ) {
        return;
      }

      const response =
        await dashboardApi.getWarehouses();

      const warehouseData =
        response?.data ??
        response?.warehouses ??
        response ??
        [];

      setWarehouses(
        Array.isArray(warehouseData)
          ? warehouseData
          : []
      );
    } catch (err) {
      // Warehouse loading should not prevent the
      // dashboard itself from being displayed.
      console.error(
        "Failed to load warehouses:",
        err
      );
    }
  }, []);

  const updateFilters = useCallback(
    (newFilters) => {
      setFilters((previousFilters) => ({
        ...previousFilters,
        ...newFilters,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const refresh = useCallback(async () => {
    return fetchDashboard(filters, {
      refresh: true,
    });
  }, [fetchDashboard, filters]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      try {
        await fetchDashboard(filters);
      } catch {
        if (cancelled) {
          return;
        }
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [filters, fetchDashboard]);

  return {
    // Dashboard data
    data,

    // Convenient access to individual sections
    stats: data.stats,
    salesData: data.salesData,
    purchaseData: data.purchaseData,
    inventoryData: data.inventoryData,
    lowStockProducts: data.lowStockProducts,
    recentSales: data.recentSales,
    recentPurchases: data.recentPurchases,
    recentStockMovements:
      data.recentStockMovements,
    topSellingProducts:
      data.topSellingProducts,

    // Filters
    filters,
    setFilters: updateFilters,
    updateFilters,
    resetFilters,

    // Warehouse options
    warehouses,

    // Request state
    loading,
    refreshing,
    error,

    // Actions
    refresh,
    refetch: refresh,
    clearError,
  };
};

export default useDashboard;
