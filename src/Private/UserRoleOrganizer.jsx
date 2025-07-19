import React from "react";
import { Navigate } from "react-router";
import useAuth from "../Utils/Hooks/useAuth";
import Spinner from "../Shared/Spinner";

const UserRoleOrganizer = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user || !user.email) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "organizer") {
    return <Navigate to="/participant-profile" />;
  }
  return children;
};

export default UserRoleOrganizer;
