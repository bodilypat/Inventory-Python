/* ******************************************************** */
/* File: src/features/hooks/useCustomers.js                 */
/* ******************************************************** */

import { useCallback, useEffect, useMemo, useState } from "react";
import customersApi from "../services/customersApi";

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

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const getEntityId = (customer) =>
  customer?.id ?? customer?._id;

const normalizeListResponse = (response) => {
  const data = response?.data ?? response ?? {};

  if (Array.isArray(data)) {
    return {
      customers: data,
      pagination: {
        ...DEFAULT_PAGINATION,
        total: data.length,
        totalPages: data.length
          ? 1
          : 0,
      },
    };
  }

  return {
    customers:
      data.customers ||
      data.items ||
      data.results ||
      [],

    pagination: {
      page:
        data.pagination?.page ??
        data.page ??
        1,

      limit:
        data.pagination?.limit ??
        data.limit ??
        10,

      total:
        data.pagination?.total ??
        data.total ??
        0,

      totalPages:
        data.pagination?.totalPages ??
        data.totalPages ??
        0,
    },
  };
};

const normalizeCustomerResponse = (response) => {
  const data = response?.data ?? response ?? {};

  return (
    data.customer ||
    data.data ||
    data
  );
};

const normalizeStatsResponse = (response) => {
  const data = response?.data ?? response ?? {};

  return data.stats || data;
};

const normalizeSalesResponse = (response) => {
  const data = response?.data ?? response ?? {};

  if (Array.isArray(data)) {
    return data;
  }

  return (
    data.sales ||
    data.items ||
    data.results ||
    []
  );
};

