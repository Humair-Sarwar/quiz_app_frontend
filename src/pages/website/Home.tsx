import React from "react";
import { motion } from "framer-motion";
import hero_banner_image from "../../assets/images/hero-banner-2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FAQAccordion from "../../components/FAQs";
import useWebsiteCategories from "../../hooks/useWebsiteCategories";
import { handleError } from "../../toast";
import no_image from "../../assets/images/no_image.png";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineRocketLaunch, HiOutlineTrophy, HiOutlineBolt } from "react-icons/hi2";
import { StepSection } from "../../components/StepSection";

const responsive2 = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 650 }, items: 2 },
  mobile: { breakpoint: { max: 650, min: 0 }, items: 1 },
};

// ✨ Fixed Animation Variants with 'as const' to resolve ts(2322)
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
} as const;



interface HomeProps {
  data: { promotional_items: any[] };
  isLoading: boolean;
}

const Home: React.FC<HomeProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { data: website_categories, isLoading: loadingData, error } = useWebsiteCategories({ 
    search: "", 
    page: 1, 
    limit: 1000 
  });

  if (error) handleError('Something went wrong!');
  const getStarted = ()=>{
    navigate('/categories');
  }
  return (
    <div className="bg-white selection:bg-orange-100 selection:text-orange-600 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-b from-[#fff5ed] to-white overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row gap-5 justify-between items-center min-h-[90vh] px-6 py-20 max-w-[1400px]">
          
          {/* Left Content */}
          <motion.div 
            className="text-center md:text-left md:w-1/2 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white border border-orange-100 text-[#ff5b07] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-8">
              <HiOutlineRocketLaunch className="text-lg animate-pulse" />
              The Future of Learning is Here
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-slate-900 tracking-tight">
              Play. Learn. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b07] to-orange-400">
                Win Rewards.
              </span>
            </h1>
            
            <p className="text-slate-500 my-8 text-[15px] max-w-lg leading-relaxed font-medium">
              Join thousands of learners. Challenge your mind with curated quizzes and turn your knowledge into tangible prizes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center">
              <button onClick={getStarted} className="w-full cursor-pointer sm:w-auto bg-[#ff5b07] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-200 hover:shadow-orange-400 hover:-translate-y-1.5 transition-all duration-300 active:scale-95">
                Get Started Free
              </button>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white bg-orange-500">
                  +2k
                </div>
                <span className="pl-6 text-sm font-bold text-slate-600">Active Players</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="md:w-1/2 flex justify-center relative scale-110 lg:scale-90 transition-transform duration-1000 mb-12 md:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-200/20 blur-[120px] rounded-full -z-10"></div>
            <img
              src={hero_banner_image}
              alt="Quiz App Dashboard"
              className="relative w-full max-w-lg h-auto object-contain drop-shadow-[0_35px_35px_rgba(255,91,7,0.2)] animate-float"
            />
          </motion.div>
        </div>
      </section>

      {/* --- TRUST & PROMO MARQUEE --- */}
{!isLoading && data?.promotional_items?.length > 0 && (
  <section className="bg-slate-900 py-7 relative overflow-hidden group border-y border-white/5">
    {/* Wrapper for the animation */}
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
      {/* Container 1 */}
      <div className="flex items-center">
        {data.promotional_items.map((item: any, idx: number) => (
          <div key={`a-${idx}`} className="flex items-center gap-4 px-12 shrink-0">
            <HiOutlineBolt className="text-[#ff5b07] md:text-[18px] text[12px]" />
            <span className="text-white md:text-[18px] text[12px] font-medium uppercase tracking-[0.2em] opacity-80">
              {item?.title}
            </span>
          </div>
        ))}
      </div>

      {/* Container 2 (Exact Duplicate for Seamless Loop) */}
      <div className="flex items-center">
        {data.promotional_items.map((item: any, idx: number) => (
          <div key={`b-${idx}`} className="flex items-center gap-4 px-12 shrink-0">
            <HiOutlineBolt className="text-[#ff5b07] md:text-[18px] text[12px]" />
            <span className="text-white md:text-[18px] text[12px] font-medium uppercase tracking-[0.2em] opacity-80">
              {item?.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-24 container mx-auto px-6 max-w-[1400px]">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 cat-cl-target-set"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
        >
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Discover Your Next <br /> <span className="text-[#ff5b07]">Challenge.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium">Browse through dozens of categories ranging from Tech to General Knowledge.</p>
          </div>
          <NavLink to="/categories" className="group flex items-center gap-3 font-bold text-slate-900 hover:text-[#ff5b07] transition-all">
            Explore All <div className="p-3 rounded-full bg-slate-50 group-hover:bg-orange-50 transition-all group-hover:rotate-12"><HiOutlineTrophy /></div>
          </NavLink>
        </motion.div>

        {loadingData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-50 rounded-[3rem] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Carousel
              responsive={responsive2}
              infinite
              autoPlay
              itemClass="px-4"
              className="pb-16"
            >
              {website_categories?.data?.map((category: any) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </Carousel>
          </motion.div>
        )}
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq-section" className="bg-slate-50/50 py-24 relative overflow-hidden">
        <div className="container mx-auto max-w-[1300px] px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            
            {/* LEFT SIDE */}
            <motion.div 
              className="lg:w-5/12 sticky top-32"
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              viewport={fadeInUp.viewport}
              transition={fadeInUp.transition}
            >
              <div className="inline-flex items-center gap-2 bg-orange-100/50 text-[#ff5b07] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Support Center
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                Everything you <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b07] to-orange-400">
                  need to know.
                </span>
              </h2>
              
              <p className="text-slate-500 text-xl leading-relaxed mb-12 max-w-md">
                Join 10,000+ students already mastering new skills.
              </p>

              <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl group overflow-hidden relative">
                <h4 className="font-bold text-white text-xl mb-2 relative z-10">Still have questions?</h4>
                <button className="w-full bg-[#ff5b07] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all mt-6 shadow-lg shadow-orange-900/20">
                  Contact Support
                </button>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div 
              className="lg:w-7/12 w-full lg:mt-0 mt-20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FAQAccordion />
            </motion.div>
          </div>
        </div>
      </section>

      <StepSection />
    </div>
  );
};

const CategoryCard = ({ category }: { category: any }) => (
  <NavLink to={'/categories/' + category?.slug} className="group block">
    <div className="bg-white shadow-sm  border border-slate-100 p-10 rounded-[3rem] text-center transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(255,91,7,0.15)] hover:-translate-y-3 hover:border-orange-100 relative overflow-hidden h-full">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10"></div>
      
      <div className="min-w-fit h-45 mx-auto mb-8 bg-white shadow-xl shadow-slate-100 rounded-[2rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-slate-50">
        <img 
          src={!category?.image ? no_image : category.image}
          alt={category?.category_name}
          className="w-full h-full object-cover rounded-[2rem]"
        />
      </div>
      
      <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-[#ff5b07] transition-colors">
        {category?.category_name}
      </h3>
      
      <div className="inline-flex items-center gap-2 text-[#ff5b07] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
        Play Now <HiOutlineBolt />
      </div>
    </div>
  </NavLink>
);

export default Home;