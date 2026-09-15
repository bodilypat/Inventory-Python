/* ************************************************ */
/* File: src/features/suppliers/pages/Suppliers.jsx */
/* ************************************************ */

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import SupplierTable from "../components/SupplierTable";
import SupplierSearch from "../components/SupplierSearch";
import SupplierFilter from "../components/SupplierFilter";

import "./../styles/suppliers.css";

const PAGE_SIZE = 10;

const Suppliers = () => {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);


  // Replace with API data
  const [suppliers, setSuppliers] =
    useState([
      {
        id: 1,
        name: "ABC Suppliers",
        company: "ABC Trading Ltd",
        phone: "+1 555 123 4567",
        email: "abc@supplier.com",
        city: "New York",
        status: "Active",
        totalPurchases: 25,
      },
      {
        id: 2,
        name: "Global Traders",
        company: "Global Importers",
        phone: "+1 555 987 6543",
        email: "global@supplier.com",
        city: "Chicago",
        status: "Active",
        totalPurchases: 18,
      },
      {
        id: 3,
        name: "Tech Wholesale",
        company: "Tech Wholesale Inc.",
        phone: "+1 555 222 3333",
        email: "tech@supplier.com",
        city: "Dallas",
        status: "Inactive",
        totalPurchases: 8,
      },
    ]);


  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(
      (supplier) => {

        const matchesSearch =
          supplier.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          supplier.company
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          supplier.email
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );


        const matchesStatus =
          !status ||
          supplier.status === status;


        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    suppliers,
    searchTerm,
    status,
  ]);


  const totalPages = Math.ceil(
    filteredSuppliers.length /
      PAGE_SIZE
  );


  const paginatedSuppliers =
    filteredSuppliers.slice(
      (currentPage - 1) *
        PAGE_SIZE,
      currentPage *
        PAGE_SIZE
    );


  const handleDelete = (id) => {
    // Replace with API delete call

    setSuppliers((prev) =>
      prev.filter(
        (supplier) =>
          supplier.id !== id
      )
    );
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
          <h1>
            Suppliers
          </h1>

          <p>
            Manage supplier profiles,
            contacts, and purchasing
            relationships.
          </p>
        </div>


        <Link
          to="/suppliers/new"
          className="btn btn-primary"
        >
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
      <SupplierTable
        suppliers={
          paginatedSuppliers
        }
        onDelete={
          handleDelete
        }
      />


      {/* Pagination */}
      <div className="pagination">

        <button
          className="btn btn-secondary"
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              (page) =>
                page - 1
            )
          }
        >
          Previous
        </button>


        <span>
          Page {currentPage} of{" "}
          {totalPages || 1}
        </span>


        <button
          className="btn btn-secondary"
          disabled={
            currentPage >=
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              (page) =>
                page + 1
            )
          }
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Suppliers;
