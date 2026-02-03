import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Users,
  Activity,
  CreditCard,
  Search,
  ChevronRight,
  LogOut,
  BrainCircuit,
  Zap,
  Settings as SettingsIcon,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const menuItems = [
    { name: "Cuerpo Técnico", icon: Users, path: "/coaching", roles: ["DT"] },
    { name: "Plantilla", icon: Users, path: "/admin/players", roles: ["DT"] },
    {
      name: "Salud y Rendimiento",
      icon: Activity,
      path: "/health",
      roles: ["DT"],
    },
    {
      name: "Lab Rendimiento",
      icon: Zap,
      path: "/performance",
      roles: ["DT", "Jugador"],
    },
    {
      name: "Panel de Control",
      icon: BrainCircuit,
      path: "/player-home",
      roles: ["Jugador"],
    },
    {
      name: "Mi Perfil",
      icon: User,
      path: "/player/profile",
      roles: ["Jugador"],
    },
    {
      name: "Inteligencia Rival",
      icon: ShieldAlert,
      path: "/opponent-scouting",
      roles: ["DT"],
    },
    {
      name: "Scouting y Mercado",
      icon: Search,
      path: "/scouting",
      roles: ["DT"],
    },
    {
      name: "Configuración",
      icon: SettingsIcon,
      path: "/settings",
      roles: ["DT"],
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div
          className="logo-box"
          style={{
            backgroundColor: settings?.primary_color || "var(--primary)",
          }}
        >
          {settings?.team_short_name?.charAt(0) || "S"}
        </div>
        <h2>{settings?.team_short_name || "SportDir"}</h2>
        <button className="close-sidebar-btn" onClick={onClose}>
          <LogOut size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={() => {
              if (window.innerWidth <= 1024) onClose();
            }}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
            <ChevronRight className="arrow" size={14} />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">
              {user?.player_name || user?.username}
            </span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={logout} title="Cerrar Sesión">
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
