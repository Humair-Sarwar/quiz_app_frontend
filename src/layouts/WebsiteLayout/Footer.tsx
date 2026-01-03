import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMobile,
  FaTiktok,
} from "react-icons/fa6";
const itemClass =
  "flex items-center group space-x-4 p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-all duration-200";
// Shared styles for the icons
const iconClass =
  "text-slate-400 group-hover:text-orange-500 transition-colors duration-200 shrink-0";
// Shared styles for the text/links
const linkClass =
  "text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors";
interface FooterProps {
  data?: {
    footer_description: string;
    social_links: any;
    footer_logo: string;
    phone: string;
    email: string;
  };
  isLoading?: boolean;
}

const Footer: React.FC<FooterProps> = ({ data, isLoading }) => {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="container mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-slate-100 rounded-xl w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-full"></div>
                  <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                </div>
              </div>
            ) : (
              <>
                <NavLink to="/" className="flex items-center gap-2 mb-6">
                  {data?.footer_logo ? (
                    <img
                      className="h-12"
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                        data?.footer_logo
                      }`}
                      alt=""
                    />
                  ) : (
                    <>
                      <div className="p-1.5 bg-[#ff5b07] rounded-lg text-white">
                        <HiOutlineLightBulb size={24} />
                      </div>
                      <h3 className="font-black text-2xl tracking-tight text-slate-800">
                        Quiz<span className="text-[#ff5b07]">Master</span>
                      </h3>
                    </>
                  )}
                </NavLink>
                <p className="text-slate-500 leading-relaxed text-sm mb-6 max-w-sm">
                  {data?.footer_description ||
                    "Empowering learners worldwide through interactive and engaging quizzes across various technical and academic domains."}
                </p>

                <div className="max-w-sm space-y-1 py-4 border-t border-slate-100 mt-6">
                  {data?.phone && (
                    <div className={itemClass}>
                      <div className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                        <FaMobile
                          className={`${iconClass} text-lg`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Phone
                        </span>
                        <a href={`tel:+${data.phone}`} className={linkClass}>
                          {`+${data.phone}`}
                        </a>
                      </div>
                    </div>
                  )}

                  {data?.email && (
                    <div className={itemClass}>
                      <div className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                        <FaEnvelope
                          className={`${iconClass} text-lg`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Email
                        </span>
                        <a href={`mailto:${data.email}`} className={linkClass}>
                          {data.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 mb-6">
                  {data?.social_links?.facebook && (
                    <SocialIcon
                      icon={<FaFacebook />}
                      href={data.social_links.facebook}
                      target="_blank"
                    />
                  )}

                  {data?.social_links?.instagram && (
                    <SocialIcon
                      icon={<FaInstagram />}
                      href={data.social_links.instagram}
                      target="_blank"
                    />
                  )}

                  {data?.social_links?.tiktok && (
                    <SocialIcon
                      icon={<FaTiktok />}
                      href={data.social_links.tiktok}
                      target="_blank"
                    />
                  )}

                  {data?.social_links?.linkedin && (
                    <SocialIcon
                      icon={<FaLinkedinIn />}
                      href={data.social_links.linkedin}
                      target="_blank"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/categories" label="Categories" />
              <FooterLink to="/#faq-section" onClick={(e: any) => {
      if (window.location.pathname === '/') {
        e.preventDefault();
        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }}
     label="FAQs" />
              {/* <FooterLink to="/leaderboard" label="Leaderboard" /> */}
            </ul>
          </div>

          {/* Column 3: Legal/Support */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-slate-800 mb-2 text-lg">
              Stay in the loop
            </h4>
            <p className="text-slate-500 text-sm mb-6">
              Get notified about new quiz categories and tech updates.
            </p>
            <form className="relative flex flex-col gap-3">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#ff5b07] transition-all"
              />
              <button className="w-full cursor-pointer bg-slate-900 text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-slate-100 py-8 bg-slate-50/50">
        <div className="container mx-auto max-w-[1400px] px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026{" "}
            <span className="font-semibold text-slate-800">QuizMaster</span>.
            All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Handcrafted by{" "}
            <a
              href="humair-portfolio.netlify.app"
              target="_blank"
              className="font-bold text-slate-600 hover:text-[#ff5b07] transition-colors"
            >
              Humair Sarwar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Sub-components to keep the code clean
const FooterLink = ({ to, label, onClick }: { to: string; label: string; onClick?: any }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className="text-slate-500 hover:text-[#ff5b07] transition-colors flex items-center group"
    >
      <span className="w-0 group-hover:w-2 h-0.5 bg-[#ff5b07] mr-0 group-hover:mr-2 transition-all duration-300"></span>
      {label}
    </NavLink>
  </li>
);

const SocialIcon = ({
  icon,
  href,
  target,
}: {
  icon: React.ReactNode;
  href: string;
  target: string;
}) => (
  <a
    href={href}
    target={target}
    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-[#ff5b07] hover:text-white transition-all shadow-sm border border-slate-100"
  >
    {icon}
  </a>
);

export default Footer;
