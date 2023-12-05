import React, { useEffect, useState, useContext } from 'react';

import {
  Center,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { ActionsButton } from '@/components/ActionsButton';
import { ConfirmMenuItem } from '@/components/ConfirmMenuItem';
import {
  DataList,
  DataListCell,
  DataListFooter,
  DataListHeader,
  DataListRow,
} from '@/components/DataList';
import { Icon } from '@/components/Icons';
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from '@/components/Pagination';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';
import { useToastError, useToastSuccess } from '@/components/Toast';

import { LayoutContext, Page, PageContent, PageTopBar } from '../layout';
import { useTemplateList, useTemplateRemove } from './Template.service';
import { Template } from './Template.type';

type TemplateActionProps = Omit<MenuProps, 'children'> & {
  template: Template;
};

const TemplateActions = ({ template, ...rest }: TemplateActionProps) => {
  const { t } = useTranslation(['common', 'template']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const { mutate: TemplateRemove, ...TemplateRemoveData } = useTemplateRemove(
    template.id,
    {
      onSuccess: () => {
        toastSuccess({
          title: t('template:SuccessDelete'),
        });
      },
      onError: () => {
        toastError({
          title: t('common:use.errorOccurred'),
        });
      },
    }
  );
  const removeTemplate = () => TemplateRemove(template);
  const isRemovalLoading = TemplateRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/template/update/${template.id}`}
            icon={<Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeTemplate}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageTemplateList = () => {
  const [page, setPage] = useState(1);
  const {
    TemplateList,
    isLoading: isTemplateLoading,
    refetch,
  } = useTemplateList({ page });
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'template']);

  const {
    setStepIndex,
  } = useContext(LayoutContext);

  const handleClickCreateTemplate = () => {
    setStepIndex(2);
  }
  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('template:TemplateManagement')}</Heading>
          </HStack>
        </PageTopBar>
        <HStack mb="4" justifyContent={'flex-end'}>
          <ResponsiveIconButton
            className="guide-addTemplateButton"
            icon={<FiPlus />}
            as={Link}
            to={'/admin/template/create'}
            onClick={handleClickCreateTemplate}
          >
            {t('template:AddTemplate') as string}
          </ResponsiveIconButton>
        </HStack>
        {isTemplateLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}
        {!isTemplateLoading && (
          <DataList overflowY="scroll" flexWrap="wrap">
            <DataListHeader>
              <DataListCell colName="number">
                {t('template:Number')}
              </DataListCell>
              <DataListCell colName="name">{t('template:Name')}</DataListCell>
              <DataListCell mr={2} colName="codeLangue">
                {t('template:Language')}
              </DataListCell>
              <DataListCell
                colName="actions"
                colWidth="4rem"
                align="flex-end"
              />
            </DataListHeader>
            {TemplateList?.data.length === 0 && (
              <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                <DataListCell
                  alignItems={'stretch'}
                  textAlign={'center'}
                  width={'100%'}
                  colName="noData"
                >
                  {t('template:NoTemplate')}
                </DataListCell>
              </DataListRow>
            )}
            {TemplateList?.data.length !== 0 &&
              TemplateList?.data.map((template, index) => (
                <DataListRow as={LinkBox} key={template.id}>
                  <DataListCell colName="number">
                    <LinkOverlay
                      as={Link}
                      to={`/admin/template/update/${template.id}`}
                    >
                      {index + 1}
                    </LinkOverlay>
                  </DataListCell>
                  <DataListCell colName="name">{template.name}</DataListCell>
                  <DataListCell colName="Langue">
                    {template.contents?.map(
                      (content, index) =>
                        '[' +
                        content?.language?.code?.toUpperCase() +
                        '] ' +
                        (index !== template.contents.length - 1 ? ', ' : '')
                    )}
                  </DataListCell>
                  <DataListCell colName="actions">
                    <TemplateActions template={template} />
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter>
              <Pagination
                isLoadingPage={isTemplateLoading}
                setPage={setPage}
                page={TemplateList?.current_page}
                pageSize={TemplateList?.per_page}
                totalItems={TemplateList?.total}
              >
                <PaginationButtonFirstPage />
                <PaginationButtonPrevPage />
                <PaginationInfo flex="1" />
                <PaginationButtonNextPage />
                <PaginationButtonLastPage />
              </Pagination>
            </DataListFooter>
          </DataList>
        )}
      </PageContent>
    </Page>
  );
};
