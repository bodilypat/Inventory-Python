/* *********************************************************** */
/* File:  src/features/inventory/components/InventoryStats.jsx */
/* *********************************************************** */

import React from "react";

const InventoryStats = ({ stats = {} }) => {
    const cards = [
        {
            label: "Total Products",
            value: stats.totalProduct ?? 0,
        },
        {
            label: "Total Quantity",
            value: stats.totalQuantity ?? 0,
        },
        {
            label: "Inventory Value",
            value: `$${Number(stats.inventoryValue || 0).toLocaleString}`,
        },
        {
            label: "Low Stock",
            value: stats.lowStockCount ?? 0,
        },
        {
            label: "Out of Stock",
            value: stats.lowStockCount ?? 0,
        },
        {
            label: "Overstock",
            value: stats.outOfStockCount ?? 0,
        }, 
        {
            label: "Overstock",
            value: stats.overstockCount ?? 0,
        },
    ];

    return (
        <section className="inventory-stats">
            {cards.map((card) => (
                <div className="inventory-stat-card" key={card.label}>
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                </div>
            ))}
        </section>
    );
};

export default InventoryStats;

