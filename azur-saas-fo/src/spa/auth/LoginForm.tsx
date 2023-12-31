import React from 'react';

import {
  Alert,
  AlertDescription,
  Box,
  BoxProps,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { useToastError } from '@/components/Toast';
import { useLogin } from '@/spa/auth/auth.service';

const MockedApiHint = () => {
  const { t } = useTranslation(['auth']);
  const form = useForm({ subscribe: 'form' });
  const mockedUsername = 'admin';
  const mockedPassword = 'admin';

  if (process.env.NEXT_PUBLIC_API_BASE_URL) return null;

  return (
    <Alert mt="4" borderRadius="md" textAlign="center" colorScheme="brand">
      <AlertDescription>
        <Trans
          t={t}
          i18nKey="auth:mockedApi.loginHint"
          values={{ credentials: `${mockedUsername}/${mockedPassword}` }}
          components={{
            button: (
              <Button
                variant="link"
                color="inherit"
                onClick={() =>
                  form.setFieldsValues({
                    username: mockedUsername,
                    password: mockedPassword,
                  })
                }
              />
            ),
          }}
        />
      </AlertDescription>
    </Alert>
  );
};

type LoginFormProps = BoxProps & { onSuccess: () => void };

export const LoginForm = ({
  onSuccess = () => undefined,
  ...rest
}: LoginFormProps) => {
  const { t } = useTranslation(['auth']);
  const form = useForm({ subscribe: 'form' });
  const toastError = useToastError();

  const { mutate: login, isLoading } = useLogin({
    onSuccess,
    onError: (error) => {
      toastError({
        title: t('auth:login.feedbacks.loginError.title'),
        description: error?.response?.data?.title,
      });
    },
  });

  return (
    <Box {...rest}>
      <Formiz id="login-form" autoForm onValidSubmit={login} connect={form}>
        <Stack spacing="4">
          <FieldInput
            name="email"
            label={t('auth:data.email.label')}
            required={t('auth:data.email.required') as string}
          />
          <FieldInput
            name="password"
            type="password"
            label={t('auth:data.password.label')}
            required={t('auth:data.password.required') as string}
          />
          <Flex>
            <Button
              as={RouterLink}
              to="/account/reset"
              size="sm"
              variant="link"
              whiteSpace="initial"
            >
              {t('auth:login.actions.forgotPassword')}
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={form.isSubmitted && !form.isValid}
              type="submit"
              variant="@primary"
              ms="auto"
            >
              {t('auth:login.actions.login')}
            </Button>
          </Flex>

          <MockedApiHint />
        </Stack>
      </Formiz>
    </Box>
  );
};
