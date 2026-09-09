/* ******************************************************************** */
/* File: src/features/stock-movements/components/StockMovementTable.jsx */ 
/* ******************************************************************** */
import React from "react";
import { Link } from "react-router-dom";

const MOVEMENT_LABELS = {
    STOCK_IN: "Stock In",
    STOCK_OUT: "Stock Out",
    ADJUSTMENT: "Adjustment",
    TRANSFER_IN: "Tramsfer In",
    TRANSFER_OUT: "Transfer Out",
};

const MOVEMEN_CLASSES = {
    STOCK_IN: "success",
    STOCK_OUT: "danger",
    ADJUSTMENT: "warning",
    TRANSFER_IN: "success",
    TRANSFER_OUT: "danger",
};

const StockMovementTable = ({
    movements = [],
    pagination = {},
    onPageChange, 
}) => {
    const {
        page = 1,
        totalPages = 1,
        totalItems = movements.length,
    } = pagination;

    return (
        <div className="stock-movement-table-wrapper">
            <table className="stock-movement-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reference</th>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Warehouse</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Reason</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                {movements.map((movement) => {
                    const movementType = movement.type || "ADJUSTMENT";

                    return (
                        <tr key={movement.id}>
                            <td>
                                {movement.createdAt 
                                    ? new Date (
                                        movement.createdAt  
                                    ).toLocaleString() 
                                    : "-"}
                            </td>

                            <td>
                                <strong>
                                    {movement.reference || "-"}
                                </strong>
                            </td>

                            <td>
                                {movement.product?.name || "-"}
                            </td>

                            <td>
                                {movement.product?.sku || "-"}
                            </td>

                            <td>
                                {movement.warehouse?.name || "-"}
                            </td>

                            <td>
                                {movement.warehouse?.name || "-"}
                            </td>

                            <td>
                                <span
                                    className={`movement-badge movement-badge--${
                                        MOVEMEN_CLASSES[movementType] ||
                                        "default"
                                    }`}
                                    >
                                        {MOVEMENT_LABELS[movementType] || movementType}
                                    </span>
                            </td>

                            <td>
                                <strong
                                    className={
                                        movement.direction === "OUT"
                                            ? "text-danger"
                                            : "text-success"
                                    }
                                >
                                    {movement.direction === "OUT"
                                        ? "-"
                                        : "+"}
                                    {movement.quantity ?? 0}
                                </strong>
                            </td>

                            <td>
                                {movement.reason || "-"}
                            </td>

                            <td>
                                {movement.createdBy?.name || 
                                    movement.user?.name || 
                                    "-"}
                            </td>

                            <td>
                                <Link 
                                    to={`/stock-movements/${movement.id}`}
                                    className="btn btn-sm"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="stock-movement-pagination">
                <span>
                    {totalItems} movements
                </span>

                <div>
                    <button 
                        type="button"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button 
                        type="button"
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockMovementTable;


