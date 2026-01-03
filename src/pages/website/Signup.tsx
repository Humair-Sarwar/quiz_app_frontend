import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✨ Added for professional feel
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { handleError, handleSuccess } from "../../toast";
import SpinnerLoader from "../../components/SpinnerLoader";

interface StateDataVal {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ErrorState = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const signupUser = useSignup();
  const [passHS, setPassHS] = useState(false);
  const [formData, setFormData] = useState<StateDataVal>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<ErrorState>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors as user types to keep UI clean
    if (error[name as keyof ErrorState]) {
      setError((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name as keyof ErrorState];
        return newErrs;
      });
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: ErrorState = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    signupUser.mutate(formData, {
      onSuccess: () => {
        handleSuccess("Account created successfully!");
        navigate("/login");
      },
      onError: (err) => {
        if (err?.status === 409) handleError("This email is already registered");
        else handleError("Registration failed. Please try again.");
      }
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 flex justify-center items-center p-6 overflow-hidden">
      {/* Decorative Background Elements - Matching Login */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white">
          <div className="text-center mb-10">
            <NavLink to={'/'}>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Create <span className="text-[#ff5b07]">Account</span>
            </h1></NavLink>
            <p className="text-slate-500 text-sm mt-2 font-medium">Join our community of learners today.</p>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">Full Name</label>
              <div className="relative group">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-medium text-slate-700"
                />
              </div>
              <AnimatePresence>
                {error.name && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[11px] font-bold ml-1 uppercase">{error.name}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-medium text-slate-700"
                />
              </div>
              <AnimatePresence>
                {error.email && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[11px] font-bold ml-1 uppercase">{error.email}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">Password</label>
                <div className="relative group">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors" size={18} />
                  <input
                    type={passHS ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-medium text-slate-700 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">Confirm</label>
                <div className="relative group">
                  <HiOutlineShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors" size={18} />
                  <input
                    type={passHS ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-medium text-slate-700 text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setPassHS(!passHS)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {passHS ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {(error.password || error.confirmPassword) && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[11px] font-bold ml-1 uppercase text-center">
                  {error.password || error.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={signupUser.isPending}
              className={`w-full py-4 rounded-2xl cursor-pointer font-semibold capitalize tracking-[0.2em] text-[14px] transition-all shadow-xl shadow-slate-200 flex justify-center items-center ${
                signupUser.isPending 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-[#ff5b07] hover:shadow-orange-200'
              }`}
            >
              {signupUser.isPending ? <SpinnerLoader /> : 'Signup'}
            </motion.button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already a member?{" "}
              <NavLink to="/login" className="text-slate-900 font-bold hover:text-[#ff5b07] transition-colors">
                Sign In
              </NavLink>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-[11px] font-semibold capitalize tracking-[0.3em]">
          Knowledge is Power • 2026
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;