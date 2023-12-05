import React, { useState } from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';


import { useCompanyByEmployer, useCompanyUpdate } from './Company.service';
import { CompanyForm } from './CompanyForm';

export const PageCompanyUpdate = () => {
  const { t } = useTranslation(['common', 'companies', 'users']);

  const navigate = useNavigate();
  const { company, isLoading: companyDetailsLoading } = useCompanyByEmployer({
    refetchOnWindowFocus: false,
  });

  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: updateCompany, isLoading: updateCompanyLoading } =
    useCompanyUpdate({
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
          title: t('companies:SuccessUpdate'),
        });
      },
    });

  const submitUpdateCompany = async (values: TODO) => {
    const newCompany = {
      ...values,
    };
    await updateCompany(newCompany);
  };
  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Page containerSize="md">
      
      {!companyDetailsLoading && (
        <Formiz
          id="create-user-form"
          onValidSubmit={submitUpdateCompany}
          connect={form}
          initialValues={company}
        >
          <form noValidate onSubmit={form.submit}>
            <PageTopBar showBack onBack={() => navigate(-1)}>
              <Heading size="md">{t('companies:CopanyInformation')}</Heading>
            </PageTopBar>
            <PageContent>
              <CompanyForm />
              <ButtonGroup
                mt={4}
                p={4}
                bg={'white'}
                _dark={{ bg: 'blackAlpha.400' }}
                justifyContent="space-between"
              >
                <Button onClick={() => navigate(-1)} >
                  {t('common:actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={updateCompanyLoading}
                  onClick={() => {
                    setInvalidForm(true);
                    setTimeout(() => {
                      setInvalidForm(false);
                    }, 100);
                  }}
                >
                  {t('companies:Edit')}
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
