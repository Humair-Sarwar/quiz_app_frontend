import { useMutation } from '@tanstack/react-query'

import { apiPublic } from '../utils/api-client'

type SignupInput = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type SignupResponse = {
    message: string;
    status?: number;
}

const useSignup = () => {
  return useMutation<SignupResponse, SignupResponse, SignupInput>({
    mutationFn: (formData: SignupInput) =>
      apiPublic.post("/auth/signup", formData).then((res) => res?.data),
  });
};


export default useSignup;
