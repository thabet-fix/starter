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

import { AcContract } from './acContract.type';

const acContractKeys = createQueryKeys('acContractService', {
  all: () => ['acContractService'] as const,
  list: (params: { search?: string; orderBy?: string; order?: string }) => [
    params,
  ],
  acContract: (params: { acContractId?: string }) => [params],
});
type AcContractKeys = inferQueryKeys<typeof acContractKeys>;

export const useCreatAcContract = (
  config: UseMutationOptions<AcContract, AxiosError<TODO>, AcContract> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (acContract): Promise<AcContract> =>
      Axios.post('/ac-contract/create', acContract),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(acContractKeys.list._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useAcContractList = (
  { search = '', orderBy = '', order = '' } = {},
  config: UseQueryOptions<
    AcContract[],
    AxiosError,
    AcContract[],
    AcContractKeys['list']['queryKey']
  > = {}
) => {
  const result = useQuery(
    acContractKeys.list({ search, orderBy, order }).queryKey,
    (): Promise<AcContract[]> =>
      Axios.get('/ac-contract', {
        params: { search, orderBy, order },
      }),
    { keepPreviousData: true, ...config }
  );

  return {
    acContractList: result.data,
    ...result,
  };
};

export const useGetAcContractDetails = (
  { acContractId = '-1' } = {},
  config: UseQueryOptions<
    AcContract,
    AxiosError,
    AcContract,
    AcContractKeys['acContract']['queryKey']
  > = {}
) => {
  const result = useQuery(
    acContractKeys.acContract({ acContractId }).queryKey,
    (): Promise<AcContract> => Axios.get(`/ac-contract/${acContractId}`),
    { keepPreviousData: true, ...config }
  );
  return {
    contract: result?.data,
    ...result,
  };
};

export const useValidateAcContract = (
  { acContractId = '-1' } = {},
  config: UseMutationOptions<AcContract, AxiosError<TODO>, AcContract> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (acContract): Promise<AcContract> =>
      Axios.post(`/ac-contract/${acContractId}-validate`, acContract),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(acContractKeys.list._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
