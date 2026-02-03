import React, { useState, useEffect } from "react";

const MarketValues = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <h3>Valoración de Mercado Interna vs Externa</h3>
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
              {players.map((p) => (
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
