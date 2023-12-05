import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { useAuthContext } from '@/spa/auth/AuthContext';

import { User } from '../admin/users/users.types';

export const useLogin = (
  config: UseMutationOptions<
    { id_token: string; user: User },
    AxiosError<TODO>,
    { email: string; password: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();
  return useMutation(
    ({ email, password }) => Axios.post('/login', { email, password }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        localStorage.setItem('accountId', data.user.id.toString());
        localStorage.setItem('packPremium', data.user.isPremium.toString());
        updateToken(data.id_token);
        if (config.onSuccess) {
          config.onSuccess(data, ...rest);
        }
      },
    }
  );
};
