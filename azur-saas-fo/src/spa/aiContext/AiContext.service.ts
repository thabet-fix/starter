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

import { Context, ContextListResult } from './AiContext.type';

const AiContextKeys = createQueryKeys('contextService', {
  all: () => ['contextService'] as const,
  context: (params: { contextId?: number | string }) => [params],
  listByTemplate: (params: { templateId?: number | string }) => [params],
});
type AiContextKeys = inferQueryKeys<typeof AiContextKeys>;

export const useContextList = (
  { page = 1 } = {},
  config: UseQueryOptions<
    ContextListResult,
    AxiosError,
    ContextListResult,
    AiContextKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    AiContextKeys.all().queryKey,
    (): Promise<ContextListResult> =>
      Axios.get(`admin/ai-context`, { params: { page } }),
    { keepPreviousData: true, ...config }
  );

  return {
    ContextList: result.data,
    ...result,
  };
};

export const useContext = (
  id?: number | string,
  config: UseQueryOptions<
    Context,
    AxiosError,
    Context,
    AiContextKeys['context']['queryKey']
  > = {}
) => {
  const result = useQuery(
    AiContextKeys.context({ contextId: id }).queryKey,
    (): Promise<Context> => Axios.get(`/admin/ai-context/${id}`),
    {
      ...config,
    }
  );

  return {
    context: result.data,
    ...result,
  };
};

export const useContextUpdate = (
  id?: number | string,
  config: UseMutationOptions<Context, AxiosError, Context> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => Axios.put(`/admin/ai-context/${id}`, payload),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(AiContextKeys.context({ contextId: id }));
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useContextCreate = (
  config: UseMutationOptions<Context, AxiosError, Context> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/ai-context', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(AiContextKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useContextRemove = (
  id: number,
  config: UseMutationOptions<void, unknown, Context> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (): Promise<void> => Axios.delete(`/admin/ai-context/${id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(AiContextKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
