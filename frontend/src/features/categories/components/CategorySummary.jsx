/* ************************************************************ */
/* File: src/features/categories/components/CategorySummary.jsx */ 
/* ************************************************************ */
import { useMemo } from "react";

const CategorySummary = ({ categories = [], pagination }) => {
    const summary = useMemo(() => {
        const total = pagination?.total ?? categories.length;

        const inactive = categories.filter(
            (category) => category.status === "inactive" 
        ).length;

        const totalProducts =  categories.reduce(
            (sum, category) => sum + (category.product_count || 0),
            0 
        );

        return {
            total,
            active,
            inactive,
            totalProducts,
        };
    }, [categories, pagination]);

    const cards = [
        {
            label: "Total Categories",
            value: summary.total,
            className: "category-summary-card-total",
        },
        {
            label: "Active Categories",
            value: summary.active,
            className: "category-summary-card-active",
        },
        {
            label: "Inactive Categories",
            value: summary.inactive,
            className: "category-summary-card-inactive",
        },
        {
            label: "Products",
            value: summary.totalProducts,
            className: "Category-summary-card-products",
        },
    ];

    return (
        <div className="category-summary">
            {cards.map((card) => (
                <div 
                    key={card.label}
                    className={`category-summary-card ${card.className}`}
                >
                    <div className="category-summary-content">
                        <span className="category-summary-label">
                            {card.label}
                        </span>

                        <strong className="category-summary-value">
                            {card.value}
                        </strong>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategorySummary;

