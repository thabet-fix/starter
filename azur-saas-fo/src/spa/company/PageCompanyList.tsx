import React, { useEffect, useState } from 'react';

import {
  Center,
  HStack,
  Heading,
  LinkBox,
  Menu,
  MenuButton,
  MenuList,
  MenuProps,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiSlash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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
import { useToastError, useToastSuccess } from '@/components/Toast';

import { Page, PageContent, PageTopBar } from '../layout';
import { useCompanyChangeStatus, useCompanyList } from './Company.service';
import { Company } from './Company.type';

type CompanyActionProps = Omit<MenuProps, 'children'> & {
  company: Company;
};

const CompanyActions = ({ company, ...rest }: CompanyActionProps) => {
  const { t } = useTranslation(['common', 'companies']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const { mutate: CompanyChangeStatus, ...CompanyChangeStatusData } =
    useCompanyChangeStatus(company.id, {
      onSuccess: () => {
        toastSuccess({
          title: t('companies:SuccessUpdate'),
        });
      },
      onError: () => {
        toastError({
          title: t('common:use.errorOccurred'),
        });
      },
    });
  const changeStatusCompany = () => CompanyChangeStatus(company);
  const isChangeStatusLoading = CompanyChangeStatusData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isChangeStatusLoading} />
      <Portal>
        <MenuList>
          {company.activated ? (
            <ConfirmMenuItem
              onClick={changeStatusCompany}
              icon={<Icon icon={FiSlash} fontSize="lg" color="gray.400" />}
            >
              {t('common:actions.deactivate')}
            </ConfirmMenuItem>
          ) : (
            <ConfirmMenuItem
              onClick={changeStatusCompany}
              icon={
                <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
              }
            >
              {t('common:actions.activate')}
            </ConfirmMenuItem>
          )}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageCompanyList = () => {
  const [page, setPage] = useState(1);
  const {
    CompanyList,
    isLoading: isCompanyLoading,
    refetch,
  } = useCompanyList({ page });
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'companies']);
  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('companies:CompanyManagement')}</Heading>
          </HStack>
        </PageTopBar>
        {isCompanyLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}

        {!isCompanyLoading && (
          <DataList overflowY="scroll" flexWrap="wrap">
            <DataListHeader>
              <DataListCell colName="denomination">
                {t('companies:Denomination')}
              </DataListCell>
              <DataListCell mr={2} colName="presidentName">
                {t('companies:PresidentName')}
              </DataListCell>
              <DataListCell
                colName="actions"
                colWidth="4rem"
                align="flex-end"
              />
            </DataListHeader>
            {CompanyList?.data.length === 0 && (
              <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                <DataListCell
                  alignItems={'stretch'}
                  textAlign={'center'}
                  width={'100%'}
                  colName="noData"
                >
                  {t('companies:NoCompany')}
                </DataListCell>
              </DataListRow>
            )}
            {CompanyList?.data.length !== 0 &&
              CompanyList?.data.map((company) => (
                <DataListRow
                  as={LinkBox}
                  key={company.id}
                  bg={!company.activated ? 'orange.100' : 'white'}
                  _dark={{
                    bg: !company.activated ? 'orange.900' : 'blackAlpha.400',
                  }}
                >
                  <DataListCell colName="denomination">
                    {company.denomination}
                  </DataListCell>
                  <DataListCell colName="presidentName">
                    {company.presidentName}
                  </DataListCell>
                  <DataListCell colName="actions">
                    <CompanyActions company={company} />
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter>
              <Pagination
                isLoadingPage={isCompanyLoading}
                setPage={setPage}
                page={CompanyList?.current_page}
                pageSize={CompanyList?.per_page}
                totalItems={CompanyList?.total}
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
