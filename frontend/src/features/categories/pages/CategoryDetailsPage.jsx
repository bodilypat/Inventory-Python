/* **************************************************************** */
/* File: src/features/categories/components/CategoryDetailsPage.jsx */ 
/* **************************************************************** */

import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button, Loading, ErrorMessage } from "../../../components/ui";

import CategoryDetails from "../components/CategoryDetails";
import { useCategories } from "../hooks/useCategories";

const CategoryDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        category,
        loading,
        error,
        fetchCategory,
    } = useCategories();

    useEffect(() => {

        if (id) {
            fetchCategory(id);
        }
    }, [id, fetchCategory]);

    const handleBack = () => {
        navigate("/categories");
    };

    if (!loading && !category) {
        return (
            <section className="page category-details-page">
                <Loading />
            </section>
        );
    }

    if (error && !category) {
        return (
            <section className="page category-details-page">
                <div className="page-header">
                    <div>
                        <h1>Category Details</h1>
                    </div>
                </div>

                <ErrorMessage message={error} />

                <Button 
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                >
                    Back to Categories 
                </Button>
            </section>
        );
    }

    if (!category) {
        return (
            <section className="page category-details-page">
                <div className="page-header">
                    <div>
                        <h1>Category Noft Found</h1>

                        <p>The requested category could not be found.</p>
                    </div>
                </div>

                <Button 
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                >
                    Back to Categories 
                </Button>
            </section>
        );
    }

    return (
        <section className="page category-details-page">
            <div className="page-header">
                <div>
                    <div className="breadcrumb">
                        <Link to="/categories">Categories</Link>

                        <span>/</span>
                        <span>{category.name}</span>
                    </div>

                    <h1>{category.name}</h1>

                    <p>View category information and associated products.</p>
                </div>

                <div className="page-actions">
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={handleBack}
                    >
                        Back 
                    </Button>

                    <Link to={`/categories/${category.id}/edit`}>
                        <Button variant="primary">
                            Edit Category 
                        </Button>
                    </Link>
                </div>
            </div>

            {error && (
                <ErrorMessage message={error} />
            )}

            <CategoryDetails category={category} />
        </section>
    );
};

export default CategoryDetailsPage;


