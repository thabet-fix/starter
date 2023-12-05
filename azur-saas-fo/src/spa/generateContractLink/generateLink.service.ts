import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

const contractTokenKeys = createQueryKeys('contractToken', {
  all: () => ['contractToken'] as const,
  contractToken: (params: { pageType: string }) => [params],
});

export const useSendContractLink = (
  config: UseMutationOptions<TODO, AxiosError<TODO>, TODO> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/send-page-link', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(contractTokenKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};
