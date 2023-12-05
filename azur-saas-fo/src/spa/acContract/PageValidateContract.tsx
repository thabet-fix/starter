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
import { AcContractForm } from './ContractForm';
import {
  useGetAcContractDetails,
  useValidateAcContract,
} from './acContract.service';

export const PageValidateContract = () => {
  const { t } = useTranslation(['common', 'acContract', 'dashboard']);
  const form = useForm();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const navigate = useNavigate();
  // get contract details
  const params = useParams();
  const contractId = params.contractId;
  const { contract, isLoading: detailsLoading } = useGetAcContractDetails({
    acContractId: contractId,
  });

  const { mutate: validateAcContract, isLoading: validateLoading } =
    useValidateAcContract(
      { acContractId: contractId },
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
  const [invalidForm, setInvalidForm] = useState(false);
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
            onValidSubmit={validateAcContract}
            connect={form}
            initialValues={{
              name: contract?.name,
              passportId: contract?.passportId,
              zipCode: contract?.zipCode,
              address: contract?.address,
              nationality: contract?.nationality,
              city: contract?.city,
              phoneNumber: contract?.phoneNumber,
              email: contract?.email,
              bank: contract?.bank,
              iban: contract?.iban,
              swift: contract?.swift,
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
                <AcContractForm />
                <Text as="b">Signature de représentant</Text>
                <Image src={contract?.buyerSignature} alt="signature" />
                <FieldSignature
                  name="companySignature"
                  label={t('acContract:Signature')}
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
