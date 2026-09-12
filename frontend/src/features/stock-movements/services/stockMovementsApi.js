/* ******************************************************* */
/* File: src/features/stock-movements/services/salesApi.js */ 
/* ******************************************************* */
import api from "../../../service/api";

/* API endpoints */
const STOCK_MOVEMENTS_ENDPOINT = "/stock-movements";

/* --------------------------------------------------------------
* Helpers
* Normalize API errors so components/hooks receive 
* a predictable Error object.
----------------------------------------------------------------- */
const normalizeApiError = (
    error,
    fallbackMessage = "Something went wrong."
) => {
    const responseData = error?.response?.data;

    const message = 
        responseData?.message || 
        responseData?.error || 
        error?.message || 
        fallbackMessage;

    const normalizedError = new Error(message);

    normalizedError.status = error?.response?.status;

    normalizedError.code = 
        responseData?.code ||
        error?.code;

    normalizedError.details = 
        responseData?.errors || 
        responseData?.details || 
        null;

    normalizedError.originalError = error;

    return normalizedError;
};

/* --------------------------------------------------------------
*  Return the useful payload from an Axios response. 
*  This keeps the rest of the application from depending 
*  on the exact Axios response structure.
-----------------------------------------------------------------*/
const getResponseData = (
    response 
) => {
    return response?.data ?? null;
};

/* --------------------------------------------
*  Query helpers 
*  Convert filters into API query parameters.
-----------------------------------------------*/
const buildMovementParams = (
    params = {}
) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        type = "",
        direction = "",
        warehouseId = "",
        destinationWarehouseId = "", 
        productId = "",
        categoryId = "", 
        fromDate = "",
        toDate = "",
        reason = "",
        sortBy = "createdAt",
        sortOrder = "desc",
    } =  params;

    const query = {
        page,
        limit,
        sortBy,
        sortOrder
    };

    /* ----------------------------------------------------------
    *  Only include filters that actually have a value. 
    *  This product cleaner request. 
    -------------------------------------------------------------*/
    const optionalParams = {
        search,
        type,
        direction,
        warehouseId,
        destinationWarehouseId,
        productId,
        categoryId,
        fromDate,
        toDate,
        reason,
    };

    Object.entries(
        optionalParams 
    ).forEach(([key, value]) => {
        if (
            value !== undefined && 
            value !== null &&
            value !== ""
        ) {
            query[key] = value; 
        }
    });

    return query; 
};

/* --------------------------------------------------
* GET - List movements 
* Fetch stock movements with filters and pagination.
* 
* @param {Object} params 
* @returns {Promise<Object>}
-----------------------------------------------------*/ 
export const getStockMovements = async (
    params = {}
) => {
    try {
        const response = await api.get(
            STOCK_MOVEMENTS_ENDPOINT,
            {
                param: 
                    buildMovementParams(
                        params 
                    ), 
            }
        );

        const data = getResponseData(response);

        /* Support common backend response */
       return {
            movements:
                data?.movements ??
                data?.data ?? 
                (Array.isArray(data)
                    ? data 
                    : []),
            
            pagination:
                data?.pagination ?? 
                {
                    page: 
                        params.page ?? 1,
                    limit: 
                        params.limit ?? 10,
                    totalItems:
                        data?.totalItems ?? 0,
                    totalPages:
                        data?.totalPages ?? 1,
                },

            stats:
                data?.stats ?? null,
       };
    } catch (error) {
        throw normalizeApiError(
            error,
            "Failed to fetch stock movements."
        );
    }
};

/* --------------------------------------------
*  GET - Single movement
*  Fetch a single stock movement.
----------------------------------------------- */
export const getStockMovement = async (
    movementId 
) => {
    if (!movementId) {
        throw new Error(
            "Stock movement ID is required."
        );
    }

    try {
        const response = await api.get(
            `${STOCK_MOVEMENTS_ENDPOINT}/${movementId}`
        );

        const data = getReponseData(response);

        return (
            data?.movement ??
            data?.data ??
            data 
        );
    } catch (error) {
        throw normalizeApiError(
            error,
            "Failed to fetch stock movement."
        );
    }
};

/* --------------------------------------------
* POST - Create Movement 
* Create a generic stock movement.
* @param {Object} payload 
* @returns {Promise<Object>}
----------------------------------------------- */
export const createStockMovement = 
    async (payload) => {
        if (!payload) {
            throw new Error(
                "Stock move data is required."
            );
        }

        try {
            const response = 
                await api.post(
                    STOCK_MOVEMENTS_ENDPOINT,
                    payload 
                ); 

            const data = getResponseData(
                    response
            );

            return (
                data?.movement ?? 
                data?.data ?? 
                data 
            ); 
        } catch (error) {
            throw normalizeApiError(
                error,
                "Failed to create stock movement."
            );
        }
    };

/* -------------------------------------------------
* PUT/PATCH - Update movement 
*
* Update an existing stock movement.
* Normally stock movements should be immutable after 
* posting. If you backend does 
---------------------------------------------------- */
export const updateStockMovement = 
    async (
        movementId,
        payload
    ) => {
        if (!movementId) {
            throw new Error(
                "Stock movement ID is required."
            );
        }

        if (!payload) {
            throw new Error(
                "Stock movement data is required."
            );
        }

        try {
            const response = 
                await api.patch(
                    `${STOCK_MOVEMENTS_ENDPOINT}/${movementId}`,
                    payload 
                );

            const data = 
                getResponseData(
                    response 
                );

            return (
                data?.movement ?? 
                data?.data ?? 
                data 
            );                
        } catch (error) {
            throw normalizeApiError(
                error,
                "Failed to update stock movement. "
            ); 
        }
    };

