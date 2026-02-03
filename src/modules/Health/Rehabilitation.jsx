import React, { useState, useEffect } from "react";

const Rehabilitation = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await fetch(`${API_BASE}/rehabilitation/exercises`);
      const data = await res.json();
      setExercises(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setLoading(false);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_BASE}/rehabilitation/exercises/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      const updated = await res.json();
      setExercises(exercises.map((ex) => (ex.id === id ? updated : ex)));
    } catch (err) {
      console.error("Error updating exercise:", err);
    }
  };

  const getPhaseLabel = (phase) => {
    switch (phase) {
      case 1:
        return "Fase 1: Tratamiento Agudo";
      case 2:
        return "Fase 2: Fortalecimiento";
      case 3:
        return "Fase 3: Vuelta al campo";
      default:
        return "Fase desconocida";
    }
  };

  return (
    <div className="rehabilitation">
      <div className="grid">
        <div className="glass-panel card">
          <h3>Sistema de Readaptación</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">Fase 1: Tratamiento Agudo</div>
                <p>Manejo del dolor e inflamación</p>
              </div>
            </div>
            <div className="timeline-item">
              <div
                className="timeline-dot"
                style={{ background: "#7000ff" }}
              ></div>
              <div className="timeline-content">
                <div className="timeline-date">Fase 2: Fortalecimiento</div>
                <p>Introducción de carga isométrica dirigida.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div
                className="timeline-dot"
                style={{ background: "var(--border)" }}
              ></div>
              <div className="timeline-content">
                <div className="timeline-date">Fase 3: Vuelta al campo</div>
                <p>Ejercicios sin contacto y trote suave.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel card">
          <h3>Ejercicios de Readaptación - Hoy</h3>
          {loading ? (
            <p style={{ textAlign: "center" }}>Cargando ejercicios...</p>
          ) : (
            <div className="player-list" style={{ marginTop: "16px" }}>
              {exercises.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
                  No hay ejercicios programados para hoy.
                </p>
              ) : (
                exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="player-row"
                    style={{ opacity: ex.completed ? 0.6 : 1 }}
                  >
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          textDecoration: ex.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {ex.name}
                      </p>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {ex.Player ? ex.Player.name : "Unknown"} - {ex.duration}{" "}
                        - {getPhaseLabel(ex.phase)}
                      </p>
                    </div>
                    <button
                      className="glow-btn"
                      style={{
                        padding: "4px 12px",
                        fontSize: "0.7rem",
                        background: ex.completed
                          ? "var(--border)"
                          : "linear-gradient(45deg, var(--primary), var(--secondary))",
                      }}
                      onClick={() => toggleComplete(ex.id, ex.completed)}
                    >
                      {ex.completed ? "Completado" : "Pendiente"}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rehabilitation;
