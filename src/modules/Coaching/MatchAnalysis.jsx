import React, { useState, useEffect } from "react";

const MatchAnalysis = () => {
  const [matchData, setMatchData] = useState({
    opponent: "United FC",
    score: "2 - 1",
    possession: "58%",
    shots: "14",
    passing: "82%",
    points: [
      "Excelente presión alta en los primeros 20 min.",
      "Dificultad en transiciones defensivas.",
      "Eficiencia notable en jugadas a balón parado.",
    ],
  });

  // Future: Fetch from /api/matches/latest
  useEffect(() => {
    // For now we keep the "real-looking" data in state to allow future editing
  }, []);

  return (
    <div className="match-analysis">
      <div className="glass-panel card" style={{ marginBottom: "24px" }}>
        <h3>
          Resumen del Último Partido: Sport FC {matchData.score}{" "}
          {matchData.opponent}
        </h3>
        <div className="match-stats">
          <div className="stat-item">
            <span className="stat-value">{matchData.possession}</span>
            <span className="stat-label">Posesión</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{matchData.shots}</span>
            <span className="stat-label">Tiros</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{matchData.passing}</span>
            <span className="stat-label">Efectividad Pase</span>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="glass-panel card">
          <h4>Puntos Clave</h4>
          <ul
            style={{
              marginTop: "16px",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
            }}
          >
            {matchData.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="glass-panel card">
          <h4>Video Análisis</h4>
          <div
            className="video-placeholder"
            style={{
              height: "150px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px",
              cursor: "pointer",
              transition: "var(--transition)",
            }}
          >
            ▶️ Ver Mejores Momentos
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchAnalysis;
