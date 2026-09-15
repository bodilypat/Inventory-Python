/* *********************************************************** */
/* File: src/features/suppliers/components/SupplierForm.jsx    */
/* *********************************************************** */
import React from "react";

const SupplierForm = ({ supplier, onChange, onSubmit, saving }) => {
    return (
        <form onSubmit={onSubmit} className="supplier-form">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={supplier.name}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={supplier.company}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={supplier.email}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={supplier.phone}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={supplier.status}
                    onChange={onChange}
                    required
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </form>
    );
};

export default SupplierForm;


