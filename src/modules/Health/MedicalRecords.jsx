import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";

const MedicalRecords = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    player_id: "",
    medical_status: "",
    prognosis: "",
  });

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const res = await fetch(`${API_BASE}/players`);
      const data = await res.json();
      setPlayers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching health data:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.player_id) {
      try {
        const res = await fetch(`${API_BASE}/players/${formData.player_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            medical_status: formData.medical_status,
            prognosis: formData.prognosis || "-",
          }),
        });
        const updated = await res.json();
        setPlayers(
          players.map((p) =>
            p.id === parseInt(formData.player_id) ? updated : p,
          ),
        );
        setIsModalOpen(false);
        setFormData({ player_id: "", medical_status: "", prognosis: "" });
      } catch (err) {
        console.error("Error updating medical report:", err);
      }
    } else {
      alert("Por favor selecciona un jugador.");
    }
  };

  const clearReport = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/players/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medical_status: "Apto", prognosis: "-" }),
      });
      const updated = await res.json();
      setPlayers(players.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error("Error clearing report:", err);
    }
  };

  const bajaCount = players.filter((p) => p.medical_status !== "Apto").length;
  const availability =
    players.length > 0
      ? Math.round(((players.length - bajaCount) / players.length) * 100)
      : 0;

  return (
    <div className="health-records">
      <div className="health-status-grid">
        <div className="glass-panel status-card">
          <span className="icon">🏥</span>
          <h4>Jugadores de Baja</h4>
          <span style={{ fontSize: "2rem", fontWeight: "800" }}>
            {bajaCount}
          </span>
        </div>
        <div className="glass-panel status-card">
          <span className="icon">⚖️</span>
          <h4>Total Plantilla</h4>
          <span style={{ fontSize: "2rem", fontWeight: "800" }}>
            {players.length}
          </span>
        </div>
        <div className="glass-panel status-card">
          <span className="icon">✅</span>
          <h4>Disponibilidad</h4>
          <span
            style={{ fontSize: "2rem", fontWeight: "800", color: "#00f2ff" }}
          >
            {availability}%
          </span>
        </div>
      </div>

      <div className="glass-panel card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>Registros Médicos Sincronizados</h3>
          <button
            className="glow-btn"
            style={{ padding: "8px 16px" }}
            onClick={() => setIsModalOpen(true)}
          >
            Añadir Informe
          </button>
        </div>
        {loading ? (
          <p>Cargando datos clínicos...</p>
        ) : (
          <div className="table-container">
            <table className="health-table">
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th>Estado / Diagnóstico</th>
                  <th>Pronóstico</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.medical_status}</td>
                    <td
                      style={{
                        color:
                          p.prognosis !== "-" ? "var(--accent)" : "inherit",
                      }}
                    >
                      {p.prognosis}
                    </td>
                    <td>
                      {p.medical_status !== "Apto" && (
                        <button
                          onClick={() => clearReport(p.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--primary)",
                            cursor: "pointer",
                          }}
                        >
                          Dar de Alta
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Informe Médico"
      >
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Jugador</label>
            <select
              value={formData.player_id}
              onChange={(e) =>
                setFormData({ ...formData, player_id: e.target.value })
              }
              required
            >
              <option value="">Selecciona un jugador...</option>
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Diagnóstico / Estado</label>
            <input
              type="text"
              placeholder="Ej: Rotura fibrilar"
              value={formData.medical_status}
              onChange={(e) =>
                setFormData({ ...formData, medical_status: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Pronóstico Estimado</label>
            <input
              type="text"
              placeholder="Ej: 3 semanas"
              value={formData.prognosis}
              onChange={(e) =>
                setFormData({ ...formData, prognosis: e.target.value })
              }
            />
          </div>
          <div style={{ marginTop: "10px", display: "flex", gap: "12px" }}>
            <button
              type="button"
              className="glow-btn"
              style={{ flex: 1, background: "rgba(255,255,255,0.05)" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="glow-btn" style={{ flex: 1 }}>
              Guardar Informe
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MedicalRecords;
