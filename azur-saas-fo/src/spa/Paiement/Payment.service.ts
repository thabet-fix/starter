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

const stripeKeys = createQueryKeys('stripeService', {
  all: () => ['stripeService'] as const,
});
type StripeKeys = inferQueryKeys<typeof stripeKeys>;

export const useStripeSubscription = (
  config: UseMutationOptions<TODO, unknown, TODO> = {}
) => {
  // const queryClient = useQueryClient();
  return useMutation(
    (payload): Promise<TODO> => Axios.post(`/payment/subscription`, payload),
    {
      ...config,
      onSuccess: (...args) => {
        // queryClient.invalidateQueries(LanguageKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useStripeUrlForToken = (
  config: UseMutationOptions<TODO, unknown, TODO> = {}
) => {
  // const queryClient = useQueryClient();
  return useMutation(
    (payload): Promise<TODO> => Axios.post(`/payment/url-token`, payload),
    {
      ...config,
      onSuccess: (...args) => {
        // queryClient.invalidateQueries(LanguageKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useSubscriptionUrl = (
  config: UseMutationOptions<TODO, unknown, TODO> = {}
) => {
  // const queryClient = useQueryClient();
  return useMutation(
    (payload): Promise<TODO> =>
      Axios.post(`/payment/subscription-url`, payload),
    {
      ...config,
      onSuccess: (...args) => {
        // queryClient.invalidateQueries(LanguageKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useSuccessPayment = (
  sessionId: string | null,
  config: UseQueryOptions<
    string,
    AxiosError,
    string,
    StripeKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    stripeKeys.all().queryKey,
    (): Promise<string> =>
      Axios.get(`/payment/success`, {
        params: {
          sessionId: sessionId,
        },
      }),
    {
      ...config,
    }
  );

  return {
    result: result.data,
    ...result,
  };
};

export const useSuccessSubscription = (
  sessionId: string | null,
  config: UseQueryOptions<
    string,
    AxiosError,
    string,
    StripeKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    stripeKeys.all().queryKey,
    (): Promise<string> =>
      Axios.get(`/payment/success-subscription`, {
        params: {
          sessionId: sessionId,
        },
      }),
    {
      ...config,
    }
  );

  return {
    result: result.data,
    ...result,
  };
};
export const useSuccessPaymentToken = (
  sessionId: string | null,
  config: UseQueryOptions<
    string,
    AxiosError,
    string,
    StripeKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    stripeKeys.all().queryKey,
    (): Promise<string> =>
      Axios.get(`/payment/success-token`, {
        params: {
          sessionId: sessionId,
        },
      }),
    {
      ...config,
    }
  );

  return {
    result: result.data,
    ...result,
  };
};
