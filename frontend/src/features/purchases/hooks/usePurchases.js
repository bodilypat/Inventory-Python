/* ************************************************** */
/* File: src/features/purchases/hooks/usePurchases.js */
/* ************************************************** */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import purchasesApi from "../services/purchasesApi";

/* ---- Helpers ---- */

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  supplierId: "",
  warehouseId: "",
  dateFrom: "",
  dateTo: "",
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const extractData = (response) => {
  return response?.data ?? response;
};

const normalizeListResponse = (response) => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return {
      purchases: data,
      pagination: {},
    };
  }

  return {
    purchases:
      data?.purchases ??
      data?.data ??
      data?.results ??
      [],
    pagination:
      data?.pagination ??
      {
        page: data?.page,
        limit: data?.limit,
        total:
          data?.total ??
          data?.count ??
          0,
        totalPages:
          data?.totalPages ??
          data?.pages ??
          0,
      },
  };
};

const normalizePurchaseResponse = (
  response
) => {
  const data = extractData(response);

  return (
    data?.purchase ??
    data?.data ??
    data
  );
};

/* ---- Hook ----*/

const usePurchases = (options = {}) => {
  const {
    autoFetch = true,
    initialFilters = {},
  } = options;

  const [purchases, setPurchases] =
    useState([]);

  const [selectedPurchase, setSelectedPurchase] =
    useState(null);

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

  const [stats, setStats] = useState(null);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [loadingPurchase, setLoadingPurchase] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [receiving, setReceiving] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [successMessage, setSuccessMessage] =
    useState(null);

  /* ---- Filters --- */

  const updateFilter = useCallback(
    (name, value) => {
      setFilters((previous) => ({
        ...previous,
        [name]: value,
        ...(name !== "page"
          ? { page: 1 }
          : {}),
      }));
    },
    []
  );

  const updateFilters = useCallback(
    (values = {}) => {
      setFilters((previous) => ({
        ...previous,
        ...values,
        page: 1,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      ...initialFilters,
    });
  }, [initialFilters]);

  const setPage = useCallback(
    (page) => {
      setFilters((previous) => ({
        ...previous,
        page,
      }));
    },
    []
  );

  const setLimit = useCallback(
    (limit) => {
      setFilters((previous) => ({
        ...previous,
        limit: Number(limit) || 10,
        page: 1,
      }));
    },
    []
  );

  const setSorting = useCallback(
    (sortBy, sortOrder = "desc") => {
      setFilters((previous) => ({
        ...previous,
        sortBy,
        sortOrder,
        page: 1,
      }));
    },
    []
  );

  /* ---- Fetch Purchases ---- */

  const fetchPurchases = useCallback(
    async (customFilters = null) => {
      try {
        setLoading(true);
        setError(null);

        const params =
          customFilters ?? filters;

        const response =
          await purchasesApi.getPurchases(
            params
          );

        const normalized =
          normalizeListResponse(
            response
          );

        setPurchases(
          normalized.purchases
        );

        setPagination((previous) => ({
          ...previous,
          ...normalized.pagination,
          page:
            normalized.pagination.page ??
            params.page ??
            previous.page,
          limit:
            normalized.pagination.limit ??
            params.limit ??
            previous.limit,
          total:
            normalized.pagination.total ??
            previous.total,
          totalPages:
            normalized.pagination
              .totalPages ??
            previous.totalPages,
        }));

        return {
          success: true,
          data: normalized.purchases,
          pagination:
            normalized.pagination,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  /* ---- Fetch Single Purchase ---- */

  const fetchPurchase = useCallback(
    async (purchaseId) => {
      if (!purchaseId) {
        setError(
          "Purchase ID is required."
        );

        return {
          success: false,
          error: "Purchase ID is required.",
        };
      }

      try {
        setLoadingPurchase(true);
        setError(null);

        const response =
          await purchasesApi.getPurchase(
            purchaseId
          );

        const purchase =
          normalizePurchaseResponse(
            response
          );

        setSelectedPurchase(purchase);

        return {
          success: true,
          data: purchase,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setLoadingPurchase(false);
      }
    },
    []
  );

  /* ---- Create Purchase ---- */

  const createPurchase = useCallback(
    async (purchaseData) => {
      try {
        setSaving(true);
        setError(null);
        setSuccessMessage(null);

        const response =
          await purchasesApi.createPurchase(
            purchaseData
          );

        const purchase =
          normalizePurchaseResponse(
            response
          );

        setSuccessMessage(
          "Purchase created successfully."
        );

        setSelectedPurchase(purchase);

        await fetchPurchases();

        return {
          success: true,
          data: purchase,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setSaving(false);
      }
    },
    [fetchPurchases]
  );

  /* ---- Update Purchase ---- */

  const updatePurchase = useCallback(
    async (
      purchaseId,
      purchaseData
    ) => {
      if (!purchaseId) {
        const message =
          "Purchase ID is required.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      }

      try {
        setSaving(true);
        setError(null);
        setSuccessMessage(null);

        const response =
          await purchasesApi.updatePurchase(
            purchaseId,
            purchaseData
          );

        const purchase =
          normalizePurchaseResponse(
            response
          );

        setSelectedPurchase(purchase);

        setSuccessMessage(
          "Purchase updated successfully."
        );

        await fetchPurchases();

        return {
          success: true,
          data: purchase,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setSaving(false);
      }
    },
    [fetchPurchases]
  );

  /* ---- Delete Purchase ---- */

  const deletePurchase = useCallback(
    async (purchaseId) => {
      if (!purchaseId) {
        const message =
          "Purchase ID is required.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      }

      try {
        setDeleting(true);
        setError(null);
        setSuccessMessage(null);

        await purchasesApi.deletePurchase(
          purchaseId
        );

        setPurchases((previous) =>
          previous.filter(
            (purchase) =>
              purchase.id !==
                purchaseId &&
              purchase._id !==
                purchaseId
          )
        );

        if (
          selectedPurchase?.id ===
            purchaseId ||
          selectedPurchase?._id ===
            purchaseId
        ) {
          setSelectedPurchase(null);
        }

        setSuccessMessage(
          "Purchase deleted successfully."
        );

        await fetchPurchases();

        return {
          success: true,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setDeleting(false);
      }
    },
    [
      selectedPurchase,
      fetchPurchases,
    ]
  );

  /* ---- Update Purchase Status ---- */

  const updatePurchaseStatus =
    useCallback(
      async (
        purchaseId,
        status
      ) => {
        if (!purchaseId) {
          const message =
            "Purchase ID is required.";

          setError(message);

          return {
            success: false,
            error: message,
          };
        }

        try {
          setSaving(true);
          setError(null);
          setSuccessMessage(null);

          const response =
            await purchasesApi.updatePurchaseStatus(
              purchaseId,
              status
            );

          const purchase =
            normalizePurchaseResponse(
              response
            );

          setSelectedPurchase(
            purchase
          );

          setSuccessMessage(
            "Purchase status updated successfully."
          );

          await fetchPurchases();

          return {
            success: true,
            data: purchase,
          };
        } catch (err) {
          const message =
            getErrorMessage(err);

          setError(message);

          return {
            success: false,
            error: message,
          };
        } finally {
          setSaving(false);
        }
      },
      [fetchPurchases]
    );

  /* ---- Submit Purchase ---- */

  const submitPurchase = useCallback(
    async (purchaseId) => {
      return updatePurchaseStatus(
        purchaseId,
        "submitted"
      );
    },
    [updatePurchaseStatus]
  );

  /* ---- Cancel Purchase ---- */

  const cancelPurchase = useCallback(
    async (
      purchaseId,
      reason = ""
    ) => {
      if (!purchaseId) {
        const message =
          "Purchase ID is required.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      }

      try {
        setSaving(true);
        setError(null);
        setSuccessMessage(null);

        const response =
          await purchasesApi.cancelPurchase(
            purchaseId,
            { reason }
          );

        const purchase =
          normalizePurchaseResponse(
            response
          );

        setSelectedPurchase(
          purchase
        );

        setSuccessMessage(
          "Purchase cancelled successfully."
        );

        await fetchPurchases();

        return {
          success: true,
          data: purchase,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setSaving(false);
      }
    },
    [fetchPurchases]
  );

  /* ---- Receive Purchase ---- */

  const receivePurchase = useCallback(
    async (
      purchaseId,
      receiveData
    ) => {
      if (!purchaseId) {
        const message =
          "Purchase ID is required.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      }

      try {
        setReceiving(true);
        setError(null);
        setSuccessMessage(null);

        const response =
          await purchasesApi.receivePurchase(
            purchaseId,
            receiveData
          );

        const purchase =
          normalizePurchaseResponse(
            response
          );

        setSelectedPurchase(
          purchase
        );

        setSuccessMessage(
          "Purchase received successfully. Inventory has been updated."
        );

        await fetchPurchases();

        return {
          success: true,
          data: purchase,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setReceiving(false);
      }
    },
    [fetchPurchases]
  );

  /* ---- Purchase Receipts ---- */

  const fetchPurchaseReceipts =
    useCallback(
      async (purchaseId) => {
        if (!purchaseId) {
          const message =
            "Purchase ID is required.";

          setError(message);

          return {
            success: false,
            error: message,
          };
        }

        try {
          setLoadingPurchase(true);
          setError(null);

          const response =
            await purchasesApi.getPurchaseReceipts(
              purchaseId
            );

          return {
            success: true,
            data: extractData(response),
          };
        } catch (err) {
          const message =
            getErrorMessage(err);

          setError(message);

          return {
            success: false,
            error: message,
          };
        } finally {
          setLoadingPurchase(false);
        }
      },
      []
    );

  /* ---- Search ---- */

  const searchPurchases = useCallback(
    async (searchTerm) => {
      const searchFilters = {
        ...filters,
        search:
          searchTerm ?? "",
        page: 1,
      };

      setFilters(searchFilters);

      return fetchPurchases(
        searchFilters
      );
    },
    [filters, fetchPurchases]
  );

  /* ---- Statistics ---- */

  const fetchStats = useCallback(
    async (params = {}) => {
      try {
        setError(null);

        const response =
          await purchasesApi.getPurchaseStats(
            {
              ...filters,
              ...params,
            }
          );

        const data =
          extractData(response);

        setStats(
          data?.stats ?? data
        );

        return {
          success: true,
          data: data?.stats ?? data,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      }
    },
    [filters]
  );

  /* ---- Summary ---- */

  const fetchSummary = useCallback(
    async (params = {}) => {
      try {
        setError(null);

        const response =
          await purchasesApi.getPurchaseSummary(
            {
              ...filters,
              ...params,
            }
          );

        const data =
          extractData(response);

        setSummary(
          data?.summary ?? data
        );

        return {
          success: true,
          data:
            data?.summary ?? data,
        };
      } catch (err) {
        const message =
          getErrorMessage(err);

        setError(message);

        return {
          success: false,
          error: message,
        };
      }
    },
    [filters]
  );

  /* ---- Refresh ---- */

  const refresh = useCallback(
    async () => {
      const [purchaseResult] =
        await Promise.all([
          fetchPurchases(),
          fetchStats(),
          fetchSummary(),
        ]);

      return purchaseResult;
    },
    [
      fetchPurchases,
      fetchStats,
      fetchSummary,
    ]
  );

  /* ---- Selection ---- */

  const selectPurchase = useCallback(
    (purchase) => {
      setSelectedPurchase(
        purchase
      );
    },
    []
  );

  const clearSelectedPurchase =
    useCallback(() => {
      setSelectedPurchase(null);
    }, []);

  /* ---- Error / Success ---- */

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccess = useCallback(
    () => {
      setSuccessMessage(null);
    },
    []
  );

  /* ---- Derived State ---- */

  const hasPurchases =
    purchases.length > 0;

  const isEmpty =
    !loading &&
    purchases.length === 0;

  const totalPurchases =
    pagination.total ??
    purchases.length;

  const currentPage =
    pagination.page ??
    filters.page;

  const totalPages =
    pagination.totalPages ?? 0;

  const canPreviousPage =
    currentPage > 1;

  const canNextPage =
    totalPages > 0 &&
    currentPage < totalPages;

  const purchaseTotals = useMemo(() => {
    return purchases.reduce(
      (totals, purchase) => {
        const total =
          Number(
            purchase?.grandTotal ??
              purchase?.total ??
              purchase?.amount ??
              0
          ) || 0;

        totals.total += total;

        if (
          purchase?.status ===
          "received"
        ) {
          totals.received += total;
        }

        if (
          purchase?.status ===
          "pending"
        ) {
          totals.pending += total;
        }

        return totals;
      },
      {
        total: 0,
        received: 0,
        pending: 0,
      }
    );
  }, [purchases]);

  /* ---- Initial Fetch ---- */

  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchPurchases();
  }, [
    autoFetch,
    fetchPurchases,
  ]);

  /* ---- Return API ---- */

  return {
    /* Data */
    purchases,
    selectedPurchase,
    stats,
    summary,

    /* Filters */
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    setPage,
    setLimit,
    setSorting,

    /* Pagination */
    pagination,
    currentPage,
    totalPages,
    totalPurchases,
    canPreviousPage,
    canNextPage,

    /* CRUD */
    fetchPurchases,
    fetchPurchase,
    createPurchase,
    updatePurchase,
    deletePurchase,

    /* Status */
    updatePurchaseStatus,
    submitPurchase,
    cancelPurchase,

    /* Receiving */
    receivePurchase,
    fetchPurchaseReceipts,

    /* Search */
    searchPurchases,

    /* Statistics */
    fetchStats,
    fetchSummary,

    /* Refresh */
    refresh,

    /* Selection */
    selectPurchase,
    clearSelectedPurchase,

    /* Messages */
    error,
    successMessage,
    clearError,
    clearSuccess,

    /* Loading */
    loading,
    loadingPurchase,
    saving,
    deleting,
    receiving,

    isLoading: loading,
    isSaving: saving,
    isDeleting: deleting,
    isReceiving: receiving,

    /* Convenience */
    hasPurchases,
    isEmpty,

    /* Calculations */
    purchaseTotals,
  };
};

export default usePurchases;
