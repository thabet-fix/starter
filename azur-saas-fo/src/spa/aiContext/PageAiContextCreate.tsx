import React from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { useContextCreate } from './AiContext.service';
import { ContextForm } from './AiContextForm';

export const PageContextCreate = () => {
  const { t } = useTranslation(['common', 'aiContext']);
  const navigate = useNavigate();
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: createContext, isLoading: createContextLoading } =
    useContextCreate({
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
          title: t('aiContext:SuccessAdd'),
        });
        navigate('/admin/settings/ai-cadre');
      },
    });
  const submitCreateContext = async (values: TODO) => {
    const newContext = {
      ...values,
    };
    await createContext(newContext);
  };

  return (
    <Page containerSize="md">
      <PageContent>
        <PageTopBar showBack onBack={() => navigate(-1)}>
          <Heading size="md">{t('aiContext:AddContext')}</Heading>
        </PageTopBar>
        <Formiz
          id="create-user-form"
          onValidSubmit={submitCreateContext}
          connect={form}
        >
          <form noValidate onSubmit={form.submit}>
            <ContextForm />
            <Stack>
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
                  isLoading={createContextLoading}
                >
                  {t('aiContext:Add')}
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
