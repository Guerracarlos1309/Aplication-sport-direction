import React from "react";

const Contracts = () => {
  const [contracts, setContracts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/contracts")
      .then((res) => res.json())
      .then((data) => {
        setContracts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contracts:", err);
        setLoading(false);
      });
  }, []);

  const totalBill = contracts.reduce(
    (acc, curr) => acc + parseFloat(curr.annual_value),
    0,
  );
  const expiringCount = contracts.filter(
    (c) =>
      new Date(c.end_date) <
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  ).length;

  return (
    <div className="contracts-view">
      <div className="finance-stats">
        <div className="glass-panel stat-card-small">
          <span className="label">Total Masa Salarial</span>
          <span className="value">
            €{(totalBill / 1000000).toFixed(1)}M / año
          </span>
        </div>
        <div className="glass-panel stat-card-small">
          <span className="label">Contratos por Renovar</span>
          <span className="value" style={{ color: "#ff007a" }}>
            {expiringCount}
          </span>
        </div>
        <div className="glass-panel stat-card-small">
          <span className="label">Prep. Presupuesto 26/27</span>
          <span className="value">85%</span>
        </div>
        <div className="glass-panel stat-card-small">
          <span className="label">Valor de Plantilla</span>
          <span className="value">
            €{((totalBill * 5) / 1000000).toFixed(1)}M
          </span>
        </div>
      </div>

      <div className="glass-panel card">
        <h3>Gestión de Contratos</h3>
        <div className="table-container">
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
              {loading ? (
                <tr>
                  <td colSpan="5">Cargando contratos...</td>
                </tr>
              ) : (
                contracts.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.type}</td>
                    <td>{new Date(c.start_date).getFullYear()}</td>
                    <td>{new Date(c.end_date).toLocaleDateString()}</td>
                    <td>
                      €{(parseFloat(c.annual_value) / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
