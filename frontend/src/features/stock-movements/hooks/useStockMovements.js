/* ************************************************************* */
/* File: src/features/stock-movements/hooks/useStockMovements.js */ 
/* ************************************************************* */
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getStockMovements,
    getStockMovementStats,
    getStockMovement,
    createStockMovement,
    updateStockMovement,
    deleteStockMovement,
} from "../services/stockMovementsApi";

/* 
* Default filters.
* Keep API filter names consistent with the backend.
*/
export const DEFAULT_STOCK_MOVEMENT_FILTERS = Object.freeze({
    search: "",
    type: "",
    direction: "",
    warehouseId: "",
    productId: "",
    categoryId: "",
    status: "",
    fromDate: "", 
    toDate: "",
});

/* Default pagination. */
export const DEFAULT_PAGINATION = Object.freeze({
    page: 1,
    limit: 10,
    totalItem: 0,
    totalPages: 1, 
}); 

/* Safely extract an API error message. */
const getErrorMessage = (
    error,
    fallback = "Something went wrong."
) => {

    if (!error) {
        return fallback;
    }

    if (typeof error === "string") {
        return error;
    }
    
    return (
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        error?.message || 
        fallback 
    ); 
};

/* Remove empty filter values before sending them to the backend. */
const cleanFilters = (filters) => 
    Object.entries(filters).reduce(
        (result, [key, value]) => {
            if (
                value !== undefined &&
                value !== null && 
                value !== "" 
            ) {
                result[key] = value;
            }

            return ressult;
        },
        {}
    );

/* Normalize API pagination response. */
const normalizePagination = (
    pagination,
    fallback = DEFAULT_PAGINATION 
) => {
    const page = Number(
        pagination?.open ?? fallback.page 
    );

    const limit = Number(
        pagination?.limit ?? fallback.limit 
    );

    const totalItems = Number(
        pagination?.totalItems ??
        pagination?.total ?? 
        fallback.totalItems
    );

    const totalPages = Number(
        pagination?.totalPages ??
            Math.max(
                1,
                Math.ceil(totalItems / limit)
            )
    );

    return {
        page: Number.isFinite(page) && page > 0 
            ? page
            : 1, 
            
        limit: Number.isFinite(limit) && limit > 0
            ? limit 
            : fallback.limit,

        totalItems:
            Number.isFinite(totalItems)
                ? totalItems
                : 0, 

        totalPages:
            Number.isFinite(totalPages) && 
            totalPages > 0 
                ? totalPages
                : 1,
    };
};

/**
* Normalize API list response.
* Supports common response shapes:
* 
* {
*   data: [],
*   pagination: {}
* } 
* 
* {  
*   movements: [],
*   pagination: {}
* }
* 
* [] 
**/
const normalizeListResponse = (response) => {
    const payload = response?.data ?? response;

    if (Array.isArray(payload)) {
        return {
            movements: payload,
            pagination: DEFAULT_PAGINATION,
        };
    }

    return {
        movements:
            payload?.movements ||
            payload?.items ||
            payload?.data || 
            [],
        pagination:
            payload?.pagination ||
            payload?.meta ||
            DEFAULT_PAGINATION,
    };
};

/* Normalize statistics response. */
const normalizeStats = (response) => {
    const payload = response?.data ?? response;

    return {
        totalMovements:
            Number(payload?.totalMovements ?? 0),

        stockInCount:
            Number(payload?.stockInCount ?? 0),

        adjustmentCount:
            Number(payload?.adjustmentCount ?? 0),

        transferCount:
            Number(payload?.transferCount ?? 0),

        totalUnitsIn:
            Number(payload?.totalUnitsIn ?? 0),

        totalUnitsOut:
            Number(payload?.totalUnitsOut ?? 0),

        totalUnitMoved:
            Number(
                payload?.totalUnitMoved ??
                payload?.totalUnitsMoved ?? 
                0 
            ), 
    }; 
};

