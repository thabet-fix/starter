import React, { useState } from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import useEditorStore from '@/ZustandStores/FieldEditorStore';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { usePack, usePackUpdate } from './Pack.service';
import { PackForm } from './PackForm';

export const PagePackUpdate = () => {
  const { t } = useTranslation(['common', 'pack']);
  const { id } = useParams();
  const navigate = useNavigate();
  const { Pack, isLoading: PackDetailsLoading } = usePack(id, {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: updatePack, isLoading: updatePackLoading } = usePackUpdate(
    id,
    {
      onError: (error) => {
        if (error.response) {
          toastError({
            title:
              (error?.response?.data as string) ||
              t('common:use.errorOccurred'),
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('pack:SuccessUpdate'),
        });
        navigate('/admin/settings/pack');
      },
    }
  );

  const editorValue = useEditorStore((state) => state.EditorValue);
  const submitUpdatePack = async (values: TODO) => {
    const newPack = {
      description: editorValue,
      ...values,
    };
    await updatePack(newPack);
  };
  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Page containerSize="md">
      {!PackDetailsLoading && (
        <Formiz
          id="create-user-form"
          onValidSubmit={submitUpdatePack}
          connect={form}
          initialValues={{
            contractNb: Pack?.contractNb,
            description: Pack?.description,
            descriptionField: Pack?.description,
            id: Pack?.id,
            name: Pack?.name,
            optionAi: Pack?.optionAi.toString(),
            price: Pack?.price,
            period: Pack?.period,
            quotaAi: Pack?.quotaAi,
            stripeId: Pack?.stripeId,
          }}
        >
          <form noValidate onSubmit={form.submit}>
            <PageTopBar showBack onBack={() => navigate(-1)}>
              <Heading size="md"> {t('pack:UpdatePack')} </Heading>
            </PageTopBar>
            <PageContent>
              <PackForm />
              <Stack bg={'white'} _dark={{ bg: 'blackAlpha.400' }} p={2} mt={5}>
                <ButtonGroup justifyContent="space-between">
                  <Button onClick={() => navigate(-1)}>
                    {t('common:actions.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    variant="@primary"
                    isLoading={updatePackLoading}
                    onClick={() => {
                      setInvalidForm(true);
                      setTimeout(() => {
                        setInvalidForm(false);
                      }, 100);
                    }}
                  >
                    {t('pack:Edit')}
                  </Button>
                </ButtonGroup>
                {invalidForm && <ScrollToFirstError />}
              </Stack>
            </PageContent>
          </form>
        </Formiz>
      )}
    </Page>
  );
};
