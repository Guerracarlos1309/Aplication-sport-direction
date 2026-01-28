import React, { useState } from "react";

const ScoutingReports = () => {
  const [filter, setFilter] = useState("");

  const allReports = [
    { name: "Khvicha K.", age: 24, pos: "EI", club: "Napoli", rating: 8.5 },
    {
      name: "Florian Wirtz",
      age: 22,
      pos: "MCO",
      club: "Bayer L.",
      rating: 9.0,
    },
    { name: "Lamine Yamal", age: 18, pos: "ED", club: "FCB", rating: 9.5 },
    { name: "J. Musiala", age: 22, pos: "MCO", club: "Bayern", rating: 9.2 },
    { name: "R. Leao", age: 25, pos: "EI", club: "Milan", rating: 8.8 },
  ];

  const filteredReports = allReports.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.pos.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="scouting-reports">
      <div
        className="glass-panel card"
        style={{
          marginBottom: "24px",
          minHeight: "auto",
          padding: "16px 24px",
        }}
      >
        <input
          type="text"
          placeholder="Filtrar por nombre o posición..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            padding: "12px",
            borderRadius: "8px",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div className="grid">
        {filteredReports.map((r, i) => (
          <div key={i} className="glass-panel scouting-card card">
            <div className="player-photo-placeholder">👤</div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>{r.name}</h4>
                <span className="score-badge">{r.rating}</span>
              </div>
              <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
                {r.pos} | {r.age} años | {r.club}
              </p>
              <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                <span
                  className="payment-status-tag paid"
                  style={{ fontSize: "0.6rem" }}
                >
                  Velocidad
                </span>
                <span
                  className="payment-status-tag paid"
                  style={{ fontSize: "0.6rem" }}
                >
                  Regate
                </span>
              </div>
            </div>
          </div>
        ))}
        {filteredReports.length === 0 && (
          <p
            style={{
              textAlign: "center",
              gridColumn: "1/-1",
              color: "var(--text-muted)",
            }}
          >
            No se encontraron informes.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScoutingReports;
