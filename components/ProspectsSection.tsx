"use client";

import { useState, useEffect } from "react";
import ProspectForm from "./ProspectForm";
import ProspectDetail from "./ProspectDetail";
import "./ProspectsSection.css";

interface Prospect {
  id: number;
  name: string;
  phone: string;
  email?: string;
  type: string;
  budget: string;
  preferredPropertyType: string;
  remarks: string;
  createdAt?: number;
  updatedAt?: number;
}

export default function ProspectsSection() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProspects();
  }, [typeFilter, searchQuery]);

  const fetchProspects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.append("type", typeFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/prospects?${params}`);
      const data = await response.json();
      setProspects(data);
    } catch (error) {
      console.error("Error fetching prospects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProspect = async (formData: any) => {
    try {
      const response = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newProspect = await response.json();
      setProspects([...prospects, newProspect]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding prospect:", error);
    }
  };

  const handleDeleteProspect = async (id: number) => {
    if (confirm("Are you sure you want to delete this prospect?")) {
      try {
        await fetch(`/api/prospects/${id}`, { method: "DELETE" });
        setProspects(prospects.filter((p) => p.id !== id));
        setSelectedProspect(null);
      } catch (error) {
        console.error("Error deleting prospect:", error);
      }
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>Manage Prospects</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Prospect
        </button>
      </div>

      <div className="filter-bar">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="buyer">Buyer</option>
          <option value="tenant">Tenant</option>
          <option value="both">Both</option>
        </select>

        <input
          type="text"
          placeholder="Search prospect name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading prospects...</p>
      ) : (
        <div className="table-responsive-container">
          <table className="prospects-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Budget / Range</th>
                <th>Property Type</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((prospect) => (
                <tr key={prospect.id}>
                  <td>{prospect.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        prospect.type === "buyer"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {prospect.type.charAt(0).toUpperCase() +
                        prospect.type.slice(1)}
                    </span>
                  </td>
                  <td>{prospect.phone}</td>
                  <td>{prospect.budget}</td>
                  <td>{prospect.preferredPropertyType}</td>
                  <td>
                    <div className="remarks-preview">
                      {prospect.remarks.substring(0, 60)}
                      {prospect.remarks.length > 60 ? "..." : ""}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-small btn-secondary"
                      onClick={() => setSelectedProspect(prospect)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ProspectForm
          onSubmit={handleAddProspect}
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedProspect && (
        <ProspectDetail
          prospect={selectedProspect}
          onClose={() => setSelectedProspect(null)}
          onDelete={() => handleDeleteProspect(selectedProspect.id)}
        />
      )}
    </div>
  );
}
