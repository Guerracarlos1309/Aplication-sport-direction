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

  const [showAll, setShowAll] = useState(false);
  const displayedSessions = showAll ? sessions : sessions.slice(0, 3);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0 }}>Próximas Sesiones</h3>
          {sessions.length > 4 && (
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
                transition: "all 0.3s ease",
              }}
            >
              {showAll ? "Ver menos" : "Ver todos"}
            </button>
          )}
        </div>
        {loading ? (
          <p>Cargando sesiones...</p>
        ) : (
          <div className="player-list">
            {displayedSessions.map((session) => (
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
            {!showAll && sessions.length > 4 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                }}
              >
                Mostrando 3 de {sessions.length} sesiones
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingPlanner;
