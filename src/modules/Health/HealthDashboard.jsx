import React, { useState } from "react";
import MedicalRecords from "./MedicalRecords";
import LoadControl from "./LoadControl";
import Rehabilitation from "./Rehabilitation";
import WellnessDashboard from "./WellnessDashboard";
import "./Health.css";

const HealthDashboard = () => {
  const [activeTab, setActiveTab] = useState("records");

  const tabs = [
    { id: "records", label: "Expediente Médico" },
    { id: "wellness", label: "Control Wellness" },
    { id: "load", label: "Control de Cargas" },
    { id: "rehab", label: "Readaptación" },
  ];

  return (
    <div className="module-container">
      <div className="tabs-container glass-panel">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="module-content">
        {activeTab === "records" && <MedicalRecords />}
        {activeTab === "wellness" && <WellnessDashboard />}
        {activeTab === "load" && <LoadControl />}
        {activeTab === "rehab" && <Rehabilitation />}
      </div>
    </div>
  );
};

export default HealthDashboard;
