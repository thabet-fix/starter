import React from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { useContext, useContextUpdate } from './AiContext.service';
import { ContextForm } from './AiContextForm';

export const PageContextUpdate = () => {
  const { t } = useTranslation(['common', 'aiContext']);
  const { id } = useParams();
  const navigate = useNavigate();
  const { context, isLoading: contextDetailsLoading } = useContext(id, {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: updateContext, isLoading: updateContextLoading } =
    useContextUpdate(id, {
      onError: (error) => {
        if (error.response) {
          toastError({
            title:
              (error?.response?.data as string) ||
              t('common:use.errorOccurred'),
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('aiContext:SuccessUpdate'),
        });
        navigate('/admin/settings/ai-cadre');
      },
    });

  const submitUpdateContext = async (values: TODO) => {
    const newContext = {
      ...values,
    };
    await updateContext(newContext);
  };

  return (
    <Page containerSize="md">
      {!contextDetailsLoading && context && (
        <Formiz
          id="create-user-form"
          onValidSubmit={submitUpdateContext}
          connect={form}
          initialValues={{
            id: context?.id,
            name: context?.name,
            context: context?.context,
            contextFlields: context?.fields,
          }}
        >
          <form noValidate onSubmit={form.submit}>
            <PageTopBar showBack onBack={() => navigate(-1)}>
              <Heading size="md">{t('aiContext:UpdateContext')}</Heading>
            </PageTopBar>
            <PageContent>
              <ContextForm context={context} />
              <ButtonGroup
                mt={4}
                p={4}
                bg={'white'}
                _dark={{ bg: 'blackAlpha.400' }}
                justifyContent="space-between"
              >
                <Button onClick={() => navigate(-1)}>
                  {t('common:actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={updateContextLoading}
                >
                  {t('aiContext:Edit')}
                </Button>
              </ButtonGroup>
            </PageContent>
          </form>
        </Formiz>
      )}
    </Page>
  );
};
