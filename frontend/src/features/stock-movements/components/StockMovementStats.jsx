/* ******************************************************************** */
/* File: src/features/stock-movements/components/StockMovementStats.jsx */ 
/* ******************************************************************** */

import React from "react";

const StockMovementStats = ({ stats = {} }) => {
    const cards = [
        {
            label: "Total Movements",
            value: stats.totalMovements ?? 0,
        },
        {
            label: "Stock In",
            value: stats.stockInCount ?? 0,
        },
        {
            label: "Stock Out",
            value: stats.adjustmentCount ?? 0,
        },
        {
            label: "Adjustments",
            value: stats.adjustmentCount ?? 0,
        },
        {
            label: "Transfers",
            value: stats.transferCount ?? 0,
        },
        {
            label: "Unit Moved",
            value: stats.totalUnitMoved ?? 0,
        },
    ];

    return (
        <section className="stock-movement-stats">

            {cards.map((card) => (
                <div 
                    className="stock-movement-stat-card"
                    key={card.label}
                >
                    <span>{card.label}</span>
                    <strong>
                        {Number(card.value).toLocaleString()}
                    </strong>
                </div>
            ))}
        </section>
    );
};

export default StockMovementStats;

