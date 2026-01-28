import React, { useState, useEffect } from "react";

const Rehabilitation = () => {
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("rehab_exercises");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Core y Estabilidad",
            player: "Benzema",
            duration: "30 min",
            completed: false,
          },
          {
            id: 2,
            name: "Propiocepción",
            player: "Modric",
            duration: "15 min",
            completed: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("rehab_exercises", JSON.stringify(exercises));
  }, [exercises]);

  const toggleComplete = (id) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex,
      ),
    );
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
                <p>Manejo del dolor e inflamación (Benzema)</p>
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
          <div className="player-list" style={{ marginTop: "16px" }}>
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className="player-row"
                style={{ opacity: ex.completed ? 0.6 : 1 }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      textDecoration: ex.completed ? "line-through" : "none",
                    }}
                  >
                    {ex.name}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {ex.player} - {ex.duration}
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
                  onClick={() => toggleComplete(ex.id)}
                >
                  {ex.completed ? "Completado" : "Pendiente"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rehabilitation;
