import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProgressionCharts = () => {
  const API_BASE = "http://localhost:5000/api";
  const [progressionData, setProgressionData] = React.useState([]);
  const [insights, setInsights] = React.useState({
    leaderboard: [],
    alerts: [],
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, insightRes] = await Promise.all([
          fetch(`${API_BASE}/stats/team-progression`),
          fetch(`${API_BASE}/stats/coaching-insights`),
        ]);
        const progData = await progRes.json();
        const insightData = await insightRes.json();

        setProgressionData(progData);
        setInsights(insightData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching progression data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Cargando tendencias...</div>;

  return (
    <div className="progression-view">
      <div
        className="glass-panel card"
        style={{ height: "400px", marginBottom: "24px" }}
      >
        <h3>Progresión del Equipo - Rendimiento Promedio</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressionData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis dataKey="name" stroke="#a0a0b0" />
            <YAxis stroke="#a0a0b0" />
            <Tooltip
              contentStyle={{
                background: "#1c1c28",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#00f2ff" }}
            />
            <Line
              type="monotone"
              dataKey="rendimiento"
              stroke="#00f2ff"
              strokeWidth={3}
              dot={{ fill: "#00f2ff" }}
            />
            <Line
              type="monotone"
              dataKey="fisico"
              stroke="#7000ff"
              strokeWidth={3}
              dot={{ fill: "#7000ff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid">
        <div className="glass-panel card">
          <h4>Top Rendimiento esta Semana</h4>
          <div className="player-list" style={{ marginTop: "16px" }}>
            {insights.leaderboard.map((p, i) => (
              <div key={i} className="player-row">
                <span>
                  {i + 1}. {p.name}
                </span>{" "}
                <span style={{ color: "#00f2ff" }}>{p.score}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel card">
          <h4>Alertas de Progresión</h4>
          <div style={{ marginTop: "16px" }}>
            {insights.alerts.map((alert, i) => (
              <p
                key={i}
                style={{
                  fontSize: "0.9rem",
                  color: alert.color,
                  marginBottom: "8px",
                }}
              >
                {alert.message}
              </p>
            ))}
            {insights.alerts.length === 0 && (
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                No hay alertas activas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressionCharts;
