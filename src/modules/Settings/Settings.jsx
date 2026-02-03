import React, { useState, useEffect } from "react";
import { Save, Settings as SettingsIcon, Camera, Palmtree } from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    team_name: "",
    team_short_name: "",
    logo_url: "",
    primary_color: "#00f2ff",
    current_season: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching settings:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({
          type: "success",
          text: "¡Configuración guardada correctamente!",
        });
        // Reload to apply changes globally if needed
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Error al guardar la configuración." });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="loading-state">Cargando configuración...</div>;

  return (
    <div className="settings-module animate-fade-in">
      <header className="module-header">
        <div>
          <h2>Ajustes del Sistema</h2>
          <p>Configura la identidad visual y datos globales de tu equipo.</p>
        </div>
      </header>

      <div className="settings-grid">
        <div className="glass-panel card settings-card">
          <div className="card-header-icon">
            <SettingsIcon size={20} color="var(--primary)" />
            <h4>Identidad del Equipo</h4>
          </div>

          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label>Nombre Oficial del Equipo</label>
              <input
                type="text"
                value={settings.team_name}
                onChange={(e) =>
                  setSettings({ ...settings, team_name: e.target.value })
                }
                placeholder="Ej: Sport Direction FC"
                required
              />
            </div>

            <div className="form-group">
              <label>Nombre Corto / Siglas</label>
              <input
                type="text"
                value={settings.team_short_name}
                onChange={(e) =>
                  setSettings({ ...settings, team_short_name: e.target.value })
                }
                placeholder="Ej: SDFC"
                maxLength={5}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Temporada Actual</label>
                <input
                  type="text"
                  value={settings.current_season}
                  onChange={(e) =>
                    setSettings({ ...settings, current_season: e.target.value })
                  }
                  placeholder="Ej: 2025/2026"
                />
              </div>

              <div className="form-group">
                <label>Color Principal</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        primary_color: e.target.value,
                      })
                    }
                  />
                  <span>{settings.primary_color}</span>
                </div>
              </div>
            </div>

            {message && (
              <div className={`message-banner ${message.type}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="glow-btn save-btn"
              disabled={saving}
            >
              <Save size={18} />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>

        <div className="glass-panel card preview-card">
          <h4>Previsualización</h4>
          <div className="logo-preview-container">
            <div
              className="logo-preview-circle"
              style={{
                background: `linear-gradient(45deg, ${settings.primary_color}, var(--secondary))`,
              }}
            >
              {settings.team_short_name?.charAt(0) || "S"}
            </div>
            <div className="team-preview-info">
              <h3>{settings.team_name || "Nombre del Equipo"}</h3>
              <p>Temporada {settings.current_season}</p>
            </div>
          </div>

          <div className="preview-tip">
            <Palmtree size={16} />
            <p>
              Los cambios en el color y nombre se aplicarán a toda la interfaz
              del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
