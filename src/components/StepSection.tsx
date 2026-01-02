
import { motion } from "framer-motion";
import "react-multi-carousel/lib/styles.css";
import { HiOutlineRocketLaunch, HiOutlineTrophy, HiOutlineBolt } from "react-icons/hi2";



export const StepSection = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      desc: "Sign up in seconds to join our global community. Access your personalized dashboard and track your progress from day one.",
      icon: <HiOutlineRocketLaunch />, // Using the rocket to symbolize "launching" their journey
      color: "bg-blue-600",
    },
    {
      number: "02",
      title: "Select Your Challenge",
      desc: "Explore a vast library of expert-curated quizzes across dozens of categories. Find the topics where you shine the brightest.",
      icon: <HiOutlineBolt />, // Using the bolt for "choosing/striking" a topic
      color: "bg-[#ff5b07]",
    },
    {
      number: "03",
      title: "Compete & Conquer",
      desc: "Attempt all quizzes to validate your knowledge. Get instant results, climb the leaderboard, and unlock exclusive rewards.",
      icon: <HiOutlineTrophy />, // Using the trophy for the final result/reward
      color: "bg-purple-600",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
         <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#ff5b07] text-[11px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Seamless Onboarding
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Your journey to <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b07] to-orange-400">
              knowledge mastery.
            </span>
          </h2>
          <p className="mt-6 text-slate-500 text-lg font-medium max-w-xl mx-auto">
            Three simple steps to start competing, learning, and winning rewards with our global community.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-[#ff5b07] to-purple-500"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group text-center md:text-left"
            >
              {/* Icon Circle */}
              <div className="flex justify-center md:justify-start mb-8">
                <div className={`w-20 h-20 rounded-[2rem] ${step.color} flex items-center justify-center text-white text-3xl shadow-xl shadow-slate-200 group-hover:-rotate-12 transition-transform duration-500`}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-transparent hover:border-orange-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500">
                <span className="text-5xl font-black text-slate-200 group-hover:text-orange-100 transition-colors duration-500 absolute top-6 right-8">
                  {step.number}
                </span>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">
                  {step.title}
                </h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};