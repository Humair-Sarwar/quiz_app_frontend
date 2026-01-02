import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import useLogin from "../../hooks/useLogin";
import { handleError, handleSuccess } from "../../toast";
import SpinnerLoader from "../../components/SpinnerLoader";
import { userAuthDataAdd } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    loginUser.mutate(formData, {
      onSuccess: (data) => {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user_id", data?.user?._id);
        localStorage.setItem("user_type", JSON.stringify(data?.user?.type));
        dispatch(
          userAuthDataAdd({
            token: data?.token,
            user_type: data?.user?.type,
            user_id: data?.user?._id,
          })
        );
        handleSuccess("Welcome back!");
        navigate(data.user.type === 1 ? "/" : "/admin/dashboard");
      },
      onError: () => handleError("Invalid credentials. Please try again."),
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 flex justify-center items-center p-6 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white">
          {/* Header */}
          <div className="text-center mb-10">
            <NavLink to={"/"}>
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-4"
              >
                <HiOutlineLightBulb className="text-4xl text-[#ff5b07]" />
              </motion.div>
            </NavLink>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <HiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-medium text-slate-700"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-[11px] font-bold ml-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Password
                </label>
                <NavLink
                  to="/reset-password"
                  className="text-[11px] font-bold text-[#ff5b07] hover:underline"
                >
                  Forgot?
                </NavLink>
              </div>
              <div className="relative group">
                <HiOutlineLockClosed
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-medium text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-[11px] font-bold ml-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loginUser.isPending}
              className={`w-full bg-slate-900 ${
                loginUser.isPending && "cursor-not-allowed!"
              } text-white cursor-pointer py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#ff5b07] transition-all shadow-xl shadow-slate-200 hover:shadow-orange-200 flex justify-center items-center`}
            >
              {loginUser.isPending ? <SpinnerLoader /> : "Sign In to Account"}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don’t have an account?{" "}
              <NavLink
                to="/join-now"
                className="text-slate-900 font-bold hover:text-[#ff5b07] transition-colors"
              >
                Create One Free
              </NavLink>
            </p>
          </div>
        </div>

        {/* Subtle Copyright/Trust Badge */}
        <p className="text-center mt-8 text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em]">
          Secure Quiz Environment • 2026
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
