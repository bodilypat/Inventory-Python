/* ************************************************ */
/* File: src/features/suppliers/pages/Suppliers.jsx */
/* ************************************************ */

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import SupplierTable from "../components/SupplierTable";
import SupplierSearch from "../components/SupplierSearch";
import SupplierFilter from "../components/SupplierFilter";

import "./../styles/suppliers.css";

const PAGE_SIZE = 10;

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliers, setSuppliers] = useState([]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const name = String(supplier?.name ?? "").toLowerCase();
      const company = String(supplier?.company ?? "").toLowerCase();
      const email = String(supplier?.email ?? "").toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        [name, company, email].some((field) => field.includes(normalizedSearch));

      const matchesStatus = !status || supplier?.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, normalizedSearch, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSuppliers.length / PAGE_SIZE)
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedSuppliers = filteredSuppliers.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const handleDelete = (id) => {
    // Replace with API delete call

    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));

    setCurrentPage((page) => {
      const nextPageCount = Math.max(
        1,
        Math.ceil((filteredSuppliers.length - 1) / PAGE_SIZE)
      );

      return Math.min(page, nextPageCount);
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setStatus("");
    setCurrentPage(1);
  };

  return (
    <div className="suppliers-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Suppliers</h1>

          <p>
            Manage supplier profiles, contacts, and purchasing relationships.
          </p>
        </div>

        <Link to="/suppliers/new" className="btn btn-primary">
          <FiPlus />
          Add Supplier
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="page-toolbar">
        <SupplierSearch
          searchTerm={searchTerm}
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />

        <SupplierFilter
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setCurrentPage(1);
          }}
          onReset={handleReset}
        />
      </div>

      {/* Supplier Table */}
      <SupplierTable suppliers={paginatedSuppliers} onDelete={handleDelete} />

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn btn-secondary"
          disabled={safeCurrentPage === 1}
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        >
          Previous
        </button>

        <span>
          Page {safeCurrentPage} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={safeCurrentPage >= totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Suppliers;