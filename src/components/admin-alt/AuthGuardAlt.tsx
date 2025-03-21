
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthGuardAlt: React.FC = () => {
  const { isAuthenticatedAlt } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticatedAlt) {
      navigate("/admin-alt/login");
    }
  }, [isAuthenticatedAlt, navigate]);

  if (!isAuthenticatedAlt) {
    return null;
  }

  return <Outlet />;
};

export default AuthGuardAlt;
