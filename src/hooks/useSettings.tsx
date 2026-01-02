import { useMutation, useQuery } from "@tanstack/react-query"
import { apiAuth } from "../utils/api-client"

type useGeneralGetSettingsProps = {
    business_id: string
}

type useSocialLinksGetSettingsProps = {
    business_id: string
}

type useWebsiteModeGetSettingsProps = {
    business_id: string
}

type GeneralInput = {
  business_id: string;
  general: {
    site_title?: string;
    email?: string;
    phone?: string;
    footer_description?: string;
    show_whatsapp_icon?: boolean;
    whatsapp_no?: string;
    promotional_items?: { title: string }[];
  };
};


type GeneralResponse = {
  status: number;
  message: string;
  data: GeneralInput;
};


type SocialLinkItem = {
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
};

type SocialInput = {
  business_id: string; 
  social_links: SocialLinkItem[]; 
};

type ModeInput = {
  business_id: string;
  website_services: {
    website_mode: {
      mode: number;
    };
  };
};


export const useGeneralGetSettings = ({ business_id }: useGeneralGetSettingsProps) => {
  const fetchGeneral = ()=> apiAuth.get('/api/admin/settings/general/get', {
          params: { business_id },
        }).then((res)=> res?.data)

  return useQuery({
    queryKey: ['general-settings'],
    queryFn: ()=> fetchGeneral(),
  })
}


export const useGeneralUpdateSettings = () => {
  return useMutation<GeneralResponse, unknown, GeneralInput>({
    mutationFn: (formData: GeneralInput) => apiAuth.post("/api/admin/settings/general", formData).then((res) => res.data),

  });
};

export const useSocialLinksGetSettings = ({ business_id }: useSocialLinksGetSettingsProps) => {
  const fetchGeneral = ()=> apiAuth.get('/api/admin/settings/social-links/get', {
          params: { business_id },
        }).then((res)=> res?.data)

  return useQuery({
    queryKey: ['social-links-settings'],
    queryFn: ()=> fetchGeneral(),
  })
}

export const useSocialUpdateSettings = () => {
  return useMutation<GeneralResponse, unknown, SocialInput>({
    mutationFn: (formData: SocialInput) => apiAuth.post("/api/admin/settings/social-links", formData).then((res) => res.data),

  });
};



export const useWebsiteModeGetSettings = ({ business_id }: useWebsiteModeGetSettingsProps) => {
  const fetchGeneral = ()=> apiAuth.get('/api/admin/settings/website-services/get', {
          params: { business_id },
        }).then((res)=> res?.data)

  return useQuery({
    queryKey: ['website-mode-settings'],
    queryFn: ()=> fetchGeneral(),
  })
}


export const useWebsiteModeUpdateSettings = () => {
  return useMutation<GeneralResponse, unknown, ModeInput>({
    mutationFn: (formData: ModeInput) => apiAuth.post("/api/admin/settings/website-services/create", formData).then((res) => res.data),

  });
};