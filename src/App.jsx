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
import LoginPage from "./pages/LoginPage";
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
          path="finance"
          element={
            <ProtectedRoute allowedRoles={["DT"]}>
              <FinanceDashboard />
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
              <PlayerWellness />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
