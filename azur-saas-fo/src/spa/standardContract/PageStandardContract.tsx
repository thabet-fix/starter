import React, { useEffect, useState } from 'react';

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
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FieldSignature } from '@/components/FieldSignature';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { PublicTopBar } from '@/spa/layout';

import { useAuthContext } from '../auth/AuthContext';
import { useTemplate } from '../contractTemplate/Template.service';
import { useCreatStandardContract } from './standardContract.service';
import { StandardContractForm } from './standardContractForm';

export const PageStandardContract = () => {
  const { t } = useTranslation(['common', 'sdContract', 'payment', 'template']);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const pageToken = params.get('pageToken');
  const paramsURL = useParams();
  const templateId = paramsURL.templateId;
  const pageId = params.get('pageId');
  const createdBy =
    params.get('createdBy') !== null
      ? params.get('createdBy')
      : localStorage.getItem('accountId');
  const form = useForm();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const navigate = useNavigate();

  const { template, isLoading: templateDetailsLoading } = useTemplate(
    templateId,
    {
      refetchOnWindowFocus: false,
      enabled: !!1,
    }
  );
  const { isAuthenticated } = useAuthContext();
  const { mutate: creatSdContract, isLoading: creatLoading } =
    useCreatStandardContract({
      onError: (error: TODO) => {
        if (error.response.status === 401) {
          toastError({
            title: t('common:use.toastError'),
          });
        } else {
          if (error.response.status === 402) {
            toastError({
              title: t('payment:SubscriptionExhausted'),
            });
          }
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('sdContract:SignedByPresenter'),
        });
        isAuthenticated
          ? navigate('/admin/standard-contract/list-all')
          : navigate('/standard-contract/sucess');
      },
    });

  const [langId, setLangId] = useState<string | number | undefined>();
  useEffect(() => {
    templateDetailsLoading
      ? setLangId(undefined)
      : setLangId(template?.contents[0]?.langId);
  }, [templateDetailsLoading, template]);

  const selectedLang = (id: string | number | undefined) => {
    setLangId(id);
  };
  const submitSdContract = async (values: TODO) => {
    const newContract = {
      pageToken: pageToken,
      pageId: pageId,
      templateId: templateId,
      createdBy: createdBy,
      langId: langId,
      ...values,
    };
    await creatSdContract(newContract);
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
      {!isAuthenticated && <PublicTopBar></PublicTopBar>}
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
      {!templateDetailsLoading && (
        <Formiz
          onValidSubmit={submitSdContract}
          connect={form}
          initialValues={{
            langId: template?.contents[0]?.language.id,
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
              <StandardContractForm
                templates={template}
                selectedLang={selectedLang}
              />
              <FieldSignature
                name="buyerSignature"
                label={
                  template?.labelSign1
                    ? template?.labelSign1
                    : t('template:SignatureEmployee')
                }
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
      )}
    </Flex>
  );
};
