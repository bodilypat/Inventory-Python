/* ************************************************* */
/* File: src:features/categories/pages/Categories.js */
/* ************************************************* */
import { useEffect }  from "react";
import { Link } from "react-router-dom";

import { Button, Loading, ErrorMessage } from "../../../components/ui";
import { CategoryFilters } from "../components/CategoryFilters";
import { CategorySummary } from "../components/CategorySummary";
import { CategoryTable } from "../components/categoryTable";
import { useCategories } from "../hooks/useCategories";

const Categories = () => {
    const {
        categories,
        loading,
        error,
        pagination,
        filters,
        fetchCategories,
        setFilters,
        deleteCategory,
    } = useCategories();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDelete = async (categoryId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) return;

        await deleteCategory(categoryId)
    };
    
    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>Categories</h1>

                    <p>Manage product categories in your inventory.</p>
                </div>

                <Link to="/categories/add">
                    <Button variant="primary">Add Category</Button>
                </Link>
            </div>

            <CategorySummary 
                categories={categories}
                pagination={pagination}
            />

            <CategoryFilters 
                fitlers={filters}
                onChange={setFilters}
            />

            {loading && <Loading />}

            {error && (
                <ErrorMessage message={error} />
            )}

            {!loading && !error && (
                <ErrorMessage message={error} />
            )}

            {!loading && !error && (
                <CategoryTable 
                    categories={categories}
                    pagination={pagination}
                    onDelete={handleDelete}
                />
            )}
        </section>
    );
};

export default Categories;