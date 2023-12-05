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

import { Template, TemplateListResult } from './Template.type';

const TemplateKeys = createQueryKeys('templateService', {
  all: () => ['templateService'] as const,
  template: (params: { templateId?: number | string }) => [params],
});
type TemplateKeys = inferQueryKeys<typeof TemplateKeys>;

type TempalteMutateError = {
  content: TODO;
};

export const useTemplateList = (
  { page = 1 } = {},
  config: UseQueryOptions<
    TemplateListResult,
    AxiosError,
    TemplateListResult,
    TemplateKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    TemplateKeys.all().queryKey,
    (): Promise<TemplateListResult> =>
      Axios.get(`admin/template`, { params: { page } }),
    { keepPreviousData: true, ...config }
  );

  return {
    TemplateList: result.data,
    ...result,
  };
};

export const useTemplate = (
  id?: number | string,
  config: UseQueryOptions<
    Template,
    AxiosError,
    Template,
    TemplateKeys['template']['queryKey']
  > = {}
) => {
  const result = useQuery(
    TemplateKeys.template({ templateId: id }).queryKey,
    (): Promise<Template> => Axios.get(`/admin/template/${id}`),
    {
      ...config,
    }
  );

  return {
    template: result.data,
    ...result,
  };
};

export const useTemplateCreate = (
  config: UseMutationOptions<Template, AxiosError, Template> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/template', payload), {
    ...config,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries(TemplateKeys.all._def);
      config?.onSuccess?.(data, ...args);
    },
  });
};

export const useTemplateUpdate = (
  id?: number | string,
  config: UseMutationOptions<
    Template,
    AxiosError<TempalteMutateError>,
    Template
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put(`/admin/template/${id}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(TemplateKeys.template({ templateId: id }));
      config?.onSuccess?.(...args);
    },
  });
};

export const useContentRemove = (
  id?: number | string,
  config: UseMutationOptions<void, unknown, Template> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload): Promise<void> =>
      Axios.delete(`/admin/template/content/${id}`, { data: payload }),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(
          TemplateKeys.template({ templateId: id })
        );
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useTemplateRemove = (
  id: number,
  config: UseMutationOptions<void, unknown, Template> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (): Promise<void> => Axios.delete(`/admin/template/${id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(TemplateKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

type OpenAi = {
  result: string;
};

export const useGenerateAi = (
  config: UseMutationOptions<OpenAi, AxiosError, OpenAi> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/openai', payload), {
    ...config,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries(TemplateKeys.all._def);
      config?.onSuccess?.(data, ...args);
    },
  });
};
