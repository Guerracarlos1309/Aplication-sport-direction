import React, { useState } from "react";
import ShadowTeam from "./ShadowTeam";
import ScoutingReports from "./ScoutingReports";
import MarketValues from "./MarketValues";
import "./Scouting.css";

const ScoutingDashboard = () => {
  const [activeTab, setActiveTab] = useState("shadow");

  const tabs = [
    { id: "shadow", label: "Shadow Team", component: ShadowTeam },
    { id: "reports", label: "Informes de Ojeo", component: ScoutingReports },
    { id: "market", label: "Mercado", component: MarketValues },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab).component;

  return (
    <div className="module-view scouting-module">
      <header className="module-header">
        <div>
          <h2>Scouting y Mercado</h2>
          <p>
            Identificación de talento y planificación de la plantilla a futuro.
          </p>
        </div>
        <div className="tab-navigation glass-panel">
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
      </header>

      <div className="module-content">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default ScoutingDashboard;
