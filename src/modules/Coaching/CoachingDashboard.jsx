import React, { useState } from "react";
import TrainingPlanner from "./TrainingPlanner";
import MatchAnalysis from "./MatchAnalysis";
import PlayerCallUp from "./PlayerCallUp";
import ProgressionCharts from "./ProgressionCharts";
import CoachingSummary from "./CoachingSummary";
import "./Coaching.css";

const CoachingDashboard = () => {
  const [activeTab, setActiveTab] = useState("planning");

  const tabs = [
    { id: "planning", label: "Planificación", component: TrainingPlanner },
    { id: "analysis", label: "Análisis de Partidos", component: MatchAnalysis },
    { id: "callup", label: "Convocatoria", component: PlayerCallUp },
    { id: "progression", label: "Progresión", component: ProgressionCharts },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab).component;

  return (
    <div className="module-view coaching-module">
      <header className="module-header">
        <div>
          <h2>Cuerpo Técnico</h2>
          <p>
            Gestión integral de actividades deportivas y seguimiento de
            jugadores.
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

      <CoachingSummary />

      <div className="module-content">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default CoachingDashboard;
