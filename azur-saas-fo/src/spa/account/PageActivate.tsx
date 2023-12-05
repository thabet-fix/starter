import React, { useEffect } from 'react';

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
import { Link as RouterLink, useParams } from 'react-router-dom';

import { useFirstAccountActivation } from './account.service';

export const PageActivate = () => {
  const { t } = useTranslation(['account']);
  const {
    mutate: activateAccount,
    isError,
    isSuccess,
  } = useFirstAccountActivation();

  const params = useParams();
  const key = params.key;

  useEffect(() => {
    activateAccount(!!key ? `${key}` : 'KEY_NOT_DEFINED');
  }, [activateAccount, key]);

  return (
    <Box p="4" maxW="20rem" m="auto">
      {isSuccess && (
        <Stack p="4" m="auto">
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
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {t('account:activate.feedbacks.activationSuccess.title')}
              </AlertTitle>
            </Alert>
            <Center mt="8">
              <Button
                as={RouterLink}
                to="/login"
                variant="link"
                color="#318ba2"
                _dark={{ color: 'brand.300' }}
              >
                {t('account:register.actions.goToLogin')}
              </Button>
            </Center>
          </ScaleFade>
        </Stack>
      )}
      {isError && (
        <Stack p="4" m="auto">
          <ScaleFade initialScale={0.9} in>
            <Alert
              status="error"
              variant="solid"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="lg"
              px="8"
              py="4"
            >
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {t('account:activate.feedbacks.activationError.title')}
              </AlertTitle>
            </Alert>
          </ScaleFade>
        </Stack>
      )}
    </Box>
  );
};
