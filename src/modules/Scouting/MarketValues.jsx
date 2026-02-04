import React, { useState, useEffect } from "react";

const MarketValues = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchMarketValues();
  }, []);

  const fetchMarketValues = async () => {
    try {
      const res = await fetch(`${API_BASE}/market-values`);
      const data = await res.json();
      setPlayers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching market values:", err);
      setLoading(false);
    }
  };

  return (
    <div className="market-values">
      <div className="glass-panel card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0 }}>
            Valoración de Mercado Interna vs Externa
          </h3>
          {players.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="view-all-btn"
              style={{
                background: "rgba(0, 242, 255, 0.1)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {showAll ? "Ver menos" : `Ver todos (${players.length})`}
            </button>
          )}
        </div>
        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando valoraciones...</p>
        ) : (
          <table className="health-table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Valoración Club</th>
                <th>Valor Transfermarkt</th>
                <th>Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {(showAll ? players : players.slice(0, 4)).map((p) => (
                <tr key={p.id}>
                  <td>{p.Player ? p.Player.name : "Unknown"}</td>
                  <td>{p.internal_value}</td>
                  <td>{p.market_value}</td>
                  <td>
                    <span
                      className={`market-trend ${p.trend === "up" ? "trend-up" : p.trend === "down" ? "trend-down" : ""}`}
                    >
                      {p.trend === "up"
                        ? "▲ Al alza"
                        : p.trend === "down"
                          ? "▼ A la baja"
                          : "● Estable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MarketValues;
