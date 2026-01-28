import React from "react";

const Contracts = () => {
  const contracts = [
    {
      name: "Carlos Ruiz",
      type: "Jugador (Pro)",
      start: "2024",
      end: "2027",
      value: "€2.5M",
    },
    {
      name: "Juan Delgado",
      type: "Entrenador",
      start: "2025",
      end: "2026",
      value: "€1.2M",
    },
    {
      name: "L. Modric",
      type: "Jugador (Pro)",
      start: "2023",
      end: "2025",
      value: "€4.0M",
    },
  ];

  return (
    <div className="contracts-view">
      <div className="finance-stats">
        <div className="glass-panel stat-card-small">
          <span className="label">Total Masa Salarial</span>
          <span className="value">€12.4M / año</span>
        </div>
        <div className="glass-panel stat-card-small">
          <span className="label">Contratos por Renovar</span>
          <span className="value" style={{ color: "#ff007a" }}>
            4
          </span>
        </div>
        <div className="glass-panel stat-card-small">
          <span className="label">Prep. Presupuesto 26/27</span>
          <span className="value">85%</span>
        </div>
        <div className="glass-panel stat-card-small">
          <span className="label">Valor de Plantilla</span>
          <span className="value">€64.8M</span>
        </div>
      </div>

      <div className="glass-panel card">
        <h3>Gestión de Contratos</h3>
        <table className="health-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Vínculo</th>
              <th>Inicio</th>
              <th>Fin Contrato</th>
              <th>Valor Anual</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.type}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
                <td>{c.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contracts;
