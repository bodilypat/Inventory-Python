/* ************************************************** */
/* File: src/features/suppliers/pages/AddSupplier.jsx */
/* ************************************************** */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SupplierForm from "../components/SupplierForm";

import "./../styles/suppliers.css";

const initialSupplier = {
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  taxId: "",
  contactPerson: "",
  status: "Active",
  notes: "",
};

const AddSupplier = () => {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(() => ({ ...initialSupplier }));
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateSupplier = (data) => {
    const requiredFields = ["name", "company", "email", "phone"];

    const missingFields = requiredFields.filter(
      (field) => !String(data[field] ?? "").trim()
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the required fields: ${missingFields.join(", ")}.`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSupplier(supplier)) {
      return;
    }

    setLoading(true);

    try {
      const supplierData = {
        ...supplier,
        name: supplier.name.trim(),
        company: supplier.company.trim(),
        email: supplier.email.trim(),
        phone: supplier.phone.trim(),
        city: supplier.city.trim(),
        state: supplier.state.trim(),
        country: supplier.country.trim(),
        contactPerson: supplier.contactPerson.trim(),
        notes: supplier.notes.trim(),
        createdAt: new Date().toISOString(),
      };

      console.log("New Supplier:", supplierData);

      alert("Supplier created successfully.");
      setSupplier({ ...initialSupplier });
      navigate("/suppliers");
    } catch (error) {
      console.error("Error creating supplier:", error);
      alert("Unable to create supplier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="suppliers-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Add New Supplier</h1>
          <p>Create a supplier profile for purchase management.</p>
        </div>
      </div>

      {/* Supplier Form */}
      <SupplierForm
        supplierData={supplier}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/suppliers")}
        loading={loading}
        submitLabel="Create Supplier"
      />
    </div>
  );
};

export default AddSupplier;
