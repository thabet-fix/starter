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

import { Company, CompanyListResult } from './Company.type';

const CompanyKeys = createQueryKeys('companyService', {
  all: () => ['companyService'] as const,
  company: (params: { companyId?: number | string }) => [params],
  companyByEmployer: (params: { employerId?: number | undefined }) => [params],
});
type CompanyKeys = inferQueryKeys<typeof CompanyKeys>;

export const useCompanyList = (
  { page = 1 } = {},
  config: UseQueryOptions<
    CompanyListResult,
    AxiosError,
    CompanyListResult,
    CompanyKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    CompanyKeys.all().queryKey,
    (): Promise<CompanyListResult> =>
      Axios.get(`admin/company`, { params: { page } }),
    { keepPreviousData: true, ...config }
  );

  return {
    CompanyList: result.data,
    ...result,
  };
};

export const useCompany = (
  id?: number | string,
  config: UseQueryOptions<
    Company,
    AxiosError,
    Company,
    CompanyKeys['company']['queryKey']
  > = {}
) => {
  const result = useQuery(
    CompanyKeys.company({ companyId: id }).queryKey,
    (): Promise<Company> => Axios.get(`/admin/company/${id}`),
    {
      ...config,
    }
  );

  return {
    company: result.data,
    ...result,
  };
};

export const useCompanyByEmployer = (
  config: UseQueryOptions<
    Company,
    AxiosError,
    Company,
    CompanyKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    CompanyKeys.all().queryKey,
    (): Promise<Company> => Axios.get(`/admin/company/employer`),
    {
      ...config,
    }
  );

  return {
    company: result.data,
    ...result,
  };
};

type CompanyError = {
  denomination: string;
};

export const useCompanyUpdate = (
  config: UseMutationOptions<Company, AxiosError<CompanyError>, Company> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => Axios.put(`/admin/company/employer`, payload),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(CompanyKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useCompanyCreate = (
  config: UseMutationOptions<Company, AxiosError<CompanyError>, Company> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/company', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(CompanyKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useCompanyRemove = (
  id: number,
  config: UseMutationOptions<void, unknown, Company> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (): Promise<void> => Axios.delete(`/admin/company/${id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(CompanyKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useCompanyChangeStatus = (
  id: number,
  config: UseMutationOptions<void, unknown, Company> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (): Promise<void> => Axios.put(`/admin/company/status/${id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(CompanyKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