/* ---------------------------------------------------
* DELETE - Delete movement 
* Delete a stock movement.
* Consider disabling this endpoint in production 
* if your inventory requires an immutable audit trail.
* 
* @param {string|number} movementId
------------------------------------------------------*/
export const deleteStockMovement = 
    async (movementId) => {
        if (!movementId) {
            throw new Error(
                "Stock movement ID is required."
            );
        }

        try {
            const response = 
                await api.delete(
                    `${STOCK_MOVEMENTS_ENDPOINT}/${movementId}`
                );

            return (
                getResponseData(
                    response
                ) ?? true 
            );
        } catch (error) {
            throw normalizeApiError(
                error,
                "Failed to delete stock movement."
            );
        }
    };

/* --------------------------------------------------
* POST - Stock In 
* Create a stock-in movement.
* This is kept as a convenience method so StockIn.jsx 
* does not need to KNOW api endpoint details.
-----------------------------------------------------*/
export const stockIn = async (
    payload 
) => {
    return createMovementByType(
        "STOCK_IN",
        payload 
    ); 
};

/* ----------------------------
* POST - Stock Out 
* Create a stock-out movement.
------------------------------- */
export const stockOut = async (
    payload
) => {
    return createMovementByType(
        "STOCK_OUT",
        payload 
    );
};

/* ----------------------------------
* POST - Adjustment  
* Create a stock adjustment movement. 
------------------------------------- */
export const stockAdjustment = 
    async (payload) => {
        return createMovementByType(
            "ADJUSTMENT",
            payload
        );
    };

/* ---------------------------------
* POST - Transfer 
* Create a stock adjustment movement 
------------------------------------*/
export const stockTransfer = async (
    payload 
) => { 
    return createMovementByType(
        "TRANSFER",
        payload 
    ); 
};

/* ---------------------------------------------
* Internal movement creator
* Create movement using the generic endpoint.
* 
* if you backend has separate endpoints, change
* only this function
------------------------------------------------ */
const createMovementByType = 
    async (
        type,
        payload 
    ) => {
        if (!payload) {
            throw new Error(
                "Stock movement data is required."
            );
        }

        const movementPayload = {
            ...paylooad,
            type, 
        };
    };

/* ------------------------------------------
* GET - Movement statistics
* Fetch movement statistics.
* @param {Object} params
* @returns {Promise<Object>}
--------------------------------------------- */
export const getStockMovementStats = 
    async (params = {}) => {
        try {
            const response = 
                await api.get(
                    `${STOCK_MOVEMENTS_ENDPOINT}/stats`,
                    {
                        params:
                            buildMovementParams(
                                params 
                            ), 
                    }
                );

            const data = 
                getResponseData(
                    response 
                );
            
            return (
                data?.stats ??
                data?.data ??
                data ??
                {}
            );
        } catch (error) {
            throw normalizeApiError(
                error,
                "Failed to fetch stock movement statistics."
            );
        }
    };

/* ---------------------------------------------
* GET - Movement timeline
* Fetch movement history for a specific product.
* Useful for MovementTimeline.jsx 
------------------------------------------------*/
export const getProductMovementTimeline = 
    async (
        productId,
        params = {}
    ) => {
        if (!productId) {
            throw new Error(
                "Product ID is required."
            );
        }

        try {
            const response =
                await api.get(
                    `${STOCK_MOVEMENTS_ENDPOINT}/product/${productId}/timeline`,
                    {
                        params:
                            buildMovementParams(
                                params 
                            ), 
                    }
                );

            const data = 
                getResponseData(
                    response 
                ); 

            return (
                data?.movements ??
                data?.timeline ??
                data?.data ?? 
                (Array.isArray(data)
                    ? data 
                    : []) 
            ); 
        } catch (error) {
            throw normalizeApiError(
                error,
                "Failed to fetch product movement timeline."
            );
        }
    };

/* ------------------------------------------
* GET - Warehouse movements 
* Fetch movements belonging to a warehouse.
---------------------------------------------*/
export const getWarehouseMovements = 
    async (
        warehouseId,
        params = {}
    ) => {

        if (!warehouseId) {
            throw new Error(
                "Warehouse ID is required."
            );
        }

        return getStockMovements({
            ...params,
            warehouseId,
        });
    }; 

/* -------------------------------------
* GET - Product movements 
* Fetch movement belonging to a product.
----------------------------------------*/
export const getProductMovements = 
    async (
        productId,
        params = {}
    ) => {

        if (!productId) {
            throw new Error(
                "Product ID is required."
            );
        }

        return getStockMovements({
            ...params,
            productId, 
        }); 
    };

/* -------------------------------------------------
* GET - Recent movements 
* Convenience method for dashboard/recent activity.
----------------------------------------------------*/
export const getRecentStockMovements = 
    async (
        limit = 10 
    ) => {
        return getStockMovements({
            page: 1,
            limit,
            sortBy: "CreatedAt",
            sortOrder: "desc", 
        }); 
    };

/* Exports */
const stockMovementsApi = {
    getStockMovements,
    getStockMovement,
    createStockMovement,
    updateStockMovement,
    deleteStockMovement,

    stockIn,
    stockOut,
    stockAdjustment,
    stockTransfer,

    getStockMovementStats,
    getProductMovementTimeline,
    getWarehouseMovements,
    getProductMovements,
    getRecentStockMovements,
};

export default stockMovementsApi;








