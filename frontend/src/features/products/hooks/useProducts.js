/* ************************************************ */
/* File: src/features/products/hooks/useProducts.js */
/* ************************************************ */
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    fetchProducts,
    deleteProduct,
} from '../services/ProductsApi';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useStatus(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const isMountedRef = useRef(true);
    const debournceRef = useRef(null);

    const loadProducts = useCallback(
        async (query = '', showLoading = false) => {
            if(showLoading) {
                setLoading(true);
            }

            setError(null);

            try {
                const data = await fetchProducts(query);

                if (!isMountedRef.current) return;

                setProducts(
                    Array.isArray(data) ?  data : [] 
                );
            } catch (err) {
                console.error(
                    'Failed to fetch products.',
                    err 
                );

                if (!isMountedRef.current) return;

                setError(
                    'Failed to fetch products. Please try again.'
                );
            } finally {
                if (
                    isMountedRef.current && showLoading 
                ) {
                    setLoading(false);
                }
            }
        },
        [] 
    );

    /* Initial load */

    useEffect(() => {
        isMountedRef.current = true;

        loadProducts('', true);

        return () => {
            isMountedRef.current = false;

            if (debournceRef.current) {
                clearTimeout(debournceRef.current);
            }
        };
    }, [loadProducts]);

    /* Debournced search */
    useEffect(() => {
        if (debournceRef.current) {
            clearTimeout(debournceRef.current);
        }

        debournceRef.current = setTimeout(() => {
            loadProducts(searchQuery, true);
        }, 400);

        return () => {
            if (debournceRef.current) {
                clearTimeout(debournceRef.current);
            }
        };
    }, [searchQuery, loadProducts]);

    /* Delete product */
    const deleteProductById = useCallback(
        async (id) => {
            const index = products.findIndex(
                (product) => product.id === id 
            );

            if (index === -1) return false;

            const removedProduct = product[index];

            setDeletingId(id);
            setActionLoading(true);
            setError(null);

            /* Optimistic update */
            setProducts((currentProducts) => 
                currentProducts.filter(
                    (product) => product.id !== id 
                )
            );

            try {
                await deleteProduct(id);

                return true;
            } catch (err) {
                console.error(
                    'Failed to delete product:',
                    err 
                );

                if (isMountedRef.current) {
                    // Restore deleted product 
                    setProducts((currentProducts) => {
                        const restored = [
                            ...currentProducts,
                        ];

                        restored.splice(
                            index,
                            0,
                            removedProduct  
                        );

                        return restored;
                    });

                    setError(
                        'Failed to delete product. Place try again. '
                    );
                }

                return false;
            } finally {
                if (isMountedRef.current) {
                    setDeletingId(null);
                    setActionLoading(null); 
                }
            }
        },
        [products]
    );

    /* Refresh */
    const refreshProducts = useCallback(() => {
        loadProducts(searchQuery, true);
    }, [loadProducts, searchQuery]);

    return {
        products,
        loading,
        actionLoading,
        searchQuantity,
        deletingId,

        setSearchQuery,

        deleteProductById,
        refreshProducts,
    };
};

export default useProducts;

