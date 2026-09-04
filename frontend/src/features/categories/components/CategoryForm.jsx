/* ********************************************************* */
/* File: src/features/categories/components/CategoryForm.jsx */ 
/* ********************************************************* */

import { useEffect, useState } from "react";

import {
    Button,
    Input,
    Select,
    Textarea,
} from "../../../components/ui";

const DEFAULT_VALUES = {
    name: "",
    description: "",
    status: "active",
};

const CategoryForm = ({
    mode = "create",
    initialValues = DEFAULT_VALUES,
    loading,
    onSubmit,
    onCancel, 
}) => {
    const [formData, setFormData] = useState({
        ...DEFAULT_VALUES,
        ...initialValues,
    });

    const [errors, setErrors] = useState({});

    const isEditMoode = mode === "edit";

    useEffect(() => {
        setFormData({
            ...DEFAULT_VALUES,
            ...initialValues,
        });

        setErrors({});
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value, 
        }));

        /* Clear the field error once the uer starts correcting it. */
        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: "",
            }));
        }
    };

    const valiidate = () => {
        const newErrors = {};

        const name = formData.name.trim();
        const description = formData.description.trim();

        if (!name) {
            newErrors.name = "Category name is required.";
        } else if (name.length < 2) {
            newErrors.name = "Category name must be at least 2 characters.";
        } else if (name.length > 100) {
            newErrors.name = "Category name must not exceed 100 characters.";
        }

        if (description > 500) {
            newErrors.description = "Description must be exceed 500 characters.";
        }

        if (!["active", "inactive"]. includes(formData.status)) {
            newErrors.status = "Please select a valid status.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!valiidate()) {
            return;
        }

        const payload = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            status: formData.status,
        };

        await onSubmit?.(payload);
    };

    return (
        <form 
            className="category-form"
            onSubmit={handleSubmit}
            noValidate 
        >
            <div className="category-form-body">
                <div className="category-form-field">
                    <Input 
                        id="category-name"
                        name="name"
                        labe="Category name"
                        placeholder="Enter category name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        error={errors.name}
                        required 
                    />                    
                </div>

                <div className="category-form-field">
                    <Textarea
                        id="category-description"
                        name="description"
                        label="Description"
                        placeholder="Enter category description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={loading}
                        error={errors.description}
                        rows={4}
                    />

                    <small className="category-form-counter">
                        {formData.description.length}/500
                    </small>
                </div>

                <div className="category-form-field">
                    <Select
                        id="category-status"
                        name="status"
                        label="Status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={loading}
                        error={error.status}
                        required 
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                </div>
            </div>

            <div className="category-form-actions">
                <Button 
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel 
                </Button>

                <Button 
                    type="submit"
                    variant="primary"
                    disabled={loading}
                >
                    {loading 
                        ? isEditMoode 
                            ? "Updating..."
                            : "Creating..."
                        : isEditMoode 
                            ? "Update Category"
                            : "Create Category"}
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;

