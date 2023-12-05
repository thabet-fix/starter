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

import { FieldInput } from '@/components/FieldInput';
import { FieldSignature } from '@/components/FieldSignature';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

import { TemplateContratNav } from '../admin/TemplateContratNav';
import { TmContractForm } from './TmContractForm';
import {
  useGetTmContractDetails,
  useValidateTmContract,
} from './tmContract.service';

export const PageValidateTmContract = () => {
  const { t } = useTranslation(['common', 'tmContract', 'dashboard']);
  const form = useForm();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const navigate = useNavigate();
  const [invalidForm, setInvalidForm] = useState(false);

  // get contract details
  const params = useParams();
  const contractId = params.contractId;
  const { contract, isLoading: detailsLoading } = useGetTmContractDetails({
    tmContractId: contractId,
  });

  const { mutate: validateTmContract, isLoading: validateLoading } =
    useValidateTmContract(
      { tmContractId: contractId },
      {
        onError: (error: TODO) => {
          toastError({
            title: error.message,
          });
        },
        onSuccess: () => {
          toastSuccess({
            title: "Contrat signé par l'admin",
          });
          navigate(-1);
        },
      }
    );

  return (
    <Page containerSize="xl" nav={<TemplateContratNav />}>
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{'Valider le contrat'}</Heading>
          </HStack>
        </PageTopBar>
        {!detailsLoading && (
          <Formiz
            id="account-form"
            onValidSubmit={validateTmContract}
            connect={form}
            initialValues={{
              companyRepresentative: contract?.companyRepresentative,
              companyEmail: contract?.companyEmail,
              companyPhone: contract?.companyPhone,
              representativeFirstName: contract?.representativeFirstName,
              representativeLastName: contract?.representativeLastName,
              representativeAddress: contract?.representativeAddress,
              designation: contract?.designation,
              manifacturer: contract?.manifacturer,
              price: contract?.price,
              commision: contract?.commision,
              deliveryAddress: contract?.deliveryAddress,
              buyerName: contract?.buyerName,
              buyerSignature: contract?.buyerSignature,
              companySignature: contract?.companySignature,
              companyName: contract?.companyName,
            }}
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
                <TmContractForm />
                <Text as={'b'}>
                  {' '}
                  {t('tmContract:agentRepresentative.title')}{' '}
                </Text>
                <FieldInput
                  name="buyerName"
                  label={t('tmContract:agentRepresentative.Name')}
                  required={t('common:use.required')}
                />
                <Text>{t('tmContract:Signature')}</Text>
                <Image src={contract?.buyerSignature} alt="signature" />
                <Text as={'b'}>
                  {t('tmContract:ownerCompany.ownerCompany')}
                </Text>
                <FieldInput
                  name="companyName"
                  label={t('tmContract:agentRepresentative.Name')}
                  required={t('common:use.required')}
                />
                <FieldSignature
                  name="companySignature"
                  label={t('tmContract:Signature')}
                  required={t('common:use.required')}
                />
                <Text>{t('tmContract:ownerCompany.Name')}</Text>
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
