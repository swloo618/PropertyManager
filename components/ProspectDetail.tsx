"use client";

interface ProspectDetailProps {
  prospect: {
    id: number;
    name: string;
    phone: string;
    email?: string;
    type: string;
    budget: string;
    preferredPropertyType: string;
    remarks: string;
  };
  onClose: () => void;
  onDelete: () => void;
}

export default function ProspectDetail({
  prospect,
  onClose,
  onDelete,
}: ProspectDetailProps) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>{prospect.name}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--color-text-secondary)",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Contact Information
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: "0.25rem",
                }}
              >
                Prospect Type
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                {prospect.type.charAt(0).toUpperCase() + prospect.type.slice(1)}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: "0.25rem",
                }}
              >
                Phone
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                {prospect.phone}
              </p>
            </div>
          </div>

          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--color-text-secondary)",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Requirements
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: "0.25rem",
                }}
              >
                Budget / Price Range
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                {prospect.budget}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: "0.25rem",
                }}
              >
                Preferred Property Type
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                {prospect.preferredPropertyType.charAt(0).toUpperCase() +
                  prospect.preferredPropertyType.slice(1)}
              </p>
            </div>
          </div>

          <div
            style={{
              background: "var(--color-bg-secondary)",
              padding: "1rem",
              borderRadius: "0.5rem",
              borderLeft: "3px solid var(--color-accent)",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "var(--color-text-secondary)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
              }}
            >
              Remarks & Requirements Notes
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text)",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {prospect.remarks || "No remarks added"}
            </p>
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
