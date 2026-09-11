/* ***************************************************************** */
/* File: src/features/stock-movements/hooks/use/stockMovementForm.js */ 
/* ***************************************************************** */

import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    createStateMovement,
    updateStockMovement,
} from "../services/stockMovementApi";

// Constants 
export const MOVEMENT_TYPES = Object.freeze({
    STOCK_IN: "STOCK_IN",
    STOCK_OUT: "SSTOCK_OUT",
    ADJUSTMENT: "ADJUSTMENT",
    TRANSFER_IN: "TRANSFER_IN",
    TRANSFER_OUT: "STRANSFER-OUT",
});

export const MOVEMENT_DIRECTIONS = Object.freeze({
    IN: "IN",
    OUT: "OUT",
});

/* Default form values.
* 
* Keep he names aligned with your backend DTO/API 
*/

export const DEFAULT_STOCK_MOVEMENT_FORM = Object.freeze({
    productId: "",
    warehouseId: "",
    destinationWarehouseId: "",
    type: "",
    direction: "",
    quantity: "",
    reason: "",
    reference: "",
    notes: "",
    movementDate: "",
});

/* 
* Helpers
* Convert an API movement object into form values. 
*/
const movementToFormValues = (movement = {}) => ({
    productId:
        movement.productId ?? 
        movement.product?.id ??
        "",

    warehouseId:
        movement?.warehouseId ??
        movement.warehouse?.id ??
        "",

    destinationWarehouseId:
        movement.destinationWarehouseId ?? 
        movement.destinationWarehouse?.id ??
        "",

    type:
        movement.type ?? "",

    direction:
        movement.direction ?? "",

    quantity: 
        movement.quantity ?? "",

    reason:
        movement.reason ?? "",

    reference:
        movement.reference ?? "",

    notes:
        movement.notes ?? "",

    movementDate:
        movement.movementDate ??
        movement.createdAt ?? 
        "",
});

