import React, { useEffect, useState } from 'react';

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

import { Page, PageContent, PageTopBar } from '../layout';
import { useContextList, useContextRemove } from './AiContext.service';
import { Context } from './AiContext.type';

type ContextActionProps = Omit<MenuProps, 'children'> & {
  context: Context;
};

const ContextActions = ({ context, ...rest }: ContextActionProps) => {
  const { t } = useTranslation(['common', 'aiContext']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  // const deactivateUser = () => userUpdate({ ...user, activated: false });

  const { mutate: ContextRemove, ...ContextRemoveData } = useContextRemove(
    context.id,
    {
      onSuccess: () => {
        toastSuccess({
          title: t('aiContext:SuccessDelete'),
        });
      },
      onError: () => {
        toastError({
          title: t('common:use.errorOccurred'),
        });
      },
    }
  );
  const removeContext = () => ContextRemove(context);
  const isRemovalLoading = ContextRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/settings/ai-cadre/update/${context.id}`}
            icon={<Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeContext}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageContextList = () => {
  const [page, setPage] = useState(1);
  const {
    ContextList,
    isLoading: isContextLoading,
    refetch,
  } = useContextList({ page });
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'aiContext']);

  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('aiContext:ContextManagement')}</Heading>
          </HStack>
        </PageTopBar>
        <HStack mb="4" justifyContent={'flex-end'}>
          <ResponsiveIconButton
            icon={<FiPlus />}
            as={Link}
            to={'/admin/settings/ai-cadre/create'}
          >
            {t('aiContext:AddContext') as string}
          </ResponsiveIconButton>
        </HStack>
        {isContextLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}
        {!isContextLoading && (
          <DataList overflowY="scroll" flexWrap="wrap">
            <DataListHeader>
              <DataListCell colName="number">
                {t('aiContext:Number')}
              </DataListCell>
              <DataListCell colName="name">{t('aiContext:Name')}</DataListCell>
              <DataListCell mr={2} colName="cadre">
                {t('aiContext:Context')}
              </DataListCell>
              <DataListCell
                colName="actions"
                colWidth="4rem"
                align="flex-end"
              />
            </DataListHeader>
            {ContextList?.data.length === 0 && (
              <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                <DataListCell
                  alignItems={'stretch'}
                  textAlign={'center'}
                  width={'100%'}
                  colName="noData"
                >
                  {t('aiContext:NoContext')}
                </DataListCell>
              </DataListRow>
            )}
            {ContextList?.data.length !== 0 &&
              ContextList?.data.map((Context) => (
                <DataListRow as={LinkBox} key={Context.id}>
                  <DataListCell colName="number">
                    <LinkOverlay
                      as={Link}
                      to={`/admin/settings/ai-cadre/update/${Context.id}`}
                    >
                      {Context.id}
                    </LinkOverlay>
                  </DataListCell>
                  <DataListCell colName="name">{Context.name}</DataListCell>
                  <DataListCell colName="cadre">{Context.context}</DataListCell>
                  <DataListCell colName="actions">
                    <ContextActions context={Context} />
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter>
              <Pagination
                isLoadingPage={isContextLoading}
                setPage={setPage}
                page={ContextList?.current_page}
                pageSize={ContextList?.per_page}
                totalItems={ContextList?.total}
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
