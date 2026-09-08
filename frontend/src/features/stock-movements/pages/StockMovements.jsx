/* *********************************************************** */
/* File: src/features/stock-movements/pages/StockMovements.jsx */ 
/* *********************************************************** */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StockMovementTable from "../components/StockMovementTable";
import StockMovementFilters from "../components/StockMovementFilters";
import StockMovementStats from "../components/StockMovementState";

import { useStockMovements } from "../hooks/useStockMovements";

const StockMovements = () => {
    const navigate = useNavigate();

    const {
        movements,
        stats,
        filters,
        pagination,
        loading,
        error,
        fetchMovements,
        updateFilters,
        resetFilters,
        changePage,
    } = useStockMovements();

    useEffect(() => {
        fetchMovements();
    }, [fetchMovements]);

    const handleStockIn = () => {
        navigate("/stock-movement/in");
    };

    const handleStockOut = () => {
        navigate("/stock-movements/out");
    };

    const handleAdjustment = () => {
        navigate("/stock-movements/adjustment");
    };

    return (
        <div className="stock-movement-page">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Stock Movements</h1>
                    <p>Track stock in, stock out, adjustments,</p>
                </div>

                <div className="page-actions">
                    <button type="button" onClick={handleStockIn}>
                        Stock In 
                    </button>

                    <button type="button" onClick={handleStockOut}>
                        Stock Out 
                    </button>

                    <button type="button" onClick={handleAdjustment}>
                        Adjustment 
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <StockMovementStats
                stats={stats}
                loading={loading}
            />

            {/* Filters */}
            <StockMovementFilters
                filters={filters}
                onChange={updateFilters}
                onReset={resetFilters}
                loading={loading}
            />

            {/* Error */}
            {error && (
                <div className="error-message" role="alert">
                    {error}
                </div> 
            )}

            {/* Movement Table */}
            <StockMovementTable 
                movements={movements}
                loading={loading}
                pagination={pagination}
                onPageChange={changePage}
            />
        </div>
    );
};

export default StockMovements;



