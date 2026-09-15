/* ************************************************** */
/* File: src/features/suppliers/hooks/useSuppliers.js */
/* ************************************************** */

import { useCallback, useEffect, useMemo, useState } from "react";
import suppliersApi from "../services/suppliersApi";

const DEFAULT_FILTERS = {
  search: "",
  status: "all",
};

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const getSupplierId = (supplier = {}) =>
  supplier?.id ?? supplier?._id ?? supplier?.supplierId ?? supplier?.uuid ?? null;

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const normalizeListResponse = (response) => {
  const data = response?.data ?? response ?? {};

  if (Array.isArray(data)) {
    return {
      suppliers: data,
      pagination: { ...DEFAULT_PAGINATION },
    };
  }

  const suppliers =
    data.suppliers ??
    data.items ??
    data.results ??
    data.data ??
    [];

  const paginationSource =
    data.pagination ??
    data.meta ??
    {};

  return {
    suppliers: Array.isArray(suppliers) ? suppliers : [],
    pagination: {
      page: Number(paginationSource.page ?? data.page ?? 1),
      limit: Number(paginationSource.limit ?? data.limit ?? 10),
      total: Number(paginationSource.total ?? data.total ?? 0),
      totalPages: Number(
        (paginationSource.totalPages ??
          data.totalPages ??
          Math.ceil(
            (Number(paginationSource.total ?? data.total ?? 0) || 0) /
              (Number(paginationSource.limit ?? data.limit ?? 10) || 10)
          )) || 0
      ),
    },
  };
};

const normalizeSupplierResponse = (response) => {
  const data = response?.data ?? response ?? {};

  return data.supplier ?? data.data ?? data;
};

const normalizeStatsResponse = (response) => {
  const data = response?.data ?? response ?? {};

  return data.stats ?? data;
};

const mergeSupplierList = (previous, supplier) => {
  const nextSupplierId = getSupplierId(supplier);

  if (!nextSupplierId) {
    return [supplier, ...previous];
  }

  const filtered = previous.filter(
    (item) => getSupplierId(item) !== nextSupplierId
  );

  return [supplier, ...filtered];
};

const replaceSupplierInList = (previous, supplierId, nextSupplier) => {
  if (!supplierId) {
    return previous;
  }

  return previous.map((supplier) => {
    const currentId = getSupplierId(supplier);
    return currentId === supplierId ? nextSupplier : supplier;
  });
};

