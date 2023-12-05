import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { DEFAULT_LANGUAGE_KEY } from '@/constants/i18n';
import { User, UserList, UserListResult } from '@/spa/admin/users/users.types';

type UserMutateError = {
  title: string;
  errorKey: 'userexists' | 'emailexists';
  email: TODO;
  firstName: TODO;
  lastName: TODO;
};

const USERS_BASE_URL = '/admin/users';

const usersKeys = createQueryKeys('usersService', {
  users: (params: { page?: number; size?: number }) => [params],
  user: (params: { login?: string }) => [params],
});
type UsersKeys = inferQueryKeys<typeof usersKeys>;

export const useUserList = (
  { page = 1, size = 10 } = {},
  config: UseQueryOptions<
    UserListResult,
    AxiosError,
    UserListResult,
    UsersKeys['users']['queryKey']
  > = {}
) => {
  const result = useQuery(
    usersKeys.users({ page, size }).queryKey,
    (): Promise<UserListResult> =>
      Axios.get(USERS_BASE_URL, { params: { page, size, sort: 'id,desc' } }),
    { keepPreviousData: true, ...config }
  );
  // const users = result.data;
  // const { content: users, totalItems } = result.data || {};
  // const totalPages = Math.ceil((totalItems ?? 0) / size);
  // const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    users: result.data,
    // totalItems,
    // hasMore,
    // totalPages,
    isLoadingPage,
    ...result,
  };
};

export const useUser = (
  id?: string,
  config: UseQueryOptions<
    User,
    AxiosError,
    User,
    UsersKeys['user']['queryKey']
  > = {}
) => {
  const result = useQuery(
    usersKeys.user({ login: id }).queryKey,
    (): Promise<User> => Axios.get(`/admin/users/${id}`),
    {
      enabled: !!id,
      ...config,
    }
  );

  return {
    user: result.data,
    ...result,
  };
};

export const useUserUpdate = (
  id?: string,
  config: UseMutationOptions<User, AxiosError<UserMutateError>, User> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => Axios.put(`/admin/users/update-${id}`, payload),
    {
      ...config,
      onSuccess: (data, payload, ...rest) => {
        queryClient.cancelQueries(usersKeys.users._def);
        queryClient
          .getQueryCache()
          .findAll(usersKeys.users._def)
          .forEach(({ queryKey }) => {
            queryClient.setQueryData<UserList | undefined>(
              queryKey,
              (cachedData) => {
                if (!cachedData) return;
                return {
                  ...cachedData,
                  content: (cachedData.content || []).map((user) =>
                    user.id === data.id ? data : user
                  ),
                };
              }
            );
          });
        queryClient.invalidateQueries(usersKeys.users._def);
        queryClient.invalidateQueries(usersKeys.user({ login: payload.login }));
        if (config.onSuccess) {
          config.onSuccess(data, payload, ...rest);
        }
      },
    }
  );
};

export const useUserCreate = (
  config: UseMutationOptions<User, AxiosError<UserMutateError>, User> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ langKey = DEFAULT_LANGUAGE_KEY, ...payload }) =>
      Axios.post('/admin/users/create', {
        langKey,
        ...payload,
      }),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(usersKeys.users._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useUserRemove = (
  config: UseMutationOptions<void, unknown, User> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (user: User): Promise<void> => Axios.post(`/admin/users/remove-${user.id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(usersKeys.users._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useActivateUser = (
  config: UseMutationOptions<void, unknown, User> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (user: User): Promise<void> =>
      Axios.post(`/admin/users/activate-${user.id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(usersKeys.users._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
