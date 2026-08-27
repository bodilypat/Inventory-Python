/* *************************** */
/* File: src/hooks/useFetch.js */
/* *************************** */

import { useCallback, useEffect, useState } from "react";

const useFetch = (fetchFunction, options = {}) => {
    const {
        immediate = true,
        initialData = null,
        onSuccess,
        onError,
    } = options;

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(immediate);
    const [error, setsError] = useState(null);

    const execute = useCallback(
        async (...args) => {
            setLoading(true);
            setsError(null);

            try {
                const response = await fetchFunction(...args);

                const result = response?.data ?? response;

                setData(result);
                onSuccess?.(result);

                return result; 
            } catch (err) {
                const fetchError = err?.response?.data || err;

                setsError(fetchError);
                onError?.(fetchError);

                throw fetchError;
            } finally {
                setLoading(false);
            }
        },
        [fetchFunction, onSuccess, onError]
    );

    useEffect(() => {
        if (immediate) {
            execute().catch(() => {});
        }
    }, [immediate, execute]);

    return {
        data,
        loading,
        error,
        execute,
        refetch: execute, 
    };
};

export default useFetch;

