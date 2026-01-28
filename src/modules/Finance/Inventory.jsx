import React, { useState, useEffect } from "react";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_BASE}/inventory`);
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setLoading(false);
    }
  };

  const updateStock = async (id, currentStock, delta) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      const res = await fetch(`${API_BASE}/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      const updatedItem = await res.json();
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
    } catch (err) {
      console.error("Error updating stock:", err);
    }
  };

  return (
    <div className="inventory-view">
      {loading ? (
        <p style={{ textAlign: "center" }}>Conectando con el almacén...</p>
      ) : (
        <div className="inventory-grid">
          {items.map((item) => (
            <div key={item.id} className="glass-panel inventory-item card">
              <h4>{item.name}</h4>
              <span className="item-stock">{item.stock}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                {item.unit}
              </span>

              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button
                  className="glow-btn"
                  style={{ flex: 1, padding: "8px 0" }}
                  onClick={() => updateStock(item.id, item.stock, -1)}
                >
                  -
                </button>
                <button
                  className="glow-btn"
                  style={{ flex: 1, padding: "8px 0" }}
                  onClick={() => updateStock(item.id, item.stock, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
