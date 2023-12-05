import React, { useState } from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Center,
  ScaleFade,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';

import { useToastError } from '@/components/Toast';

import { usePackDetails } from '../Packs/Pack.service';
import { useSuccessSubscription } from './Payment.service';

export const SuccessCheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { refetch } = usePackDetails(localStorage.getItem('accountId'));
  const toastError = useToastError();
  const [error, setError] = useState(false);
  const { isLoading: successLoading } = useSuccessSubscription(sessionId, {
    onError: (error) => {
      toastError({
        title: error.message,
      });
      setError(true);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { t } = useTranslation(['payment']);
  localStorage.setItem('packPremium', 'true');
  return (
    <Stack p="4" m="auto">
      {!successLoading && !error && (
        <ScaleFade initialScale={0.9} in>
          <Alert
            status="success"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="lg"
            px="8"
            py="4"
          >
            <Box fontSize="3rem">🎉</Box>
            {sessionId ? (
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {t('payment:successCheckout')}
              </AlertTitle>
            ) : (
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {t('payment:successCheckoutLaunch')}
              </AlertTitle>
            )}
          </Alert>
          <Center mt="8">
            <Button
              as={RouterLink}
              to="/admin/standard-contract/list-all"
              variant="link"
              color="#318ba2"
              _dark={{ color: 'brand.300' }}
            >
              {t('payment:goToDashboard')}
            </Button>
          </Center>
        </ScaleFade>
      )}
    </Stack>
  );
};
