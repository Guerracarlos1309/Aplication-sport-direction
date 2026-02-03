import React, { useState, useEffect } from "react";
import { User, Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./PlayerProfile.css";

const PlayerProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    status: "",
    medical_status: "",
    prognosis: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [newPass, setNewPass] = useState("");

  const handlePasswordChange = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, newPassword: newPass }),
        },
      );
      if (response.ok) {
        setMessage({
          type: "success",
          text: "¡Contraseña actualizada con éxito!",
        });
        setNewPass("");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar contraseña." });
    }
  };

  useEffect(() => {
    if (user?.player_id) {
      fetchPlayerData();
    }
  }, [user]);

  const fetchPlayerData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/players/${user.player_id}`,
      );
      if (!response.ok) throw new Error("Error al cargar datos");
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error al cargar la información del jugador.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(
        `http://localhost:5000/api/players/${user.player_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Error al guardar");

      setMessage({
        type: "success",
        text: "Información actualizada correctamente.",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar los cambios." });
    } finally {
      setSaving(false);
    }
  };

  if (!user?.player_id) {
    return (
      <div className="module-container">
        <div
          className="glass-panel"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <AlertCircle
            size={48}
            color="var(--danger)"
            style={{ marginBottom: "1rem" }}
          />
          <h3>Perfil no disponible</h3>
          <p>Tu usuario no está vinculado a un perfil de jugador.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="module-container centered">
        <Loader2 className="animate-spin" size={40} color="var(--accent)" />
      </div>
    );
  }

  return (
    <div className="player-profile animate-fade-in">
      <header className="module-header">
        <div className="header-title">
          <div className="icon-box">
            <User size={24} color="var(--accent)" />
          </div>
          <div className="title-text">
            <h1>Mi Perfil Deportivo</h1>
            <p>Gestiona tu información personal y estado</p>
          </div>
        </div>
      </header>

      <div className="profile-grid">
        <form onSubmit={handleSubmit} className="glass-panel profile-form">
          <div className="form-header">
            <h3>Editar Información</h3>
            {message.text && (
              <div className={`status-message ${message.type}`}>
                {message.type === "success" ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                <span>{message.text}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Posición</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="POR">Portero (POR)</option>
              <option value="DEF">Defensa (DEF)</option>
              <option value="MED">Mediocampista (MED)</option>
              <option value="DEL">Delantero (DEL)</option>
            </select>
          </div>

          <div className="grid-2-cols">
            <div className="form-group">
              <label>Estado de Convocatoria</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Convocado">Convocado</option>
                <option value="No Convocado">No Convocado</option>
                <option value="Lesionado">Lesionado</option>
                <option value="Duda">Duda</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estado Médico</label>
              <input
                type="text"
                name="medical_status"
                value={formData.medical_status}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Pronóstico / Notas</label>
            <textarea
              name="prognosis"
              value={formData.prognosis || ""}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="glow-btn save-btn"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Guardando...
                </>
              ) : (
                <>
                  <Save size={18} /> Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>

        <div className="player-stats-preview glass-panel">
          <h3>Vista Previa</h3>
          <div className="player-card">
            <div className="player-avatar-large">{formData.name.charAt(0)}</div>
            <h4>{formData.name}</h4>
            <span className="player-pos-badge">{formData.position}</span>

            <div className="stats-mini-grid">
              <div className="stat-item">
                <label>Estado</label>
                <span
                  className={`status-text ${formData.status === "Lesionado" ? "danger" : "success"}`}
                >
                  {formData.status}
                </span>
              </div>
            </div>
          </div>

          <div
            className="password-change-section"
            style={{
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <h3>Seguridad</h3>
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label>Nueva Contraseña</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="password"
                  placeholder="Mínimo 4 caracteres"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <button
                  className="glow-btn btn-sm"
                  onClick={handlePasswordChange}
                  disabled={newPass.length < 4}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
