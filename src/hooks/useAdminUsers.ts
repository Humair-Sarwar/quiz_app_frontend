import { useMutation, useQuery } from "@tanstack/react-query"
import { apiAuth } from "../utils/api-client"

interface useAdminUsersProps{
    search: string,
    page: number,
    limit: number,
    business_id: string | null
    type: number
}

interface useAdminUserProps{
    user_id: string | undefined;
}
interface useAdminUserProfileProps{
    id: string | null;
    type: number | null;
}






type UserAdminInput = {
    id: string | null, name: string, email: string, image: string | null
}

type UserAdminInputResponse = {
    message: string;
}





export const useAdminUsers = ({ search, page, limit, type }: useAdminUsersProps) => {
  const fetchUsers = () =>
    apiAuth
      .get("/auth/users", { params: { search, page, limit, type } })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["admin-users", search, page, limit, type],
    queryFn: fetchUsers,
  });
};

export const useAdminUser = ({ user_id }: useAdminUserProps) => {
  const fetchUsers = () =>
    apiAuth
      .get("/api/admin/all-user-attempted-quiz", { params: { user_id } })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["admin-user", user_id],
    queryFn: fetchUsers,
  });
};

export const useAdminUserProfile = ({ id, type }: useAdminUserProfileProps) => {
  const fetchUsers = () =>
    apiAuth
      .get("/auth/get-admin-user", { params: { id, type } })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["admin-users-profile", id, type],
    queryFn: fetchUsers,
  });
};



export const useUpdateAdminUser = ()=>{
  return useMutation<UserAdminInputResponse, unknown, UserAdminInput>({
    mutationFn: (data: UserAdminInput) => apiAuth.put("/auth/update-user-admin", data).then((res)=> res?.data)
  })
}