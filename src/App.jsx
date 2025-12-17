import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { AuthLayout } from "./components/Auth/AuthLayout";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { MainLayout } from "./components/Layout/MainLayout";
import { LoadingSpinner } from "./components/Common/LoadingSpinner";

// Pages
import { DashboardPage } from "./pages/DashboardPage";
import { SendMoneyPage } from "./pages/SendMoneyPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SpendingControlPage } from "./pages/SpendingControlPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  const { currentUser, loading, login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading SafePay..." />
      </div>
    );
  }

  // Show auth forms if not logged in
  if (!currentUser) {
    return (
      <AuthLayout>
        {isRegistering ? (
          <RegisterForm
            onRegister={register}
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
  }

  // Render the appropriate page based on navigation
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

  // Main app with layout
  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
