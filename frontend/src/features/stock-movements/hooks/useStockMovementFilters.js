/* ******************************************************************* */
/* File: src/features/stock-movements/hooks/useStockMovementFilters.js */
/* ******************************************************************* */

import {
    useCallback,
    useMemo,
    useState,
} from "react";

/* Default stock movement filters. */
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

/* Supported movement types. */
export const MOVEMENT_TYPES = Object.freeze([
    {
        value: "STOCK_IN",
        label: "Stock In",
    },
    {
        value: "STOCK_OUT",
        label: "Stock Out",
    },
    {
        value: "ADJUSTMENT",
        label: "Adjustment", 
    },
    {
        value: "TRANSFER_IN",
        label: "Transfer In", 
    },
    {
        value: "TRANSFER_OUT",
        label: "Transfer In", 
    },
]);

/* supported movement directions. */
export const MOVEMENT_DIRECTIONS = Object.freeze([
    {
        value: "IN",
        label: "Stock In", 
    },
    {
        value: "OUT",
        label: "Stock Out",
    }, 
]);

/* Supported statuses.
* 
* Keep these values synchronized with the backend. 
*/
export const MOVEMENT_STATUSES = Object.freeze([
    {
        value: "COMPLETED",
        label: "Completed",  
    },
    {
        value: "PENDING",
        label: "Pending",
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
    }
]);

/* Remove empty values from filters before sending them to the API. */
const cleanFilters = (filters) => {
    return Object.entries(filters).reduce(
        (result, [key, value]) => {
            if (
                value !== undefined && 
                value !== null &&
                value !== ""  
            ) {
                result[key] = value;
            }

            return result; 
        },
        {}
    );
};


