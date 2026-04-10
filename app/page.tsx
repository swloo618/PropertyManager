"use client";

import { useState, useEffect } from "react";
import PropertiesSection from "@/components/PropertiesSection";
import ProspectsSection from "@/components/ProspectsSection";
import "./page.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Property Management System</h1>
              <p>Manage your listings, prospects, and transactions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === "properties" ? "active" : ""}`}
              onClick={() => setActiveTab("properties")}
            >
              Properties
            </button>
            <button
              className={`nav-tab ${activeTab === "prospects" ? "active" : ""}`}
              onClick={() => setActiveTab("prospects")}
            >
              Prospects
            </button>
          </nav>

          <div className="tab-content">
            {activeTab === "properties" && <PropertiesSection />}
            {activeTab === "prospects" && <ProspectsSection />}
          </div>
        </div>
      </main>
    </div>
  );
}
