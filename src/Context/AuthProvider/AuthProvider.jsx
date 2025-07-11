import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import axiosSecure from "../../Utils/axiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const email = currentUser?.email;
      if (email) {
        axiosSecure
          .get(`/users/${email}`)
          .then((res) => {
            const dbUser = res.data;
            if (dbUser) {
              setUser(dbUser);
              console.log(dbUser);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
      const token = currentUser?.accessToken;
      localStorage.setItem("access-token", token);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    setUser,
    setLoading,
    registerWithEmail,
    loginWithEmail,
    googleLogin,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
