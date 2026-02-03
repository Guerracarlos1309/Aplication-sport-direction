import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const PlayerCallUp = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`${API_BASE}/players`);
      const data = await res.json();
      setPlayers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching players:", err);
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const statusOrder = ["Convocado", "Duda", "Lesionado", "No Convocado"];
    const nextIndex =
      (statusOrder.indexOf(currentStatus) + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];

    try {
      const res = await fetch(`${API_BASE}/players/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedPlayer = await res.json();
      setPlayers(players.map((p) => (p.id === id ? updatedPlayer : p)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Convocado":
        return "status-called";
      case "Duda":
        return "status-pending";
      case "Lesionado":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="player-callup">
      <div className="glass-panel card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3>Convocatoria: Tiempo Real</h3>
        </div>

        {loading ? (
          <p>Conectando con la base de datos...</p>
        ) : (
          <div className="player-list">
            {players.map((player) => (
              <div key={player.id} className="player-row">
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      color: "var(--primary)",
                      fontWeight: "700",
                      width: "40px",
                    }}
                  >
                    {player.position}
                  </span>
                  <span>{player.name}</span>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {player.callup_acknowledged && (
                    <div className="ack-badge" title="Acuse de Recibo">
                      <CheckCircle2 size={16} color="#4ade80" />
                    </div>
                  )}
                  <button
                    className={`callup-status ${getStatusClass(player.status)}`}
                    onClick={() => toggleStatus(player.id, player.status)}
                    style={{
                      cursor: "pointer",
                      border: "none",
                      fontInherit: "inherit",
                    }}
                  >
                    {player.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCallUp;
