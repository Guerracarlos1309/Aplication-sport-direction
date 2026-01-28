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

const data = [
  { name: "Sem 1", rendimiento: 65, fisico: 70 },
  { name: "Sem 2", rendimiento: 72, fisico: 75 },
  { name: "Sem 3", rendimiento: 68, fisico: 74 },
  { name: "Sem 4", rendimiento: 85, fisico: 82 },
  { name: "Sem 5", rendimiento: 88, fisico: 85 },
];

const ProgressionCharts = () => {
  return (
    <div className="progression-view">
      <div
        className="glass-panel card"
        style={{ height: "400px", marginBottom: "24px" }}
      >
        <h3>Progresión del Equipo - Rendimiento Promedio</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
            <div className="player-row">
              <span>1. Carlos Ruiz</span>{" "}
              <span style={{ color: "#00f2ff" }}>9.2</span>
            </div>
            <div className="player-row">
              <span>2. Luca Modri</span>{" "}
              <span style={{ color: "#00f2ff" }}>8.8</span>
            </div>
            <div className="player-row">
              <span>3. Marcos Silva</span>{" "}
              <span style={{ color: "#00f2ff" }}>8.5</span>
            </div>
          </div>
        </div>
        <div className="glass-panel card">
          <h4>Alertas de Progresión</h4>
          <p
            style={{ marginTop: "16px", fontSize: "0.9rem", color: "#ff6b6b" }}
          >
            ⚠️ Caída de rendimiento físico en Rakit detectada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressionCharts;
