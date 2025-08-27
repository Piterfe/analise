import { useState } from "react";
import { UserSelector } from "@/components/Auth/UserSelector";
import { Dashboard } from "./Dashboard";

const Index = () => {
  const [userRole, setUserRole] = useState<'attendant' | 'manager' | null>(null);

  if (!userRole) {
    return <UserSelector onSelectUser={setUserRole} />;
  }

  return <Dashboard />;
};

export default Index;
