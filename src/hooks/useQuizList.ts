
import { apiPublic } from '../utils/api-client'
import { useQuery } from '@tanstack/react-query';

interface useQuizListProps{
    search: string;
    category_slug: string;
    limit?: number;
    page?: number;
    user_id: string | null;
}



export const useQuizList = ({search, category_slug, limit, page, user_id}: useQuizListProps) => {
    const fetchQuizList = () => apiPublic.get('/api/quiz-all-website', {
        params: {
          user_id,
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


