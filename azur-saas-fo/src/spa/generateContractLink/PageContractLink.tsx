import React, { useState } from 'react';

import { Button, ButtonGroup, HStack, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMaxLength, isMinLength } from '@formiz/validations';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import { useToastError, useToastSuccess } from '@/components/Toast';

import { useTemplateList } from '../contractTemplate/Template.service';
import { Page, PageContent, PageTopBar } from '../layout';
import { useSendContractLink } from './generateLink.service';

export const PageCoontractLink = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'account', 'payment', 'sdContract']);
  const { TemplateList } = useTemplateList();
  const templateOptions: TODO = [];
  TemplateList?.data.map((value) =>
    templateOptions.push({ label: value.name, value: value.id })
  );
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const form = useForm();
  const { mutate: submitLinkForm, isLoading: invitationLoading } =
    useSendContractLink({
      onError: (error: TODO) => {
        if (error.response.status === 402) {
          toastError({
            title: t('payment:SubscriptionExhausted'),
          });
        } else
          toastError({
            title: error.message,
          });
      },
      onSuccess: () => {
        toastSuccess({
          title: 'Mail envoyé avec succès ',
        });
        navigate(-1);
      },
    });
  const [templateName, setTemplateName] = useState('');
  const submitForm = async (values: TODO) => {
    const newLink = {
      templateName: templateName,
      ...values,
    };
    await submitLinkForm(newLink);
  };

  const findTemplateById = (selectedId: number | string) => {
    return TemplateList?.data.find((template) => template.id === selectedId);
  };

  return (
    <Page>
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('sdContract:SendInvitation')}</Heading>
          </HStack>
        </PageTopBar>
        <Formiz onValidSubmit={submitForm} connect={form}>
          <form noValidate onSubmit={form.submit}>
            <Stack
              direction="column"
              p="6"
              borderRadius="lg"
              spacing="6"
              shadow="md"
              bg="white"
              _dark={{ bg: 'blackAlpha.400' }}
            >
              <FieldInput
                name="clientEmail"
                label="Email"
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
              <FieldSelect
                name="templateId"
                label={t('sdContract:ContractType')}
                options={templateOptions}
                required={t('common:use.required')}
                onChange={(value) => {
                  const selectedTemplate = findTemplateById(value);
                  selectedTemplate !== undefined
                    ? setTemplateName(selectedTemplate.name)
                    : setTemplateName('');
                }}
              />
            </Stack>
            <Stack
              bg="white"
              _dark={{ bg: 'blackAlpha.400' }}
              spacing="6"
              mt="8"
              p={4}
            >
              <ButtonGroup justifyContent="space-between">
                <Button onClick={() => navigate(-1)} variant="@primary">
                  {t('common:actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={invitationLoading}
                >
                  {t('common:actions.send')}
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
