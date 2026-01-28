import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  Activity,
  CreditCard,
  Search,
  ChevronRight,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Cuerpo Técnico", icon: Users, path: "/coaching", roles: ["DT"] },
    {
      name: "Salud y Rendimiento",
      icon: Activity,
      path: "/health",
      roles: ["DT"],
    },
    {
      name: "Mi Bienestar",
      icon: BrainCircuit,
      path: "/player-home",
      roles: ["Jugador"],
    },
    {
      name: "Administración",
      icon: CreditCard,
      path: "/finance",
      roles: ["DT"],
    },
    {
      name: "Scouting y Mercado",
      icon: Search,
      path: "/scouting",
      roles: ["DT"],
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">S</div>
        <h2>SportDir</h2>
      </div>

      <nav className="sidebar-nav">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
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
