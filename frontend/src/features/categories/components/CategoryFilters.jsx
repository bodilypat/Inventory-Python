/* ************************************************************ */
/* File: src/features/categories/components/CategoryFilters.jsx */
/* ************************************************************ */
import { Input, Select, Button } from "../../../components/ui";

const CategoryFilters = ({ filters, onChange, onReset }) => {
    const handleChange = (field, value) => {
        onChange({
            ...filters,
            [field]: value,
        });
    };

    return (
        <div className="category-filters">
            <div className="category-filters-search">
                <Input  
                    type="search"
                    placeholder="Search categories..."
                    value={filters?.search || ""}
                    onChange={(event) => 
                        handleChange("search", event.target.value)
                    }
                />
            </div>

            <div className="category-filters-status">
                <Select 
                    value={filters?.status || ""}
                    onChange={(event) => 
                        handleChange("status", event.target.value)
                    }
                    options={[
                        { value: "", label: "All Statuses"},
                        { value: "active", label: "Active"},
                        { value: "inactive", label: "Inactive" },
                    ]}
                />
            </div>
            <div className="category-filters-actions">
                <Button 
                    type="button"
                    variant="secondary"
                    onClick={onReset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default CategoryFilters;

