import React, { useState, useEffect } from "react";
import { Users, Save, X, Crosshair } from "lucide-react";
import "./TacticsBoard.css";

const TacticsBoard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tactics, setTactics] = useState({}); // { position_index: player_id }
  const [selectedSlot, setSelectedSlot] = useState(null);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchPlayers();
    // Load saved tactics if any (mocked for now)
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

  const positions = [
    { id: 0, pos: "POR", top: "85%", left: "50%" },
    { id: 1, pos: "LD", top: "65%", left: "85%" },
    { id: 2, pos: "DFC", top: "70%", left: "60%" },
    { id: 3, pos: "DFC", top: "70%", left: "40%" },
    { id: 4, pos: "LI", top: "65%", left: "15%" },
    { id: 5, pos: "MC", top: "45%", left: "50%" },
    { id: 6, pos: "MC", top: "50%", left: "30%" },
    { id: 7, pos: "MC", top: "50%", left: "70%" },
    { id: 8, pos: "ED", top: "25%", left: "80%" },
    { id: 9, pos: "DC", top: "15%", left: "50%" },
    { id: 10, pos: "EI", top: "25%", left: "20%" },
  ];

  const handleSelectPlayer = (playerId) => {
    if (selectedSlot !== null) {
      setTactics({ ...tactics, [selectedSlot]: playerId });
      setSelectedSlot(null);
    }
  };

  const getPlayerInSlot = (slotId) => {
    const playerId = tactics[slotId];
    return players.find((p) => p.id === playerId);
  };

  return (
    <div className="tactics-board-container">
      <div className="field-view whiteboard">
        {positions.map((p) => {
          const assignedPlayer = getPlayerInSlot(p.id);
          return (
            <div
              key={p.id}
              className={`player-node tactico ${selectedSlot === p.id ? "selecting" : ""} ${assignedPlayer ? "filled" : ""}`}
              style={{ top: p.top, left: p.left }}
              onClick={() => setSelectedSlot(p.id)}
            >
              {assignedPlayer ? (
                <div className="assigned-info">
                  <span className="player-initials">
                    {assignedPlayer.name.charAt(0)}
                  </span>
                  <span className="player-label-name">
                    {assignedPlayer.name.split(" ")[0]}
                  </span>
                </div>
              ) : (
                <span className="pos-text">{p.pos}</span>
              )}
            </div>
          );
        })}
        {/* Pitch markings */}
        <div className="pitch-center-circle"></div>
        <div className="pitch-center-line"></div>
        <div className="pitch-penalty-area top"></div>
        <div className="pitch-penalty-area bottom"></div>
      </div>

      <div className="tactics-sidebar glass-panel">
        <div className="sidebar-header-internal">
          <h3>Pizarra Táctica</h3>
          <p>Asigna la alineación para el próximo partido</p>
        </div>

        {selectedSlot !== null ? (
          <div className="player-selector animate-slide-up">
            <div className="selector-header">
              <h4>Seleccionar {positions[selectedSlot].pos}</h4>
              <button
                className="close-btn"
                onClick={() => setSelectedSlot(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="selector-list">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`selector-item ${tactics[selectedSlot] === player.id ? "active" : ""}`}
                  onClick={() => handleSelectPlayer(player.id)}
                >
                  <div className="player-avatar-small">
                    {player.name.charAt(0)}
                  </div>
                  <div className="player-data">
                    <span className="name">{player.name}</span>
                    <span className="pos">{player.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="tactics-summary">
            <div className="info-card-tactics">
              <Crosshair size={24} color="var(--primary)" />
              <div>
                <strong>Instrucciones</strong>
                <p>
                  Haz clic en una posición de la cancha para asignar un jugador
                  de la plantilla.
                </p>
              </div>
            </div>

            <button className="glow-btn save-tactics-btn">
              <Save size={18} /> Guardar Alineación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacticsBoard;
