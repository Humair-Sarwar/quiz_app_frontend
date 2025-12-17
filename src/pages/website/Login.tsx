import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import useLogin from "../../hooks/useLogin";
import { handleError, handleSuccess } from "../../toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginUser = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // Track form values
  const [formData, setFormData] = useState({ email: "", password: "" });
  // Track errors per field
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Handle input changes + live validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // update field value
    setFormData((prev) => ({ ...prev, [name]: value }));

    // live validation
    if (name === "email") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, password: "Password is required" }));
      } else if (value.length < 1) {
        setErrors((prev) => ({ ...prev, password: "At least 1 characters" }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  // Final validation on submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    // If no errors → submit
    if (Object.keys(newErrors).length === 0) {
      loginUser.mutate(formData, {
        onSuccess: (data) => {
          localStorage.setItem("token", data?.token);
          localStorage.setItem("user_id", data?.user?._id);
          localStorage.setItem("user_type", JSON.stringify(data?.user?.type));
          handleSuccess("You have successfully logged in!");
          navigate(data.user.type === 1 ? "/" : "/admin/dashboard");
        },
        onError: ()=>{
          handleError("Email or Password wrong!");
        }
      });
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#fff5ed] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 form-container-target mx-4 rounded-lg shadow-md w-[350px]"
      >
        <NavLink to="/" className="flex items-center gap-1 justify-center">
          <h3 className="font-bold text-4xl">Quiz</h3>
          <HiOutlineLightBulb className="text-4xl primary-color-text" />
        </NavLink>

        {/* Email */}
        <div className="mt-5">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded p-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mt-3">
          <label htmlFor="password">Password:</label>
          <div className="relative">
            <input
              name="password"
              id="password"
              type={showPassword ? "password" : "text"}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded py-2 pl-2 pr-13!"
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-5"
            >
              {showPassword ? (
                <FaRegEye className="text-[18px] cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="text-[18px] cursor-pointer" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
          )}
        </div>

        <button
          className="primary-button w-full mt-5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Log in
        </button>

        <p className="mt-5 text-center text-[14px]">
          Don’t have an account?{" "}
          <NavLink className="font-bold" to="/join-now">
            Register
          </NavLink>
        </p>

        <div className="bg-[#f5f5f5] py-3 mt-5 rounded-[10px]">
          <p className="text-center text-[14px]">
            Forgot your password?{" "}
            <NavLink className="font-bold" to="/reset-password">
              Reset It
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