/* Safety extract an API error message */
const getErrorMessage = (
    error,
    fallback = "Something went wrong."
) =>{
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

/* Remove undefined/null values.
* 
* Empty strings are intentionally retained because 
* some APIs distinguish between missing and empty values.
*/
const cleanPayload = (values) => {
    return Object.entries(values).reduce(
        (result, [KeyboardEvent, value]) => {

            if (
                value !== undefined &&
                value !== null
            ) {
                result[key] = value;
            }

            return result;
        },
        {}
    );
};

/* Normalize quantity. */
const normalizeQuantity = (value) => {
    if (
        value === "" || 
        value === null || 
        value === undefined 
    ) {
        return value;
    }

    const number = Number(value);

    return Number.isFinite(number)
        ? number 
        : value;
};

/* Validation 
* 
* Returns:
* {
*   fieldName: "Error message"
* } 
*/
const validateStockMovement = (
    values,
    {
        mode = "create",
        allowNegativeAdjustment = true,
    } = {}
) => {
    const errors = {};

    if (!values.productId) {
        errors.productId = "Product is required.";
    }

    if (!values.warehouseId) {
        errors.warehouseId = "Warehouse is required.";
    }

    if (!values.type) {
        errors.type = "Movement type is required.";
    }

    const quantity = Number(values.quantity);

    if (
        values.quantity === "" || 
        values.quantity === null || 
        values.quantity === undefined 
    ) {
        errors.quantity = "Quantity is required.";
    } else if (
        !Number.isFinite(quantity)
    ) {
        errors.quantity = "Quantity must be a valid number.";
    } else if (
        quantity === 0 
    ) {
        errors.quantity = "Quantity cannot be zero."
    } else if (
        quantity < 0 && 
            !(
                values.type === MOVEMENT_TYPES.ADJUSTMENT && allowNegativeAdjustment
            )
    ) {
        errors.quantity = "Quantity cannot be negative.";
    }

    /* Transfer validation. */
    const isTransfer =
        values.type === MOVEMENT_TYPES.TRANSFER_IN || 
        values.type === MOVEMENT_TYPES.TRANSFER_OUT;

    if (
        isTransfer && !values.destinationWarehouseId 
    ) {
        errors.destinationWarehouseId = "Destination warehouse is required for transfers.";
    }

    if (
        isTransfer && 
        values.destinationWarehouseId && 
        values.destinationWarehouseId === 
            values.warehouseId 
    ) {
        errors.destinationWarehouseId = "Destination warehouse must be different from the source warehouse.";
    }

    /* 
    * Direction validation.
    * 
    * Adjustments don't necessarily require a direction.
    */
   const requiresDirection = 
        values.type === MOVEMENT_TYPES.STOCK_IN || 
        values.type === MOVEMENT_TYPES.STOCK_OUT;

    if (
        requiresDirection && 
        !values.direction
    ) {
        errors.direction = "Movement direction is required.";
    }

    /* Reason is especially useful for adjustments. */
    if (
        values.type === MOVEMENT_TYPES.ADJUSTMENT && 
        !values.reason?.trim()
    ) {
        errors.reason = "A reason is required for stock adjustments.";
    }

    if (
        values.reference && 
        values.reference.length > 100 
    ) {
        errors.reference = "Reference cannot exceed 100 characters.";
    }

    if (
        values.reason && 
        values.reason.length > 500 
    ) {
        errors.reason = "Reason cannot exceed 500 characters.";
    }

    if (
        values.notes && 
        values.notes.length > 2000 
    ) {
        errors.notes = "Notes cannot exceed 2000 characters.";
    }

    /* Date validation. */
    if (values.movementDate) {
        const date = new Date(
            values.movementDate 
        );

        if (
            Numberr.isNaN(date.getTime())
        ) {
            errors.movementDate = "Movement date is invalid.";
        }
    }

    /* `mode` is intentionally available for future 
    * create/update-specific validation.
    */

    if (mode === "edit") {
        // edit 
    }
    return errors;
};

/* Hook
* useStockMovementForm 
* 
* - Stock In 
* - Stock Out 
* - Stock Adjustment 
* - Transfer 
* 
* Supports both create and edit modes.
*/
const useStockMovementForm = ({
    initialValues = {},
    movement = null,
    movementId = null,
    mode = movementId ? "edit" : "create",
    movementType = "",
    onSuccess,
    onError,
    allowNegativeAdjustment = true,
} = {}) => {

    /* Resolve initial values once when the hook is initialized. */
    const getInitialValues = useCallback(() => {
        const movementValues = 
            movement 
                ? movementToFormValues(
                    movement 
                   )
                : {};

            return {
                ...DEFAULT_STOCK_MOVEMENT_FORM,
                ...movementValues,
                ...initialValues,
    
            /* 
            *  A page can force the movement type:
            * useStockMovementForm({
            *   movementType: "STOCK_IN"
            * }) 
            */
            ...(movementType 
                ? {
                    type: movementType,
                    }
                : {}),
            };
    }, [
        movement,
        initialValues,
        movementType,
    ]);

    const [values, setValues] = useState(getInitialValues);

    const [errors, setErrors] = useState({});

    const [touched, setTouched] = useState({});

    const [submitting, setSubmitting] = useState(false);

    const [submitError, setSubmitError] = useState(null);

    const [submitSuccess, setSubmitSuccess] = useState(false);

    /* Whether this is edit mode. */
    const isEditMode = mode === "edit" || 
    Boolean(movementId);

    /* Update one field. */
    const setFieldValue = useCallback(
        (name, value) => {
            setValues((previous) => ({
                ...previous,
                [name]: value,
            }));

            /* Clear the field's previous error 
            *  when the user changes it.
            */
           setErrors((previous) => {
                if (!previous[name]) {
                    return previous;
                }

                const next = {
                    ...previous,
                };

                delete next[name];

                return next;
           });

           setSubmitError(null);
           setSubmitSuccess(false);
        },
        []
    );

    /* Update multiple fields. */
    const setFieldValues = useCallback(
        (fieldValues) => {
            if (
                !fieldValues || 
                typeof fieldValues !== 
                    "object"
            ) {
                return;
            }

            setValues((previous) => ({
                ...previous,
                fieldValues,
            }));

            setSubmitError(null);
            setSubmitSuccess(false);
        },
        []
    );

    /* Handle standard HTML input changes. */
    const handleChange = useCallback(
        (event) => {
            const {
                name,
                value,
                type,
                checked,
            } = event.target;

            if (!name) {
                return;
            }

            setFieldValue(
                name,
                type === "checkbox"
                    ? checked
                    : value 
            );
        },
        [setFieldValue]
    );

    /* Handle blur/touched state. */
    const handleBlur = useCallback(
        (event) => {
            const {
                name, 
            } = event.target;

            if (!name) {
                return;
            }

            setTouched((previous) => ({
                ...previous,
                [name]: true, 
            })); 

            /* Validate only the field that was blurred. */
            setErrors((previous) => {
                const validationErrors = 
                    validateStockMovement(
                        values,
                        {
                            mode,
                            allowNegativeAdjustment,
                        }
                    );

                if (
                    validationErrors[name]
                ) {
                    return {
                        ...previous,
                        [name]:
                            validationErrors[
                                name
                            ],
                    };
                }

                const next = {
                    ...previous,
                };

                delete next[name];

                return next;
            });
        },
        [
            values,
            mode,
            allowNegativeAdjustment,
        ]
    );

    /* Validate entire form. */
    const validate = useCallback(() => {
        const validationErrors = 
            validateStockMovement(
                values,
                {
                    mode,
                    allowNegativeAdjustment,
                }
            );
        setErrors(
            validationErrors 
        );

        /* Mark all fields as touched. */
        setTouched(
            Object.keys(values).reduce(
                (result, field) => {
                    result[field] = true;
                    return result;
                },
                {}
            )
        );

        return (
            Object.keys(
                validationErrors
            ).length === 0 
        );
    }, [
        values,
        mode,
        allowNegativeAdjustment,
    ]);

    /* Reset the form. */
    const reset = useCallback(() => {
        setValues(
            getInitialValues()
        );

        setErrors({});
        setTouched({});
        setSubmitting(false);
        setSubmitError(null);
        setSubmitSuccess(false);
    }, [getInitialValues]);

    /* Reset only validation state. */
    const clearValidation = useCallback(() => {
        setErrors({});
        setTouched({});
        setSubmitError(null);
    }, []);

    /* submit form. */
    const handleSubmit = useCallback(
        async (event) => {
            event?.preventDefault();

            setSubmitError(null);
            setSubmitSuccess(false);

            const isValid = validate();

            if (!isvalid) {
                return {
                    success: false,
                    errors, 
                }; 
            }

            setSubmitting(true);

            try {
                const payload = 
                    cleanPayload({
                        ...values,
                        quantity:
                            normalizeQuantity(
                                values.quantity 
                            ), 
                    }); 

                const response = 
                    isEditMode
                        ? await updateStocckMovement(
                            movementId,
                            payload
                        )
                    : await createStockMovement(
                        payload 
                    ); 
                
                const result = 
                    response?.data ??
                    response?.movement ?? 
                    response;

                setSubmitSuccess(true);

                onSuccess?.(result);

                return {
                    success: true,
                    data: result,
                };
            } catch (error) {
                const message = 
                    getErrorMessage(
                        error,
                        isEditMode
                            ? "Failed to update stock movement."
                            : "Failed to create stock movement."
                    );

                setSubmitError(messaage);

                onError?.(
                    error 
                );

                return {
                    success: false,
                    error,
                    message,
                };
            } finally {
                setSubmitting(false);
            }
        },
        [
            values,
            validate,
            errors,
            isEditMode,
            movementId,
            onSuccess,
            onError,
        ]
    );

    /* Get the current value of a field. */
    const getFieldValue = useCallback(
        (name) => values[name] ?? "",
        [values]
    );

    /* Get an error for a field.
    *
    * Only return it once the field has been touched,
    * unless the whole form has already been validated.
    * 
    */
    const getFiledError = useCallback(
        (name) => {
            return errors[name] || "";
        },
        [errors]
    );

    /* Check whether a field has an error. */
    const hasFieldError = useCallback(
        (name) =>
            Boolean(errors[name]),
        [errors]
    );

    /* Whether the form contains validation errors. */
    const hasErrors = 
        Object.keys(errors).length > 0;

    /* Whether the form can be submitted. */
    const isValid = !hasErrors;

    /* Whether the form has changed from the initial values. */
    const isDirty = useMemo(() => {
        return JSON.stringify(
            values 
        ) !== JSON.stringify(
            getInitialValues
        );
    }, [
        values,
        getInitialValues,
    ]);

    /* Whether the current movement is an adjustment. */
    const isAdjustment = 
        values.tpe === MOVEMENT_TYPES.ADJUSTMENT;


    /* Whether the current movement is a transfer. */
    const isTransfer = 
        values.type === 
            MOVEMENT_TYPES.TRANSFER_IN || 
        values.type === 
            MOVEMENT_TYPES.TRANSFER_OUT;

    /* Whether reason should be required. */
    const requiresDirection = 
        values.type === 
            MOVEMENT_TYPES.STOCK_IN ||
        values.type === 
            MOVEMENT_TYPES.STOCK_OUT;

    return {
        /* Form data */
        values,
        errors,
        touched,

        /* Form state */
        submitting,
        submitError,
        submitSuccess,
        isEditMode,
        isDirty,
        isValid,
        hasErrors,

        /* Field operations */
        setFieldValue,
        setFieldValues,
        setFieldValue,
        getFieldError,
        hasFieldError,

        /* Events */
        handleChange,
        handleBlur,
        handleSubmit,

        /* Validation */
        validate,
        clearValidation,

        /* Reset */
        reset,

        /* Form metadata */
        isAdjustment,
        isTransfer,
        requiresDestinationWarehouse,
        requiresReason,
        requiresDirection,

        /* Constants */
        movementTypes: MOVEMENT_TYPES,
        movementDirections: MOVEMENT_DIRECTIONS,
    };
};

export default useStockMovementForm;

