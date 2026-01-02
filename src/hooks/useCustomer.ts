import { useMutation, useQuery } from "@tanstack/react-query";
import { apiAuth } from "../utils/api-client";

interface useUserProps {
  user_id: string | undefined;
}

interface UserProfileInputResponse {
  message: string;
}

interface useAttemptedQuizListProps {
  search: string;
  page: number;
  limit: number;
  user_id: string | null;
}


interface useQuizProps {
  quiz_id: string;
}



export interface QuizOptionInput {
  option_label: string;
  answer: boolean; 
}

export interface QuestionGroupInput {
  question_title: string;
  options: QuizOptionInput[];
}

export interface SaveAttemptedQuizInput {
  user_id: string | null;
  quiz_id: string;
  quiz_title: string;
  question_group: QuestionGroupInput[];
}

export interface SaveAttemptedQuizResponse {
  status: boolean;
  message: string;
  data?: any; 
}

export interface useQuizResultProps{
  id: string;
}


interface RetakeQuizProps {
  id: string;
  user_id: string;
}


export const useProfileUser = ({ user_id }: useUserProps) => {
  const fetchUser = () =>
    apiAuth
      .get("/auth/get-user-profile", { params: { user_id } })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["student-user", user_id],
    queryFn: fetchUser,
  });
};

export const useUpdateProfileUser = () => {
  return useMutation<UserProfileInputResponse, unknown, any>({
    mutationFn: (data: any) =>
      apiAuth
        .put("/auth/user/update-profile", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res?.data),
  });
};

export const useAttemptedQuizList = ({
  user_id,
  search,
  page,
  limit,
}: useAttemptedQuizListProps) => {
  const fetchUser = () =>
    apiAuth
      .get("/api/quiz-attempts/all", {
        params: { user_id, search, page, limit },
      })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["student-attempted-quiz-list", user_id, search, page, limit],
    queryFn: fetchUser,
  });
};






export const useQuizStartData = ({ quiz_id }: useQuizProps) => {
  const fetchQuiz = () =>
    apiAuth
      .get(`/api/quiz/${quiz_id}`)
      .then((res) => res.data);

  return useQuery({
    queryKey: ["quiz-start", quiz_id],
    queryFn: fetchQuiz,
  });
};




export const useSaveAttemptedQuiz = () => {
  return useMutation<SaveAttemptedQuizResponse, Error, SaveAttemptedQuizInput>({
    mutationFn: (formData: SaveAttemptedQuizInput) => 
      apiAuth.post("/api/quiz/save-question", formData).then((res) => res.data),
  });
};



export const useGetQuizResult = ({ id }: { id: string }, options?: any) => {
  const fetchResult = () =>
    apiAuth
      .get(`/api/quiz/get-result`, { 
        params: { id } 
      })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["quiz-result", id],
    queryFn: fetchResult,
    ...options,
  });
};




export const useRetakeQuiz = ()=>{
  return useMutation<SaveAttemptedQuizResponse, unknown, RetakeQuizProps>({
    mutationFn: (data: RetakeQuizProps) => apiAuth.delete("/api/quiz/retake", {data}).then((res)=> res?.data)
  })
}