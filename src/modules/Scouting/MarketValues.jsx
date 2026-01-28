import React from "react";

const MarketValues = () => {
  const players = [
    { name: "Carlos Ruiz", internal: "€12M", market: "€15M", trend: "up" },
    { name: "Marcos Silva", internal: "€8M", market: "€7.5M", trend: "down" },
    { name: "Ivan Rakitic", internal: "€4M", market: "€3.8M", trend: "down" },
  ];

  return (
    <div className="market-values">
      <div className="glass-panel card">
        <h3>Valoración de Mercado Interna vs Externa</h3>
        <table className="health-table">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Valoración Club</th>
              <th>Valor Transfermarkt</th>
              <th>Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.internal}</td>
                <td>{p.market}</td>
                <td>
                  <span
                    className={`market-trend ${p.trend === "up" ? "trend-up" : "trend-down"}`}
                  >
                    {p.trend === "up" ? "▲ Al alza" : "▼ A la baja"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketValues;
