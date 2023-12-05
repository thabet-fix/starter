import React, { FC, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiExpand } from 'react-icons/bi';
import { FaSignature } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

import { FieldEditor } from '@/components/FieldEditor';
import { FieldInput } from '@/components/FieldInput';
import { FieldMultiSelect } from '@/components/FieldMultiSelect';
import { FieldSelect } from '@/components/FieldSelect';
import { FieldSignature } from '@/components/FieldSignature';
import { FieldTextarea } from '@/components/FieldTextarea';
import { useToastError } from '@/components/Toast';

import { useConfiguration } from '../Configuration/Configuration.service';
import { usePackDetails } from '../Packs/Pack.service';
import { useStripeUrlForToken } from '../Paiement/Payment.service';
import { useAccount } from '../account/account.service';
import { useContextList } from '../aiContext/AiContext.service';
import { Context } from '../aiContext/AiContext.type';
import { useLanguageList } from '../language/Language.service';
import { Language } from '../language/Language.type';
import { useContentRemove, useGenerateAi } from './Template.service';
import { Content, Template } from './Template.type';

interface templateFormProps {
  templates?: Template | undefined;
  onLanguageChange: (newContent: boolean) => void | undefined;
}

export const TemplateForm: FC<templateFormProps> = ({
  templates,
  onLanguageChange,
}) => {
  const { t } = useTranslation(['common', 'template']);

  const { id } = useParams();

  const { LanguageList, isLoading: languageListLoading } = useLanguageList();

  const [languagesByTemplateState, setLanguagesByTemplateState] = useState<
    { label: string; value: number | string }[]
  >([]);
  const [updatedLanguageNotUsedYetState, setUpdatedLanguageNotUsedYetState] =
    useState<{ label: string; value: number | string }[]>([]);

  useEffect(() => {
    if (LanguageList && templates?.contents) {
      const languagesOptions = LanguageList?.data.map((value: Language) => ({
        label: value.name,
        value: value.id,
      }));

      const languagesByTemplateOptions: TODO = [];
      templates?.contents.map((value: TODO) => {
        if (value.language) {
          languagesByTemplateOptions.push({
            label: value.language.name,
            value: value.language.id,
          });
        }
      });

      const LanguageNotUsedYetOptions = languagesOptions?.filter(function (
        item
      ) {
        return !languagesByTemplateOptions?.some(
          (templateItem: TODO) => templateItem.label === item.label
        );
      });

      const updatedLanguageNotUsedYetOptions = LanguageNotUsedYetOptions?.map(
        (option: TODO) => {
          return { ...option, label: `Ajouter '${option.label}'` };
        }
      );
      setLanguagesByTemplateState(languagesByTemplateOptions);
      setUpdatedLanguageNotUsedYetState(updatedLanguageNotUsedYetOptions);
    }
  }, [LanguageList, templates?.contents]);
  const findContentByLangId = (
    contentTemplate: Content[],
    selectedLanguage: number | string
  ) => {
    return contentTemplate.find(
      (content) => content.langId === selectedLanguage
    );
  };

  const [defaultHtmlValue, setDefaultHtmlValue] = useState('');

  const [htmlValue, setHtmlValue] = useState(' ');

  useEffect(() => {
    if (languagesByTemplateState && languagesByTemplateState[0]) {
      const defaultContent = findContentByLangId(
        templates?.contents || [],
        languagesByTemplateState[0].value
      );
      defaultContent !== undefined
        ? setDefaultHtmlValue(defaultContent.content)
        : setDefaultHtmlValue('');
    }
  }, [templates?.contents, languagesByTemplateState]);

  useEffect(() => {
    setHtmlValue(defaultHtmlValue);
  }, [defaultHtmlValue]);

  const [isNewContent, setIsNewContent] = useState(false);
  const { values } = useForm();

  values.isNewContent = isNewContent;

  const {
    isOpen: isEnableOpen,
    onOpen: onEnableOpen,
    onClose: onEnableClose,
  } = useDisclosure();

  const {
    isOpen: isEnableOpenToken,
    onOpen: onEnableOpenToken,
    onClose: onEnableCloseToken,
  } = useDisclosure();

  const { mutate: ContentRemove } = useContentRemove(id, {
    onSuccess: async () => {
      onEnableClose();
    },
  });

  const removeContent = () => {
    const contentToDelete = {
      templateId: id,
      ...values,
    };
    ContentRemove(contentToDelete);
  };

  const { mutate: GenerateAi, isLoading: isLoadingGeneratedAi } = useGenerateAi(
    {
      onSuccess: async (data) => {
        setHtmlValue(data.result);
      },
    }
  );

  const { ContextList, isLoading: contextLoading } = useContextList(); // get ai context list
  // dictionary field of the first context
  const [fieldsOptions, setFieldsOptions] = useState(
    ContextList?.data[0]?.fields
  );
  // context option list for the select input
  const contextOptions = ContextList?.data.map((value: Context) => ({
    label: value.name,
    value: value.id,
  }));

  const findContextById = (selectedId: number | string) => {
    return ContextList?.data.find((context) => context.id === selectedId);
  };

  const onGenerateAi = () => {
    const selectedLangId = values.langId;

    const languageName =
      LanguageList?.data.find((lang) => lang.id === selectedLangId)?.name || '';

    const contentToGenerate: TODO = {
      contextId: values.contextId,
      fields: values.fields,
      contentToGenerate: `${values.contentToGenerate} en ${languageName}`,
    };
    GenerateAi(contentToGenerate);
  };
  const { account } = useAccount();
  const employerId =
    account?.employerId != null ? account?.employerId : account?.id;

  const { PackDetails, isLoading: detailsLoading } = usePackDetails(
    employerId,
    { refetchInterval: 5000 }
  );

  const toastError = useToastError();

  const { configuration } = useConfiguration();

  const { mutate: stripeUrl } = useStripeUrlForToken({
    onSuccess: (url) => {
      Object.keys(url).length !== 0 ? window.open(url, '_blank') : null;
    },
    onError: () => {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    },
  });

  const getStripeUrl = async () => {
    const data = {
      tokenPrice: configuration?.tokenPriceExtra,
      tokenNbr: configuration?.tokenQuotaExtra,
    };
    try {
      await stripeUrl(data);
    } catch (error) {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    }
  };

  const [isPdfOverview, setPdfOverview] = useState(false);

  const togglePdfOverview = () => {
    setPdfOverview(!isPdfOverview);
  };

  const [editorContent, setEditorContent] = useState<string[]>([]);

  useEffect(() => {
    const template = htmlValue;
    const newWords = template.split('@');
    setEditorContent(newWords);
  }, [templates, htmlValue]);

  const generatedTemplate =
    editorContent.length > 0
      ? editorContent.map((word, index) => {
          if (!isPdfOverview) {
            // Affichage Aperçu forumlaire
            if (word.includes('[')) {
              // Replace with FieldInput component

              const underIndex = word.indexOf('[');
              const lessThanIndex = word.indexOf(']', underIndex);
              const wordName = word.substring(underIndex + 1, lessThanIndex);
              return (
                <React.Fragment key={index}>
                  <Input required={false} name={wordName} />
                </React.Fragment>
              );
            } else {
              return (
                <span
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html:
                      index !== editorContent.length - 1 ? word + ' ' : word,
                  }}
                />
              );
            }
          } else {
            // Affichage aperçu PDF
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html:
                    index !== editorContent.length - 1 ? word + ' ' : word,
                }}
              />
            );
          }
        })
      : null;

  const handleEditorContentChange = (content: string) => {
    const newWords = content.split('@');
    setEditorContent(newWords);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const scaleValue = isExpanded ? '1' : '0.7';
  const widthValueCol1 = isExpanded ? '50%' : '65%';
  const widthValueCol2 = isExpanded ? '50%' : '35%';

  return (
    <Flex
      direction={['column', 'column', 'column', 'column', 'row']}
      alignItems="flex-start"
    >
      <Stack
        width={['100%', '100%', '100%', '100%', widthValueCol1]}
        mr={[0, 0, 0, 0, 4]}
        maxHeight={['none', 'none', 'none', 'none', 'calc(100vh - 5px)']}
        overflowY={['visible', 'visible', 'visible', 'visible', 'auto']}
        direction="column"
        borderRadius="lg"
        spacing="6"
        shadow="md"
        bg="white"
        _dark={{ bg: 'gray.900' }}
        p="6"
        mb={{ base: '6', sm: '20' }}
      >
        <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
          <FieldInput
            name="name"
            required={t('common:use.required')}
            label={t('template:Form.Name')}
          />
          {!languageListLoading &&
            (languagesByTemplateState.length > 0 ||
              updatedLanguageNotUsedYetState.length > 0) && (
              <FieldSelect
                name="langId"
                label={t('template:Form.ChooseLanguage')}
                options={[
                  ...(languagesByTemplateState || []),
                  ...(updatedLanguageNotUsedYetState || []),
                ]}
                defaultValue={
                  languagesByTemplateState.length > 0
                    ? languagesByTemplateState[0]?.value
                    : undefined
                }
                required={t('common:use.required')}
                onChange={(v) => {
                  const selectedContent = findContentByLangId(
                    templates?.contents || [],
                    v
                  );
                  if (selectedContent !== undefined) {
                    setHtmlValue(selectedContent.content);
                    setIsNewContent(false);
                    onLanguageChange(false);
                  } else {
                    setHtmlValue(' ');
                    setIsNewContent(true);
                    onLanguageChange(true);
                  }
                }}
              />
            )}
        </Stack>
        <Stack>
          <Card
            padding={3}
            overflow="hidden"
            variant="outline"
            transition="background-color 0.2s"
            _hover={{
              bg: 'gray.50',
            }}
          >
            <Heading size="sm" paddingBottom={6}>
              {t('template:Form.GenerateWithAi')}{' '}
            </Heading>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
              {!contextLoading && (
                <FieldSelect
                  name="contextId"
                  label={t('template:Form.ChooseContext')}
                  options={contextOptions}
                  onChange={(v) => {
                    const selectedContext = findContextById(v);
                    setFieldsOptions(selectedContext?.fields);
                  }}
                />
              )}
              <FieldMultiSelect
                name="fields"
                label={t('template:Form.UseFields')}
                // defaultValue={fieldsOptions?.value}
                options={fieldsOptions}
                selectProps={{ isCreatable: true }}
              />
            </Stack>
            <Stack spacing="6">
              <FieldTextarea
                marginTop={3}
                defaultValue={t('template:contentToGenerate.defaultValue')}
                name="contentToGenerate"
                label={t('template:contentToGenerate.label')}
                placeholder={t('template:contentToGenerate.placeholder')}
              />

              {!detailsLoading && PackDetails && PackDetails.optionAi ? (
                PackDetails.quotaAi > 1000 ? (
                  <Button
                    size="xs"
                    onClick={onGenerateAi}
                    isLoading={isLoadingGeneratedAi}
                    loadingText={t('template:TakeFewMoments')}
                    colorScheme="blue"
                  >
                    {t('template:Generate')}
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    onClick={() => {
                      onEnableOpenToken();
                    }}
                  >
                    {t('template:ExhaustedWords')}
                  </Button>
                )
              ) : (
                <Button
                  size="xs"
                  isLoading={isLoadingGeneratedAi}
                  loadingText={t('template:TakeFewMoments')}
                  as={Link}
                  to={'/admin/settings/payment'}
                >
                  {t('template:PassToPremium')}
                </Button>
              )}
            </Stack>
          </Card>
        </Stack>
        <Box position="relative">
          <Flex align="center">
            <FieldEditor
              name="content"
              label={
                <Tooltip
                  label={t('template:AddCustomizableInput')}
                  fontSize="sm"
                  placement="top-start"
                  ml={2}
                >
                  {t('template:TempalteContent')}
                </Tooltip>
              }
              required={t('common:use.required')}
              initialHtml={htmlValue}
              setEditorContent={handleEditorContentChange}
            />
          </Flex>

          {htmlValue && (
            <Tooltip
              placement="top"
              label={t('template:DeleteLangContent')}
              fontSize="sm"
            >
              <IconButton
                icon={<AiOutlineCloseCircle size={24} />}
                _hover={{
                  color: 'red',
                }}
                _focus={{
                  color: 'red',
                  bg: 'transparent',
                }}
                bg="transparent"
                position="absolute"
                top="0"
                right="0"
                size="xs"
                aria-label={t('template:DeleteLangContent')}
                onClick={() => {
                  onEnableOpen();
                }}
              />
            </Tooltip>
          )}
          <Stack mt="6" direction={{ base: 'column', sm: 'row' }} spacing="6">
            <FieldInput
              name="labelSign1"
              label={t('template:Form.LabelSign1')}
              placeholder={t('template:Form.PlaceHolderSign1')}
            />
            <FieldInput
              name="labelSign2"
              label={t('template:Form.LabelSign2')}
              placeholder={t('template:Form.PlaceHolderSign2')}
            />
          </Stack>
        </Box>
        {/* modals */}
        {htmlValue && (
          <>
            <Modal isOpen={isEnableOpen} onClose={onEnableClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t('template:Modal.ConfirmDelete')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text></Text>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onEnableClose}>
                    {t('template:Modal.Cancel')}
                  </Button>
                  <Button
                    variant="@primary"
                    onClick={() => {
                      removeContent();
                      setHtmlValue(' ');
                      setIsNewContent(true);
                      onLanguageChange(true);
                    }}
                  >
                    {t('template:Modal.Delete')}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={isEnableOpenToken} onClose={onEnableCloseToken}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t('template:Modal.ConfirmBuy')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    {t('template:Modal.WantToBuy')}{' '}
                    {configuration?.tokenQuotaExtra}{' '}
                    {t('template:Modal.Tokens')}{' '}
                    {configuration?.tokenPriceExtra}€ ?
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onEnableCloseToken}>
                    {t('template:Modal.Cancel')}
                  </Button>
                  <Button variant="@primary" onClick={() => getStripeUrl()}>
                    {t('template:Modal.Confirm')}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Stack>
      {/* template preview */}
      <Stack
        width={['100%', '100%', '100%', '100%', widthValueCol2]}
        mr={[0, 0, 0, 0, 4]}
        direction="column"
        position="relative"
        mb="20"
      >
        <Stack
          mb="5"
          borderRadius="lg"
          bg={'white'}
          shadow="md"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '60px',
          }}
        >
          <Heading
            size="xs"
            onClick={togglePdfOverview}
            style={{ cursor: 'pointer' }}
          >
            {isPdfOverview ? (
              <span>{t('template:preview.FormPreview')}</span>
            ) : (
              <span>{t('template:preview.PdfPreview')}</span>
            )}
          </Heading>
          <BiExpand
            size={24}
            onClick={toggleExpansion}
            style={{ cursor: 'pointer' }}
          />
        </Stack>
        <Stack
          width={['100%']}
          maxHeight={['none', 'none', 'none', 'none', 'calc(100vh - 5px)']}
          overflowY={['visible', 'visible', 'visible', 'visible', 'auto']}
          direction="column"
          borderRadius="lg"
          spacing="6"
          padding={6}
          shadow="md"
          bg="white"
          _dark={{ bg: 'gray.900' }}
          p="6"
          style={{
            transform: `scale(${scaleValue})`,
            transformOrigin: 'top',
            border: '3px solid #ffc107',
          }}
        >
          <Heading as="h4" size="sm" textAlign="center">
            {isPdfOverview ? (
              <span>{t('template:preview.PdfPreviewToGenerate')}</span>
            ) : (
              <span>{t('template:preview.TemplatePreview')}</span>
            )}
          </Heading>
          <div>{generatedTemplate}</div>
          {isPdfOverview ? (
            <Stack
              direction="row"
              spacing={4}
              alignItems="center"
              justifyContent="space-around"
            >
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  {values.labelSign1
                    ? values.labelSign1
                    : t('template:SignatureEmployee')}
                </Text>
                <FaSignature size={50} />
              </Box>

              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  {values.labelSign2
                    ? values.labelSign2
                    : t('template:SignatuerEmployer')}
                </Text>
                <FaSignature size={50} />
              </Box>
            </Stack>
          ) : (
            <FieldSignature
              width={'100%'}
              name="Signature2"
              label={
                values.labelSign1
                  ? values.labelSign1
                  : t('template:SignatureEmployee')
              }
            />
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
