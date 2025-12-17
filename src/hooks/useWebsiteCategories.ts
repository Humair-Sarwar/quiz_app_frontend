import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "../utils/api-client"

interface useWebsiteCategoriesProps{
    search: string,
    page: number,
    limit: number
}


const useWebsiteCategories = ({search, page, limit}: useWebsiteCategoriesProps)=>{
    console.log("Search term in hook:", search);
    const fetchWebsiteCategories = async () => await apiPublic.get('/api/category-all-website', {
        params: {
            search,
            page,
            limit
        }
    }).then(res=> res?.data);

    return useQuery({
        queryKey: ['website-categories', search, page, limit],
        queryFn: ()=> fetchWebsiteCategories()
    })
}

export default useWebsiteCategories;