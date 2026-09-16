/* ********************************************************** */
/* File: src/features/warehouses/components/WarehouseStats.jsx */
/* ********************************************************** */

const WarehouseStats = ({ warehouse }) => {
    if (!warehouse) return null;

    const { location, capacity, status } = warehouse;

    return (
        <section className="warehouse-stats" aria-labelledby="warehouse-stats-title">
            <h3 id="warehouse-stats-title">Warehouse Statistics</h3>
            <dl>
                <div>
                    <dt>Location</dt>
                    <dd>{location ?? "—"}</dd>
                </div>
                <div>
                    <dt>Capacity</dt>
                    <dd>{capacity ?? "—"}</dd>
                </div>
                <div>
                    <dt>Status</dt>
                    <dd>{status ?? "—"}</dd>
                </div>
            </dl>
        </section>
    );
};

export default WarehouseStats;

