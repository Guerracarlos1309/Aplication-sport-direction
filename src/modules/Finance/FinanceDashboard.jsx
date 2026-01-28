import React, { useState } from "react";
import Contracts from "./Contracts";
import Payments from "./Payments";
import Inventory from "./Inventory";
import "./Finance.css";

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState("contracts");

  const tabs = [
    { id: "contracts", label: "Contratos", component: Contracts },
    { id: "payments", label: "Pagos", component: Payments },
    { id: "inventory", label: "Inventario", component: Inventory },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab).component;

  return (
    <div className="module-view finance-module">
      <header className="module-header">
        <div>
          <h2>Administración y Finanzas</h2>
          <p>
            Gestión de activos, obligaciones financieras y recursos del club.
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

export default FinanceDashboard;
