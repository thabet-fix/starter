import React from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { useTemplateCreate } from './Template.service';

export const PageTemplateCreate = () => {
  const { t } = useTranslation(['common', 'template']);
  const navigate = useNavigate();
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: createTemplate, isLoading: createTemplateLoading } =
    useTemplateCreate({
      onError: (error) => {
        if (error.response) {
          toastError({
            title:
              (error?.response?.data as string) ||
              t('common:use.errorOccurred'),
          });
        }
      },
      onSuccess: (data) => {
        toastSuccess({
          title: t('template:SuccessAdd'),
        });
        navigate(`/admin/template/update/${data.id}`);
      },
    });

  const submitCreateTemplate = async (values: TODO) => {
    const newTemplate = {
      ...values,
    };
    await createTemplate(newTemplate);
  };

  return (
    <Page containerSize="md">
      <PageContent>
        <PageTopBar showBack onBack={() => navigate(`/admin/template`)}>
          <Heading size="md">{t('template:AddTemplate')}</Heading>
        </PageTopBar>
        <Formiz
          id="create-user-form"
          onValidSubmit={submitCreateTemplate}
          connect={form}
        >
          <form noValidate onSubmit={form.submit}>
            <Stack
              direction="column"
              borderRadius="lg"
              spacing="6"
              shadow="md"
              bg="white"
              _dark={{ bg: 'gray.900' }}
              p="6"
              className='guide-boxAddTemplate'
            >
              <FieldInput
                name="name"
                required={t('common:use.required')}
                label={t('template:Form.Name')}
              />
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
                  isLoading={createTemplateLoading}
                >
                  {t('template:Add')}
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
