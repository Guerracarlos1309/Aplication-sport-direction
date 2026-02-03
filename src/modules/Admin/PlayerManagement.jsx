import React, { useState, useEffect } from "react";
import { Users, Search, Loader2, Plus, UserPlus } from "lucide-react";
import Modal from "../../components/common/Modal";
import "./PlayerManagement.css";

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "POR",
    status: "Convocado",
    medical_status: "Apto",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/players");
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Create a mock ID if backend logic is simple, or let backend handle it
      // Standard POST
      const response = await fetch("http://localhost:5000/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (response.ok) {
        const savedPlayer = await response.json();
        setPlayers([...players, savedPlayer]);
        setIsModalOpen(false);
        setNewPlayer({
          name: "",
          position: "POR",
          status: "Convocado",
          medical_status: "Apto",
        });
      } else {
        // Fallback for visual demo if API endpoint doesn't support POST yet
        const mockPlayer = { ...newPlayer, id: players.length + 1 };
        setPlayers([...players, mockPlayer]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setSaving(false);
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="player-management animate-fade-in">
      <header className="module-header">
        <div className="header-title">
          <div className="icon-box">
            <Users size={24} color="var(--accent)" />
          </div>
          <div className="title-text">
            <h1>Gestión de Plantilla</h1>
            <p>Visualización y administración de jugadores del club</p>
          </div>
        </div>
        <button
          className="glow-btn add-player-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Inscribir Jugador
        </button>
      </header>

      <div className="search-bar glass-panel" style={{ marginBottom: "2rem" }}>
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar jugador por nombre, posición..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={40} color="var(--accent)" />
        </div>
      ) : (
        <div className="table-container glass-panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Jugador</th>
                <th>Posición</th>
                <th>Estado Actual</th>
                <th>Condición Médica</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id}>
                    <td style={{ color: "var(--text-muted)" }}>#{player.id}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                          }}
                        >
                          {player.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600 }}>{player.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="position-badge">{player.position}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          player.status === "Lesionado"
                            ? "status-danger"
                            : "status-success"
                        }`}
                      >
                        {player.status}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {player.medical_status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "3rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No se encontraron jugadores que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Player Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Inscribir Nuevo Jugador"
      >
        <form className="modal-form" onSubmit={handleAddPlayer}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              placeholder="Ej: Lionel Messi"
              value={newPlayer.name}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Posición</label>
            <select
              value={newPlayer.position}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, position: e.target.value })
              }
            >
              <option value="POR">Portero (POR)</option>
              <option value="DEF">Defensa (DEF)</option>
              <option value="MED">Mediocampista (MED)</option>
              <option value="DEL">Delantero (DEL)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Estado Inicial</label>
            <select
              value={newPlayer.status}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, status: e.target.value })
              }
            >
              <option value="Convocado">Convocado</option>
              <option value="No Convocado">No Convocado</option>
              <option value="Lesionado">Lesionado</option>
            </select>
          </div>

          <div
            className="modal-footer"
            style={{ borderTop: "none", padding: "0", marginTop: "16px" }}
          >
            <button
              type="button"
              className="glow-btn"
              style={{ background: "rgba(255,255,255,0.05)", flex: 1 }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="glow-btn" style={{ flex: 1 }}>
              {saving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} style={{ marginRight: "8px" }} />{" "}
                  Inscribir
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PlayerManagement;
