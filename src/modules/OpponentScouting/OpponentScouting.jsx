import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Target,
  TrendingUp,
  User as CoachIcon,
  CheckCircle2,
  Plus,
  Trash2,
  Brain,
} from "lucide-react";
import Modal from "../../components/common/Modal";
import "./OpponentScouting.css";

const OpponentScouting = () => {
  const [opponents, setOpponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    formation: "4-4-2",
    style: "",
    strength: "",
    weakness: "",
    key_players: "",
    threat_level: 3,
    last_matches: "",
    coach: "",
    plan_of_action: "",
  });

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchOpponents();
  }, []);

  const fetchOpponents = async () => {
    try {
      const res = await fetch(`${API_BASE}/opponents`);
      const data = await res.json();
      setOpponents(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching opponents:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/opponents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchOpponents();
        setIsModalOpen(false);
        setFormData({
          name: "",
          formation: "4-4-2",
          style: "",
          strength: "",
          weakness: "",
          key_players: "",
          threat_level: 3,
          last_matches: "",
          coach: "",
          plan_of_action: "",
        });
      }
    } catch (err) {
      console.error("Error saving opponent analysis:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`${API_BASE}/opponents/${deleteId}`, { method: "DELETE" });
      fetchOpponents();
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Error deleting opponent:", err);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="opponent-scouting animate-fade-in">
      <header className="module-header">
        <div className="header-title">
          <div
            className="icon-box"
            style={{ background: "rgba(255, 0, 122, 0.1)" }}
          >
            <ShieldAlert size={24} color="#ff007a" />
          </div>
          <div className="title-text">
            <h1>Inteligencia del Rival</h1>
            <p>
              Análisis táctico y plan de acción para los próximos encuentros
            </p>
          </div>
        </div>
        <button className="glow-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Nuevo Análisis
        </button>
      </header>

      <div className="scouting-grid">
        {loading ? (
          <p>Cargando inteligencia...</p>
        ) : (
          opponents.map((opp) => (
            <div key={opp.id} className="glass-panel opponent-card card">
              <span
                className={`threat-badge ${opp.threat_level >= 4 ? "threat-high" : "threat-med"}`}
              >
                Nivel de Amenaza: {opp.threat_level}/5
              </span>

              <div className="opponent-header">
                <div className="opponent-logo">{opp.name.charAt(0)}</div>
                <div>
                  <h3>{opp.name}</h3>
                  <p
                    style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                  >
                    <CoachIcon size={14} style={{ marginRight: "4px" }} />{" "}
                    {opp.coach}
                  </p>
                </div>
              </div>

              <div
                className="grid"
                style={{ gridTemplateColumns: "1fr 1fr", gap: "10px" }}
              >
                <div className="detail-section">
                  <h5>Sistema</h5>
                  <div className="tag">{opp.formation}</div>
                </div>
                <div className="detail-section">
                  <h5>Estilo</h5>
                  <div className="tag">{opp.style}</div>
                </div>
              </div>

              <div className="detail-section">
                <h5>Últimos Resultados</h5>
                <div className="form-badges">
                  {opp.last_matches?.split(",").map((res, i) => (
                    <div
                      key={i}
                      className={`form-dot form-${res.toLowerCase().trim()}`}
                    >
                      {res}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h5>Fortalezas</h5>
                <div className="tag-container">
                  {opp.strength?.split(",").map((s, i) => (
                    <span key={i} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h5>Jugadores Clave</h5>
                <div className="tag-container">
                  {opp.key_players?.split(",").map((p, i) => (
                    <span
                      key={i}
                      className="tag"
                      style={{ color: "var(--accent)" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="action-plan">
                <h5 style={{ color: "var(--primary)", marginBottom: "4px" }}>
                  <Brain size={14} style={{ marginRight: "6px" }} /> Plan
                  Estratégico
                </h5>
                <p style={{ margin: 0 }}>{opp.plan_of_action}</p>
              </div>

              <div className="card-footer">
                <button
                  className="action-btn delete"
                  onClick={() => openDeleteModal(opp.id)}
                  title="Eliminar análisis"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Análisis de Inteligencia"
      >
        <form className="modal-form complex-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-title">
              <Target size={14} /> Datos Generales
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Nombre del Equipo</label>
                <input
                  type="text"
                  placeholder="Ej: Real Madrid"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Entrenador</label>
                <input
                  type="text"
                  placeholder="Nombre del técnico"
                  value={formData.coach}
                  onChange={(e) =>
                    setFormData({ ...formData, coach: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <ShieldAlert size={14} /> Configuración Táctica
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Formación Principal</label>
                <select
                  value={formData.formation}
                  onChange={(e) =>
                    setFormData({ ...formData, formation: e.target.value })
                  }
                >
                  <option>4-4-2</option>
                  <option>4-3-3</option>
                  <option>3-5-2</option>
                  <option>4-2-3-1</option>
                  <option>5-3-2</option>
                  <option>4-1-4-1</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amenaza (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.threat_level}
                  onChange={(e) =>
                    setFormData({ ...formData, threat_level: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label>Estilo de Juego</label>
              <input
                type="text"
                placeholder="Ej: Posesión, Contraataque..."
                value={formData.style}
                onChange={(e) =>
                  setFormData({ ...formData, style: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <TrendingUp size={14} /> Análisis de Rendimiento
            </div>
            <div className="form-group">
              <label>Fortalezas (separadas por coma)</label>
              <input
                type="text"
                placeholder="Ej: Juego aéreo, Bandas..."
                value={formData.strength}
                onChange={(e) =>
                  setFormData({ ...formData, strength: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Jugadores Clave</label>
              <input
                type="text"
                placeholder="Ej: Bellingham, Vinicius..."
                value={formData.key_players}
                onChange={(e) =>
                  setFormData({ ...formData, key_players: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Racha (W, D, L)</label>
              <input
                type="text"
                placeholder="Ej: W, W, D, L, W"
                value={formData.last_matches}
                onChange={(e) =>
                  setFormData({ ...formData, last_matches: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <Brain size={14} /> Plan de Acción DT
            </div>
            <div className="form-group">
              <label>Instrucciones Tácticas</label>
              <textarea
                rows="4"
                placeholder="Describe cómo neutralizar al rival..."
                value={formData.plan_of_action}
                onChange={(e) =>
                  setFormData({ ...formData, plan_of_action: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer-sticky">
            <button
              type="submit"
              className="glow-btn"
              style={{ width: "100%" }}
            >
              Guardar Inteligencia Táctica
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
        <div className="delete-confirm-content">
          <ShieldAlert
            size={48}
            color="var(--danger)"
            style={{ marginBottom: "16px" }}
          />
          <p>¿Estás seguro de que deseas eliminar este análisis táctico?</p>
          <div className="delete-actions">
            <button
              className="btn-secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </button>
            <button className="btn-danger" onClick={handleDelete}>
              Eliminar Permanentemente
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OpponentScouting;
