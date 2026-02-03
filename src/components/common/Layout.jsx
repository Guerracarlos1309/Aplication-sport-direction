import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Bell, Check, Info, AlertTriangle } from "lucide-react";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchNotifications();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications`);
      const data = await res.json();
      setNotifications(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = async () => {
    try {
      await fetch(`${API_BASE}/notifications/read-all`, { method: "PUT" });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: "PUT",
      });
      const updated = await res.json();
      setNotifications(notifications.map((n) => (n.id === id ? updated : n)));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="main-content">
        <header className="page-header">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="header-search">
            <input
              type="text"
              placeholder="Buscar jugador, sesión o informe..."
            />
          </div>
          <div className="header-actions">
            <div className="notification-container">
              <button
                className={`notification-btn ${isNotifOpen ? "active" : ""}`}
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              >
                {unreadCount > 0 && (
                  <span className="badge">{unreadCount}</span>
                )}
                <Bell size={20} />
              </button>

              {isNotifOpen && (
                <div className="notification-dropdown glass-panel">
                  <div className="notif-header">
                    <h3>Notificaciones</h3>
                    <button onClick={markAllAsRead}>
                      Marcar todo como leído
                    </button>
                  </div>
                  <div className="notif-list">
                    {loading ? (
                      <div className="notif-empty">Cargando...</div>
                    ) : notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`notif-item ${!n.read ? "unread" : ""}`}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className={`notif-icon ${n.type}`}>
                            {n.type === "warning" ? (
                              <AlertTriangle size={14} />
                            ) : n.type === "danger" ? (
                              <AlertTriangle size={14} />
                            ) : (
                              <Info size={14} />
                            )}
                          </div>
                          <div className="notif-content">
                            <p className="notif-title">{n.title}</p>
                            <p className="notif-desc">{n.description}</p>
                            <span className="notif-time">
                              {new Date(n.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {!n.read && <div className="unread-dot"></div>}
                        </div>
                      ))
                    ) : (
                      <div className="notif-empty">No hay notificaciones</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="page-body">
          <Outlet />
        </div>
      </main>
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
