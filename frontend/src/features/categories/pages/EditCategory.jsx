/* **************************************************** */
/* File: src/features/categories/pages/EditCategory.jsx */
/* **************************************************** */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import CategoryForm from "../components/CategoryForm";
import { usecategories } from "../hooks/useCategories";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        category,
        loading,
        error,
        fetchCategory,
        updateCategory,
    } = usecategories();

    useEffect(() => {
        if (id) {
            fetchCategory(id);
        }
    }, [id, fetchCategory]);

    const handleSubmit = async (formData) => {
        try {
            await updateCategory(id, formData);

            navigate("/categories", {
                replace: true,
                state: {
                    message: "Category updated successfully.",
                },
            });
        } catch (err) {
            console.error("Failed to update category: ", err);
        }
    };

    const handleCancel = () => {
        navigate("/categories");
    };

    if (loading && !category) {
        return (
            <section className="page category-page">
                <Loading />
            </section>
        );
    }

    if (error && !category) {
        return (
            <section className="page category-page">
                <ErrorMessage message={error} />

                <button 
                    type="button"
                    onClick={handleCancel}
                >
                    Back to Categories 
                </button>
            </section>
        );
    }

    if (!category) {
        return (
            <section className="page category-page">
                <ErrorMessage message={error} />

                <button 
                    type="button"
                    onClick={handleCancel}
                >
                    Back to Categories
                </button>
            </section>
        );
    }

    if (!category) {
        return (
            <section className="page category-page">
                <ErrorMessage message="Category not found" />

                <button 
                    type="button"
                    onClick={handleCancel}
                >
                    Back to Categories
                </button>
            </section>
        );
    }

    return (
        <section className="page category-page">
            <div className="page-header">
                <div>
                    <h1>Edit Category</h1>

                    <p>Update the information for{" "}</p>
                    <strong>{category.name}</strong>. 
                </div>
            </div>

            {error && <ErrorMessage message={error} />}

            <CategoryForm 
                mode="edit"
                initialValue={{
                    name: category.name || "",
                    description: category.description || "",
                    status: categoory.status || "",
                }}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </section>
    );
};

export default EditCategory;