const useCustomers = (initialOptions = {}) => {
  const [customers, setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [customerStats, setCustomerStats] =
    useState(null);

  const [salesHistory, setSalesHistory] =
    useState([]);

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...(initialOptions.filters || {}),
  });

  const [pagination, setPagination] = useState({
    ...DEFAULT_PAGINATION,
    ...(initialOptions.pagination || {}),
  });

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] =
    useState(false);
  const [statsLoading, setStatsLoading] =
    useState(false);
  const [salesLoading, setSalesLoading] =
    useState(false);
  const [submitting, setSubmitting] =
    useState(false);
  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] = useState(null);
  const [detailsError, setDetailsError] =
    useState(null);
  const [statsError, setStatsError] =
    useState(null);
  const [salesError, setSalesError] =
    useState(null);

  /**
   * Fetch customers
   */
  const fetchCustomers = useCallback(
    async (customParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: pagination.page,
          limit: pagination.limit,

          ...(filters.search
            ? { search: filters.search }
            : {}),

          ...(filters.status !== "all"
            ? { status: filters.status }
            : {}),

          ...customParams,
        };

        const response =
          await customersApi.getCustomers(params);

        const result =
          normalizeListResponse(response);

        setCustomers(result.customers);

        setPagination((previous) => ({
          ...previous,
          ...result.pagination,
        }));

        return result.customers;
      } catch (err) {
        const message = getErrorMessage(err);

        setError(message);

        return [];
      } finally {
        setLoading(false);
      }
    },
    [
      filters.search,
      filters.status,
      pagination.page,
      pagination.limit,
    ]
  );

  /**
   * Fetch a single customer
   */
  const fetchCustomer = useCallback(
    async (customerId) => {
      if (!customerId) {
        setSelectedCustomer(null);
        return null;
      }

      try {
        setDetailsLoading(true);
        setDetailsError(null);

        const response =
          await customersApi.getCustomer(
            customerId
          );

        const customer =
          normalizeCustomerResponse(response);

        setSelectedCustomer(customer);

        return customer;
      } catch (err) {
        const message = getErrorMessage(err);

        setDetailsError(message);

        return null;
      } finally {
        setDetailsLoading(false);
      }
    },
    []
  );

  /**
   * Fetch customer statistics
   */
  const fetchCustomerStats = useCallback(
    async (customerId) => {
      if (!customerId) {
        setCustomerStats(null);
        return null;
      }

      try {
        setStatsLoading(true);
        setStatsError(null);

        const response =
          await customersApi.getCustomerStats(
            customerId
          );

        const stats =
          normalizeStatsResponse(response);

        setCustomerStats(stats);

        return stats;
      } catch (err) {
        const message = getErrorMessage(err);

        setStatsError(message);

        return null;
      } finally {
        setStatsLoading(false);
      }
    },
    []
  );

  /**
   * Fetch customer sales history
   */
  const fetchCustomerSales = useCallback(
    async (
      customerId,
      params = {}
    ) => {
      if (!customerId) {
        setSalesHistory([]);
        return [];
      }

      try {
        setSalesLoading(true);
        setSalesError(null);

        const response =
          await customersApi.getCustomerSales(
            customerId,
            params
          );

        const sales =
          normalizeSalesResponse(response);

        setSalesHistory(sales);

        return sales;
      } catch (err) {
        const message = getErrorMessage(err);

        setSalesError(message);

        return [];
      } finally {
        setSalesLoading(false);
      }
    },
    []
  );

  /**
   * Create customer
   */
  const createCustomer = useCallback(
    async (customerData) => {
      try {
        setSubmitting(true);
        setError(null);

        const response =
          await customersApi.createCustomer(
            customerData
          );

        const customer =
          normalizeCustomerResponse(response);

        setCustomers((previous) => [
          customer,
          ...previous,
        ]);

        return {
          success: true,
          customer,
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
    },
    []
  );

  /**
   * Update customer
   */
  const updateCustomer = useCallback(
    async (customerId, customerData) => {
      try {
        setSubmitting(true);
        setError(null);

        const response =
          await customersApi.updateCustomer(
            customerId,
            customerData
          );

        const updatedCustomer =
          normalizeCustomerResponse(response);

        setCustomers((previous) =>
          previous.map((customer) =>
            getEntityId(customer) === customerId
              ? {
                  ...customer,
                  ...updatedCustomer,
                }
              : customer
          )
        );

        setSelectedCustomer((previous) => {
          if (
            !previous ||
            getEntityId(previous) !== customerId
          ) {
            return previous;
          }

          return {
            ...previous,
            ...updatedCustomer,
          };
        });

        return {
          success: true,
          customer: updatedCustomer,
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
    },
    []
  );

  /**
   * Delete customer
   */
  const deleteCustomer = useCallback(
    async (customerId) => {
      try {
        setDeleting(true);
        setError(null);

        await customersApi.deleteCustomer(
          customerId
        );

        setCustomers((previous) =>
          previous.filter(
            (customer) =>
              getEntityId(customer) !== customerId
          )
        );

        setSelectedCustomer((previous) => {
          if (
            previous &&
            getEntityId(previous) === customerId
          ) {
            return null;
          }

          return previous;
        });

        return {
          success: true,
        };
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
    },
    []
  );

  /**
   * Update customer status
   */
  const updateCustomerStatus = useCallback(
    async (customerId, status) => {
      try {
        setSubmitting(true);
        setError(null);

        const response =
          await customersApi.updateCustomerStatus(
            customerId,
            status
          );

        const updatedCustomer =
          normalizeCustomerResponse(response);

        setCustomers((previous) =>
          previous.map((customer) =>
            getEntityId(customer) === customerId
              ? {
                  ...customer,
                  ...updatedCustomer,
                  status:
                    updatedCustomer.status ||
                    status,
                }
              : customer
          )
        );

        setSelectedCustomer((previous) => {
          if (
            !previous ||
            getEntityId(previous) !== customerId
          ) {
            return previous;
          }

          return {
            ...previous,
            ...updatedCustomer,
            status:
              updatedCustomer.status || status,
          };
        });

        return {
          success: true,
          customer: updatedCustomer,
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
    },
    []
  );

  /**
   * Update filters
   */
  const updateFilters = useCallback(
    (newFilters) => {
      setFilters((previous) => ({
        ...previous,
        ...newFilters,
      }));

      setPagination((previous) => ({
        ...previous,
        page: 1,
      }));
    },
    []
  );

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  }, []);

  /**
   * Pagination
   */
  const changePage = useCallback((page) => {
    setPagination((previous) => ({
      ...previous,
      page,
    }));
  }, []);

  const changeLimit = useCallback((limit) => {
    setPagination((previous) => ({
      ...previous,
      page: 1,
      limit,
    }));
  }, []);

  /**
   * Customer selection
   */
  const selectCustomer = useCallback(
    (customer) => {
      setSelectedCustomer(customer);
    },
    []
  );

  const clearSelectedCustomer =
    useCallback(() => {
      setSelectedCustomer(null);
      setCustomerStats(null);
      setSalesHistory([]);

      setDetailsError(null);
      setStatsError(null);
      setSalesError(null);
    }, []);

  /**
   * Clear all errors
   */
  const clearError = useCallback(() => {
    setError(null);
    setDetailsError(null);
    setStatsError(null);
    setSalesError(null);
  }, []);

  /**
   * Refresh customer list
   */
  const refresh = useCallback(async () => {
    return fetchCustomers();
  }, [fetchCustomers]);

  /**
   * Derived values
   */
  const activeCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          String(
            customer.status
          ).toLowerCase() === "active"
      ),
    [customers]
  );

  const inactiveCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          String(
            customer.status
          ).toLowerCase() !== "active"
      ),
    [customers]
  );

  const totalSales = useMemo(
    () =>
      customers.reduce(
        (total, customer) =>
          total +
          Number(
            customer.totalSales ?? 0
          ),
        0
      ),
    [customers]
  );

  const totalOrders = useMemo(
    () =>
      customers.reduce(
        (total, customer) =>
          total +
          Number(
            customer.totalOrders ??
              customer.totalOrdersCount ??
              0
          ),
        0
      ),
    [customers]
  );

  const outstandingBalance = useMemo(
    () =>
      customers.reduce(
        (total, customer) =>
          total +
          Number(
            customer.outstandingBalance ?? 0
          ),
        0
      ),
    [customers]
  );

  const totalCreditLimit = useMemo(
    () =>
      customers.reduce(
        (total, customer) =>
          total +
          Number(
            customer.creditLimit ?? 0
          ),
        0
      ),
    [customers]
  );

  const summary = useMemo(
    () => ({
      total:
        pagination.total || customers.length,

      active: activeCustomers.length,

      inactive: inactiveCustomers.length,

      totalSales,

      totalOrders,

      outstandingBalance,

      totalCreditLimit,
    }),
    [
      pagination.total,
      customers.length,
      activeCustomers.length,
      inactiveCustomers.length,
      totalSales,
      totalOrders,
      outstandingBalance,
      totalCreditLimit,
    ]
  );

  /**
   * Initial and filter/page changes fetch
   */
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    // Data
    customers,
    selectedCustomer,
    customerStats,
    salesHistory,
    summary,

    // Filters
    filters,
    updateFilters,
    setFilters: updateFilters,
    resetFilters,

    // Pagination
    pagination,
    changePage,
    changeLimit,

    // Selection
    selectCustomer,
    clearSelectedCustomer,

    // Loading states
    loading,
    detailsLoading,
    statsLoading,
    salesLoading,
    submitting,
    deleting,

    // Errors
    error,
    detailsError,
    statsError,
    salesError,
    clearError,

    // Customer operations
    fetchCustomers,
    fetchCustomer,
    fetchCustomerStats,
    fetchCustomerSales,

    createCustomer,
    updateCustomer,
    deleteCustomer,
    updateCustomerStatus,

    // Refresh
    refresh,
    refetch: refresh,
  };
};

export default useCustomers;
