import React from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import {
  useConfiguration,
  useConfigurationUpdate,
} from './Configuration.service';
import { ConfigurationForm } from './ConfigurationForm';

export const PageConfiguration = () => {
  const { t } = useTranslation(['common', 'configuration']);

  const navigate = useNavigate();
  const { configuration, isLoading: configurationDetailsLoading } =
    useConfiguration();

  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: updateConfiguration, isLoading: updateConfigurationLoading } =
    useConfigurationUpdate({
      onError: (error) => {
        if (error.response) {
          toastError({
            title: t('common:use.errorOccurred'),
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('configuration:SuccessUpdate'),
        });
      },
    });

  const submitUpdateConfiguration = async (values: TODO) => {
    const newConfiguration = {
      ...values,
    };
    await updateConfiguration(newConfiguration);
  };

  return (
    <Page containerSize="md">
      {!configurationDetailsLoading && (
        <Formiz
          id="create-user-form"
          onValidSubmit={submitUpdateConfiguration}
          connect={form}
          initialValues={configuration}
        >
          <form noValidate onSubmit={form.submit}>
            <PageTopBar showBack onBack={() => navigate(-1)}>
              <Heading size="md">
                {t('configuration:ConfigurationTitle')}
              </Heading>
            </PageTopBar>
            <PageContent>
              <ConfigurationForm />
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
                  isLoading={updateConfigurationLoading}
                >
                  {t('configuration:Edit')}
                </Button>
              </ButtonGroup>
            </PageContent>
          </form>
        </Formiz>
      )}
    </Page>
  );
};
