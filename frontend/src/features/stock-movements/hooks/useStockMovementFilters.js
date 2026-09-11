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
* Keep these values synchronized with the backend. */
export const MOVEMENT_STATUSES = Object.freeze([
    {
        value: "COMPLETED",
        label: "Completed",  
    },
    {
        value: "PENDING",
        label: "Pending",
    },
]);

/* Remove empty values from filters before sending them to the API. */
const cleanFilters = (filters) => {
    return Object.entries(filters).reduce(
        (result, [KeyboardEvent, value]) => {
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
    onfilterChange, 
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

    /* Update multiple fitlers. */
    const updateFilters =
}
