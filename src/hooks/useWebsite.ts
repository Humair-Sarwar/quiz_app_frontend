

import { useQuery } from '@tanstack/react-query'

import { apiPublic } from '../utils/api-client';

const fetchWebsiteData = () => apiPublic.get('/api/website/data').then(res=> res?.data);

const useWebsite = () => {
  return useQuery({
    queryKey: ['website-data'],
    queryFn: ()=> fetchWebsiteData()
  })
}

export default useWebsite
