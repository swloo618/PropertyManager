"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";
import PropertyDetail from "./PropertyDetail";
import "./PropertiesSection.css";

interface Property {
  id: number;
  address: string;
  propertyType: string;
  size: number;
  landTitle: string;
  bedrooms: number;
  bathrooms: number;
  purpose: string;
  price: string;
  description?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  ownerIdType?: string;
  ownerIdNumber?: string;
  ownerAddress?: string;
  createdAt?: number;
  updatedAt?: number;
}

export default function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    forRent: 0,
    forSale: 0,
  });

  useEffect(() => {
    fetchProperties();
  }, [typeFilter, purposeFilter, searchQuery]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.append("type", typeFilter);
      if (purposeFilter) params.append("purpose", purposeFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/properties?${params}`);
      const data = await response.json();
      setProperties(data);

      // Calculate stats
      setStats({
        total: data.length,
        forRent: data.filter((p: Property) => p.purpose === "rent").length,
        forSale: data.filter((p: Property) => p.purpose === "sale").length,
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (formData: any) => {
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newProperty = await response.json();
      setProperties([...properties, newProperty]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await fetch(`/api/properties/${id}`, { method: "DELETE" });
        setProperties(properties.filter((p) => p.id !== id));
        setSelectedProperty(null);
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Listings</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">For Rent</div>
          <div className="stat-value">{stats.forRent}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">For Sale</div>
          <div className="stat-value">{stats.forSale}</div>
        </div>
      </div>

      <div className="section-header">
        <h2>Property Listings</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Property
        </button>
      </div>

      <div className="filter-bar">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="condo">Condo</option>
          <option value="apartment">Apartment</option>
          <option value="shoplot">Shoplot</option>
          <option value="warehouse">Warehouse</option>
          <option value="terrace">Terrace House</option>
          <option value="bungalow">Bungalow</option>
          <option value="semid">Semi-D</option>
        </select>

        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
        >
          <option value="">All Purposes</option>
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>

        <input
          type="text"
          placeholder="Search address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => setSelectedProperty(property)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <PropertyForm
          onSubmit={handleAddProperty}
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onDelete={() => handleDeleteProperty(selectedProperty.id)}
        />
      )}
    </div>
  );
}
