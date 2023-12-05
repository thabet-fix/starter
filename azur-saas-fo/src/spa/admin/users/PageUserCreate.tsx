import React, { useState } from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { UserForm } from '@/spa/admin/users/UserForm';
import { useUserCreate } from '@/spa/admin/users/users.service';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

export const PageUserCreate = () => {
  const { t } = useTranslation(['common', 'users']);
  const navigate = useNavigate();
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: createUser, isLoading: createUserLoading } = useUserCreate({
    onError: (error) => {
      if (error.response) {
        const { title } = error.response.data;
        toastError({
          title: t('users:create.feedbacks.updateError.title'),
          description: title,
        });
        if (error.response.data?.email) {
          form.invalidateFields({
            email: t('users:data.email.alreadyUsed'),
          });
        }
        if (error.response.data?.firstName) {
          form.invalidateFields({
            firstName: 'Le champ Prénom est requis',
          });
        }
        if (error.response.data?.lastName) {
          form.invalidateFields({
            lastName: 'Le champ Nom est requis',
          });
        }
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: t('users:create.feedbacks.updateSuccess.title'),
      });
      navigate('/admin/settings/users');
    },
  });

  const submitCreateUser = async (values: TODO) => {
    const newUser = {
      ...values,
    };
    await createUser(newUser);
  };
  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Page containerSize="md">
      <Formiz
        id="create-user-form"
        onValidSubmit={submitCreateUser}
        connect={form}
      >
        <form noValidate onSubmit={form.submit}>
          <PageTopBar showBack onBack={() => navigate(-1)}>
            <Heading size="md">{t('users:addManager')}</Heading>
          </PageTopBar>
          <PageContent>
            <UserForm isUpdatePage={false} />
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
                isLoading={createUserLoading}
                onClick={() => {
                  setInvalidForm(true);
                  setTimeout(() => {
                    setInvalidForm(false);
                  }, 100);
                }}
              >
                {t('users:createManager')}
              </Button>
            </ButtonGroup>
            {invalidForm && <ScrollToFirstError />}
          </PageContent>
        </form>
      </Formiz>
    </Page>
  );
};
