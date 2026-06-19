import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;
