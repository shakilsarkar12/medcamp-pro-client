import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const useAuth = () => {
  const userData = useContext(AuthContext);
  return userData;
};

export default useAuth;
