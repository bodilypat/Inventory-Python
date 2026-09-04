/* ************************************************************ */
/* File: src/features/categories/components/CategoryDetails.jsx */
/* ************************************************************ */
import { Link } from "react-router-dom";

import { Button } from "../../../components/ui";
import CategoryStatus from "./CategoryStatus";

const CategoryDetails = ({
    category,
    onBack,
}) => { 
    if (!category) {
        return (
            <div className="category-details-empty">
                <h2>Category not found</h2>

                <p>The request category could not be found.</p>

                {onBack && (
                    <Button 
                        type="button"
                        variant="secondary"
                        onChild={onBack}
                    >
                        Back to Categories 
                    </Button>
                )}
            </div>
        );
    }

    const {
        id,
        name,
        description,
        status,
        product_count = 0,
        active_product_count = 0,
        inactive_product_count = 0,
        created_at,
        updated_at, 
    } = category;

    const formatDate = (date) => {
        
        if (!date) return "-";

        const parsedDate =  new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.teLocalString();
    };

    const formatDateTime = (date) => {

        if (!date) return "-";

        const parseDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.toLocalString();
    };

    return (
        <div className="category-details">
            <div className="category-details-header">
                <div className="category-details-title">
                    <span className="category-details-eyebrow">
                        Category 
                    </span>

                    <h2>{name}</h2>

                    <CategoryStatus status={status} />
                </div>
                <div className="category-details-actions">
                    {onBack && (
                        <Button 
                            type="button"
                            variant="secondary"
                            onClick={onBack}
                        >
                            Back 
                        </Button>
                    )}

                    <Link to={`/categories/${id}/edit`}>
                        <Button variant="primary">
                            Edit Category 
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="category-details-body">
                <section className="category-details-section">
                    <div className="category-details-section-header">
                        <h3>Category Information</h3>
                    </div>

                    <div className="category-detail-grid">
                        <div className="category-details-item">
                            <span className="category-details-label">
                                Category Name 
                            </span>

                            <span className="category-details-value">
                                {name || "-"}
                            </span>
                        </div>

                        <div className="category-details-item">
                            <span className="category-details-label">
                                Status
                            </span>

                            <span className="category-details-value">
                                <CategoryStatus status={status} />
                            </span>
                        </div>

                        <div className="category-details-item category-details-item-full">
                            <span className="category-details-label">
                                Description 
                            </span>

                            <p className="category-details-description">
                                {description || "No description provided."}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="category-details-section">
                    <div className="category-details-section-header">
                        <h3>Product Statistics</h3>
                    </div>

                    <div className="category-details-stats">
                        <div className="category-details-stat">
                            <span className="category-details-stat-label">
                                Total Products
                            </span>

                            <strong className="category-details-state-value">
                                {product_count}
                            </strong>
                        </div>

                        <div className="category-details-stat">
                            <span className="category-details-state-label">
                                Active products 
                            </span>

                            <strong className="category-details-stat-value category-details-stat-value-active">
                                {active_product_count}
                            </strong>
                        </div>

                        <div className="category-details-stat">
                            <span className="category-details-stat-label">
                                Inactive Products 
                            </span>

                            <strong className="category-details-stat-value category-details-stat-value-inactive">
                                {inactive_product_count}
                            </strong>
                        </div>
                    </div>
                </section>

                <section className="category-details-section">
                    <div className="category-details-section-header">
                        <h3>Record Information</h3>
                    </div>

                    <div className="category-details-grid">
                        <div className="category-details-item">
                            <span className="category-details-label">
                                Category ID 
                            </span>

                            <span className="category-details-value">
                                #{id}
                            </span>
                        </div>
                        <div className="category-details-item">
                            <span className="category-details-label">
                                Created 
                            </span>
                             <span className="category-details-value">
                                {formatDateTime(created_at)}
                            </span>
                        </div>

                        <div className="category-details-item">
                            <span className="category-detail-label">
                                Last Updated 
                            </span>

                            <span className="category-details-value">
                                {formatDateTime(updated_at)}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>        
    );
};

export default CategoryDetails;

