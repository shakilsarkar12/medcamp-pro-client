import React from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../Shared/PrimaryButton";
import Divider from "../../Shared/Divider";
import GoogleLogin from "../../Shared/GoogleLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className="w-sm">
      <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>

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
            <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
              },
            })}
            placeholder="Enter Password"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors?.password?.type === "required" && (
            <span className="text-red-400 text-xs">Password is required</span>
          )}
          {errors?.password?.type === "pattern" && (
            <span className="text-red-400 text-xs">
              {errors.password?.message}
            </span>
          )}
        </div>

        <PrimaryButton type="submit" className="w-full" text="Register" />
      </form>

      <Divider>or</Divider>

      <GoogleLogin />

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
