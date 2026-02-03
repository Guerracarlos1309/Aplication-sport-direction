import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Bell, Check, Info, AlertTriangle } from "lucide-react";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nuevo Informe Médico",
      description: "El jugador Carlos G. tiene un nuevo informe.",
      type: "info",
      time: "Hace 5 min",
      read: false,
    },
    {
      id: 2,
      title: "Próximo Entrenamiento",
      description: "Mañana a las 08:00 AM en el campo principal.",
      type: "warning",
      time: "Hace 2h",
      read: false,
    },
    {
      id: 3,
      title: "Cuerpos Técnicos",
      description: "Se ha actualizado la lista de convocados.",
      type: "success",
      time: "Hace 5h",
      read: true,
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
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
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`notif-item ${!n.read ? "unread" : ""}`}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className={`notif-icon ${n.type}`}>
                            {n.type === "warning" ? (
                              <AlertTriangle size={14} />
                            ) : (
                              <Info size={14} />
                            )}
                          </div>
                          <div className="notif-content">
                            <p className="notif-title">{n.title}</p>
                            <p className="notif-desc">{n.description}</p>
                            <span className="notif-time">{n.time}</span>
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
