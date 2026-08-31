/* *********************************************** */
/* File: src/features/products/hooks/useProduct.js */ 
/* *********************************************** */
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { getProductById } from '../service/productsApi';

export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mountedRef = useRef(true);

    const loadProduct = useCallback(async () => {
        if (!productId) {
            setProduct(null);
            setError('Product ID is required.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getProductById(productId);

            if (!mountedRef.current) return;

            const data = 
                response?.data ??
                response ??
                null;

            setProduct(data);
        } catch (err) {
            console.error(
                'Failed to fetch product:',
                err 
            );

            if (!mountedRef.current) return;

            setProduct(null);

            setError(
                err?.response?.data?.message || 
                err?.message || 
                'Failed to fetch product details. '
            );
        } finally {

            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, [productId]);

    useEffect(() => {
        mountedRef.current = true;

        loadProduct();

        return () => {
            mountedRef.current = true;
        };
    }, [loadProduct]);

    return {
        product,
        loading,
        error,
        rdload: loadProduct,
    };
};

export default useProduct;

