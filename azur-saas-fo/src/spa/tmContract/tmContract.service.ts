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

import { TmContract } from './tmContract.type';

const tmContractKeys = createQueryKeys('tmContractService', {
  all: () => ['tmContractService'] as const,
  list: (params: { search?: string; orderBy?: string; order?: string }) => [
    params,
  ],
  tmContract: (params: { tmContractId: string }) => [params],
});
type TmContractKeys = inferQueryKeys<typeof tmContractKeys>;

export const useCreatTmContract = (
  config: UseMutationOptions<TmContract, AxiosError<TODO>, TmContract> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (TmContract): Promise<TmContract> =>
      Axios.post('/tm-contract/create', TmContract),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(tmContractKeys.list._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useTmContractList = (
  { search = '', orderBy = '', order = '' } = {},
  config: UseQueryOptions<
    TmContract[],
    AxiosError,
    TmContract[],
    TmContractKeys['list']['queryKey']
  > = {}
) => {
  const result = useQuery(
    tmContractKeys.list({ search, orderBy, order }).queryKey,
    (): Promise<TmContract[]> =>
      Axios.get(`/tm-contract`, {
        params: { search, orderBy, order },
      }),
    { keepPreviousData: true, ...config }
  );

  return {
    tmContractList: result.data,
    ...result,
  };
};
export const useGetTmContractDetails = (
  { tmContractId = '-1' } = {},
  config: UseQueryOptions<
    TmContract,
    AxiosError,
    TmContract,
    TmContractKeys['tmContract']['queryKey']
  > = {}
) => {
  const result = useQuery(
    tmContractKeys.tmContract({ tmContractId }).queryKey,
    (): Promise<TmContract> => Axios.get(`/tm-contract/${tmContractId}`),
    { keepPreviousData: true, ...config }
  );
  return {
    contract: result?.data,
    ...result,
  };
};

export const useValidateTmContract = (
  { tmContractId = '-1' } = {},
  config: UseMutationOptions<
    TmContractKeys,
    AxiosError<TODO>,
    TmContractKeys
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (tmContract): Promise<TmContractKeys> =>
      Axios.post(`/tm-contract/${tmContractId}-validate`, tmContract),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(tmContractKeys.list._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
