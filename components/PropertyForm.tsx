"use client";

import { useState } from "react";

interface PropertyFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function PropertyForm({ onSubmit, onClose }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    address: "",
    propertyType: "",
    size: "",
    landTitle: "",
    bedrooms: "0",
    bathrooms: "0",
    purpose: "",
    price: "",
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerIdType: "",
    ownerIdNumber: "",
    ownerAddress: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      size: parseInt(formData.size),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Property</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <h3 style={{ marginBottom: "1rem", color: "var(--color-text)" }}>
            Property Details
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Property Type *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="condo">Condo</option>
                <option value="apartment">Apartment</option>
                <option value="shoplot">Shoplot</option>
                <option value="warehouse">Warehouse</option>
                <option value="terrace">Terrace House</option>
                <option value="bungalow">Bungalow</option>
                <option value="semid">Semi-D</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Size (sqft) *</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Land Title *</label>
              <select
                name="landTitle"
                value={formData.landTitle}
                onChange={handleChange}
                required
              >
                <option value="">Select title</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold (99 years)">Leasehold (99 years)</option>
                <option value="Leasehold (30 years)">Leasehold (30 years)</option>
                <option value="Leasehold (60 years)">Leasehold (60 years)</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Purpose *</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              >
                <option value="">Select purpose</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                {formData.purpose === "rent" ? "Monthly Rent" : "Selling Price"} (RM) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={
                  formData.purpose === "rent"
                    ? "e.g., 2500"
                    : "e.g., 850000"
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <h3 style={{ marginBottom: "1rem", marginTop: "2rem", color: "var(--color-text)" }}>
            Owner Details
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                name="ownerPhone"
                value={formData.ownerPhone}
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
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>ID Type</label>
              <select
                name="ownerIdType"
                value={formData.ownerIdType}
                onChange={handleChange}
              >
                <option value="">Select ID type</option>
                <option value="NRIC">NRIC</option>
                <option value="Passport">Passport</option>
                <option value="Business Registration">Business Registration</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>ID Number</label>
              <input
                type="text"
                name="ownerIdNumber"
                value={formData.ownerIdNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="ownerAddress"
                value={formData.ownerAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
