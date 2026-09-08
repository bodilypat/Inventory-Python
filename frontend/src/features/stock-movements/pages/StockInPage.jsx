/* ******************************************************** */
/* File: src/features/stock-movements/pages/StockInPage.jsx */ 
/* ******************************************************** */
import { useNavigate } from "react-router-dom";

import StockIn from "../components/StockIn";

const StockInPage = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/stock-movements");
    };

    const handleCancel = () => {
        navigate("/stock-movement");
    };

    return (
        <div className="stock-in-page">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Stock In</h1>
                    <p>Add product to warehouse inventory and record the stock movement.</p>
                </div>
            </div>

            {/* Stock In Form */}
            <div className="page-content">
                <StockIn 
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}

                />
            </div>
        </div>
    );
};

export default StockInPage;


