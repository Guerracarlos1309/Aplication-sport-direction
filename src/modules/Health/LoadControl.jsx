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

const data = [
  { player: "Ruiz", load: 850, limit: 900 },
  { player: "Silva", load: 720, limit: 900 },
  { player: "Rakit", load: 950, limit: 900 },
  { player: "Modri", load: 600, limit: 900 },
  { player: "Benz", load: 200, limit: 900 },
];

const LoadControl = () => {
  return (
    <div className="load-control">
      <div className="glass-panel card">
        <h3>Control de Carga Semanal (RPE x Minutos)</h3>
        <p>Monitorización de carga externa e interna acumulada.</p>

        <div className="load-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
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
                {data.map((entry, index) => (
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
          <p>Ivan Rakitic (Carga excedida)</p>
        </div>
        <div className="glass-panel card" style={{ minHeight: "auto" }}>
          <h4>Estado Óptimo</h4>
          <p>Marcos Silva</p>
        </div>
        <div className="glass-panel card" style={{ minHeight: "auto" }}>
          <h4 style={{ color: "var(--text-muted)" }}>En Recuperación</h4>
          <p>K. Benzema</p>
        </div>
      </div>
    </div>
  );
};

export default LoadControl;
