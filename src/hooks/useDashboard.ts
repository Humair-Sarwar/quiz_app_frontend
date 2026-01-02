import { useQuery } from "@tanstack/react-query"
import { apiAuth } from "../utils/api-client"

type useAdminGetCountsProps = {
    business_id: string;
}


export const useDashboardCountsGet = ({business_id}: useAdminGetCountsProps) => {
  const fetchData = ()=> apiAuth.get('/api/admin/counts', {
      params: {
        business_id
      }
    }).then((res)=> res?.data)

  return useQuery({
    queryKey: ['admin-dashboard-counts'],
    queryFn: ()=> fetchData(),
  })
}

