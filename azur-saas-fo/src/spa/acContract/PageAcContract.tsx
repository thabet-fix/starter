import React, { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { FieldSignature } from '@/components/FieldSignature';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { PublicTopBar } from '@/spa/layout';

import { AcContractForm } from './ContractForm';
import { useCreatAcContract } from './acContract.service';

export const PageAcContract = () => {
  const { t, i18n } = useTranslation(['common', 'acContract', 'dashboard']);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const pageToken = params.get('pageToken');
  const pageId = params.get('pageId');
  const form = useForm();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const navigate = useNavigate();
  const { mutate: creatAcContract, isLoading: creatLoading } =
    useCreatAcContract({
      onError: (error: TODO) => {
        if (error.response.status === 401) {
          toastError({
            title: t('common:use.toastError'),
          });
        } else {
          toastError({
            title: error.message,
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: 'Contrat signé par le présentateur',
        });
        navigate(-1);
      },
    });

  const submitAcContract = async (values: TODO) => {
    const newContract = {
      lang: i18n.language,
      pageToken: pageToken,
      pageId: pageId,
      ...values,
    };
    await creatAcContract(newContract);
  };
  const [invalidForm, setInvalidForm] = useState(false);
  return (
    <Flex
      direction="column"
      flex="1"
      w="full"
      px="6"
      mx="auto"
      maxW={{
        sm: '60ch',
        md: '80ch',
        lg: '100ch',
        xl: '140ch',
      }}
    >
      <PublicTopBar></PublicTopBar>
      <LinkBox bg={'white'} mt={4} mb={4}>
        <LinkOverlay as={Link} to={'/select-argrement-type'} ms={0}>
          <IconButton
            aria-label="Go Back"
            icon={<FiArrowLeft />}
            variant="ghost"
            onClick={() => navigate(-1)}
          />
        </LinkOverlay>
        <Box flex="1" as="b">
          {t('common:use.goBack')}
        </Box>
      </LinkBox>
      <Formiz onValidSubmit={submitAcContract} connect={form}>
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
            <FieldSignature
              name="buyerSignature"
              label={t('acContract:Signature')}
              required={t('common:use.required')}
            />
            <Flex>
              <Button
                type="submit"
                variant="@primary"
                ms="auto"
                isLoading={creatLoading}
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
    </Flex>
  );
};
