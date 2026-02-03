import React, { useState, useEffect } from "react";

const TrainingPlanner = () => {
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "Táctico",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  // API URL - should be in .env but for simplicity:
  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      const data = await res.json();
      setSessions(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    try {
      const res = await fetch(`${API_BASE}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newSession = await res.json();
      setSessions([newSession, ...sessions]);
      setFormData({ title: "", type: "Táctico", description: "" });
    } catch (err) {
      console.error("Error saving session:", err);
    }
  };

  const deleteSession = async (id) => {
    try {
      await fetch(`${API_BASE}/sessions/${id}`, { method: "DELETE" });
      setSessions(sessions.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  return (
    <div className="coaching-grid">
      <div className="glass-panel card">
        <h3>Nueva Sesión de Entrenamiento</h3>
        <form className="planning-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título de la Sesión</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ej: Posesión y Presión Trans-Pérdida"
            />
          </div>
          <div className="form-group">
            <label>Tipo de Entrenamiento</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Táctico</option>
              <option>Físico</option>
              <option>Técnico</option>
              <option>Recuperación</option>
            </select>
          </div>
          <div className="form-group">
            <label>Descripción y Objetivos</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detalles de los ejercicios..."
            ></textarea>
          </div>
          <button type="submit" className="glow-btn">
            Guardar
          </button>
        </form>
      </div>

      <div className="glass-panel card">
        <h3>Próximas Sesiones</h3>
        {loading ? (
          <p>Cargando sesiones...</p>
        ) : (
          <div className="player-list">
            {sessions.map((session) => (
              <div key={session.id} className="player-row">
                <div>
                  <p style={{ fontWeight: "600" }}>{session.title}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {new Date(session.date).toLocaleDateString()}
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <span className="callup-status status-called">
                    {session.type}
                  </span>
                  <button
                    onClick={() => deleteSession(session.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff6b6b",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    ×
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

export default TrainingPlanner;
