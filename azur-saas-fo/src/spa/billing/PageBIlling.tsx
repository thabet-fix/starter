import React, { useState } from 'react';

import { Center, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Page, PageContent, PageTopBar } from '../layout';
import { useBilling } from './Billing.service';
import { ErrorPage } from './ErrorPage';

export const PageBilling = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation(['common', 'payment', 'billing']);
  const {
    billing,
    isLoading: billingLoading,
    isError,
  } = useBilling({
    onError: () => {
      setErrorMessage(t('common:use.errorOccurred'));
    },
    onSuccess: (response) => {
      if (response === false) {
        setErrorMessage(t('common:use.errorOccurred'));
      } else {
        window.location.href = response.url;
      }
    },
  });

  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('payment:YourInvoice')}</Heading>
          </HStack>
        </PageTopBar>
        {billingLoading && (
          <Center>
            <Text>{t('payment:Redirection')}</Text>
            <Spinner size="md" color="blue" />
          </Center>
        )}

        {!billing && !billingLoading && !isError && (
          <ErrorPage message={t('payment:noValidSubscription')} />
        )}

        {!billingLoading && isError && <ErrorPage message={errorMessage} />}
      </PageContent>
    </Page>
  );
};
