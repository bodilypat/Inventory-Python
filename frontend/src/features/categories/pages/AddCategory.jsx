/* *************************************************** */
/* File: src/features/categories/pages/AddCategory.jsx */ 
/* *************************************************** */

import { useNavigate } from "react-router-dom";

import CategoryForm from "../components/CategoryForm";
import { useCategories } from "../hooks/useCategories";

const AddCategory = () => {
    const navigate = useNavigate();
    
    const {
        createCategory,
        loading,
        error,
    } = useCategories();

    const handleSubmit = async (formData) => {
        try {
            await createCategory(formData);

            navigate("/categories", {
                replace: true,
                state: {
                    message: "Category created successfully.",
                },
            });
        } catch (err) {

            /* Expose the API/business error.
            ** Page responsible only for navigation.
            */
            console.error("Failed to create category:", err);
        }
    };

    const handleConcel = () => {
        navigate("/categories");
    };

    return (
        <section className="page category-page">
            <div className="page-header">
                <div>
                    <h1>Add Category</h1>

                    <p>Create a new category for organizing your inventory products.</p>
                </div>
            </div>

            { error && ( 
                <div className="form-error" role="alet">
                    {error}
                </div>
            )}

            <CategoryForm 
                mode="create"
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </section>
    );
};

export default AddCategory;

