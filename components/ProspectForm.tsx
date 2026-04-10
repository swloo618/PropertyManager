"use client";

import { useState } from "react";

interface ProspectFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function ProspectForm({ onSubmit, onClose }: ProspectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "buyer",
    budget: "",
    preferredPropertyType: "any",
    remarks: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Prospect</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Prospect Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="tenant">Tenant</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Budget / Price Range *</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., RM 400k - RM 800k"
                required
              />
            </div>
            <div className="form-group">
              <label>Preferred Property Type</label>
              <select
                name="preferredPropertyType"
                value={formData.preferredPropertyType}
                onChange={handleChange}
              >
                <option value="any">Any</option>
                <option value="condo">Condo</option>
                <option value="apartment">Apartment</option>
                <option value="terrace">Terrace House</option>
                <option value="bungalow">Bungalow</option>
                <option value="semid">Semi-D</option>
                <option value="shoplot">Shoplot</option>
                <option value="warehouse">Warehouse</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Remarks / Requirements Notes</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Note down their specific requirements, preferences, timeline, or any other important details. E.g., Must have 3 bedrooms, near MRT, quiet area, looking to move in within 2 months..."
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Prospect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
