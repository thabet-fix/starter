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

const BillingKeys = createQueryKeys('BillingService', {
  billing: () => ['BillingDetails'] as const,
  cancelSubscription: () => ['cancel'] as const,
});
type BillingKeys = inferQueryKeys<typeof BillingKeys>;

export const useBilling = (
  config: UseQueryOptions<
    TODO,
    AxiosError,
    TODO,
    BillingKeys['billing']['queryKey']
  > = {}
) => {
  const result = useQuery(
    BillingKeys.billing().queryKey,
    (): Promise<TODO> => Axios.get(`/payment/billing`),
    {
      ...config,
    }
  );

  return {
    billing: result.data,
    ...result,
  };
};

export const useCancelSubscription = (
  config: UseMutationOptions<TODO, AxiosError, TODO> = {}
) => {
  return useMutation(() => Axios.post(`/payment/subscription/cancel`), {
    ...config,
    onSuccess: (...args) => {
      config?.onSuccess?.(...args);
    },
  });
};
