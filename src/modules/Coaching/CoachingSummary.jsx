import React, { useState, useEffect } from "react";
import { Users, ClipboardList, CreditCard, Target } from "lucide-react";

const CoachingSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard-summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Summary error:", err));
  }, []);

  if (!summary) return null;

  return (
    <div className="coaching-summary-bar">
      <div className="summary-item glass-panel">
        <Users size={18} color="var(--primary)" />
        <div className="summary-info">
          <span>Jugadores</span>
          <strong>{summary.players}</strong>
        </div>
      </div>
      <div className="summary-item glass-panel">
        <ClipboardList size={18} color="var(--accent)" />
        <div className="summary-info">
          <span>Sesiones</span>
          <strong>{summary.sessions}</strong>
        </div>
      </div>
      <div className="summary-item glass-panel">
        <CreditCard size={18} color="#ff6b6b" />
        <div className="summary-info">
          <span>Pagos Pend.</span>
          <strong>{summary.payments}</strong>
        </div>
      </div>
      <div className="summary-item glass-panel">
        <Target size={18} color="#fbbf24" />
        <div className="summary-info">
          <span>Objetivos</span>
          <strong>{summary.scouting}</strong>
        </div>
      </div>
    </div>
  );
};

export default CoachingSummary;
