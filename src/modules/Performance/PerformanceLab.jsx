import React, { useState, useEffect } from "react";
import {
  Zap,
  Moon,
  Coffee,
  Brain,
  TrendingUp,
  Trophy,
  Activity,
} from "lucide-react";
import "./PerformanceLab.css";

const PerformanceLab = () => {
  const [metrics, setMetrics] = useState({
    sleep: 8,
    hydration: 75,
    stress: 20,
    nutrition: 90,
  });

  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/performance-rankings",
      );
      const data = await response.json();
      setRankings(data);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="performance-lab animate-fade-in">
      <header className="module-header">
        <div className="header-title">
          <div className="icon-box lab-icon">
            <Zap size={24} color="var(--primary)" />
          </div>
          <div className="title-text">
            <h1>Laboratorio de Rendimiento</h1>
            <p>Optimización del "Entrenamiento Invisible" y Biometría</p>
          </div>
        </div>
      </header>

      <div className="lab-grid">
        {/* Real-time Metrics */}
        <div className="glass-panel metric-overview">
          <h3>Estado Diario</h3>
          <div className="metrics-container">
            <div className="metric-card">
              <Moon size={20} color="#818cf8" />
              <div className="metric-info">
                <span>Sueño</span>
                <strong>{metrics.sleep}h</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="fill"
                  style={{ width: "80%", background: "#818cf8" }}
                ></div>
              </div>
            </div>
            <div className="metric-card">
              <Activity size={20} color="var(--primary)" />
              <div className="metric-info">
                <span>Hidratación</span>
                <strong>{metrics.hydration}%</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="fill"
                  style={{ width: "75%", background: "var(--primary)" }}
                ></div>
              </div>
            </div>
            <div className="metric-card">
              <Brain size={20} color="var(--accent)" />
              <div className="metric-info">
                <span>Estrés Mental</span>
                <strong>{metrics.stress}%</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="fill"
                  style={{ width: "20%", background: "var(--accent)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-panel lab-insights">
          <h3>IA Performance Insight</h3>
          <div className="insight-content">
            <div className="insight-badge">Recomendación</div>
            <p>
              "Tus niveles de recuperación son óptimos hoy. Los datos sugieren
              que puedes aumentar la carga de entrenamiento un 15% sin riesgo de
              lesión."
            </p>
            <button className="glow-btn btn-sm">Ver Plan Detallado</button>
          </div>
        </div>

        {/* Ranking / Gamification */}
        <div className="glass-panel ranking-card">
          <div className="card-header">
            <h3>Top Rendimiento Semanal</h3>
            <Trophy size={18} color="#fbbf24" />
          </div>
          <div className="ranking-list">
            {rankings.map((player, idx) => (
              <div key={player.id} className="ranking-item">
                <span className="rank-pos">#{idx + 1}</span>
                <span className="rank-name">{player.name}</span>
                <div className="rank-score-box">
                  <span className="rank-score">{player.score} pts</span>
                  <TrendingUp
                    size={14}
                    color={player.trend === "up" ? "#4ade80" : "#f87171"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Tip */}
        <div className="glass-panel nutrition-tip">
          <div className="tip-icon">
            <Coffee size={24} />
          </div>
          <div className="tip-text">
            <h4>Nutrición Pre-Partido</h4>
            <p>
              Consumir carbohidratos complejos 3 horas antes del inicio para
              maximizar reservas de glucógeno.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceLab;
