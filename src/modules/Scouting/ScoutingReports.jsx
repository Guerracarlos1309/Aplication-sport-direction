import React, { useState, useEffect } from "react";

const ScoutingReports = () => {
  const [filter, setFilter] = useState("");
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/scouting/reports`);
      const data = await res.json();
      setAllReports(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching scouting reports:", err);
      setLoading(false);
    }
  };

  const filteredReports = allReports.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.position.toLowerCase().includes(filter.toLowerCase()),
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1.5rem",
        }}
      >
        {filteredReports.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="view-all-btn"
            style={{
              background: "rgba(0, 242, 255, 0.1)",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            {showAll ? "Ver menos" : `Ver todos (${filteredReports.length})`}
          </button>
        )}
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando reportes...</p>
      ) : (
        <div className="grid">
          {(showAll ? filteredReports : filteredReports.slice(0, 4)).map(
            (r) => (
              <div key={r.id} className="glass-panel scouting-card card">
                <div className="player-photo-placeholder">👤</div>
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4>{r.name}</h4>
                    <span className="score-badge">{r.rating}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
                    {r.position} | {r.age} años | {r.club}
                  </p>
                  <div
                    style={{ display: "flex", gap: "4px", marginTop: "8px" }}
                  >
                    {r.strengths &&
                      r.strengths.slice(0, 2).map((strength, idx) => (
                        <span
                          key={idx}
                          className="payment-status-tag paid"
                          style={{ fontSize: "0.6rem" }}
                        >
                          {strength}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ),
          )}
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
      )}
    </div>
  );
};

export default ScoutingReports;
