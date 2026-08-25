/* ************************************************ */
/* File: src/features/inventory/pages/Inventory.jsx */ 
/* ************************************************ */

import React, { useEffect, useState } from "react";
import { useInventory } from "../hooks/useInventory";
import InventoryTable from "../components/InventoryTable";
import InventoryCard from "../components/InventoryCard";
import InventoryFilters from "../components/InventoryFilter";
import InventoryStats from "../components/InventoryStats";
import LowStockAlert from "../components/LowStockAlert";

const Inventory = () => {
    const {
        inventory,
        stats,
        loading,
        error,
        filters,
        pagination,
        fetchInventory,
        updateFilters,
        resetFilters,
        changePage,
    } = useInventory();

    const [viewMode, setViewMode] = useState("table");

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    return (
        <div className="inventory-page">
            <div className="inventory-page-header">
                <div>
                    <h1>Inventory</h1>
                    <p>Manage and monitor your current stock.</p>
                </div>

                <div className="inventory-page-actions">
                    <button 
                        type="button"
                        className={viewMode === "table" ? "active" : ""}
                        onClick={() => setViewMode("table")}
                    >
                        Table 
                    </button>

                    <button 
                        type="button"
                        className={viewMode === "card" ? "active" : ""}
                        onClick={() => setViewMode("card")}
                    >
                        Cards 
                    </button>
                </div>
            </div>

            <InventoryStats stats= {stats} />

            <LowStockAlert />

            <InventoryFilters 
                filters={filters}
                onChange={updateFilters}
                onReset={resetFilters}
            />

            {error && (
                <div className="inventory-page-error" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="inventory-page-loading">
                    Loading inventory... 
                </div> 
            ) : inventory.length === 0 ? (
                <div className="inventory-page-empty"> 
                    <h3>No inventory found</h3>
                    <p>Try changing your search or filter criteria.</p>
                </div>
            ) : viewMode === "table" ? (
                <InventoryTable 
                    inventory={inventory}
                    pagination={pagination}
                    onPageChange={changePage}
                />
            ) : (
                <div className="inventory-grid">
                    {inventory.map((item) => (
                        <InventoryCard key={item.id} inventory={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inventory;


