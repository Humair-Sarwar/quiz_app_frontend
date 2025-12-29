import React, { useEffect, useState } from "react";
import {
  IoCameraSharp,
  IoSettingsSharp,
  IoGlobeOutline,
  IoMailOutline,
  IoClose,
} from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MdDeleteForever, MdOutlinePostAdd } from "react-icons/md";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  useGeneralGetSettings,
  useGeneralUpdateSettings,
  useSocialLinksGetSettings,
  useSocialUpdateSettings,
  useWebsiteModeGetSettings,
  useWebsiteModeUpdateSettings,
} from "../../hooks/useSettings";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { handleError, handleSuccess } from "../../toast";
import { useQueryClient } from "@tanstack/react-query";
import no_image from "../../assets/images/no_image.png";
import UploadImagePanel from "../../components/UploadImagePanel";

type PromotionalItem = {
  title: string;
};

type SocialLinks = {
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
};

type WebsiteSettings = {
  general: {
    header_logo: string;
    footer_logo: string;
    site_title: string;
    email: string;
    phone: string;
    footer_description: string;
    show_whatsapp_icon: boolean;
    whatsapp_no: string;
    promotional_items: PromotionalItem[];
  };
  social_links: SocialLinks;
  website_services: {
    website_mode: {
      mode: number;
    };
  };
};

