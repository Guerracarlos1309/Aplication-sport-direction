import React, { useState, useEffect } from "react";
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

const WellnessDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWellnessSummary();
  }, []);

  const fetchWellnessSummary = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wellness-summary");
      const summary = await res.json();

      // Calculate average score for each player
      const formatted = summary.map((w) => ({
        name: w.name,
        score: (w.sleep + w.fatigue + w.stress + w.soreness + w.mood) / 5,
        original: w,
      }));

      setData(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching wellness summary:", err);
      setLoading(false);
    }
  };

  const getBarColor = (score) => {
    if (score >= 4) return "#00f2ff";
    if (score >= 3) return "#fbbf24";
    return "#ff6b6b";
  };

  return (
    <div className="wellness-dashboard">
      <div className="grid">
        <div className="glass-panel card" style={{ gridColumn: "1 / -1" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3>Estado de Salud Subjetiva (Hoy)</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Promedio de indicadores Wellness
            </span>
          </div>

          <div style={{ height: "300px", width: "100%" }}>
            {loading ? (
              <p>Cargando datos...</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 5]}
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.score)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="glass-panel card" style={{ gridColumn: "1 / -1" }}>
          <h3>Alertas de Riesgo</h3>
          <div className="player-list" style={{ marginTop: "16px" }}>
            {data.filter((d) => d.score < 3).length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
                No hay alertas críticas para hoy.
              </p>
            ) : (
              data
                .filter((d) => d.score < 3)
                .map((d) => (
                  <div
                    key={d.name}
                    className="player-row"
                    style={{
                      borderLeft: "4px solid #ff6b6b",
                      paddingLeft: "12px",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: "700" }}>{d.name}</span>
                      <p style={{ fontSize: "0.8rem", color: "#ff6b6b" }}>
                        Fatiga/Estrés elevado detectado
                      </p>
                    </div>
                    <span
                      className="score-badge"
                      style={{ background: "#ff6b6b" }}
                    >
                      {d.score.toFixed(1)}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
