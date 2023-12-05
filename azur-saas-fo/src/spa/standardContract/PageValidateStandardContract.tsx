import React, { useState } from 'react';

import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { FieldSignature } from '@/components/FieldSignature';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { TemplateContratNav } from '../admin/TemplateContratNav';
import { useTemplate } from '../contractTemplate/Template.service';
import {
  useGetStandardContractDetails,
  useValidateStandardContract,
} from './standardContract.service';
import { SdField } from './standardContract.type';
import { StandardContractForm } from './standardContractForm';

export const PageValidateStandardContract = () => {
  const { t } = useTranslation([
    'common',
    'sdContract',
    'dashboard',
    'template',
  ]);
  const form = useForm();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const navigate = useNavigate();
  // get contract details
  const params = useParams();
  const contractId = params.contractId;
  const { contract, isLoading: detailsLoading } = useGetStandardContractDetails(
    {
      standardContractId: contractId,
    }
  );

  const { template, isLoading: templateDetailsLoading } = useTemplate(
    contract?.templateId,
    {
      refetchOnWindowFocus: false,
      enabled: contract !== undefined,
    }
  );
  const { mutate: validateAcContract, isLoading: validateLoading } =
    useValidateStandardContract(
      { standardContractId: contractId },
      {
        onError: (error: TODO) => {
          toastError({
            title: error.message,
          });
        },
        onSuccess: () => {
          toastSuccess({
            title: t('sdContract:SignedByAdmin'),
          });
          navigate(-1);
        },
      }
    );
  const [invalidForm, setInvalidForm] = useState(false);
  // initial value
  const initialValue: TODO = { langId: template?.contents?.[0]?.language?.id };
  contract?.fields?.forEach((field: SdField) => {
    initialValue[field.field] = field.value;
  });

  return (
    <Page containerSize="xl" nav={<TemplateContratNav />}>
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('sdContract:ValidateContract')}</Heading>
          </HStack>
        </PageTopBar>
        {!detailsLoading && !templateDetailsLoading && (
          <Formiz
            id="account-form"
            onValidSubmit={validateAcContract}
            connect={form}
            initialValues={initialValue}
          >
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
                <StandardContractForm templates={template} />
                <Text as="b">
                  {template?.labelSign1
                    ? template?.labelSign1
                    : t('template:SignatureEmployee')}
                </Text>
                <Image src={contract?.buyerSignature} alt="signature" />
                <FieldSignature
                  name="companySignature"
                  label={
                    template?.labelSign2
                      ? template?.labelSign2
                      : t('template:SignatuerEmployer')
                  }
                  required={t('common:use.required')}
                />

                <Flex>
                  <Button
                    type="submit"
                    variant="@primary"
                    ms="auto"
                    isLoading={validateLoading}
                    onClick={() => {
                      setInvalidForm(true);
                      setTimeout(() => {
                        setInvalidForm(false);
                      }, 100);
                    }}
                  >
                    {t('common:actions.save')}
                  </Button>
                  {invalidForm && <ScrollToFirstError />}
                </Flex>
              </Stack>
            </form>
          </Formiz>
        )}
      </PageContent>
    </Page>
  );
};
