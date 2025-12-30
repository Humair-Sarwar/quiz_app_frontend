
import { apiPublic } from '../utils/api-client'
import { useQuery } from '@tanstack/react-query';

interface useQuizListProps{
    search: string;
    category_slug: string;
    limit?: number;
    page?: number;
}



export const useQuizList = ({search, category_slug, limit, page}: useQuizListProps) => {
    const fetchQuizList = () => apiPublic.get('/api/quiz-all-website', {
        params: {
            search,
            category_slug,
            limit,
            page
        }
    }).then(res=> res?.data);
  return useQuery({
    queryKey: ['quiz-list-website', search, category_slug, limit, page],
    queryFn: ()=> fetchQuizList()
  })
}


