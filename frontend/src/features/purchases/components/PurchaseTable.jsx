/* ********************************************************* */
/* File: src/features/purchases/components/PurchaseTable.jsx */
/* ********************************************************* */

import React from "react";
import { Link } from "react-router-dom";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPrinter,
} from "react-icons/fi";

const PurchaseTable = ({
  purchases = [],
  onDelete,
}) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "received":
        return "status-received";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  return (
    <div className="purchase-table-wrapper">
      <table className="purchase-table">
        <thead>
          <tr>
            <th>#</th>
            <th>PO No.</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length > 0 ? (
            purchases.map((purchase, index) => (
              <tr key={purchase.id}>
                <td>{index + 1}</td>

                <td>
                  <strong>
                    {purchase.purchaseNo}
                  </strong>
                </td>

                <td>{purchase.supplier}</td>

                <td>{purchase.date}</td>

                <td>{purchase.items}</td>

                <td>
                  $
                  {Number(
                    purchase.total || 0
                  ).toFixed(2)}
                </td>

                <td>
                  <span
                    className={`purchase-status ${getStatusClass(
                      purchase.status
                    )}`}
                  >
                    {purchase.status}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <Link
                      to={`/purchases/${purchase.id}`}
                      className="action-btn view"
                      title="View"
                    >
                      <FiEye />
                    </Link>

                    <Link
                      to={`/purchases/${purchase.id}/edit`}
                      className="action-btn edit"
                      title="Edit"
                    >
                      <FiEdit />
                    </Link>

                    <Link
                      to={`/purchases/${purchase.id}/invoice`}
                      className="action-btn print"
                      title="Invoice"
                    >
                      <FiPrinter />
                    </Link>

                    <button
                      type="button"
                      className="action-btn delete"
                      title="Delete"
                      onClick={() =>
                        onDelete?.(
                          purchase.id
                        )
                      }
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="empty-table"
              >
                No purchase orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
