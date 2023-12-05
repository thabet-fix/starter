import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE_KEY } from '@/constants/i18n';
import { Account } from '@/spa/account/account.types';

export const accountKeys = createQueryKeys('accountService', {
  account: null,
});
type AccountKeys = inferQueryKeys<typeof accountKeys>;

export const useAccount = (
  config: UseQueryOptions<
    Account,
    AxiosError,
    Account,
    AccountKeys['account']['queryKey']
  > = {}
) => {
  const { i18n } = useTranslation();
  const { data: account, ...rest } = useQuery(
    accountKeys.account.queryKey,
    (): Promise<Account> => Axios.get('/account'),
    {
      onSuccess: (data) => {
        // i18n.changeLanguage(data?.langKey);

        if (config?.onSuccess) {
          config?.onSuccess(data);
        }
      },
      ...config,
    }
  );

  const isAdmin = account?.isAdmin;
  const isEmployer =
    account?.employerId === null && !account?.isAdmin ? true : false;
  const isManager = account?.employerId !== null ? true : false;
  return { account, isAdmin, isEmployer, isManager, ...rest };
};

type AccountError = {
  title: string;
  email: string;

  denomination: string;
  errorKey: 'userexists' | 'emailexists';
};

type Company = {
  denomination: string;
};

export const useCreateAccount = (
  config: UseMutationOptions<
    Account,
    AxiosError<AccountError>,
    Pick<
      Account & Company,
      | 'firstName'
      | 'lastName'
      | 'denomination'
      | 'email'
      | 'phoneNumber'
      | 'langKey'
    > & { password: string }
  > = {}
) => {
  return useMutation(
    ({
      firstName,
      lastName,
      denomination,
      email,
      password,
      phoneNumber,
      langKey = DEFAULT_LANGUAGE_KEY,
    }): Promise<Account> =>
      Axios.post('/register', {
        firstName,
        lastName,
        denomination,
        phoneNumber,
        email,
        password,
        langKey,
      }),
    {
      ...config,
    }
  );
};

type UseActiveAccountVariables = {
  key: string;
};

export const useActivateAccount = (
  config: UseMutationOptions<
    void,
    AxiosError<TODO>,
    UseActiveAccountVariables
  > = {}
) => {
  return useMutation(
    ({ key }): Promise<void> => Axios.get(`/activate?key=${key}`),
    {
      ...config,
    }
  );
};

export const useUpdateAccount = (
  config: UseMutationOptions<Account, AxiosError<TODO>, Account> = {}
) => {
  const { i18n } = useTranslation();
  return useMutation(
    (account): Promise<Account> => Axios.post('/account/update', account),
    {
      onMutate: (data) => {
        i18n.changeLanguage(data?.langKey);

        if (config?.onMutate) {
          config.onMutate(data);
        }
      },
      ...config,
    }
  );
};

export const useResetPasswordInit = (
  config: UseMutationOptions<void, AxiosError<TODO>, string> = {}
) => {
  return useMutation(
    (email): Promise<void> =>
      Axios.post('/account/reset-password/init', email, {
        headers: { 'Content-Type': 'text/plain' },
      }),
    {
      ...config,
    }
  );
};

type UseResetPasswordFinishVariables = {
  key: string;
  newPassword: string;
};

export const useResetPasswordFinish = (
  config: UseMutationOptions<
    void,
    AxiosError<TODO>,
    UseResetPasswordFinishVariables
  > = {}
) => {
  return useMutation(
    (payload): Promise<void> =>
      Axios.post('/account/reset-password/finish', payload),
    {
      ...config,
    }
  );
};

export const useUpdatePassword = (
  config: UseMutationOptions<
    void,
    AxiosError<TODO>,
    { newPassword: string }
  > = {}
) => {
  return useMutation(
    (payload): Promise<void> => Axios.post('/account/change-password', payload),
    {
      ...config,
    }
  );
};

export const useFirstAccountActivation = (
  config: UseMutationOptions<
    void,
    AxiosError<TODO>,
    number | string | undefined
  > = {}
) => {
  return useMutation(
    (key): Promise<void> => Axios.put(`/${key}-account-activation`),
    {
      ...config,
      onSuccess: (...args) => {
        config?.onSuccess?.(...args);
      },
    }
  );
};
