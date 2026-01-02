import { useMutation, useQuery } from "@tanstack/react-query"
import { apiAuth } from "../utils/api-client"

interface useAdminCategoriesProps{
    search: string,
    page: number,
    limit: number,
    business_id: string | null
}


type CategoryInput = {
    business_id: string, category_name: string, slug: string, sort_order: number
}

type CategoryResponse = {
    message: string;
}

type CategoryDeleteProps = {
  business_id: string;
  id: string;
}

type CategoryDeleteSelectedProps = object[]


export const useAdminCategories = ({search, page, limit, business_id}: useAdminCategoriesProps) => {

    const fetchCategories = ()=> apiAuth.get('/api/category', {
      params: {
        search,
        page,
        limit,
        business_id
      }
    }).then((res)=> res?.data)

  return useQuery({
    queryKey: ['admin-categories', search, page, limit],
    queryFn: ()=> fetchCategories(),
  })
}

export const createCategory = () => {
  return useMutation<CategoryResponse, unknown, CategoryInput>({
    mutationFn: (formData: CategoryInput) => apiAuth.post("/api/category", formData).then((res) => res.data),

  });
};

export const deleteCategory = ()=>{
  return useMutation<CategoryResponse, unknown, CategoryDeleteProps>({
    mutationFn: (data: CategoryDeleteProps) => apiAuth.delete("/api/category", {data}).then((res)=> res?.data)
  })
}


export const updateCategory = ()=>{
  return useMutation<CategoryResponse, unknown, CategoryInput>({
    mutationFn: (data: CategoryInput) => apiAuth.put("/api/category", data).then((res)=> res?.data)
  })
}

export const useDeleteSelectedCategory = ()=>{
  return useMutation<CategoryResponse, unknown, CategoryDeleteSelectedProps>({
    mutationFn: (data: CategoryDeleteSelectedProps) => apiAuth.delete("/api/category-selected", {data}).then((res)=> res?.data)
  })
}