/* Hook for stock movement filtering.
* 
* Responsibilities:
*  - Maintain filter state 
*  - Update individual filters 
*  - Update multiple filters 
*  - Reset filters 
*  - Track active filters 
*  - Prepare API - ready filters 
*  - Handle date validation 
*  - Reset pagination when filters change
*/
const useStockMovementFitlers = ({
    initialFilters = {},
    onFiltersChange, 
} = {})  => {
    const [filters, setFilters] = useState(() => ({
        ...DEFAULT_STOCK_MOVEMENT_FILTERS,
        ...initialFilters,
    }));

    /* Update a single filter. */
    const setFilter = useCallback(
        (name, value) => {
            setFilters((previous) => {
                const nextFilters = {
                    ...previous,
                    [name]: value, 
                };

                onFiltersChange?.(
                    nextFilters 
                );

                return nextFilters; 
            }); 
        }, 
        [onFiltersChange]
    );

    /* Update multiple filters. */
    const updateFilters = useCallback(
        (values) => {
            if (!values || typeof values !== "object") {
                return;
            }

            setFilters((previous) => {
                const nextFilters = {
                    ...previous,
                    ...values,
                };

                onFiltersChange?.(
                    nextFilters 
                ); 

                return nextFilters; 
            }); 
        },
        [onFiltersChange]
    );

    /* Handle input/select change events directly. */
    const handleFilterChange = useCallback(
        (event) => {
            const {
                name,
                value,
                type,
                checked,
            } = event.target;

            const nextValue = 
                type === "checkbox"
                    ? checked
                    : value;

            setFilter(name, nextValue);
        },
        [setFilter]
    );

    /* Set search value. */
    const setSearch = useCallback(
        (value) => {
            setFilter("search", value);
        },
        [setFilter]
    );

    /* Set movement type. */
    const setType = useCallback(
        (value) => {
            setFilter("type", value);
        },
        [setFilter]
    );

    /* Set warehouse. */
    const setWarehouse = useCallback(
        (value) => {
            setFilter("warehouseId", value);
        },
        [setFilter]
    );

    /* Set category. */
    const setCategory = useCallback(
        (value) => {
            setFilter("categoryIdd", value); 
        },
        [setFilter]
    );

    /* Set product. */
    const setProduct = useCallback(
        (value) => {
            setFilter("productId", value); 
        },
        [setFilter]
    );

    /* Set direction. */
    const setDirection = useCallback(
        (value) => {
            setFilter("direction", value); 
        },
        [setFilter]
    );

    /* Set status. */
    const setStatus = useCallback(
        (value) => {
            setFilter("status", value); 
        },
        [setFilter]
    );

    /* Set start data. */
    const setFormDate = useCallback(
        (value) => {
            setFilter("fromDate", value);
        },
        [setFilter]
    );

    /*  Set end date. */
    const setToDate = useCallback(
        (value) => {
            setFilter("toDate", value);
        },
        [setFilter]
    );

    /* Reset all filters. */
    const resetFilters = useCallback(() => {
        const resetValues = {
            ...DEFAULT_STOCK_MOVEMENT_FILTERS,
        };

        setFilters(resetValues);

        onFiltersChange?.(
            resetValues
        );
    }, [onFiltersChange]);

    /* Reset one filter. */
    const clearFilter = useCallback(
        (name) => {
            if (
                !Object.prototype.hasOwnProperty.call(
                    DEFAULT_STOCK_MOVEMENT_FILTERS,
                    name 
                )
            ) {
                return;
            }

            setFilter(
                name,
                DEFAULT_STOCK_MOVEMENT_FILTERS[name]
            );
        },
        [setFilter]
    );

    /* Check whether a specific filter is active. */
    const isFilterActive = useCallback(
        (name) => {
            const value = filters[name];

            return (
                value !== undefined && 
                value !== null && 
                value !== "" 
            ); 
        },
        [filters]
    );

    /* Number of active filters. */
    const activeFilterCount = useMemo(() => {
        return Object.values(filters).filter(
            (value) => 
                value !== undefined && 
                value !== null && 
                value !== "" 
        ).length;
    }, [filters]);

    /* Whether any filter is active. */
    const hasActiveFilters = activeFilterCount > 0;

    /* Date range validation. */
    const dateRangeError = useMemo(() => {
        if (
            !filters.fromDate || 
            !filters.toDate 
        ) {
            return null; 
        }

        const from = new Date(
            `${filters.fromdate}T00:00:00`
        );

        const to = new Date(
            `${filters.toDate}T00:00:00`
        );

        if (
            Number.isNaN(from.getTime()) || 
            Number.isNaN(to.getTime())
        ) {
            return "Invalid date range.";
        }

        if (from > to) {
            return "From date cannot be later than the To date.";
        }

        return null;
    }, [
        filters.fromDate,
        filters.toDate, 
    ]);

    /* Whether the current date range is valid. */
    const isDateRangeValid = !dateRangeError;

    /* API-ready filter object.
    *  Date validation is intentionally not silently corrected.
    * The consumer can display dateRageError.
    */ 
   const apiFilters = useMemo(() => {
        return cleanFilters(filters);
   }, [filters]);

   /* Filters suitable for query-string generation. */
   const queryParams = useMemo(() => {
    return new URLSearchParams(
            apiFilters
        ).toString();
   }, [apiFilters]);

   /* Get a copy of the current filters. */
   const getFilters = useCallback(() => {
        return {
            ...filters,
        };
   }, [filters]);

   return {
        /* State */
        filters,

        /* Raw filter data */
        apiFilters,
        queryParams,

        /* Generic operations */
        setFilters,
        updateFilters,
        handleFilterChange,
        clearFilter,
        resetFilters,
        getFilters,

        /* Individual setters */
        setSearch,
        setType,
        setWarehouse,
        setCategory,
        setProduct,
        setDirection,
        setStatus,
        setFromDate,
        setToDate,

        /* Status */
        hasActiveFilters,
        activeFilterCount,
        isFilterActive,

        /* Date validation */
        dateRangeError,
        isDateRangeValid,

        /* Options */
        movementTypes: MOVEMENT_TYPES,
        movementDirections:
            MOVEMENT_DIRECTIONS,
        movementStatuses:
            MOVEMENT_STATUSES 
   };
};
export default useStockMovementFilters;


