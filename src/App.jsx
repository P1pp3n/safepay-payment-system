import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthLayout } from "./components/Auth/AuthLayout";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { MainLayout } from "./components/Layout/MainLayout";
import { LoadingSpinner } from "./components/Common/LoadingSpinner";
import { LandingPage } from "./pages/LandingPage";

// Pages
import { DashboardPage } from "./pages/DashboardPage";
import { SendMoneyPage } from "./pages/SendMoneyPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SpendingControlPage } from "./pages/SpendingControlPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading SafePay..." />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Auth Route Component (redirect to dashboard if already logged in)
const AuthRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading SafePay..." />
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Login Page Component
const LoginPage = () => {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <AuthLayout>
      {isRegistering ? (
        <RegisterForm
          onRegister={login}
          onToggleForm={() => setIsRegistering(false)}
        />
      ) : (
        <LoginForm
          onLogin={login}
          onToggleForm={() => setIsRegistering(true)}
        />
      )}
    </AuthLayout>
  );
};

// Main Dashboard Component with Navigation
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "send-money":
        return <SendMoneyPage />;
      case "transactions":
        return <TransactionsPage />;
      case "spending-control":
        return <SpendingControlPage />;
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
