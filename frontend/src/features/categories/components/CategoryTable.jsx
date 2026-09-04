/* ***************************************************** */
/* File: src/features/categories/pages/CategoryTable.jsx */ 
/* ***************************************************** */
import { Link } from "react-router-dom";

import { Button, Table } from "../../../components/ui";
import CategoryStatus from "./CategoryStatus";

const CategoryTable = ({
    categories = [],
    loading = false,
    onDelete,
}) => {
    const columns = [
        {
            key: "name",
            header: "Category",
            render: (category) => (
                <div className="category-table-name">
                    <strong>{category.name}</strong>

                    {category.description && (
                        <span>{category.description}</span>
                    )}
                </div>
            ),
        },
        {
            key:"product_count",
            header: "Products",
            render: (category) => category.product_count ?? 0,
        },
        {
            key: "status",
            header: "Status",
            render: (category) => (
                <CategoryStatus status={category.status} />
            ),
        },
        {
            key: "created_at",
            header: "Created",
            render: (category) => 
                category.created_at 
                    ? new Date(category.created_at).toLocaleDateString() 
                    : "-",
        },
        {
            key: "actions",
            header: "Actions",
            render: (category) => (
                <div className="category-table-actions">
                    <Link to={`/categories/${category.id}`}>
                        <Button variant="secondary" size="small">
                            View 
                        </Button>
                    </Link>

                    <Link to={`/categories/${category.id}/edit`}>
                        <Button  variant="secondary" size="small">
                            Edit
                        </Button>
                    </Link>
                    
                    <Button 
                        variant="danger"
                        size="small"
                        onClick={() => onDelete?.(category.id)}
                    >
                        Delete 
                    </Button>
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="category-table-loading">
                Loading categories... 
            </div> 
        );
    }

    return (
        <div className="category-table">
            <Table 
                column={column}
                data={categories}
                rowKey={(category) => category.id}
            />
        </div>
    );
};

export default CategoryTable;

