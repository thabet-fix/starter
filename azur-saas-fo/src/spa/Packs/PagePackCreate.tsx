import React, { useState } from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useEditorStore from '@/ZustandStores/FieldEditorStore';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { usePackCreate } from './Pack.service';
import { PackForm } from './PackForm';

export const PagePackCreate = () => {
  const { t } = useTranslation(['common', 'pack']);
  const navigate = useNavigate();
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: createPack, isLoading: createPackLoading } = usePackCreate({
    onError: (error) => {
      if (error.response) {
        toastError({
          title:
            (error?.response?.data as string) || t('common:use.errorOccurred'),
        });
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: t('pack:SuccessAdd'),
      });
      navigate('/admin/settings/pack');
    },
  });

  const editorValue = useEditorStore((state) => state.EditorValue);
  const submitCreatePack = async (values: TODO) => {
    const newPack = {
      description: editorValue,
      ...values,
    };
    await createPack(newPack);
  };
  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Page containerSize="md">
      <PageContent>
        <PageTopBar showBack onBack={() => navigate(-1)}>
          <Heading size="md"> {t('pack:AddPack')} </Heading>
        </PageTopBar>
        <Formiz
          id="create-user-form"
          onValidSubmit={submitCreatePack}
          connect={form}
        >
          <form noValidate onSubmit={form.submit}>
            <PackForm />

            <Stack bg={'white'} _dark={{ bg: 'blackAlpha.400' }} p={2} mt={5}>
              <ButtonGroup justifyContent="space-between">
                <Button onClick={() => navigate(-1)}>
                  {t('common:actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={createPackLoading}
                  onClick={() => {
                    setInvalidForm(true);
                    setTimeout(() => {
                      setInvalidForm(false);
                    }, 100);
                  }}
                >
                  {t('pack:Add')}
                </Button>
              </ButtonGroup>
              {invalidForm && <ScrollToFirstError />}
            </Stack>
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
