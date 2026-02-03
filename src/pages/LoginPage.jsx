import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Lock, User as UserIcon, Loader2 } from "lucide-react";
import "./Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const { login } = useAuth();
  const API_BASE = "http://localhost:5000/api";

  React.useEffect(() => {
    fetch(`${API_BASE}/settings`)
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header">
          <div
            className="logo-placeholder"
            style={{
              backgroundColor: settings?.primary_color || "var(--primary)",
            }}
          >
            {settings?.team_short_name?.charAt(0) || "A"}
          </div>
          <h2>{settings?.team_name || "Sport Direction"}</h2>
          <p>Gestión Deportiva de Alto Rendimiento</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="input-group">
            <UserIcon size={18} />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="glow-btn login-btn"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Entrar al Sistema"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Demo: <span>entrenador / 1234</span> o <span>carlos / 1234</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
