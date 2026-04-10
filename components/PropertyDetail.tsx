"use client";

interface PropertyDetailProps {
  property: {
    id: number;
    address: string;
    propertyType: string;
    size: number;
    landTitle: string;
    bedrooms: number;
    bathrooms: number;
    purpose: string;
    price: string;
    ownerName: string;
    ownerPhone: string;
    ownerEmail?: string;
  };
  onClose: () => void;
  onDelete: () => void;
}

export default function PropertyDetail({
  property,
  onClose,
  onDelete,
}: PropertyDetailProps) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{property.address}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div>
                <p style={{ marginBottom: "0.5rem" }}>{property.propertyType}</p>
                <span
                  className={`badge ${
                    property.purpose === "rent" ? "badge-success" : "badge-info"
                  }`}
                >
                  {property.purpose === "rent" ? "FOR RENT" : "FOR SALE"}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--color-accent)" }}>
                  {property.price}
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--color-text-secondary)", marginBottom: "1rem", textTransform: "uppercase" }}>
            Property Information
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                Property Type
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>{property.propertyType}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                Size
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>{property.size} sqft</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                Land Title
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>{property.landTitle}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                Bedrooms / Bathrooms
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                {property.bedrooms > 0
                  ? `${property.bedrooms} BR / ${property.bathrooms} Bath`
                  : "Commercial"}
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--color-text-secondary)", marginBottom: "1rem", textTransform: "uppercase" }}>
            Owner Information
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                Owner Name
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>{property.ownerName}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                Phone
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>{property.ownerPhone}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
