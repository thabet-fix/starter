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

import { SdListResult, StandardContract } from './standardContract.type';

const standardContractKeys = createQueryKeys('standardContractService', {
  all: () => ['standardContractService'] as const,
  list: (params: {
    templateId?: string;
    search?: string;
    orderBy?: string;
    order?: string;
  }) => [params],
  standardContract: (params: { standardContractId?: string }) => [params],
});
type StandardContractKeys = inferQueryKeys<typeof standardContractKeys>;

export const useCreatStandardContract = (
  config: UseMutationOptions<
    StandardContract,
    AxiosError<TODO>,
    StandardContract
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (standardContract): Promise<StandardContract> =>
      Axios.post('/sd-contract/create', standardContract),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(standardContractKeys.list._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useStandardContractList = (
  { page = 1, templateId = '', search = '', orderBy = '', order = '' } = {},
  config: UseQueryOptions<
    SdListResult,
    AxiosError,
    SdListResult,
    StandardContractKeys['list']['queryKey']
  > = {}
) => {
  const result = useQuery(
    standardContractKeys.list({ templateId, search, orderBy, order }).queryKey,
    (): Promise<SdListResult> =>
      Axios.get('/sd-contract', {
        params: { templateId, search, orderBy, order, page },
      }),
    { keepPreviousData: true, ...config }
  );

  return {
    standardContractList: result.data,
    ...result,
  };
};

export const useGetStandardContractDetails = (
  { standardContractId = '-1' } = {},
  config: UseQueryOptions<
    StandardContract,
    AxiosError,
    StandardContract,
    StandardContractKeys['standardContract']['queryKey']
  > = {}
) => {
  const result = useQuery(
    standardContractKeys.standardContract({ standardContractId }).queryKey,
    (): Promise<StandardContract> =>
      Axios.get(`/sd-contract/${standardContractId}`),
    { keepPreviousData: true, ...config }
  );
  return {
    contract: result?.data,
    ...result,
  };
};

export const useValidateStandardContract = (
  { standardContractId = '-1' } = {},
  config: UseMutationOptions<
    StandardContract,
    AxiosError<TODO>,
    StandardContract
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (standardContract): Promise<StandardContract> =>
      Axios.post(
        `/sd-contract/${standardContractId}-validate`,
        standardContract
      ),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(standardContractKeys.list._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useContractDowload = (
  config: UseMutationOptions<TODO, unknown, TODO> = {}
) => {
  // const queryClient = useQueryClient();
  return useMutation(
    (payload): Promise<TODO> =>
      Axios.post(`/sd-contract/generate-pdf`, payload),
    {
      ...config,
      onSuccess: (...args) => {
        // queryClient.invalidateQueries(LanguageKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
