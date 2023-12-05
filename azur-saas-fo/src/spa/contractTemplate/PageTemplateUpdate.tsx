import React, { useState } from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { useTemplate, useTemplateUpdate } from './Template.service';
import { TemplateForm } from './TemplateForm';

export const PageTemplateUpdate = () => {
  const { t } = useTranslation(['common', 'template', 'languages']);
  const { id } = useParams();

  const { template, isLoading: templateDetailsLoading } = useTemplate(id, {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const navigate = useNavigate();

  const form = useForm();

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: updateTemplate, isLoading: updateTemplateLoading } =
    useTemplateUpdate(id, {
      onError: (error) => {
        if (error.response) {
          toastError({
            title: t('common:use.errorOccurred'),
          });
        }
        if (error?.response?.status === 422) {
          form.invalidateFields({
            content: t('template:errorContent', {
              fields: error?.response?.data,
            }),
          });
        }
      },
      onSuccess: async () => {
        toastSuccess({
          title: t('template:SuccessUpdate'),
        });
      },
    });

  const [isLanguageFromChild, setLanguageFromChild] = useState(false);
  const submitUpdateTemplate = async (values: TODO) => {
    const newTemplate = {
      isNewContent: isLanguageFromChild,
      ...values,
    };
    await updateTemplate(newTemplate);
  };

  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Page containerSize="full">
      {!templateDetailsLoading && (
        <Formiz
          id="create-template-form"
          onValidSubmit={submitUpdateTemplate}
          connect={form}
          initialValues={template}
        >
          <form noValidate onSubmit={form.submit}>
            <PageTopBar showBack onBack={() => navigate(`/admin/template`)}>
              <Heading size="md">{t('template:EditTemplate')}</Heading>
            </PageTopBar>
            <PageContent>
              <TemplateForm
                templates={template}
                onLanguageChange={setLanguageFromChild}
              />
              <ButtonGroup
                position={'fixed'}
                style={{
                  right: 0,
                  zIndex: 10,
                  bottom: 0,
                }}
                left={{ base: '0', sm: '0', md: '15rem' }}
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
                  isLoading={updateTemplateLoading}
                  onClick={() => {
                    setInvalidForm(true);
                    setTimeout(() => {
                      setInvalidForm(false);
                    }, 100);
                  }}
                >
                  {isLanguageFromChild ? t('template:Add') : t('template:Edit')}
                </Button>
              </ButtonGroup>
              {invalidForm && <ScrollToFirstError />}
            </PageContent>
          </form>
        </Formiz>
      )}
    </Page>
  );
};
