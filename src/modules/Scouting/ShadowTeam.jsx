import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";

const ShadowTeam = () => {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    position: "DC",
  });
  const [showAll, setShowAll] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchObjectives();
  }, []);

  const fetchObjectives = async () => {
    try {
      const res = await fetch(`${API_BASE}/scouting/objectives`);
      const data = await res.json();
      setObjectives(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching objectives:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name) {
      try {
        const rating = parseInt(formData.rating) || 0;
        const res = await fetch(`${API_BASE}/scouting/objectives`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, rating }),
        });
        const newObj = await res.json();
        setObjectives([...objectives, newObj]);
        setIsModalOpen(false);
        setFormData({ name: "", rating: "", position: "DC" });
      } catch (err) {
        console.error("Error adding objective:", err);
      }
    }
  };

  const removeObjective = async (id) => {
    try {
      await fetch(`${API_BASE}/scouting/objectives/${id}`, {
        method: "DELETE",
      });
      setObjectives(objectives.filter((o) => o.id !== id));
    } catch (err) {
      console.error("Error removing objective:", err);
    }
  };

  const positions = [
    { pos: "POR", top: "85%", left: "50%" },
    { pos: "LD", top: "65%", left: "85%" },
    { pos: "DFC", top: "70%", left: "60%" },
    { pos: "DFC", top: "70%", left: "40%" },
    { pos: "LI", top: "65%", left: "15%" },
    { pos: "MC", top: "45%", left: "50%" },
    { pos: "MC", top: "50%", left: "30%" },
    { pos: "MC", top: "50%", left: "70%" },
    { pos: "ED", top: "25%", left: "80%" },
    { pos: "DC", top: "15%", left: "50%" },
    { pos: "EI", top: "25%", left: "20%" },
  ];

  return (
    <div className="shadow-team-container">
      <div className="field-view">
        {positions.map((p, i) => (
          <div
            key={i}
            className="player-node"
            style={{ top: p.top, left: p.left }}
          >
            {p.pos}
          </div>
        ))}
      </div>

      <div className="sidebar-list">
        <div
          className="glass-panel card"
          style={{ height: "100%", minHeight: "400px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: 0 }}>Planificación: Shadow Team</h4>
            {objectives.length > 4 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="view-all-btn"
                style={{
                  background: "rgba(0, 242, 255, 0.1)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                }}
              >
                {showAll ? "Ver menos" : "Ver todos"}
              </button>
            )}
          </div>
          {loading ? (
            <p>Conectando con Scouting...</p>
          ) : (
            <div
              className="player-list"
              style={showAll ? { overflowY: "auto", maxHeight: "300px" } : {}}
            >
              {(showAll ? objectives : objectives.slice(0, 4)).map((obj) => (
                <div key={obj.id} className="player-row">
                  <div>
                    <span style={{ display: "block", fontSize: "0.9rem" }}>
                      {obj.name}
                    </span>
                    <span
                      style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                    >
                      {obj.position}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <span className="score-badge">{obj.rating}</span>
                    <button
                      onClick={() => removeObjective(obj.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--danger)",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="glow-btn"
            style={{ width: "100%", marginTop: "auto" }}
            onClick={() => setIsModalOpen(true)}
          >
            Añadir Objetivo
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Añadir Objetivo al Shadow Team"
      >
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Jugador</label>
            <input
              type="text"
              placeholder="Ej: Erling Haaland"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Posición</label>
            <select
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
            >
              <option value="POR">POR</option>
              <option value="LD">LD</option>
              <option value="DFC">DFC</option>
              <option value="LI">LI</option>
              <option value="MC">MC</option>
              <option value="MCO">MCO</option>
              <option value="ED">ED</option>
              <option value="EI">EI</option>
              <option value="DC">DC</option>
            </select>
          </div>
          <div className="form-group">
            <label>Rating Estimado (0-99)</label>
            <input
              type="number"
              min="0"
              max="99"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
              required
            />
          </div>
          <div style={{ marginTop: "10px", display: "flex", gap: "12px" }}>
            <button
              type="button"
              className="glow-btn"
              style={{ flex: 1, background: "rgba(255,255,255,0.05)" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="glow-btn" style={{ flex: 1 }}>
              Confirmar Objetivo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ShadowTeam;
