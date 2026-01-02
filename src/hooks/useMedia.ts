import { useMutation, useQuery } from "@tanstack/react-query";
import { apiAuth } from "../utils/api-client";

type ImageResponse = {
    message: string;
}

type FormDataImageInput = {
    page: number,
    limit: number,
    business_id: string

}


export const useMediaUploadImage = () => {
  return useMutation<ImageResponse, unknown, FormData>({
    mutationFn: (formData: FormData) =>
      apiAuth
        .post("/api/admin/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export const useMediaDeleteImage = () => {
  
  return useMutation<ImageResponse, unknown, string>({
    mutationFn: (id: string) =>
      
      apiAuth
        .delete(`/api/admin/image/${id}`)
        .then((res) => res.data),
  });
};



export const useMediaImagesShow = ({
  page,
  limit,
  business_id,
}: FormDataImageInput) => {
  return useQuery({
    queryKey: ["admin-images", page, limit, business_id],
    queryFn: () =>
      apiAuth
        .get("/api/admin/image", {
          params: { page, limit, business_id },
        })
        .then((res) => res.data),

    // ✅ THIS PREVENTS THE ERROR
    enabled: Boolean(business_id),
  });
};
