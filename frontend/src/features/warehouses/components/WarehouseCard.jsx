/* ********************************************************** */
/* File: src/features/warehouses/components/WarehouseCard.jsx */
/* ********************************************************** */

const WarehouseCard = ({ warehouse }) => {
    if (!warehouse) return null;

    return (
        <article className="warehouse-card" aria-label={`Warehouse: ${warehouse.name}`}>
            <h3>{warehouse.name}</h3>
            <dl>
                <div>
                    <dt>Location</dt>
                    <dd>{warehouse.location || "—"}</dd>
                </div>
                <div>
                    <dt>Capacity</dt>
                    <dd>{warehouse.capacity ?? "—"}</dd>
                </div>
                <div>
                    <dt>Status</dt>
                    <dd>{warehouse.status || "—"}</dd>
                </div>
            </dl>
        </article>
    );
};

export default WarehouseCard;
