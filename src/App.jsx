import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Layout from "./components/common/Layout";
import CoachingDashboard from "./modules/Coaching/CoachingDashboard";
import HealthDashboard from "./modules/Health/HealthDashboard";
import FinanceDashboard from "./modules/Finance/FinanceDashboard";
import ScoutingDashboard from "./modules/Scouting/ScoutingDashboard";
import PlayerWellness from "./modules/Health/PlayerWellness";
import PlayerManagement from "./modules/Admin/PlayerManagement";
import PlayerProfile from "./modules/Player/PlayerProfile";
import PlayerDashboard from "./modules/Player/PlayerDashboard";
import LoginPage from "./pages/LoginPage";
import PerformanceLab from "./modules/Performance/PerformanceLab";
import Settings from "./modules/Settings/Settings";
import OpponentScouting from "./modules/OpponentScouting/OpponentScouting";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RoleBasedHome = () => {
  const { user } = useAuth();
  if (user?.role === "Jugador") return <Navigate to="/player-home" replace />;
  return <Navigate to="/coaching" replace />;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RoleBasedHome />} />

        <Route
          path="coaching"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <CoachingDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="health"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <HealthDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="scouting"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <ScoutingDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="player-home"
          element={
            <ProtectedRoute allowedRoles={["Jugador"]}>
              <PlayerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="player/profile"
          element={
            <ProtectedRoute allowedRoles={["Jugador"]}>
              <PlayerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/players"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <PlayerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="performance"
          element={
            <ProtectedRoute allowedRoles={["DT", "Jugador"]}>
              <PerformanceLab />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="opponent-scouting"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <OpponentScouting />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { useEffect } from "react";
import api from "./api/axios";

function App() {
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await api.get("/");
        console.log("Backend connection successful:", response.data);
      } catch (error) {
        console.error("Backend connection failed:", error);
      }
    };
    checkConnection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
