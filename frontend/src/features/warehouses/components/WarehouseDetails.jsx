/* ********************************************************** */
/* File: src/features/warehouses/components/WarehouseDetails.jsx */
/* ********************************************************** */

const WarehouseDetails = ({ warehouse }) => {
    if (!warehouse) return null;

    return (
        <article className="warehouse-details" aria-label={`Warehouse: ${warehouse.name}`}>
            <h2>{warehouse.name}</h2>
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

export default WarehouseDetails;

