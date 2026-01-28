import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <div className="header-search">
            <input
              type="text"
              placeholder="Buscar jugador, sesión o informe..."
            />
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <span className="badge"></span>
              🔔
            </button>
          </div>
        </header>
        <div className="page-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
