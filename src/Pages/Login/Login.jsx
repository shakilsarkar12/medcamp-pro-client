import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import PrimaryButton from "../../Shared/PrimaryButton";
import Divider from "../../Shared/Divider";
import GoogleLogin from "../../Shared/GoogleLogin";
import { Link, Navigate } from "react-router";
import useAuth from "../../Utils/Hooks/useAuth";

const Login = () => {
  const { user, setUser, setLoading, loginWithEmail } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    const email = data?.email;
    const password = data?.password;

    loginWithEmail(email, password)
      .then((result) => {
        const user = result.user;
        setLoading(false);
        setUser(user);
      })
      .catch((err) => {
        alert("login error", err);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-sm">
      <h2 className="text-2xl font-semibold mb-6">
        Welcome Back ! Please Login
      </h2>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 w-full">
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
          <input
            type="password"
            {...register("password", { required: "password is required" })}
            placeholder="Enter Password"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors?.password?.type === "required" && (
            <span className="text-red-500 text-xs">
              {errors?.password?.message}
            </span>
          )}
        </div>

        <PrimaryButton type="submit" className="w-full" text="Log in" />
      </form>

      <Divider>or</Divider>

      <GoogleLogin />

      <p className="mt-4 text-center text-sm">
        Dont't have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
