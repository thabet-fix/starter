import React, { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { FieldSignature } from '@/components/FieldSignature';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { PublicTopBar } from '@/spa/layout';

import { TmContractForm } from './TmContractForm';
import { useCreatTmContract } from './tmContract.service';

export const PageTmContract = () => {
  const { t, i18n } = useTranslation(['common', 'tmContract', 'dashboard']);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const pageToken = params.get('pageToken');
  const pageId = params.get('pageId');
  const form = useForm();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const navigate = useNavigate();
  const { mutate: creatTmContract, isLoading: creatLoading } =
    useCreatTmContract({
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

  const submitTmContract = async (values: TODO) => {
    const newContract = {
      pageToken: pageToken,
      pageId: pageId,
      lang: i18n.language,
      ...values,
    };
    await creatTmContract(newContract);
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
      <Formiz id="account-form" onValidSubmit={submitTmContract} connect={form}>
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
            {/*  */}
            <Text as={'b'}> {t('tmContract:agentRepresentative.title')} </Text>
            <FieldInput
              name="buyerName"
              label={t('tmContract:agentRepresentative.Name')}
              required={t('common:use.required')}
            />
            <FieldSignature
              name="buyerSignature"
              label={t('tmContract:Signature')}
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
