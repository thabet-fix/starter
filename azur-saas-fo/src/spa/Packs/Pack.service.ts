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

import { Pack, PackDetails, PackListResult } from './Pack.type';

const PackKeys = createQueryKeys('PackService', {
  all: () => ['PackService'] as const,
  Pack: (params: { PackId?: number | string }) => [params],
  PackUserDetails: () => ['PackDetails'] as const,
});
type PackKeys = inferQueryKeys<typeof PackKeys>;

export const usePackList = (
  { page = 1 } = {},
  config: UseQueryOptions<
    PackListResult,
    AxiosError,
    PackListResult,
    PackKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    PackKeys.all().queryKey,
    (): Promise<PackListResult> =>
      Axios.get(`admin/pack`, { params: { page } }),
    { keepPreviousData: true, ...config }
  );

  return {
    PackList: result.data,
    ...result,
  };
};

export const usePack = (
  id?: number | string,
  config: UseQueryOptions<
    Pack,
    AxiosError,
    Pack,
    PackKeys['Pack']['queryKey']
  > = {}
) => {
  const result = useQuery(
    PackKeys.Pack({ PackId: id }).queryKey,
    (): Promise<Pack> => Axios.get(`/admin/pack/${id}`),
    {
      ...config,
    }
  );

  return {
    Pack: result.data,
    ...result,
  };
};

export const usePackUpdate = (
  id?: number | string,
  config: UseMutationOptions<Pack, AxiosError, Pack> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put(`/admin/pack/${id}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(PackKeys.Pack({ PackId: id }));
      config?.onSuccess?.(...args);
    },
  });
};

export const usePackCreate = (
  config: UseMutationOptions<Pack, AxiosError, Pack> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/pack', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(PackKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const usePackRemove = (
  id: number,
  config: UseMutationOptions<void, unknown, Pack> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((): Promise<void> => Axios.delete(`/admin/pack/${id}`), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(PackKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const usePackDetails = (
  userId?: string | number | null,
  config: UseQueryOptions<
    PackDetails,
    AxiosError,
    PackDetails,
    PackKeys['PackUserDetails']['queryKey']
  > = {}
) => {
  const result = useQuery(
    PackKeys.PackUserDetails().queryKey,
    (): Promise<PackDetails> => Axios.get(`/admin/pack/${userId}-details`),
    {
      refetchInterval: config.refetchInterval,
      ...config,
    }
  );

  return {
    PackDetails: result.data,
    ...result,
  };
};
