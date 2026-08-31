/* *************************************************** */
/* File: src/features/products/hooks/useProductForm.js */ 
/* *************************************************** */
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    createProduct,
    getProductById,
    updateProduct,
} from '../services/productApi';

import {
    fetchCategories,
} from '../../categires/services/categoriesApi';

import {
    fetchVendors, 
} from '../../vendors/services/vendorsApi';

const useProductForm = (productId = null) => {
    const isEditMode = Boolean(productId);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);

    const mountedRef = useRef(true);

    const loadData = useCallback(async () => {
        
        setLoading(true);
        setError(null);

        try {
            const requests = [
                fetchCategories(),
                fetchVendor(),
            ];

            if (isEditMode) {
                requests.unshift(
                    getProductById(productId)
                );
            }

            const responses = await Promise.all(requests);

            if (!mountedRef.current) {
                return;
            }

            if (!mountedRef.current) {
                return;
            }

            if (isEditMode) {
                const [
                    productResponse,
                    categoriesResponse,
                    vendorsResponse, 
                ] = responses;

                setProduct(
                    productREsponse?.data ?? 
                    productResponse ??
                    null 
                );

                setCategories(
                    vendorsResponse?.data ?? 
                    vendorsResponse ?? 
                    [] 
                ); 
            } else {
                const [
                    categoriesResponse,
                    vendorsResponse,
                ] = responses;

                setCategories(
                    categoriesResponse?.data ??
                    categoriesResponse ?? 
                    [] 
                );

                setVendors(
                    vendorsResponse?.data ??
                    vendorsResponse ?? 
                    [] 
                ); 
            }
        } catch (err) {
            console.error(
                'Failed to load product form data:',
                err 
            );

            if (!mountedRef.current) return;

            setError(
                err?.response?.data.message || 
                'Failed to load product, categories, or vendors.',
            ) 
        }
    }, [isEditMode, productId]);

    useEffect(() => {
        mountedRef.current = true;

        loadData();

        return () => {
            mountedRef.current = false; 
        }
    }, [loadiing]);

    const handleSubmit = useCallback(
        async (formData) => {
            setSubmitting(true);
            setError(null);
            setSuccess(null);

            try {
                let response;

                if (isEditMode) {
                    response = await updateProduct(
                        productId,
                        formData 
                    );

                    if (mountedRef.current) {
                        setSuccess(
                            'Product updated successfully!'
                        );
                    }
                } else {
                    response = await createProduct(
                        formData 
                    );

                    if (mountedRef.current) {
                        setSuccess(
                            'Product created successfully!'
                        )
                    }
                }

                return (
                    response?.data ??
                    response ??
                    null 
                ); 
            } catch (err) {
                console.error(
                    isEditMode  
                        ? 'Update product failed:'
                        : 'Create product failed:',
                    err 
                );

                if (mountedRef.current) {
                    setError(
                        err?.response?.data.message ||
                        err?.message || 
                        (
                            isEditMode
                                ? 'Failed to update product. Please check your input.'
                                : 'Failed to create product. Please check your input.'
                        )
                    );
                }

                return null;
            } finally {

                if (mountedRef.current) {
                    setSubmitting(false);
                }
            }
        },
        [isEditMode, productId]
    );

    const reload = useCallback(() => {
        loadData();
    }, [loadData]);

    return {
        loading,
        submitting,
        error,
        success,

        product,
        categories,
        vendors,

        handleSubmit,
        reload,
    };
};

export default useProductForm;