const Settings: React.FC = () => {
  const [imageUploadPanelHeader, setImageUploadPanelHeader] = useState<boolean>(false);
  const [imageUploadPanelFooter, setImageUploadPanelFooter] = useState<boolean>(false);
  
  const queryClient = useQueryClient();
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const updateGeneralSettings = useGeneralUpdateSettings();
  const updateSocialSettings = useSocialUpdateSettings();
  const websiteModeUpdateSettings = useWebsiteModeUpdateSettings();

  const { data: generalData, isLoading: generalLoading } = useGeneralGetSettings({
    business_id: businessId || "",
  });

  const { data: socialData, isLoading: socialLoading } = useSocialLinksGetSettings({
    business_id: businessId || "",
  });

  const { data: websiteModeData, isLoading: modeLoading } = useWebsiteModeGetSettings({
    business_id: businessId || "",
  });

  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({
    general: {
      header_logo: "",
      footer_logo: "",
      site_title: "",
      email: "",
      phone: "",
      footer_description: "",
      show_whatsapp_icon: false,
      whatsapp_no: "",
      promotional_items: [{ title: "" }],
    },
    social_links: {
      facebook: "",
      tiktok: "",
      instagram: "",
      whatsapp: "",
    },
    website_services: {
      website_mode: {
        mode: 1,
      },
    },
  });
const [imageShowHeader, setImageShowHeader] = useState<string | null>(websiteSettings?.general?.header_logo || "");
const [imageShowFooter, setImageShowFooter] = useState<string | null>(websiteSettings?.general?.footer_logo || "");
  const [activeTab, setActiveTab] = useState<string>("general");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const handleClosePopupImage = () => {
    setImageUploadPanelHeader(false)
    setImageUploadPanelFooter(false)
  };
  useEffect(() => {
    if (generalData?.data) {
      const data = generalData.data;
      
      setImageShowHeader(data.header_logo || "");
      setImageShowFooter(data.footer_logo || "");

      setWebsiteSettings((prev) => ({
        ...prev,
        general: {
          header_logo: data.header_logo || "",
          footer_logo: data.footer_logo || "",
          site_title: data.site_title || "",
          email: data.email || "",
          phone: String(data.phone || ""),
          footer_description: data.footer_description || "",
          show_whatsapp_icon: !!data.show_whatsapp_icon,
          whatsapp_no: String(data.whatsapp_no || ""),
          promotional_items: data.promotional_items?.length
            ? data.promotional_items
            : [{ title: "" }],
        },
      }));
    }

    if (socialData?.data && Array.isArray(socialData.data) && socialData.data.length > 0) {
      const links = socialData.data[0];
      setWebsiteSettings((prev) => ({
        ...prev,
        social_links: {
          facebook: links.facebook || "",
          instagram: links.instagram || "",
          tiktok: links.tiktok || "",
          whatsapp: links.whatsapp || "",
        },
      }));
    }

    if (websiteModeData?.data?.website_mode) {
  const apiMode = websiteModeData.data.website_mode.mode;
  
  setWebsiteSettings((prev) => ({
    ...prev,
    website_services: {
      website_mode: {
        mode: Number(apiMode) // Ensures it matches your radio button IDs (1, 2, or 3)
      },
    },
  }));
}
  }, [generalData, socialData, websiteModeData]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setWebsiteSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      },
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: value && !validateEmail(value) ? "Please enter a valid email address" : undefined,
      }));
    }
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWebsiteSettings((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [name]: value,
      },
    }));
  };

  const handlePhoneChange = (value: string) => {
    setWebsiteSettings((prev) => ({
      ...prev,
      general: { ...prev.general, phone: value },
    }));
  };

  const handleWhatsappChange = (value: string) => {
    setWebsiteSettings((prev) => ({
      ...prev,
      general: { ...prev.general, whatsapp_no: value },
    }));
  };

  const deletePromoItem = (index: number) => {
    setWebsiteSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        promotional_items: prev.general.promotional_items.filter((_, i) => i !== index),
      },
    }));
  };

  const addPromoItem = () => {
    setWebsiteSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        promotional_items: [...prev.general.promotional_items, { title: "" }],
      },
    }));
  };

  const handlePromoItemChange = (index: number, value: string) => {
    const newItems = [...websiteSettings.general.promotional_items];
    newItems[index] = { title: value };
    setWebsiteSettings((prev) => ({
      ...prev,
      general: { ...prev.general, promotional_items: newItems },
    }));
  };

  const handleSubmitData = () => {
    if (errors.email) return;

    if (activeTab === "general") {
      const generalPayload = {
        ...websiteSettings.general,
        header_logo: imageShowHeader || "",
        footer_logo: imageShowFooter || "",
      };
      updateGeneralSettings.mutate(
        { business_id: businessId!, general: generalPayload },
        {
          onSuccess: () => {
            handleSuccess("Settings Updated Successfully!");
            queryClient.invalidateQueries({ queryKey: ["general-settings"] });
          },
          onError: () => handleError("Something went wrong!"),
        }
      );
    } else if (activeTab === "social_links") {
      updateSocialSettings.mutate(
        { business_id: businessId!, social_links: [websiteSettings.social_links] },
        {
          onSuccess: () => {
            handleSuccess("Social Links Updated Successfully!");
            queryClient.invalidateQueries({ queryKey: ["social-links-settings"] });
          },
          onError: () => handleError("Something went wrong!"),
        }
      );
    } else {
      websiteModeUpdateSettings.mutate(
        {
          business_id: businessId!,
          website_services: {
            website_mode: websiteSettings.website_services.website_mode,
          },
        },
        {
          onSuccess: () => {
            handleSuccess("Website Mode Updated Successfully!");
            queryClient.invalidateQueries({ queryKey: ["website-mode-settings"] });
          },
          onError: () => handleError("Something went wrong!"),
        }
      );
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: <IoSettingsSharp /> },
    { id: "social_links", label: "Social Links", icon: <FaFacebookF /> },
    { id: "website_services", label: "Website Mode", icon: <IoGlobeOutline /> },
  ];

  const renderTabContent = () => {
    if (generalLoading || socialLoading || modeLoading)
      return <div className="py-10 text-center text-slate-400">Loading settings...</div>;

    switch (activeTab) {
      case "general":
        return (<>
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-wrap gap-10 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-700">Header Logo</h3>
                  <p className="text-[11px] text-slate-400">Displayed on Top</p>
                </div>
                <div className="relative">
                <div onClick={() => setImageUploadPanelHeader(true)} className="relative h-20 w-20 rounded-2xl border-2 border-white shadow-lg overflow-hidden group">
                  <img
                    src={imageShowHeader === "" ? no_image : `${import.meta.env.VITE_BASE_URL}/uploads/${imageShowHeader}`}
                    alt="Header"
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <label className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <IoCameraSharp className="text-white text-xl" />
                  </label>
                </div>
                 {imageShowHeader !== "" && (
                                    <button
                                      type="button"
                                      onClick={() => setImageShowHeader("")}
                                      className="absolute -top-2 -right-2 cursor-pointer bg-white text-red-500 p-1.5 rounded-full shadow-md hover:scale-110 transition-all border border-slate-100"
                                    >
                                      <IoClose size={14} />
                                    </button>
                                  )}
                </div>
              </div>
              <div className="w-[1px] bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-700">Footer Logo</h3>
                  <p className="text-[11px] text-slate-400">Displayed on Bottom</p>
                </div>
                <div className="relative">
                <div onClick={() => setImageUploadPanelFooter(true)} className="relative h-20 w-20 rounded-2xl border-2 border-white shadow-lg overflow-hidden group">
                  <img
                    src={imageShowFooter === "" ? no_image : `${import.meta.env.VITE_BASE_URL}/uploads/${imageShowFooter}`}
                    alt="Footer"
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <label className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <IoCameraSharp className="text-white text-xl" />
                  </label>
                  
                </div>
                {imageShowFooter !== "" && (
                                    <button
                                      type="button"
                                      onClick={() => setImageShowFooter("")}
                                      className="absolute -top-2 -right-2 cursor-pointer bg-white text-red-500 p-1.5 rounded-full shadow-md hover:scale-110 transition-all border border-slate-100"
                                    >
                                      <IoClose size={14} />
                                    </button>
                                  )}
                
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label htmlFor="site_title" className="text-sm font-bold text-slate-700 ml-1">
                  Site Title
                </label>
                <input
                  type="text"
                  name="site_title"
                  value={websiteSettings.general.site_title}
                  onChange={handleChange}
                  id="site_title"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all"
                  placeholder="Enter Site Title"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                  Support Email
                </label>
                <div className="relative">
                  <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={websiteSettings.general.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all"
                    placeholder="support@site.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">
                  Contact Phone
                </label>
                <PhoneInput
                  country="us"
                  value={websiteSettings.general.phone}
                  onChange={handlePhoneChange}
                  inputClass="!w-full !h-[42px] !rounded-xl !border-slate-200 !focus:border-orange-500"
                  buttonClass="!border-slate-200 !rounded-l-xl"
                />
              </div>

              <div className="md:col-span-3 space-y-1">
                <label htmlFor="footer_description" className="text-sm font-bold text-slate-700 ml-1">
                  Meta Description
                </label>
                <textarea
                  id="footer_description"
                  name="footer_description"
                  value={websiteSettings.general.footer_description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all min-h-[100px]"
                  placeholder="Write site description..."
                ></textarea>
              </div>
            </div>

            <div className="mt-8 p-5 bg-green-50/50 rounded-2xl border border-green-100 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="show_whatsapp_icon"
                  className="w-5 h-5 accent-green-600 rounded cursor-pointer"
                  checked={websiteSettings.general.show_whatsapp_icon}
                  onChange={handleChange}
                />
                <span className="text-sm font-bold text-slate-700">Enable WhatsApp Chat</span>
              </label>

              <div className="flex-1 min-w-[250px] space-y-1">
                <label className="text-[12px] font-bold text-green-700 ml-1 uppercase">
                  WhatsApp Number
                </label>
                <PhoneInput
                  country="us"
                  value={websiteSettings.general.whatsapp_no}
                  onChange={handleWhatsappChange}
                  inputClass="!w-full !h-[42px] !rounded-xl !border-green-200"
                  buttonClass="!border-green-200 !rounded-l-xl"
                />
              </div>
            </div>

            <hr className="my-8 border-slate-100" />
            <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MdOutlinePostAdd className="text-orange-500 text-xl" /> Promotional Ticker Items
            </h3>

            <div className="space-y-3">
              {websiteSettings.general.promotional_items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 max-w-xl group">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handlePromoItemChange(index, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                      placeholder="Flash Sale: 50% Off!..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => deletePromoItem(index)}
                    className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <MdDeleteForever size={24} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPromoItem}
                className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors px-1 cursor-pointer"
              >
                <MdOutlinePostAdd size={18} /> Add New Item
              </button>
            </div>
          </div>
          {imageUploadPanelHeader && (
        <UploadImagePanel
          handleClosePopupImage={handleClosePopupImage}
          businessId={businessId ?? undefined}
          setImageShow={setImageShowHeader}
        />
      )} 
      {imageUploadPanelFooter && (
        <UploadImagePanel
          handleClosePopupImage={handleClosePopupImage}
          businessId={businessId ?? undefined}
          setImageShow={setImageShowFooter}
        />
      )}</>
        );

      case "social_links":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: "facebook",
                label: "Facebook",
                icon: <FaFacebookF className="text-blue-600" />,
                placeholder: "https://facebook.com/yourpage",
              },
              {
                id: "instagram",
                label: "Instagram",
                icon: <FaInstagram className="text-pink-600" />,
                placeholder: "https://instagram.com/yourprofile",
              },
              {
                id: "tiktok",
                label: "Tiktok",
                icon: <FaTiktok className="text-black" />,
                placeholder: "https://tiktok.com/@yourhandle",
              },
              {
                id: "whatsapp",
                label: "WhatsApp",
                icon: <FaWhatsapp className="text-green-600" />,
                placeholder: "https://wa.me/yournumber",
              },
            ].map((social) => (
              <div key={social.id} className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">{social.label}</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg group-focus-within:bg-orange-50 transition-colors">
                    {social.icon}
                  </div>
                  <input
                    type="text"
                    name={social.id}
                    value={(websiteSettings.social_links as any)[social.id] || ""}
                    onChange={handleSocialChange}
                    className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all shadow-sm"
                    placeholder={social.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "website_services":
        return (
          <div className="animate-in fade-in duration-500">
            <h3 className="text-md font-bold text-slate-800 mb-6">Website Status Mode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 1, label: "Live Website", desc: "Site is visible to all" },
                { id: 2, label: "Coming Soon", desc: "Shows countdown page" },
                { id: 3, label: "Maintenance", desc: "Undergoing updates" },
              ].map((mode) => {
                // IMPORTANT: Use strict comparison by casting current state to Number
                const isSelected = Number(websiteSettings.website_services.website_mode.mode) === mode.id;
                
                return (
                  <label
                    key={mode.id}
                    className={`relative flex flex-col p-5 border rounded-2xl cursor-pointer hover:bg-orange-50/30 transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-50/20 ring-2 ring-orange-200"
                        : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="site-mode"
                      value={mode.id}
                      checked={isSelected}
                      onChange={() =>
                        setWebsiteSettings((prev) => ({
                          ...prev,
                          website_services: { website_mode: { mode: mode.id } },
                        }))
                      }
                      className="absolute top-4 right-4 w-5 h-5 accent-orange-600"
                    />
                    <span className="font-bold text-slate-800">{mode.label}</span>
                    <span className="text-[11px] text-slate-500 mt-1">{mode.desc}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen bg-slate-50/30">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-orange-500">
              <IoSettingsSharp size={24} />
            </div>
            Configuration Settings
          </h2>
          <p className="text-slate-500 text-sm mt-2 ml-1">
            Manage your website's core appearance and social presence.
          </p>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 pt-6 border-b border-slate-50 flex gap-2 overflow-x-auto overflow-y-hidden no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-50 text-orange-600 border-x border-t border-slate-100 -mb-[1px]"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">{renderTabContent()}</div>

          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-4">
            <button className="px-6 py-2.5 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors cursor-pointer">
              Discard
            </button>
            <button
              onClick={handleSubmitData}
              disabled={
                updateGeneralSettings.isPending || 
                updateSocialSettings.isPending || 
                websiteModeUpdateSettings.isPending
              }
              className="px-10 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {updateGeneralSettings.isPending || updateSocialSettings.isPending || websiteModeUpdateSettings.isPending
                ? "Saving..."
                : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;