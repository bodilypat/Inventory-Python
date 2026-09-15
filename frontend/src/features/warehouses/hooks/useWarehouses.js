/* **************************************************** */
/* File: src/features/warehouses/hooks/useWarehouses.js */ 
/* **************************************************** */
import { useCallback, useEffect, useMemo, useState } from "react";
import warehousesApi from "../services/warehousesApi";

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

const normalizeListResponse = (response) => {
    const data = response?.data ?? response ?? {};

    if (Array.isArray(data)) {
        return {
            warehouses: data,
            pagination: DEFAULT_PAGINATION 
        };
    }

    return {
        warehouses:
            data.warehouses ||
            data.items || 
            data.results || 
            [],
        
        pagination: {
            page:
                data.pagination?.page ?? 
                data.page ??
                1,

            limit:
                data.pagination?.page ??
                data.limit ?? 
                10,

            total:
                data.pagination?.total ??
                data.total ??
                0,

            totalPages:
                data.pagination?.totalPage ??
                data.totalPages ?? 
                0,
        }, 
    }; 
};

const normalizeWarehouseResponse = (response) => {
    const data = response?.data ?? response ?? {};

    return (
        data.warehouse || 
        data.data || 
        data 
    );
};

const useWarehouses = (initialOptions = {}) => {
    const [warehouses, setWarehouses] = useState([]);

    const [selectedWarehouse, setSelectedWarehouse] = 
        useState(null);

    const [warehouseStats, setWarehouseStats] =
        useState(null);

    const [filters, setFilters] = useState({
        ...DEFAULT_FILTERS,
        ...(initialOptions.filters || {}),
    });

    const [pagination, setPagination] = ({
        ...DEFAULT_PAGINATION,
        ...(initialOptions.pagination || {}),
    });

    const [loading, setLoading] = useState(false);
    const [detailsLoading, setDetailsLoading] = 
        useState(false);
    const [statsLoading, setStatsLoading] = 
        useState(false);
    const [submitting, setSubmitting] = 
        useState(false);
    const [deleting, setDeleting] =
        useState(false);
    const [transferring, setTransferring] = 
        useState(false);

    const [error, setError] = useState(null);
    const [detailsError, setDetailsError] = 
        useState(null);
    
    const [statsError, setStatsError] = 
        useState(null);

    /* Fetch warehouse list */
    const fetchWarehouses = useCallback(
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

                const response = await warehousesApi.getWarehouses(params);

                const result = normailizeListResponse(response);

                setPagination((previous) => ({
                    ...previous,
                    ...result.pagination,
                }));

                return result.warehouses;
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

    /* Get a single warehouse */
    const fetchWarehouse = useCallback(
        async (warehouseId) => {
            if (!warehouseId) {
                setSelectedWarehouse(null);
                return null;
            }

            try {
                setDetailsLoading(true);
                setDetailsError(null);

                const response = 
                    await warehousesApi.getWarehouse(
                        warehouseId 
                    );

                const warehouse = 
                    normalizeWarehouseResponse(response);

                setSelectedWarehouse(warehouse);

                return warehouse;
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

    /* Get warehouse statistics */
    const fetchWarehouseStats = useCallback(
        async (warehouseId) => {
            if (!warehouseId) {
                setWarehouseStats(null);
                return null;
            }

            try {
                setStatsLoading(true);
                setStatsError(null);

                const response = 
                    await warehousesApi.getWarehouseStats(
                        warehouseId 
                    ); 

                const data = 
                    response?.data ??
                    response?.stats ??
                    response ??
                    {};
                
                const stats = 
                    data.stats || 
                    data;

                setWarehouseStats(stats);

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

    /* Create warehouse */
    const createWarehouse = useCallback(
        async (warehouseData) => {

            try {
                setSubmitting(true);
                setError(null);

                const response = 
                    await warehousesApi.createWarehouse(
                        warehouseData 
                    );

                const warehouse = 
                    normalizeListResponse(response);

                    setWarehouses((previous) => [
                        warehouse,
                        ...previous,
                    ]);

                    return {
                        success: true,
                        warehouse,
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

    /* Update warehouse */
    const updateWarehouse = useCallback(
        async (warehouseId, warehouseData) => {
            try {
                setSubmitting(true);
                setError(null);

                const response = 
                    await warehousesApi.updateWarehouse(
                        warehouseId,
                        warehouseData 
                    );

                const updateWarehouse =
                    normalizeWarehouseResponse(response);
                
                setWarehouses((previous) => 
                    previous.map((warehouse) => 
                    (warehouse.id || 
                        warehouse.id) === warehouseId 
                           ? updateWarehouse
                           : warehouse 
                    ) 
                );

                setSelectedWarehouse((previous) => {
                    if (
                        !previous || 
                        (previous.id || previous._id) !==
                            warehouseId
                    ) {
                        return previous;
                    }

                    return updateWarehouse; 
                });

                return {
                    success: true,
                    warehouse: updateWarehouse,
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

    /* Delete warehouse */
    const deleteWarehouse = useCallback(
        async (warehouseId) => {
            try {
                setDeleting(true);
                setError(null);

                await warehousesApi.deleteWarehouse(
                    warehouseId 
                );

                setWarehouses((previous) => 
                    previous.filter(
                        (warehouse) =>
                            (warehouse.id ||
                                warehouse._id) !== warehouseId
                    )
                );

                setSelectedWarehouse((previous) => {
                    if (
                        previous && 
                            (previous.id || previous._id) ===
                                warehouseId
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

    /* Change warehouse status */
    const updateWarehouseStatus = useCallback(
        async (warehouseId, status) => {

            try {
                setSubmitting(true);
                setError(null);

                const response = 
                    await warehousesApi.updateWarehouseStatus(
                        warehouseId,
                        status 
                    );

                const updatedWarehouse = 
                    normalizeWarehouseResponse(response);

                setWarehouses((previous) => 
                    previous.map((warehouse) => 
                        (warehouse.id || 
                            warehouse._id) === warehouseId 
                            ? {
                                ...warehouse,
                                ...updatedWarehouse,
                                status:
                                    updatedWarehouse.status || 
                                    statuus,
                            }
                        : warehouse
                    )
                );

                setSelectedWarehouse((previous) => {
                    if (
                        !previous ||
                        (previous.id || previous._id) !==
                            warehouseId 
                    ) {
                        return previous; 
                    }

                    return {
                        ...previous,
                        ...updatedWarehouse,
                        status:
                            updatedWarehouse.status || status, 
                    }; 
                });

                return {
                    success: true,
                    warehouse: updatedWarehouse,
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
            }; 
        } ,
        []
    );

    /* Transfer stock between warehouses */
    const transferStock = useCallback(
        async (transferData) => {

            try {
                setTransferring(true);
                setError(null);

                const response = 
                    await warehousesApi.transferStock(
                        transferData 
                    );

                return  {
                    success: true,
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
                setTransferring(false);
            }
        },
        [] 
    );

    /* Filter helpers */
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

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);

        setPagination((previous) => ({
            ...previous,
            page: 1,
        }));
    }, []);

    /* Pagination */
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

    /* Selection */
    const selectWarehouse = useCallback(
        (warehouse) => {
            setSelectedWarehouse(warehouse);
        },
        [] 
    );

    const clearSelectedWarehouse = useCallback(() => {
        setSelectedWarehouse(null);
        setWarehouseStats(null);
        setDetailsError(null);
        setStatsError(null);
    }, []);

    /* Error helpers */
    const clearError = useCallback(() => {
        setError(null);
        setDetailsError(null);
        setStatsError(null);
    }, []);

    /* Refresh */
    const refresh = useCallback(async () => {
        return fetchWarehouse();
    }, [fetchWarehouse]);

    /* Derived values */
    const activeWarehouses = useMemo(
        () => 
            warehouses.filter(
                (warehouse) => 
                    String(warehouse.status).toLowerCase() ===
                    "active"
            ),
        [warehouses]
    );

    const inactiveWarehouses = useMemo(
        () => 
            warehouses.filter(
                (warehouse) =>
                    String(warehouse.status).toLowerCase() !== 
                    "active"
            ),
        [warehouses]
    );

    const totalStock = useMemo(
        () => 
            warehouses.reduce(
                (total, warehouse) =>
                    total + 
                    Number(
                        warehouse.totalStock ?? 
                        warehouse.stockQuantity ??
                        0     
                    ),
                0
            ),
        [warehouses]
    );

    const totalInventoryValue = useMemo(
        () => 
            warehouses.reduce(
                (total, warehouse) => 
                    total + 
                    Number(
                        warehouse.inventoryValue ??
                        warehouse.totalValue ?? 
                        0 
                    ),
                0  
            ),
        [warehouses]
    );

    const summary = useMemo(
        () => ({
            total: warehouses.length,
            active: activeWarehouses.length,
            inactive: inactiveWarehouses.length,
            totalStock,
            totalInventoryValue,
        }),
        [
            warehouses,
            activeWarehouses,
            inactiveWarehouses,
            totalStock,
            totalInventoryValue,
        ]
    );

    /* Initial warehouse fetch */
    useEffect(() => {
        fetchWarehouse();
    }, [fetchWarehouses]);

    return {
        //Data 
        warehouses,
        selectedWarehouse,
        warehouseStats,
        summary,

        //Filters 
        filters,
        updateFilters,
        setFilters: updateFilters,
        resetFilters,

        // Pagination 
        pagination,
        changePage,
        changeLimit,

        // Selection 
        selectWarehouse, 
        clearSelectedWarehouse,

        // Loading 
        loading,
        detailsLoading,
        statsLoading,
        submitting,
        deleting,
        transferring, 

        // Errors 
        error,
        detailsError,
        statsError,
        clearError,

        // CRUD 
        fetchWarehouses,
        fetchWarehouse,
        fetchWarehouseStats,
        createWarehouse,
        updateWarehouse,
        deleteWarehouse,
        updateWarehouseStatus,

        // Stock transfer 
        transferStock,

        // Refresh 
        refresh,
        refetch: refresh,
    };
};

export default useWarehouses;


