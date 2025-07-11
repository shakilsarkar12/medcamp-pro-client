import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Utils/Hooks/useAuth";
import axiosSecure from "../Utils/axiosSecure";

const GoogleLogin = () => {
  const { setUser, setLoading, googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Google login success:",);
        const user = result.user;

        const displayName = user?.displayName;
          const email = user?.email;
        const photoURL = user?.photoURL;
        const creationTime = user?.metadata.creationTime;
        const phoneNumber = user?.phoneNumber;
        const emailVerified = user?.emailVerified;

        // ✅ Prepare user data
        const saveUser = {
          displayName,
          email,
          phoneNumber,
          photoURL,
          creationTime,
          emailVerified,
          role: "participant",
          lastSignInTime: new Date().toISOString(),
        };

        axiosSecure
          .post("/users", saveUser)
          .then((res) => {
            if (
              res.data.insertedId ||
              res.data.upsertedId ||
              res.data.message === "User already exists"
            ) {
              console.log("User saved or already exists in DB");
            }
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });

        // Set user and stop loading
        setUser(loggedUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Google login failed:", err);
        setLoading(false);
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
