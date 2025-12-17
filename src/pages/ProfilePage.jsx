import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionContext";
import { Card } from "../components/Common/Card";
import { ProfileInfo } from "../components/Profile/ProfileInfo";
import { AccountStats } from "../components/Profile/AccountStats";
import { SecuritySettings } from "../components/Profile/SecuritySettings";

export const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { balance } = useTransactions();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Profile Settings">
        <ProfileInfo user={currentUser} />
        <AccountStats balance={balance} />
        <SecuritySettings />
      </Card>
    </div>
  );
};
