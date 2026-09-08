/* **************************************************************** */
/* File: src/features/stock-movements/pages/StockAdjustmentPage.jsx */ 
/* **************************************************************** */
import { useNavigate } from "react-router-dom";

import StockAdjustment from "./components/StockAdjustment";

const StockAdjustmentPage = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/stock-movements");
    };

    const handleCancel = () => {
        navigate("/stock-movements");
    };

    return (
        <div className="stock-adjustment-page">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Stock Adjustment</h1>

                    <p>Correct warehouse inventory quantities and record the adjustment.</p>
                </div>
            </div>

            {/* Adjustment Form  */}
            <div className="page-content">
                <StockAdjustment 
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default StockAdjustmentPage;


