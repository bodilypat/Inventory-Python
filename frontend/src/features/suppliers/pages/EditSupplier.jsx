/* *************************************************** */
/* File: src/features/suppliers/pages/EditSupplier.jsx */
/* *************************************************** */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SupplierForm from "../components/SupplierForm";

import "./../styles/suppliers.css";

const EditSupplier = () => {
const navigate = useNavigate();
const { id } = useParams();

const [supplier, setSupplier] =
    useState(null);

const [loading, setLoading] =
    useState(true);

const [saving, setSaving] =
    useState(false);


useEffect(() => {
    const fetchSupplier = async () => {
        setLoading(true);

        try {
            const response = await fetch(`/api/suppliers/${id}`);

        if (!response.ok) {
            throw new Error(
                `Failed to load supplier (${response.status})`
            );
        }

        const result = await response.json();

        const data = {
                id: result.id ?? id,
                name: result.name ?? "",
                company: result.company ?? "",
                email: result.email ?? "",
                phone: result.phone ?? "",
                address: result.address ?? "",
                city: result.city ?? "",
                state: result.state ?? "",
                country: result.country ?? "",
                postalCode: result.postalCode ?? result.postal_code ?? "",
                taxId: result.taxId ?? result.tax_id ?? "",
                contactPerson: result.contactPerson ?? result.contact_person ?? "",
                status: result.status ?? "",
                notes: result.notes ?? "",
            };

            setSupplier(data);
        } catch (error) {
            console.error("Error loading supplier:", error);
            setSupplier(null);
            alert("Unable to load supplier information.");
        } finally {
            setLoading(false);
        }
    };

    if (id) {
        fetchSupplier();
    } else {
        setSupplier(null);
        setLoading(false);
    }
}, [id]);

const handleChange = (e) => {
    const {
        name,
        value,
    } = e.target;

    setSupplier((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
        const updatedSupplier = {
            ...supplier,
            updatedAt:
            new Date().toISOString(),
        };

        console.log(
            "Updated Supplier:",
            updatedSupplier
        );

        alert("Supplier updated successfully.");


        navigate("/suppliers");

    } catch (error) {

        console.error(
            "Error updating supplier:",
            error
        );

        alert(
            "Unable to update supplier."
        );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
        <div className="suppliers-page">
            <p>Loading supplier details...</p>
        </div>
        );
    }

    if (!supplier) {
        return (
            <div className="suppliers-page">
                <p>Supplier not found.</p>
            </div>
        );
    }

    return (
        <div className="suppliers-page">

        {/* Header */}
        <div className="page-header">
            <div>
            <h1>Edit Supplier</h1>
            <p>
                Update supplier profile
                nformation.
            </p>
        </div>
    </div>

    {/* Form */}
        <SupplierForm
            supplierData={
                supplier
            }
            onChange={
                handleChange
            }
            onSubmit={
                handleSubmit
            }
            onCancel={() =>
                navigate("/suppliers")
            }
            loading={
                saving
            }
                submitLabel="Update Supplier"
        />
    </div>
  );
};

export default EditSupplier;