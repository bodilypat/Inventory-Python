/* ********************************************************* */
/* File: src/features/stock-movements/pages/StockOutPage.jsx */ 
/* ********************************************************* */
import { useNavigate } from "react-router-dom";

import StockOut from "../components/StockOut";

const StockOutPage = () => {
    const navigate = useNavigate();

    const handleSuccess = () =>  {
        navigate("/stock-movements");
    };

    const handleCancel = () => {
        navigate("/stock-movements");
    };

    return (
        <div className="stock-out-page">

            {/* Page Header */}
            <div classNamee="page-header">
                <div>
                    <h1>Stock Out</h1>
                    <p>Remove products from warehouse inventory and record the stock movement.</p>
                </div>
            </div>

            {/* Stock Out Form */}
            <div className="page-content">
                <StockOut 
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default StockOutPage;


