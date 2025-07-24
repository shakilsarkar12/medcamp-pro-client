import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Utils/Hooks/useAuth";
import axiosSecure from "../Utils/axiosSecure";
import { toast } from "sonner";

const GoogleLogin = () => {
  const { setUser, setLoading, googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success("Google login success:");
        const user = result.user;

        const displayName = user?.displayName;
        const email = user?.email;
        const photoURL = user?.photoURL;
        const creationTimeDate = user?.metadata.creationTime;
        const creationTime = new Date(creationTimeDate).toISOString();
        const phoneNumber = user?.phoneNumber;
        const emailVerified = user?.emailVerified;

        const saveUser = {
          displayName,
          email,
          phoneNumber,
          photoURL,
          creationTime,
          lastSignInTime: new Date().toISOString(),
          emailVerified,
          role: "participant",
        };

        axiosSecure
          .post("/users", saveUser)
          .then((res) => {
            if (
              res.data.insertedId ||
              res.data.upsertedId ||
              res.data.message === "User already exists"
            ) {
              setUser(saveUser);
              setLoading(false);
            }
          })
          .catch(() => {
            toast.error("Error saving user !");
          });
      })
      .catch(() => {
        toast.error("Google login failed !");
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
