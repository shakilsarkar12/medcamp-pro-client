import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Utils/Hooks/useAuth";

const GoogleLogin = () => {
  const { setUser, setLoading, googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        console.log("Google login success");
      })
      .catch((err) => {
        alert("google error", err);
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition w-full"
    >
      <FcGoogle className="text-xl mr-2" />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
