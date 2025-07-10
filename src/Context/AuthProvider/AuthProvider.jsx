import React, { useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userInfo = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
