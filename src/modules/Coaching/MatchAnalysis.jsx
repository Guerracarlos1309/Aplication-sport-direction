import React from "react";

const MatchAnalysis = () => {
  return (
    <div className="match-analysis">
      <div className="glass-panel card" style={{ marginBottom: "24px" }}>
        <h3>Resumen del Último Partido: Sport FC 2 - 1 United FC</h3>
        <div className="match-stats">
          <div className="stat-item">
            <span className="stat-value">58%</span>
            <span className="stat-label">Posesión</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">14</span>
            <span className="stat-label">Tiros</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">82%</span>
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
            <li>Excelente presión alta en los primeros 20 min.</li>
            <li>Dificultad en transiciones defensivas.</li>
            <li>Eficiencia notable en jugadas a balón parado.</li>
          </ul>
        </div>
        <div className="glass-panel card">
          <h4>Video Análisis</h4>
          <div
            style={{
              height: "150px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px",
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
