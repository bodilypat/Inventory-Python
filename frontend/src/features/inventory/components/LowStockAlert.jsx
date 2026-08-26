/* ********************************************************* */
/* File: src/features/inventory/components/LowStockAlert.jsx */ 
/* ********************************************************* */

import React, { useEffect, useState } from "react";
import { getLowStockInventory } from "../services/inventoryApi";

const LowStockAlert = () => {
    const [products, setProducts] = useState([]);
    const [laoding, setLoading] = useState(false);

    useEffect(() => { 
        let mounted = true;


        const loadLowStock = async () => {
            try {
                setLoading(true);

                const response = await getLowStockInventory();

                if (mounted) {
                    setProducts(response.data || []);
                    }
                } catch (error) {
                    console.error("Failed to load low-stock products: ", error);
                } finally {

                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadLowStock();

        return () => {
            mounted = false; 
        };
    }, []);

    if (loading) {
        return <div>Loading low-stock alerts...</div>;
    }

    if (!products.length) {
        return null;
    }

    return (
        <section className="low-stock-alert">
            <div className="low-stock-alert-header">
                <h2>Low Stock Alert</h2>

                <span>{products.length} Products</span>
            </div>

            <div className="low-stock-alert-list">
                {products.slice(0, 5).map((item) => (
                    <div key={item.id} className="low-stock-alert-item">
                        <div>
                            <strong>{item.product?.name}</strong>

                            <small>
                                SKU: {item.product?.sku || "-"}
                            </small>
                        </div>

                        <div>
                            <strong>{item.availableQuantity ?? 0}</strong>

                            <small>
                                Reorder at {item.reorderLevel ?? 0}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LowStockAlert;


