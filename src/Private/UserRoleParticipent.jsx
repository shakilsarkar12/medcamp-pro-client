import React from "react";
import { Navigate } from "react-router";
import useAuth from "../Utils/Hooks/useAuth";
import Spinner from "../Shared/Spinner";

const UserRoleParticipent = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user || !user.email) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "participant") {
    return <Navigate to="/organizer-profile" />;
  }
  return children;
};

export default UserRoleParticipent;
