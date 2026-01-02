import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBell, HiOutlineRocketLaunch, HiOutlineCircleStack, HiOutlineShieldCheck, HiOutlineCpuChip } from 'react-icons/hi2';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');

  // Countdown Logic
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-02-01") - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* --- LEFT SIDE: THE CONTENT --- */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-20 relative bg-[#fafafa]">
        {/* Decorative subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#ff5b07 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-[#ff5b07] px-4 py-2 rounded-full mb-8">
            <HiOutlineRocketLaunch className="animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Alpha Access Coming Soon</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
            The New <br /> Standard of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b07] to-orange-400">
              Quizzing.
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 leading-relaxed">
            We're building an intelligent platform that turns knowledge into rewards. 
            Real-time battles, verified certificates, and a global leaderboard.
          </p>

          {/* Countdown Timer */}
          <div className="flex gap-4 md:gap-8 mb-12">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 tabular-nums">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Newsletter Form */}
          <div className="bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl outline-none text-slate-900 font-bold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#ff5b07] transition-all active:scale-95 flex items-center justify-center gap-2">
              Join Waitlist <HiOutlineBell className="text-lg" />
            </button>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 font-bold ml-4">🎁 Join now to get a "Founding Member" badge on launch.</p>
        </motion.div>
      </div>

      {/* --- RIGHT SIDE: FEATURE TEASERS --- */}
      <div className="flex-1 bg-slate-900 flex items-center justify-center p-8 md:p-20 relative overflow-hidden">
        {/* Abstract glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#ff5b07]/10 blur-[120px] rounded-full" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full max-w-2xl">
          <ComingSoonCard 
            icon={<HiOutlineCpuChip />} 
            title="AI Engine" 
            desc="Personalized questions that adapt to your skill level." 
            delay={0.1}
          />
          <ComingSoonCard 
            icon={<HiOutlineShieldCheck />} 
            title="Secure Play" 
            desc="Anti-cheat algorithms to ensure fair play for everyone." 
            delay={0.2}
          />
          <ComingSoonCard 
            icon={<HiOutlineCircleStack />} 
            title="Real Stakes" 
            desc="Convert your high scores into digital rewards." 
            delay={0.3}
          />
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
            <div className="text-3xl font-black text-white mb-2">+12k</div>
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Pre-registered users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComingSoonCard = ({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] group hover:bg-white/10 transition-all"
  >
    <div className="w-12 h-12 bg-[#ff5b07] rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-white font-black text-xl mb-3">{title}</h3>
    <p className="text-white/50 text-sm leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

export default ComingSoon;