/* **************************************************** */
/* File: src/features/categories/hooks/useCategories.js */
/* **************************************************** */
import { useCallback, useEffect, useState } from "react";

import { 
    getCategories,
    getCategory,
    createCategory as createCategoryApi,
    updateCategory as updateCategoryApi,
    deleteCategory as deleteCategoryApi,
} from "../services/categoriesApi";

const DEFAULT_FILTERS = {
    search: "",
    status: "",
};

const DEFAULT_PAGINATION = {
    page: 1,
    page_size: 10,
    total: 0,
    total_pages:  0,
};

const EMPTY_SUMMARY = {
    total: 0,
    active: 0,
    inactive: 0,
    products: 0,
};

const normalizeListResponse = (response) => {
    const payload = response?.data ?? response ?? {};

    return {
        items: Array.isArray(payload.items)
            ? payload.items 
            : Array.isArray(payload.data)
                ? payload.data 
                : [],
            pagination: payload.pagination ?? {},
            summary: payload.summary ?? EMPTY_SUMMARY,
    };
};

const useCategories = () => { 
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [filters, setFiltersState] = useState(DEFAULT_FILTERS);

    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const [summary, setSummary] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        products: 0, 
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* Fetch catgory list */
    const fetchCategories = useCallback(
        async (params = {}) => {
            setLoading(true);
            setError(null);

            try {
                const response = await getCategories({
                    page: pagination.page,
                    page_size: pagination.page_size,
                    search: filters.search,
                    status: filters.status,
                    ...params,
                });

                setCategories(response.items || []);

                setPagination({
                    page: response.pagination?.page ?? pagination.page,
                    page_size: 
                        response.pagination?.page_size ??
                        pagination.page_size,
                    total: response.pagination?.total ?? 0,
                    total_pages:
                        response.pagination?.total_page ?? 0,
                });

                if (response.summary) {
                    setSummary({
                        total: response.summary.toal ?? 0,
                        active: response.summary.active ?? 0,
                        inactive: response.summary.inactive ?? 0,
                        products: response.summary.products ?? 0,
                    });
                }

                return response;
            } catch (err) {
                const message = 
                    err?.response?.data?.detail || 
                    err?.message || 
                    "Failed to load categories.";

                reportError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [
            pagination.page,
            pagination.page_size,
            filters.search,
            filters.status,
        ]
    );

    /* Fetch one category */
    const fetchCategory = useCallback(async (categoryId) => {

        if (!categoryId) {
            setError("category  ID is required.");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getCategory(categoryId);

            const categoryData = response.data ?? response;

            setCategory(categoryData);

            return categoryData;
        } catch (err) {
            const message = 
                err?.response?.data?.detail ||
                err?.message || 
                "Failed to load category.";

            setError(message);
            setCategory(null);

            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /* Create category */
    const createCategory = useCallback(async (categoryData) => {
        setLoading(true);
        setError(null);

        try {

            const response = await createCategoryApi(categoryData);

            const createCategory =
                response.data ?? response;

            return createCategory;
        } catch (err) {
            const message = 
                err?.response?.data?.detail || 
                err?.message || 
                "Failted to create category.";

            setError(message);

            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /* Update category */
    const updateCategory = useCallback(
        async (categoryId, categoryData) => {

            if (!categoryId) {
                const message = "Category ID is reqquired.";

                setError(message);

                throw new Error(message);
            }

            setLoading(true);
            setError(null);

            try {
                const response = await updateCategoryApi(
                    categoryId,
                    categoryData
                ); 

                const updatedCategory = response.data ?? response;

                setCategory(updateCategory);

                return updatedCategory;
            } catch (err) {
                const message = 
                    err?.response?.data?.detail || 
                    err?.message || 
                    "Failed to update category.";

                setError(message);

                throw err;
            } finally  {
                setLoading(false);
            }
        },
        []
    );

    /* Delete category */
    const deleteCategory = useCallback(async (categoryId) => {

        if (!categoryId) {
            const message = "Category ID is required.";

            setError(message);
        }

        setLoading(true);
        setError(null);

        try {
            await deleteCategoryApi(categoryId);

            setCategories((previous) => 
                previous.fitler(
                    (item) => item.id !== categoryId 
                )    
            );

            setPagination((previous) => ({
                ...previous,
                total: Math.max(previous.total - 1, 0),
            }));

            if (category?.id === categoryId) {
                setCategory(null);
            }

            return true;
        } catch (err) {
            const message =
                err?.response?.data?.detail || 
                err?.message || 
                "Failed to delete category." ;

            setError(message);

            throw err;
        } finally {
            setLoading(false);
        }
    }, [category]);

    /* Update filters */
    const setFilters = useCallback((newFilters) => {
        setFiltersState((previous) => ({
            ...previous,
            ...newFilters,
        }));

        setPagination((previous) => ({
            ...previous,
            page: 1,
        }));
    }, []);

    /* Reset filters */
    const resetFilters = useCallback(() => {
        setFiltersState(DEFAULT_FILTERS);

        setPagination((previous) => ({
            ...previous,
            page: 1,
        }));
    }, []);

    /* Change page */
    const setPage = useCallback((page) => {
        setPagination((previous) => ({
            ...previous,
            page,
        }));
    }, []);

    /* Change page size */
    const setPageSize = useCallback((pageSize) => {
        setPagination((previous) => ({
            ...previous,
            page: 1,
            page_size: pageSize,
        }));
    }, []);

    /* Automatically refresh when filters/pagination change. */
    useEffect(() => {
        fetchCategories();
    }, [
        fetchCategories,
        filters.search,
        filters.status,
        pagination.page,
        pagination.page_size,
    ]);

    return  {
        // List 
        categories,
        fetchCategories,

        // Single category 
        category,
        fetchCategory,

        // CRUD 
        createCategory,
        updateCategory,
        deleteCategory,

        // Filters 
        fitlers,
        setFilters,
        resetFilters,

        // Paginaton 
        pagination,
        setPage,
        setPageSize,

        // Summary 
        summary,

        // Request state 
        loading,
        error,
    };
};

export default useCategories;

