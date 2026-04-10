"use client";

interface PropertyCardProps {
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
  };
  onClick: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div className="property-card" onClick={onClick}>
      <div className="card-header">
        <div>
          <span className="property-type-badge">{property.propertyType}</span>
          <span
            className={`purpose-badge ${
              property.purpose === "rent" ? "badge-success" : "badge-info"
            }`}
          >
            {property.purpose === "rent" ? "FOR RENT" : "FOR SALE"}
          </span>
        </div>
        <div className="price">{property.price}</div>
      </div>

      <h3 className="address">{property.address}</h3>

      <div className="details">
        <span>📐 {property.size} sqft</span>
        <span>
          {property.bedrooms > 0
            ? `🛏️ ${property.bedrooms} BR`
            : "🏪 Commercial"}
        </span>
        <span>📋 {property.landTitle}</span>
      </div>

      <div className="owner-info">
        <p className="owner-name">{property.ownerName}</p>
        <p className="owner-phone">{property.ownerPhone}</p>
      </div>
    </div>
  );
}
