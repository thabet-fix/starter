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
import { usePackList, usePackRemove } from './Pack.service';
import { Pack } from './Pack.type';

type PackActionProps = Omit<MenuProps, 'children'> & {
  pack: Pack;
};

const PackActions = ({ pack, ...rest }: PackActionProps) => {
  const { t } = useTranslation(['common', 'pack']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  // const deactivateUser = () => userUpdate({ ...user, activated: false });

  const { mutate: PackRemove, ...PackRemoveData } = usePackRemove(pack.id, {
    onSuccess: () => {
      toastSuccess({
        title: t('pack:SuccessDelete'),
      });
    },
    onError: () => {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    },
  });
  const removePack = () => PackRemove(pack);
  const isRemovalLoading = PackRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/settings/pack/update/${pack.id}`}
            icon={<Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removePack}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PagePackList = () => {
  const [page, setPage] = useState(1);
  const { PackList, isLoading: isPackLoading, refetch } = usePackList({ page });
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  const navigate = useNavigate();
  const { t } = useTranslation(['pack']);
  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('pack:PackManagement')}</Heading>
          </HStack>
        </PageTopBar>
        <HStack mb="4" justifyContent={'flex-end'}>
          <ResponsiveIconButton
            icon={<FiPlus />}
            as={Link}
            to={'/admin/settings/pack/create'}
          >
            {t('pack:AddPack') as string}
          </ResponsiveIconButton>
        </HStack>
        {isPackLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}
        {!isPackLoading && (
          <DataList overflowY="scroll" flexWrap="wrap">
            <DataListHeader>
              <DataListCell colName="number">{t('pack:Number')}</DataListCell>
              <DataListCell colName="name">{t('pack:Name')}</DataListCell>
              <DataListCell mr={2} colName="price">
                {t('pack:Price')}
              </DataListCell>
              <DataListCell
                colName="actions"
                colWidth="4rem"
                align="flex-end"
              />
            </DataListHeader>
            {PackList?.data.length === 0 && (
              <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                <DataListCell
                  alignItems={'stretch'}
                  textAlign={'center'}
                  width={'100%'}
                  colName="noData"
                >
                  {t('pack:NoPack')}
                </DataListCell>
              </DataListRow>
            )}
            {PackList?.data.length !== 0 &&
              PackList?.data.map((pack) => (
                <DataListRow as={LinkBox} key={pack.id}>
                  <DataListCell colName="number">
                    <LinkOverlay
                      as={Link}
                      to={`/admin/settings/pack/update/${pack.id}`}
                    >
                      {pack.id}
                    </LinkOverlay>
                  </DataListCell>
                  <DataListCell colName="name">{pack.name}</DataListCell>
                  <DataListCell colName="price">{pack.price}</DataListCell>
                  <DataListCell colName="actions">
                    <PackActions pack={pack} />
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter>
              <Pagination
                isLoadingPage={isPackLoading}
                setPage={setPage}
                page={PackList?.current_page}
                pageSize={PackList?.per_page}
                totalItems={PackList?.total}
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
