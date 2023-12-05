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

import { Configuration } from './Configuration.type';

const ConfigurationKeys = createQueryKeys('configurationService', {
  all: () => ['configurationService'] as const,
  configuration: (params: { configurationId?: number | string }) => [params],
});
type ConfigurationKeys = inferQueryKeys<typeof ConfigurationKeys>;

export const useConfiguration = (
  config: UseQueryOptions<
    Configuration,
    AxiosError,
    Configuration,
    ConfigurationKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    ConfigurationKeys.all().queryKey,
    (): Promise<Configuration> => Axios.get(`/admin/configuration`),
    {
      ...config,
    }
  );

  return {
    configuration: result.data,
    ...result,
  };
};

export const useConfigurationUpdate = (
  config: UseMutationOptions<Configuration, AxiosError, Configuration> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put(`/admin/configuration`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(ConfigurationKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useConfigurationCreate = (
  config: UseMutationOptions<Configuration, AxiosError, Configuration> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/configuration', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(ConfigurationKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};
