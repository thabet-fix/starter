import React, { useState } from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { useUser, useUserUpdate } from '@/spa/admin/users/users.service';
import { Loader, Page, PageContent, PageTopBar } from '@/spa/layout';

import { UserForm } from './UserForm';
import { UserStatus } from './UserStatus';

export const PageUserUpdate = () => {
  const { t } = useTranslation(['common', 'users']);

  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user,
    isLoading: userIsLoading,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useUser(id, { refetchOnWindowFocus: false, enabled: !!id });

  const form = useForm({ subscribe: false });

  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const { mutate: editUser, isLoading: editUserIsLoading } = useUserUpdate(id, {
    onError: (error) => {
      if (error.response) {
        const { title } = error.response.data;
        toastError({
          title: t('users:update.feedbacks.updateError.title'),
          description: title,
        });
        if (error.response.data?.email) {
          form.invalidateFields({
            email: t('users:data.email.alreadyUsed'),
          });
        }
        if (error.response.data?.firstName) {
          form.invalidateFields({
            firstName: t('users:data.firstname.required'),
          });
        }
        if (error.response.data?.lastName) {
          form.invalidateFields({
            lastName: t('users:data.lastname.required'),
          });
        }
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: t('users:update.feedbacks.updateSuccess.title'),
      });
      navigate(-1);
    },
  });
  const submitEditUser = (values: TODO) => {
    const userToSend = {
      id: user?.id,
      ...values,
    };
    editUser(userToSend);
  };
  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Page containerSize="md">
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <HStack spacing="4">
          <Box flex="1">
            {userIsLoading || userIsError ? (
              <SkeletonText maxW="6rem" noOfLines={2} />
            ) : (
              <Stack spacing="0">
                <Heading size="sm">
                  {user?.firstName} {user?.lastName}
                </Heading>
              </Stack>
            )}
          </Box>
          {!!user && (
            <Box>
              <UserStatus isActivated={user?.activated} />
            </Box>
          )}
        </HStack>
      </PageTopBar>
      {userIsFetching && <Loader />}
      {userIsError && !userIsFetching && <ErrorPage errorCode={404} />}
      {!userIsError && !userIsFetching && (
        <Formiz
          id="create-user-form"
          onValidSubmit={submitEditUser}
          connect={form}
          initialValues={user}
        >
          <form noValidate onSubmit={form.submit}>
            <PageContent>
              <UserForm isUpdatePage={true} />
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
                  isLoading={editUserIsLoading}
                  onClick={() => {
                    setInvalidForm(true);
                    setTimeout(() => {
                      setInvalidForm(false);
                    }, 100);
                  }}
                >
                  {t('users:update.action.save')}
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
