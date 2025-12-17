import { useMutation } from "@tanstack/react-query";
import { apiPublic } from "../utils/api-client";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    _id: string;
    type: number;
    email: string;
  };
};

const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: (formData) =>
      apiPublic
        .post("/auth/login", formData)
        .then((res) => res.data),

  });
};

export default useLogin;
