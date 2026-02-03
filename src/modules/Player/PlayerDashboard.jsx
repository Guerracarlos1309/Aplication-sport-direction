import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Calendar,
  MapPin,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  Zap,
  Dumbbell,
} from "lucide-react";
import PlayerWellness from "../Health/PlayerWellness";
import "./PlayerDashboard.css";

const PlayerDashboard = () => {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState("overview");
  const [nextTraining, setNextTraining] = useState(null);
  const [latestWellness, setLatestWellness] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const sRes = await fetch("http://localhost:5000/api/sessions");
      const sessions = await sRes.json();
      if (sessions.length > 0) setNextTraining(sessions[0]);

      if (user?.player_id) {
        // Fetch specific player data for status/acknowledgement
        const pRes = await fetch(
          `http://localhost:5000/api/players/${user.player_id}`,
        );
        const pData = await pRes.json();
        setPlayerData(pData);

        const wRes = await fetch(
          `http://localhost:5000/api/wellness/${user.player_id}`,
        );
        const wellness = await wRes.json();
        if (wellness.length > 0) setLatestWellness(wellness[0]);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledgement = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/players/${user.player_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callup_acknowledged: true }),
        },
      );
      if (res.ok) {
        const updated = await res.json();
        setPlayerData(updated);
      }
    } catch (err) {
      console.error("Error acknowledging callup:", err);
    }
  };

  const nextMatch = {
    opponent: "Real Madrid CF",
    date: "Sab, 7 Feb",
    time: "20:00",
    venue: "Estadio Santiago Bernabéu",
    type: "Liga",
  };

  return (
    <div className="player-dashboard animate-fade-in">
      <header className="dashboard-welcome">
        <div className="welcome-text">
          <h1>Hola, {user?.username} 👋</h1>
          <p>
            Este es tu resumen diario y preparación para el próximo partido.
          </p>
        </div>
        <div className="header-status-group">
          {playerData?.status === "Convocado" &&
            !playerData?.callup_acknowledged && (
              <div className="acknowledge-widget glass-panel animate-pulse">
                <Zap size={18} color="var(--primary)" />
                <span>
                  ¡Has sido <strong>Convocado</strong>!
                </span>
                <button
                  onClick={handleAcknowledgement}
                  className="glow-btn btn-sm"
                >
                  Confirmar Recibido
                </button>
              </div>
            )}
          <div className="fitness-status-badge">
            <Activity size={18} />
            <span>
              Estado: <strong>{playerData?.medical_status || "Apto"}</strong>
            </span>
          </div>
        </div>
      </header>

      <div className="dashboard-grid-main">
        {/* Main Column */}
        <div className="dashboard-col-left">
          {/* Next Match Card */}
          <div className="glass-panel match-hero-card">
            <div className="match-tag">Próximo Encuentro</div>
            <div className="match-teams">
              <div className="team">
                <div className="team-logo">SD</div>
                <span>Sport Direction</span>
              </div>
              <div className="vs">VS</div>
              <div className="team">
                <div className="team-logo opponent">RM</div>
                <span>{nextMatch.opponent}</span>
              </div>
            </div>
            <div className="match-details-row">
              <div className="detail">
                <Calendar size={16} /> {nextMatch.date}
              </div>
              <div className="detail">
                <Clock size={16} /> {nextMatch.time}
              </div>
              <div className="detail">
                <MapPin size={16} /> {nextMatch.venue}
              </div>
            </div>
          </div>

          <div className="dashboard-sub-grid">
            {/* Training Schedule */}
            <div className="glass-panel training-card">
              <div className="card-header-icon">
                <Dumbbell size={20} color="var(--primary)" />
                <h4>Entrenamiento Programado</h4>
              </div>
              {nextTraining ? (
                <div className="training-info">
                  <div className="time">
                    {new Date(nextTraining.date).toLocaleDateString()}
                  </div>
                  <div className="focus">{nextTraining.title}</div>
                  <div className="coach">Tipo: {nextTraining.type}</div>
                  <div
                    className="training-footer"
                    style={{ marginTop: "10px", padding: "0" }}
                  >
                    <MapPin size={14} /> Campo Principal
                  </div>
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  No hay sesiones programadas.
                </p>
              )}
            </div>

            {/* AI Coaching Tips */}
            <div className="glass-panel coach-tips-card">
              <div className="card-header-icon">
                <TrendingUp size={20} color="var(--accent)" />
                <h4>Feedback del Staff</h4>
              </div>
              <div className="tips-list">
                {latestWellness?.fatigue > 7 ? (
                  <div className="tip-item">
                    <AlertCircle size={16} color="#fbbf24" />
                    <p>
                      Tu fatiga es alta. Recomendamos sesión de recuperación
                      suave.
                    </p>
                  </div>
                ) : (
                  <div className="tip-item">
                    <CheckCircle2 size={16} color="#4ade80" />
                    <p>Niveles de energía óptimos. ¡A darlo todo!</p>
                  </div>
                )}
                <div className="tip-item">
                  <TrendingUp size={16} color="var(--primary)" />
                  <p>Mantén la consistencia en el "Entrenamiento Invisible".</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="dashboard-col-right">
          {/* Wellness Integration */}
          <PlayerWellness />

          {/* Go to Lab Bridge */}
          <div
            className="glass-panel lab-shortcut"
            onClick={() => (window.location.href = "/performance")}
          >
            <div className="shortcut-content">
              <Zap size={24} color="var(--primary)" />
              <div>
                <h4>Lab de Rendimiento</h4>
                <p>Ver mis métricas avanzadas</p>
              </div>
            </div>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