const useSuppliers = (initialOptions = {}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierStats, setSupplierStats] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...(initialOptions.filters || {}),
  });

  const [pagination, setPagination] = useState({
    ...DEFAULT_PAGINATION,
    ...(initialOptions.pagination || {}),
  });

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [purchasesError, setPurchasesError] = useState(null);

  const fetchSuppliers = useCallback(
    async (customParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const normalizedCustomParams =
          customParams && typeof customParams === "object"
            ? customParams
            : {};

        const params = {
          page: pagination.page,
          limit: pagination.limit,
          ...(filters.search ? { search: filters.search } : {}),
          ...(filters.status !== "all" ? { status: filters.status } : {}),
          ...normalizedCustomParams,
        };

        const response = await suppliersApi.getSuppliers(params);
        const result = normalizeListResponse(response);

        setSuppliers(result.suppliers);
        setPagination((previous) => ({
          ...previous,
          ...result.pagination,
        }));

        return result.suppliers;
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [filters.search, filters.status, pagination.page, pagination.limit]
  );

  const fetchSupplier = useCallback(async (supplierId) => {
    if (!supplierId) {
      setSelectedSupplier(null);
      return null;
    }

    try {
      setDetailsLoading(true);
      setDetailsError(null);

      const response = await suppliersApi.getSupplier(supplierId);
      const supplier = normalizeSupplierResponse(response);

      setSelectedSupplier(supplier);
      return supplier;
    } catch (err) {
      const message = getErrorMessage(err);
      setDetailsError(message);
      return null;
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  const fetchSupplierStats = useCallback(async (supplierId) => {
    if (!supplierId) {
      setSupplierStats(null);
      return null;
    }

    try {
      setStatsLoading(true);
      setStatsError(null);

      const response = await suppliersApi.getSupplierStats(supplierId);
      const stats = normalizeStatsResponse(response);

      setSupplierStats(stats);
      return stats;
    } catch (err) {
      const message = getErrorMessage(err);
      setStatsError(message);
      return null;
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchSupplierPurchases = useCallback(async (supplierId, params = {}) => {
    if (!supplierId) {
      setPurchaseHistory([]);
      return [];
    }

    try {
      setPurchasesLoading(true);
      setPurchasesError(null);

      const response = await suppliersApi.getSupplierPurchases(supplierId, params);
      const data = response?.data ?? response ?? {};

      const purchases = Array.isArray(data)
        ? data
        : data.purchases ?? data.items ?? data.results ?? [];

      setPurchaseHistory(purchases);
      return purchases;
    } catch (err) {
      const message = getErrorMessage(err);
      setPurchasesError(message);
      return [];
    } finally {
      setPurchasesLoading(false);
    }
  }, []);

  const createSupplier = useCallback(async (supplierData) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await suppliersApi.createSupplier(supplierData);
      const supplier = normalizeSupplierResponse(response);

      setSuppliers((previous) => mergeSupplierList(previous, supplier));

      return {
        success: true,
        supplier,
        data: response?.data ?? response,
      };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setSubmitting(false);
    }
  }, []);

  const updateSupplier = useCallback(async (supplierId, supplierData) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await suppliersApi.updateSupplier(supplierId, supplierData);
      const updatedSupplier = normalizeSupplierResponse(response);

      setSuppliers((previous) =>
        replaceSupplierInList(previous, supplierId, updatedSupplier)
      );

      setSelectedSupplier((previous) => {
        if (!previous || getSupplierId(previous) !== supplierId) {
          return previous;
        }

        return updatedSupplier;
      });

      return {
        success: true,
        supplier: updatedSupplier,
        data: response?.data ?? response,
      };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setSubmitting(false);
    }
  }, []);

  const deleteSupplier = useCallback(async (supplierId) => {
    try {
      setDeleting(true);
      setError(null);

      await suppliersApi.deleteSupplier(supplierId);

      setSuppliers((previous) =>
        previous.filter((supplier) => getSupplierId(supplier) !== supplierId)
      );

      setSelectedSupplier((previous) => {
        if (previous && getSupplierId(previous) === supplierId) {
          return null;
        }

        return previous;
      });

      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setDeleting(false);
    }
  }, []);

  const updateSupplierStatus = useCallback(async (supplierId, status) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await suppliersApi.updateSupplierStatus(supplierId, status);
      const updatedSupplier = normalizeSupplierResponse(response);

      const finalSupplier = {
        ...updatedSupplier,
        status: updatedSupplier?.status ?? status,
      };

      setSuppliers((previous) =>
        previous.map((supplier) => {
          if (getSupplierId(supplier) !== supplierId) {
            return supplier;
          }

          return {
            ...supplier,
            ...finalSupplier,
            status: finalSupplier.status ?? supplier.status,
          };
        })
      );

      setSelectedSupplier((previous) => {
        if (!previous || getSupplierId(previous) !== supplierId) {
          return previous;
        }

        return {
          ...previous,
          ...finalSupplier,
          status: finalSupplier.status ?? previous.status,
        };
      });

      return {
        success: true,
        supplier: finalSupplier,
      };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setSubmitting(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters = {}) => {
    setFilters((previous) => ({
      ...previous,
      ...newFilters,
    }));

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  }, []);

  const changePage = useCallback((page) => {
    const nextPage = Number(page) || 1;

    setPagination((previous) => ({
      ...previous,
      page: nextPage,
    }));
  }, []);

  const changeLimit = useCallback((limit) => {
    const nextLimit = Number(limit) || DEFAULT_PAGINATION.limit;

    setPagination((previous) => ({
      ...previous,
      page: 1,
      limit: nextLimit,
    }));
  }, []);

  const selectSupplier = useCallback((supplier) => {
    setSelectedSupplier(supplier);
  }, []);

  const clearSelectedSupplier = useCallback(() => {
    setSelectedSupplier(null);
    setSupplierStats(null);
    setPurchaseHistory([]);

    setDetailsError(null);
    setStatsError(null);
    setPurchasesError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setDetailsError(null);
    setStatsError(null);
    setPurchasesError(null);
  }, []);

  const refresh = useCallback(async () => {
    return fetchSuppliers();
  }, [fetchSuppliers]);

  const activeSuppliers = useMemo(
    () =>
      suppliers.filter(
        (supplier) => String(supplier?.status ?? "").toLowerCase() === "active"
      ),
    [suppliers]
  );

  const inactiveSuppliers = useMemo(
    () =>
      suppliers.filter(
        (supplier) => String(supplier?.status ?? "").toLowerCase() !== "active"
      ),
    [suppliers]
  );

  const totalPurchases = useMemo(
    () =>
      suppliers.reduce(
        (total, supplier) => total + Number(supplier?.totalPurchases ?? 0),
        0
      ),
    [suppliers]
  );

  const totalOrders = useMemo(
    () =>
      suppliers.reduce(
        (total, supplier) => total + Number(supplier?.totalOrders ?? 0),
        0
      ),
    [suppliers]
  );

  const outstandingBalance = useMemo(
    () =>
      suppliers.reduce(
        (total, supplier) =>
          total + Number(supplier?.outstandingBalance ?? 0),
        0
      ),
    [suppliers]
  );

  const summary = useMemo(
    () => ({
      total: suppliers.length,
      active: activeSuppliers.length,
      inactive: inactiveSuppliers.length,
      totalPurchases,
      totalOrders,
      outstandingBalance,
    }),
    [suppliers, activeSuppliers, inactiveSuppliers, totalPurchases, totalOrders, outstandingBalance]
  );

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    selectedSupplier,
    supplierStats,
    purchaseHistory,
    summary,

    filters,
    updateFilters,
    setFilters: updateFilters,
    resetFilters,

    pagination,
    changePage,
    changeLimit,

    selectSupplier,
    clearSelectedSupplier,

    loading,
    detailsLoading,
    statsLoading,
    purchasesLoading,
    submitting,
    deleting,

    error,
    detailsError,
    statsError,
    purchasesError,
    clearError,

    fetchSuppliers,
    fetchSupplier,
    fetchSupplierStats,
    fetchSupplierPurchases,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    updateSupplierStatus,

    refresh,
    refetch: refresh,
  };
};

export default useSuppliers;
