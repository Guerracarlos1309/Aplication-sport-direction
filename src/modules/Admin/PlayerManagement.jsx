import {
  Users,
  Search,
  Loader2,
  Plus,
  UserPlus,
  Trash2,
  Power,
  PowerOff,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Fingerprint,
  Flag,
  Ruler,
  Weight,
  Footprints,
  Hash,
  Layers,
} from "lucide-react";
import Modal from "../../components/common/Modal";
import "./PlayerManagement.css";
import { useState, useEffect } from "react";

const PlayerManagement = () => {
  const API_BASE = "http://localhost:5000/api";
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "POR",
    status: "No Convocado",
    medical_status: "Apto",
    dni: "",
    birth_date: "",
    nationality: "",
    height: "",
    weight: "",
    preferred_foot: "Derecho",
    jersey_number: "",
    category: "",
    phone: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${API_BASE}/players`);
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
      const response = await fetch(`${API_BASE}/players`, {
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
          status: "No Convocado",
          medical_status: "Apto",
          dni: "",
          birth_date: "",
          nationality: "",
          height: "",
          weight: "",
          preferred_foot: "Derecho",
          jersey_number: "",
          category: "",
          phone: "",
          email: "",
        });
      }
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/players/${id}/toggle-active`,
        {
          method: "PATCH",
        },
      );
      if (response.ok) {
        const updatedPlayer = await response.json();
        setPlayers(players.map((p) => (p.id === id ? updatedPlayer : p)));
      }
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePlayer = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/players/${deleteId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setPlayers(players.filter((p) => p.id !== deleteId));
        setIsDeleteModalOpen(false);
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const [showAll, setShowAll] = useState(false);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedPlayers = showAll
    ? filteredPlayers
    : filteredPlayers.slice(0, 10);

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
          style={{ cursor: "pointer", marginBottom: "1rem" }}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Inscribir Jugador
        </button>
      </header>

      <div className="search-bar glass-panel" style={{ marginBottom: "1rem" }}>
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar jugador por nombre, posición..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2rem",
        }}
      >
        {filteredPlayers.length > 4 && (
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
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {showAll ? "Ver menos" : `Ver todos (${filteredPlayers.length})`}
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={40} color="var(--accent)" />
        </div>
      ) : (
        <>
          <div className="table-container header-glass-special hide-mobile">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Jugador</th>
                  <th>Posición</th>
                  <th>Dorsal</th>
                  <th>Estado</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {displayedPlayers.length > 0 ? (
                  displayedPlayers.map((player) => (
                    <tr
                      key={player.id}
                      className={!player.active ? "row-inactive" : ""}
                    >
                      <td>#{player.id}</td>
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
                        <span className="position-badge">
                          {player.position}
                        </span>
                      </td>
                      <td>
                        <span className="jersey-badge">
                          {player.jersey_number || "-"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            player.status === "Lesionado"
                              ? "status-danger"
                              : player.status === "No Convocado"
                                ? "status-warning"
                                : "status-success"
                          }`}
                        >
                          {player.status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`active-indicator ${player.active ? "active" : "inactive"}`}
                        >
                          {player.active ? "SÍ" : "NO"}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className={`action-btn ${player.active ? "deactivate" : "activate"}`}
                            onClick={() => handleToggleActive(player.id)}
                            title={player.active ? "Desactivar" : "Activar"}
                          >
                            {player.active ? (
                              <PowerOff size={16} />
                            ) : (
                              <Power size={16} />
                            )}
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => confirmDelete(player.id)}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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

          {/* Mobile Card View */}
          <div className="mobile-cards show-mobile">
            {displayedPlayers.length > 0 ? (
              displayedPlayers.map((player) => (
                <div
                  key={player.id}
                  className={`player-card-mobile glass-panel ${!player.active ? "row-inactive" : ""}`}
                >
                  <div className="card-header">
                    <div className="player-info">
                      <div className="player-avatar">
                        {player.name.charAt(0)}
                      </div>
                      <div>
                        <h3>{player.name}</h3>
                        <span className="player-id">#{player.id}</span>
                      </div>
                    </div>
                    <div className="active-status">
                      <span
                        className={`active-indicator ${player.active ? "active" : "inactive"}`}
                      >
                        {player.active ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </div>
                  </div>

                  <div className="card-details">
                    <div className="detail-item">
                      <span className="label">Posición</span>
                      <span className="position-badge">{player.position}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Dorsal</span>
                      <span className="jersey-badge">
                        {player.jersey_number || "-"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Estado</span>
                      <span
                        className={`status-badge ${
                          player.status === "Lesionado"
                            ? "status-danger"
                            : player.status === "No Convocado"
                              ? "status-warning"
                              : "status-success"
                        }`}
                      >
                        {player.status}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className={`glow-btn ${player.active ? "btn-deactivate" : "btn-activate"}`}
                      onClick={() => handleToggleActive(player.id)}
                    >
                      {player.active ? (
                        <>
                          <PowerOff size={16} /> Desactivar
                        </>
                      ) : (
                        <>
                          <Power size={16} /> Activar
                        </>
                      )}
                    </button>
                    <button
                      className="glow-btn btn-delete"
                      onClick={() => confirmDelete(player.id)}
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state-mobile">
                <p>
                  No se encontraron jugadores que coincidan con la búsqueda.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Player Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Inscribir Nuevo Jugador"
      >
        <form className="modal-form complex-form" onSubmit={handleAddPlayer}>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <Users size={14} /> Nombre Completo
              </label>
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
              <label>
                <Fingerprint size={14} /> DNI / Identificación
              </label>
              <input
                type="text"
                placeholder="00000000X"
                value={newPlayer.dni}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, dni: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar size={14} /> Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={newPlayer.birth_date}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, birth_date: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Flag size={14} /> Nacionalidad
              </label>
              <input
                type="text"
                placeholder="Ej: Argentina"
                value={newPlayer.nationality}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, nationality: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Layers size={14} /> Posición
              </label>
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
              <label>
                <Hash size={14} /> Dorsal
              </label>
              <input
                type="number"
                placeholder="10"
                value={newPlayer.jersey_number}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, jersey_number: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Ruler size={14} /> Altura (cm)
              </label>
              <input
                type="number"
                placeholder="170"
                value={newPlayer.height}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, height: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Weight size={14} /> Peso (kg)
              </label>
              <input
                type="number"
                placeholder="70"
                value={newPlayer.weight}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, weight: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Footprints size={14} /> Pie Preferido
              </label>
              <select
                value={newPlayer.preferred_foot}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, preferred_foot: e.target.value })
                }
              >
                <option value="Derecho">Derecho</option>
                <option value="Izquierdo">Izquierdo</option>
                <option value="Ambidiestro">Ambidiestro</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <ShieldCheck size={14} /> Categoría
              </label>
              <input
                type="text"
                placeholder="Ej: Primer Equipo"
                value={newPlayer.category}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, category: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Phone size={14} /> Teléfono
              </label>
              <input
                type="tel"
                placeholder="+34 000 000 000"
                value={newPlayer.phone}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, phone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                placeholder="jugador@ejemplo.com"
                value={newPlayer.email}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, email: e.target.value })
                }
              />
            </div>
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
      >
        <div style={{ padding: "10px 0" }}>
          <p style={{ color: "var(--text)", marginBottom: "20px" }}>
            ¿Estás seguro de que deseas eliminar permanentemente a este jugador?
            Esta acción no se puede deshacer.
          </p>
          <div
            className="modal-footer"
            style={{ borderTop: "none", padding: "0" }}
          >
            <button
              className="glow-btn"
              style={{ background: "rgba(255,255,255,0.05)", flex: 1 }}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="glow-btn"
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                color: "#f87171",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                flex: 1,
              }}
              onClick={handleDeletePlayer}
            >
              Eliminar Definitivamente
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlayerManagement;
