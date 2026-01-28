import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PlayerWellness = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    sleep: 3,
    fatigue: 3,
    stress: 3,
    soreness: 3,
    mood: 3,
  });
  const [submitted, setSubmitted] = useState(false);

  const sliders = [
    {
      name: "sleep",
      label: "Calidad del Sueño",
      desc: "1: Fatal - 5: Excelente",
    },
    {
      name: "fatigue",
      label: "Nivel de Fatiga",
      desc: "1: Agotado - 5: Muy fresco",
    },
    {
      name: "stress",
      label: "Nivel de Estrés",
      desc: "1: Muy estresado - 5: Relajado",
    },
    {
      name: "soreness",
      label: "Dolor Muscular",
      desc: "1: Mucho dolor - 5: Sin dolor",
    },
    {
      name: "mood",
      label: "Estado de Ánimo",
      desc: "1: Malhumorado - 5: Muy feliz",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/wellness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_id: user.player_id,
          ...formData,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error("Error submitting wellness:", err);
    }
  };

  if (submitted) {
    return (
      <div
        className="glass-panel card"
        style={{ textAlign: "center", padding: "40px" }}
      >
        <h3 style={{ color: "var(--primary)" }}>✓ ¡Datos registrados!</h3>
        <p style={{ marginTop: "10px" }}>
          Tu bienestar ha sido enviado al cuerpo técnico.
        </p>
        <button
          className="glow-btn"
          style={{ marginTop: "20px" }}
          onClick={() => setSubmitted(false)}
        >
          Editar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="player-wellness">
      <div className="glass-panel card">
        <h3>Control de Bienestar (Wellness)</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
          Completa este formulario diariamente antes del entrenamiento.
        </p>

        <form onSubmit={handleSubmit} className="wellness-form">
          {sliders.map((s) => (
            <div
              key={s.name}
              className="form-group"
              style={{ marginBottom: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <label style={{ fontWeight: "600" }}>{s.label}</label>
                <span className="score-badge">{formData[s.name]}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={formData[s.name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [s.name]: parseInt(e.target.value),
                  })
                }
                className="wellness-slider"
                style={{ width: "100%" }}
              />
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
          <button type="submit" className="glow-btn" style={{ width: "100%" }}>
            Enviar al Staff Técnico
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerWellness;
