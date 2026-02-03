import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const LoadControl = () => {
  const [loadData, setLoadData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/stats/load-stats")
      .then((res) => res.json())
      .then((data) => {
        setLoadData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching load stats:", err);
        setLoading(false);
      });
  }, []);

  const riskyPlayers = loadData.filter((p) => p.load > p.limit);
  const recoveringPlayers = loadData.filter((p) => p.load < 300);
  const optimalPlayers = loadData.filter(
    (p) => p.load >= 300 && p.load <= p.limit,
  );
  return (
    <div className="load-control">
      <div className="glass-panel card">
        <h3>Control de Carga Semanal (RPE x Minutos)</h3>
        <p>Monitorización de carga externa e interna acumulada.</p>

        <div className="load-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={loadData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis dataKey="player" stroke="#a0a0b0" />
              <YAxis stroke="#a0a0b0" />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  background: "#1c1c28",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="load">
                {loadData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.load > entry.limit ? "#ff007a" : "#00f2ff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="match-stats" style={{ marginTop: "24px" }}>
        <div className="glass-panel card" style={{ minHeight: "auto" }}>
          <h4 style={{ color: "#ff007a" }}>Riesgo Alto</h4>
          <p>
            {riskyPlayers.length > 0
              ? riskyPlayers.map((p) => p.player).join(", ")
              : "Ninguno"}
          </p>
        </div>
        <div className="glass-panel card" style={{ minHeight: "auto" }}>
          <h4>Estado Óptimo</h4>
          <p>
            {optimalPlayers.length > 0
              ? optimalPlayers.map((p) => p.player).join(", ")
              : "Ninguno"}
          </p>
        </div>
        <div className="glass-panel card" style={{ minHeight: "auto" }}>
          <h4 style={{ color: "var(--text-muted)" }}>En Recuperación</h4>
          <p>
            {recoveringPlayers.length > 0
              ? recoveringPlayers.map((p) => p.player).join(", ")
              : "Ninguno"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadControl;
