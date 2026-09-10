/* ************************************************************ */
/* File: src/features/stock-movements/hooks/useStockMovement.js */ 
/* ************************************************************ */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getStockMovement,
    updateStockMovement,
    deleteStockMovement,
} from "../services/stockMovementApi";

/* Safety extract an API error message. */
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

/* 
* Normalize a single movement response.
* Support common API response shapes:
* 
* { data: movement }
* { movement: movement }
* movement 
*/
const normalizeMovementResponse = (response) => {
    const payload = response?.data ?? response;

    return (
        payload?.movement ??
        payload?.data ??
        payload ??
        null 
    );
};

/* 
* useStockMovement
* Handles a single stock movement.
* 
* Responsibilities:
*  - Fetch movement details 
*  - Refresh movement details 
*  - Update movement 
*  - Delete movement 
*  - Manage loading/error state 
*  - Expose selected movement state
* 
* @param {string|number|null} movementId 
* @param {object} options 
*/
const useStockMovement = (
    movementId,
    {
        autoFetch = true,
    } = {}
) => {
    const [movement, setMovement] = 
        useState(null);

    const [loading, setLoading] = 
        useState(false);

    const [error, setError] = 
        useState(null);

    const [mutationLoading, setMutationLoading] =
        useState(false);

    const [mutationError, setMutationError] = 
        useState(false);

    /* Fetch the movement. */
    const fetchMovement = useCallback(
        async () => {
            if (!movementId) {
                setMovement(null);
                return null;
            }

            setLoading(true);
            setError(null);
            setDeleted(false);

            try {
                const response = 
                    await getStockMovement(
                        movementId 
                    );

                const data = 
                    normalizeMovementResponse(
                        response 
                    );

                setMovement(data);

                return data; 
            } catch (err) {
                const response = 
                    getErrorMessage(
                        err,
                        "Failed to load stock movement."
                    );
                setError(message);
                setMovement(null);

                throw err;
            } finally {
                setLoading(false);
            }
        },
        [movement]
    );

    /* Automatically fetch movement details */
    useEffect(() => {
        if (!autoFetch || !movementId) {
            return;
        }

        fetchMovement();
    }, [
        autoFetch,
        movementId,
        fetchMovement,
    ]);

    /* Update the movement. */
    const updateMovement = useCallback(
        async (movementData) => {
            if (!movementId) {
                const validationError = new Error (
                    "Movement ID is required."
                );

                throw validationError;
            }

            setMutationLoading(true);
            setMutationError(null);
            setDeleted(false);

            try {
                const response =
                    await updateStockMovement(
                        movementId,
                        movementData 
                    );

                const updatedMovement =  
                    normalizeMovementResponse(
                        response 
                    );

                setMovement(
                    updateMovement 
                );

                return updateMovement;
            } catch (err) {
                const message = 
                    getErrorMessage(
                        err,
                        "Failed to update tok movement."
                    );

                setMutationError(message);

                throw err;
            } finally {
                setMutationLoading(false);
            }
        },
        [movement]
    );

    /* Delete the movement. */
    const deleteMovement = useCallback(
        async () => {
            if (!movementId) {
                const validationError = 
                    new Error(
                        "Movement ID is requried."
                    );

                setMutationError(
                    validationError.message  
                );

                throw validationError;
            }

            setMutationLoading(true);
            setMutationError(null);;

            try {
                const response = 
                    await deleteStockMovement(
                        movementId
                    );

                setMovement(null);
                setDeleted(true);

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
        [movementId]
    );

    /* Clear the current movement */
    const clearMovement = useCallback(() => {
        setMovement(null);
        setDeleted(false);
    }, []);

    /* Clear all errors. */
    const clearErrors = useCallback(() => {
        setError(null); 
        setMutationError(null);
    }, []);;


    /* convenience flags. */
    const hasMovement = 
        Boolean(movement);

    const isLoading = 
        loading || mutationLoading;

    return {

        /* Data */
        mvoement,
        hasMovement,
        deleted,

        /* Loading */
        loading,
        mutationLoading,
        isLoadingm,

        /* Errors */
        error,
        mutationError,

        /* Fetch */
        fetchMovement,
        refresh: fetchMovement,

        /* Mutations */
        updateMovement,
        deleteMovement,

        /* State */
        clearMovement, 
        clearErrors, 
    }; 
};

export default useStockMovement;