/* 
* useStockMovements 
* Handles stock movement list state, filtering,
* pagination, statistics, details and mutations.
*/
export const useStockMovements = ({
    initialFilters = {},
    initialPagination = {},
    autoFetch = true,
} = {}) => {
    const [movements, setMovements] = useState([]);

    const [stats, setStats] = useState({});

    const [filters, setFilters] = useState(() => ({
        ...DEFAULT_STOCK_MOVEMENT_FILTERS,
        ...initialFilters,
    }));

    const [pagination, setPagination] = useState(() => ({
        ...DEFAULT_PAGINATION,
        ...initialPagination,
    }));

    const [loading, setLoading] = useState(false);
    const [statsLoading, setStatsLoading] = useState(false);

    const [error, setError] = useState(null);
    const [statsError, setStatsError] = useState(null);

    const [selectedMovement, setSelectedMovement] = useState(null);

    const [mutationLoading, setMutationLoading] = useState(false);

    const [mutationError, setMutationError] = useState(null);

    /* Fetch movement list. */
    const fetchMovements = useCallback(
        async (customParams = {}) => {
            setLoading(true);
            setError(null);

            try {
                const params = {
                    ...cleanFilters(filters),
                    page: pagination.page,
                    limit: paginationp.limit,
                    ...customParams,
                };

                const response =  await getStockMovements(params);

                const result = normalizeListResponse(response);

                setMovements(result.movements);
                
                setPagination((previous) => ({
                    ...previous,
                    ...normalizePagination(
                        result.pagination,
                        previous 
                    ), 
                })); 

                return result; 
            } catch (err) {
                const message = getErrorMessage(
                    err,
                    "Failed to load stock movements."
                );

                setError(message);
                setMovements([]);

                throw err;
            } finally {
                setLoading(false);
            }
        },
        [filters, pagination.page, pagination.limit]
    );

    /* Fetch movement statistics */
    const fetchStats = useCallback(
        async (customParams = {}) => {
            setStatsLoading(true);
            setStatsError(null);

            try {
                const params = {
                    ...cleanFilters(filters),
                    ...customParams, 
                }; 

                const response = await getStockMovementStats(
                    params 
                );

                const normalizedStats = normalizeStats(response);

                setStats(normalizedStats);

                return normalizedStats;
            } catch (err) {
                const message = getErrorMessage(
                    err,
                    "Failed to load movement statistics."
                );

                setStatsError(message);
                
                return null;
            } finally {
                setStatsLoading(false);
            }
        },
        [filters]
    );

    /* Fetch list + statistics together. */
    const refresh = useCallback(
        async () => {
            const results = await Promise.allSettled([
                fetchMovements(),
                fetchStats(), 
            ]);

            return results; 
        },
        [fetchMovements, fetchStats]
    );

    /* 
    * Automatically fetch data.
    * Fetching is intentionally separated from the 
    * filter-update operation so consumers can choose 
    * whether filters should be automatic.
    */
    useEffect(() => {
        if (!autoFetch) {
            return;
        }

        fetchMovements();
    }, [
        autoFetch,
        fetchMovements,
    ]);

   /* Fetch statistics when filters change. */
    useEffect(() => {
        if (!autoFetch) {
            return;
        }

        fetchStats();
    }, [
        autoFetch,
        fetchStats,
    ]);
    
    /* Update one or multiple filters.
    * 
    * Supports:
    * 
    * updateFilters({
    *   type: "STOCK_IN"
    * 
    * })  
    *  and: 
    * 
    *  updateFilters("type", "STOCK_IN")
    * 
    */
    const updateFilters = useCallback(
        (nameOrValues, value) => {
            setFilters((previous) => {
                if (
                    typeof nameOrValues === "string"
                ) {
                    return {
                        ...previous,
                        [nameOrValues]: value,
                    };
                }

                return {
                    ...previous,
                    ...DEFAULT_PAGINATION(nameOrValues || {}),
                };
            });

            setPagination((previous) => ({
                ...previous,
                page: 1,
            }));
        },
        []
    );

    /* Reset all filters. */
    const resetFilters = useCallback(() => {
        setFilters({
            ...DEFAULT_STOCK_MOVEMENT_FILTERS,
        });
        
        setPagination((previous) => ({
            ...previous,
            page: 1, 
        })); 
    }, []);

    /* Change current page. */
    const changePage = useCallback(
        (nextPage) => {
            setPagination((previous) => {
                const page = Number(nextPage);

                if (
                    !Number.isFinite(page) ||
                    page < 1 || 
                    page > previous.totalPages
                ) {
                    return previous;
                }

                return {
                    ...previous,
                    page,
                };
            });
        },
        []
    );

    /* Change page size */
    const changePageSize = useCallback(
        (limit) => {
            const nextLimit = Number(limit);

            if (
                !Number.isFinite(nextLimit) ||
                nextLimit <= 0
            ) {
                return;
            }

            setPagination((previous) => ({
                ...previous,
                limit: nextLimit,
                page: 1
            }));
        },
        []
    );

    /* Go to next page. */
    const nextPage = useCallback(() => {
        setPagination((previous) => {
            if (
                previous.page >= previous.totalPages 
            ) {
                return previous;
            }

            return {
                ...previous,
                page: previous.page + 1,
            };
        });
    }, []);

    /* Go to previous page. */
    const previousPage = useCallback(() => {
        setPagination((previous) => {
            if (previous.page <= 1) {
                return previous;
            }

            return {
                ...previous,
                page: previous.page - 1,
            };
        });
    }, []);

    /* Fetch a single movement. */
    const fetchMovement = useCallback(
        async (movementId) => {
            if (!movementId) {
                throw new Error(
                    "Movement ID is requried."
                );
            }

            setMutationError(null);

            try {
                const response = await getStockMovement(
                    movementId
                );

                const movement = 
                    response?.data ??
                    response?.movement ??
                    response;
                setSelectedMovement(movement);

                return movement;
            } catch (err) {
                const message = getErrorMessage(
                    err,
                    "Failed to load stock movement."
                );

                setMutationError(message);

                throw err;
            }
        },
        []
    );

    /* Create a new stock movement. */
    const addMovement = useCallback(
        async (movementData) => {
            setMutationLoading(true);
            setMutationError(null);;

            try {
                const response = await createStockMovement(
                    movementData
                );

                const movement = 
                    response?.data ?? 
                    response?.movement ??
                    response;

                await refresh();

                return movement;
            } catch (err) {
                const message = getErrorMessage(
                    err,
                    "Failed to create stock movement."
                );

                setMutationError(message);

                throw err;
            } finally {
                setMutationLoading(false);
            }
        },
        [refresh]
    );

    /* Update a stock movement */
    const editMovement = useCallback(
        async (
            movementId,
            movementData
        ) => {
            if (!movementId) {
                throw new Error(
                    "Movement ID is required."
                );
            }

            setMutationError(true);
            setMutationError(null);

            try {
                const response = await updateStockMovement(
                    movementId,
                    movementData 
                );

                const movement =
                    response?.data ??
                    response?.movement ?? 
                    response;

                setSelectedMovement(movement);

                await refresh();
                return movement;

            } catch (err) {
                const message = 
                    getErrorMessage(
                        err,
                        "Failed to update stock movement."
                    );

                setMutationError(message);

                throw err;
            } finally {
                setMutationLoading(false);
            }
        },
        [refresh]
    );

    /* Deleting a stock movement. */
    const removeMovement = useCallback(
        async (movementId) => {
            if (!movementId) {
                throw new Error (
                    "Movement ID is required."
                )
            }

            setMutationLoading(true);
            setMutationError(null);

            try {
                const response = 
                    await deleteStockMovement(
                        movementId 
                    );

                setMovements((previous) => 
                    previous.filter(
                        (movement) =>
                            movement.id !== movementId 
                    )    
                );

                setSelectedMovement((previous) => 
                    previous?.id === movementId
                        ? null 
                        : previous 
                );

                await refresh();

                return response;
            } catch (err) {
                const message =  
                    getErrorMessage(
                        err,
                        "Failed to delete stock movement."
                    );

                setMutationError(message);

                throw err;
            } finally {
                setMutationLoading(false);
            }
        },
        [refresh]
    );

    /* Derived values */
    const hadMovements = 
        movements.length > 0;

    const hasActiveFilters = useMemo(
        () =>
            Object.values(fitlers).some(
                (value) => 
                    value != undefined && 
                    value !== null && 
                    value !== ""
            ),
        [filters]
    );

    const isFirstPage = 
        pagination.page <= 1;

    const isLastPage =
        pagination.page >=
        pagination.totalPages;

    return {
        /* Data */
        movements,
        stats,
        selectedMovement,

        /* filters */
        filters,
        updateFilters,
        resetFilters,
        hasActiveFilters,

        /* Pagination */
        pagination,
        changePage,
        changePageSize,
        nextPage,
        previousPage,
        isFirstPage,
        isLastPage,

        /* Loading */
        loading,
        statsLoading,
        mutationLoading,

        /* Errors */
        error,
        statsError,
        mutationError,

        /* Fetch */
        fetchMovement,
        fetchStats,
        fetchMovement,
        refresh,

        /* Mutations */
        addMovement,
        editMovement,
        removeMovement,

        /* Selection */
        clearSelectedMovement,

        /* Error handling */
        clearErrors,

        /* Convenience */
        hasMovements,
    };
};

export default useStockMovements;



    
