import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../Shared/PrimaryButton";
import Divider from "../../Shared/Divider";
import GoogleLogin from "../../Shared/GoogleLogin";
import useAuth from "../../Utils/Hooks/useAuth";
import { Link, Navigate } from "react-router";
import { updateProfile } from "firebase/auth";
import axiosSecure from "../../Utils/axiosSecure";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";

const Register = () => {
  const { user, setUser, setLoading, registerWithEmail } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const handleRegister = (data) => {
    const bgColors = ["00C4B4", "005F73", "F9844A", "06D6A0", "FF4D4F"];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const email = data?.email;
    const password = data?.password;
    const displayName = data?.name;
    const photoURL = `https://ui-avatars.com/api/?name=${displayName}&background=${randomBg}&color=fff&bold=true`;

    registerWithEmail(email, password)
      .then((result) => {
        const user = result.user;
        const creationTimeDate = user?.metadata.creationTime;
        const lastSignInTimeDate = user?.metadata.lastSignInTime;
        const creationTime = new Date(creationTimeDate).toISOString();
        const lastSignInTime = new Date(lastSignInTimeDate).toISOString();
        const phoneNumber = user?.phoneNumber;
        const emailVerified = user?.emailVerified;

        const newUser = {
          displayName,
          email,
          phoneNumber,
          photoURL,
          creationTime,
          lastSignInTime,
          emailVerified,
        };

        updateProfile(user, { displayName, photoURL })
          .then(() => {
            const token = user?.accessToken;
            if (token) {
              localStorage.setItem("access-token", token);
            }

            axiosSecure
              .post("/users", newUser)
              .then((res) => {
                if (res?.data?.insertedId) {
                  toast.success("Account Created Success!");
                  setUser(newUser);
                  setLoading(false);
                }
              })
              .catch((err) => {
                toast.error("Error saving user to DB:", err);
                setLoading(false);
              });
          })
          .catch((error) => {
            toast.error("Profile update error:", error);
            setLoading(false);
          });
      })
      .catch((err) => {
        toast.error("Auth Error:", err);
        setLoading(false);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full md:max-w-sm">
      <h2 className="text-xl md:text-2xl font-medium md:font-semibold mb-6">
        Create an Account
      </h2>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-4 w-full"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: "Name is required" })}
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: "Email is required" })}
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <div className="relative">
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3 right-3"
            >
              {showPass ? <IoEyeOff /> : <IoEye />}
            </span>
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                },
              })}
              placeholder="Enter Password"
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>
          {errors?.password?.type === "required" && (
            <span className="text-red-400 text-xs">Password is required</span>
          )}
          {errors?.password?.type === "pattern" && (
            <span className="text-red-400 text-xs">
              {errors.password?.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <div className="relative">
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3 right-3"
            >
              {showPass ? <IoEyeOff /> : <IoEye />}
            </span>
            <input
              type={showPass ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Re-enter Password"
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <PrimaryButton type="submit" className="w-full" text="Register" />
      </form>

      <Divider>or</Divider>

      <GoogleLogin />

      <p className="mt-4 text-center md:text-start text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
