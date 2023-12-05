import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  ScaleFade,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMaxLength, isMinLength } from '@formiz/validations';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { SlideIn } from '@/components/SlideIn';
import { useToastError } from '@/components/Toast';
import { useCreateAccount } from '@/spa/account/account.service';

export const PageRegister = () => {
  const { t, i18n } = useTranslation(['common', 'account', 'users']);
  const form = useForm({
    subscribe: { form: true, fields: ['langKey'] },
  });
  const toastError = useToastError();
  const [accountEmail, setAccountEmail] = useState('');
  const [invalidForm, setInvalidForm] = useState(false);
  // Change language based on form
  useEffect(() => {
    i18n.changeLanguage(form.values?.langKey);
  }, [i18n, form.values?.langKey]);

  const {
    mutate: createUser,
    isLoading,
    isSuccess,
  } = useCreateAccount({
    onMutate: ({ email }) => {
      setAccountEmail(email);
    },
    onError: (error) => {
      if (error.response) {
        const { title } = error?.response?.data || {};
        toastError({
          title: t('account:register.feedbacks.registrationError.title'),
          description: title,
        });

        if (error.response.data?.email) {
          form.invalidateFields({
            email: t('users:data.email.alreadyUsed'),
          });
        }
        if (error.response.data?.denomination) {
          form.invalidateFields({
            denomination: t('users:data.denomination.alreadyUsed'),
          });
        }
      }
    },
  });

  if (isSuccess) {
    return (
      <Center p="4" m="auto">
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
              {t('account:register.feedbacks.registrationSuccess.title')}
            </AlertTitle>
            <AlertDescription>
              <Trans
                t={t}
                i18nKey="account:register.feedbacks.registrationSuccess.description"
                values={{ email: accountEmail }}
              />
            </AlertDescription>
          </Alert>
          <Center mt="8">
            <Button
              as={RouterLink}
              to="/login"
              variant="link"
              color="brand.500"
              _dark={{ color: 'brand.300' }}
            >
              {t('account:register.actions.goToLogin')}
            </Button>
          </Center>
        </ScaleFade>
      </Center>
    );
  }

  return (
    <SlideIn>
      <Box p="2" pb="4rem" w="22rem" maxW="full" m="auto">
        <Formiz
          id="register-form"
          autoForm
          onValidSubmit={createUser}
          connect={form}
        >
          <Box
            p="6"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            _dark={{ bg: 'blackAlpha.400' }}
          >
            <Heading size="lg" mb="4">
              {t('account:register.title')}
            </Heading>
            <Stack spacing="4">
              <FieldSelect
                name="langKey"
                label={t('account:data.language.label')}
                options={[
                  {
                    label: t(`common:languages.FR`),
                    value: 'FR',
                  },
                  {
                    label: t(`common:languages.en`),
                    value: 'en',
                  },
                ]}
                defaultValue={i18n.language}
              />
              <FieldInput
                name="firstName"
                label={t('account:data.firstname.label')}
                required={t('account:data.firstname.required') as string}
              />
              <FieldInput
                name="lastName"
                label={t('account:data.lastname.label')}
                required={t('account:data.lastname.required') as string}
              />
              <FieldInput
                name="denomination"
                label={t('account:data.denomination.label')}
                required={'Champ obligatoire' as string}
              />

              <FieldInput
                name="email"
                label={t('account:data.email.label')}
                required={t('account:data.email.required') as string}
                validations={[
                  {
                    rule: isEmail(),
                    message: t('account:data.email.invalid'),
                  },
                  {
                    rule: isMinLength(5),
                    message: t('account:data.email.tooShort', { min: 5 }),
                  },
                  {
                    rule: isMaxLength(254),
                    message: t('account:data.email.tooLong', { min: 254 }),
                  },
                ]}
              />
              <FieldInput
                name="password"
                type="password"
                label={t('account:data.password.label')}
                required={t('account:data.password.required') as string}
                validations={[
                  {
                    rule: isMinLength(4),
                    message: t('account:data.password.tooShort', { min: 4 }),
                  },
                  {
                    rule: isMaxLength(50),
                    message: t('account:data.password.tooLong', { min: 50 }),
                  },
                ]}
              />
              <FieldInput
                name="phoneNumber"
                label={t('account:data.phoneNumber.label')}
              />
              <Flex>
                <Button
                  isLoading={isLoading}
                  isDisabled={form.isSubmitted && !form.isValid}
                  type="submit"
                  variant="@primary"
                  ms="auto"
                  onClick={() => {
                    setInvalidForm(true);
                    setTimeout(() => {
                      setInvalidForm(false);
                    }, 100);
                  }}
                >
                  {t('account:register.actions.create')}
                </Button>
              </Flex>
              {invalidForm && <ScrollToFirstError />}
            </Stack>
          </Box>
          <Center mt="8">
            <Button
              as={RouterLink}
              to="/login"
              variant="link"
              display={'flex'}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              {t('account:register.actions.alreadyHaveAnAccount')}{' '}
              <Box
                as="strong"
                ms="2"
                color="brand.500"
                _dark={{ color: 'brand.300' }}
              >
                {t('account:register.actions.login')}
              </Box>
            </Button>
          </Center>
        </Formiz>
      </Box>
    </SlideIn>
  );
};
