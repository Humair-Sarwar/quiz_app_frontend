import { useMutation, useQuery } from "@tanstack/react-query"
import { apiAuth } from "../utils/api-client"

interface useAdminGetQuizProps{
    search: string,
    page: number,
    limit: number,
    business_id: string | null
}



export interface OptionInput {
  option_label: string;
  option_sort_order: number;
  answer: boolean;
}

export interface QuestionInput {
  question_title: string;
  question_sort_order: number;
  question_type: number;
  question_time: string;
  options: OptionInput[];
}

export interface QuizInput {
  business_id: string;
  image: string;
  quiz_title: string;
  quiz_sort_order: number;
  quiz_time: string;
  category_id: string;
  question_group: QuestionInput[];
  status: boolean;
}

type QuizResponse = {
    message: string;
}

type QuizDeleteProps = {
  business_id: string;
  id: string;
}




export const useAdminGetQuiz = ({search, page, limit, business_id}: useAdminGetQuizProps) => {
  const fetchQuizs = ()=> apiAuth.get('/api/quiz-all', {
      params: {
        search,
        page,
        limit,
        business_id
      }
    }).then((res)=> res?.data)

  return useQuery({
    queryKey: ['admin-quiz', search, page, limit],
    queryFn: ()=> fetchQuizs(),
  })
}




export const useCreateQuizList = () => {
  return useMutation<QuizResponse, unknown, QuizInput>({
    mutationFn: (formData: QuizInput) => apiAuth.post("/api/quiz-create", formData).then((res) => res.data),

  });
};




export const useUpdateQuiz = ()=>{
  return useMutation<QuizResponse, unknown, QuizInput>({
    mutationFn: (data: QuizInput) => apiAuth.put("/api/quiz-update", data).then((res)=> res?.data)
  })
}



export const useDeleteQuiz = ()=>{
  return useMutation<QuizResponse, unknown, QuizDeleteProps>({
    mutationFn: (data: QuizDeleteProps) => apiAuth.delete("/api/quiz-delete", {data}).then((res)=> res?.data)
  })
}