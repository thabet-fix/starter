import React, { useState } from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { useCompanyCreate } from './Company.service';
import { CompanyForm } from './CompanyForm';

export const PageCompanyCreate = () => {
  const { t } = useTranslation(['common', 'companies', 'users']);
  const navigate = useNavigate();
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const [invalidForm, setInvalidForm] = useState(false);
  const { mutate: createCompany, isLoading: createCompanyLoading } =
    useCompanyCreate({
      onError: (error) => {
        if (error.response) {
          toastError({
            title: t('common:use.errorOccurred'),
          });
          if (error.response.data?.denomination) {
            form.invalidateFields({
              denomination: t('users:data.denomination.alreadyUsed'),
            });
          }
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('companies:SuccessAdd'),
        });
        navigate('/admin/settings/company');
      },
    });

  const submitCreateCompany = async (values: TODO) => {
    const newCompany = {
      ...values,
    };
    await createCompany(newCompany);
  };

  return (
    <Page containerSize="md">
      <PageContent>
        <PageTopBar showBack onBack={() => navigate(-1)}>
          <Heading size="md">{t('companies:AddCompany')}</Heading>
        </PageTopBar>
        <Formiz
          id="create-user-form"
          onValidSubmit={submitCreateCompany}
          connect={form}
        >
          <form noValidate onSubmit={form.submit}>
            <CompanyForm />
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
                isLoading={createCompanyLoading}
                onClick={() => {
                  setInvalidForm(true);
                  setTimeout(() => {
                    setInvalidForm(false);
                  }, 100);
                }}
              >
                {t('companies:Add')}
              </Button>
            </ButtonGroup>
            {invalidForm && <ScrollToFirstError />}
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
