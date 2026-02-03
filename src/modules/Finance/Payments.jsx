import React, { useState, useEffect } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_BASE}/payments`);
      const data = await res.json();
      setPayments(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const statusOrder = ["paid", "pending", "overdue"];
    const nextIndex =
      (statusOrder.indexOf(currentStatus) + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];

    try {
      const res = await fetch(`${API_BASE}/payments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setPayments(payments.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  return (
    <div className="payments-view">
      <div className="glass-panel card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>Control de Pagos (PostgreSQL)</h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Cambios en tiempo real
          </span>
        </div>
        {loading ? (
          <p>Recuperando facturas...</p>
        ) : (
          <div className="table-container">
            <table className="health-table">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Importe</th>
                  <th>Estado</th>
                  <th>Fecha Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.concept}</td>
                    <td>€{parseFloat(p.amount).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => toggleStatus(p.id, p.status)}
                        className={`payment-status-tag ${p.status}`}
                        style={{
                          border: "none",
                          cursor: "pointer",
                          fontInherit: "inherit",
                        }}
                      >
                        {p.status === "paid"
                          ? "Pagado"
                          : p.status === "pending"
                            ? "Pendiente"
                            : "Vencido"}
                      </button>
                    </td>
                    <td>{new Date(p.due_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
