import React, { useEffect, useState } from 'react';

import {
  Center,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { FiCheckCircle, FiPlus } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import { ActionsButton } from '@/components/ActionsButton';
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
import { SearchInput } from '@/components/SearchInput';
import { Sort, SortValue } from '@/components/Sort';
import { useToastError, useToastSuccess } from '@/components/Toast';

import { TemplateContratNav } from '../admin/TemplateContratNav';
import { Language } from '../language/Language.type';
import { Page, PageContent, PageTopBar } from '../layout';
import {
  useContractDowload,
  useStandardContractList,
} from './standardContract.service';
import { StandardContract } from './standardContract.type';

type SdContractActionProps =
  // Omit<MenuProps, 'children'> &
  {
    sdContract: StandardContract;
  };

const ContractActions = ({ sdContract, ...rest }: SdContractActionProps) => {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const { t } = useTranslation(['common', 'sdContract']);

  // get an array of all template languages
  const availbleLanguages: TODO = [];
  sdContract?.template?.contents.map((value: TODO) =>
    availbleLanguages.push(value.language)
  );

  const { mutate: contractDowload } = useContractDowload({
    onSuccess: (url) => {
      window.open(url, '_blank');
      toastSuccess({
        title: t('sdContract:SuccessDowload'),
      });
    },
    onError: () => {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    },
  });

  const dowloadContract = async (langId: TODO) => {
    const data = {
      langId: langId,
      contractId: sdContract.id,
    };
    try {
      await contractDowload(data);
    } catch (error) {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    }
  };

  return (
    <Menu isLazy {...rest}>
      <MenuButton
        as={ActionsButton}
        //  isLoading={isRemovalLoading}
        style={{ justifyContent: 'flex-center' }}
      />
      <Portal>
        <MenuList>
          {availbleLanguages.map((language: Language) => (
            <MenuItem
              key={language.id}
              icon={
                <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
              }
              onClick={() => dowloadContract(language.id)}
            >
              {language.name}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageStandardList = () => {
  const { t } = useTranslation(['sdContract']);
  const [search, setSearch] = useState<string | undefined>('');
  const params = useParams();
  const templateId = params.templateId;
  const sortOptions = [
    { value: 'created_at', label: t('sdContract:CreationDate') },
    { value: 'alphabetical_order', label: t('sdContract:AlphabeticalOrder') },
  ];
  const [sort, setSort] = useState<SortValue>({
    by: 'created_at',
    order: 'desc',
  });
  const [page, setPage] = useState(1);
  const {
    standardContractList,
    isLoading: isContractLoading,
    refetch,
  } = useStandardContractList({
    page,
    search,
    orderBy: sort.by,
    order: sort.order,
    templateId: templateId,
  });
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  

  return (
    <Page containerSize="xl" nav={<TemplateContratNav />}>
      <PageTopBar mb="4" w="full">
        <HStack justifyContent="space-between" zIndex="99">
          <Heading size="md">{}</Heading>
          <Sort
            sort={sort}
            onChange={setSort}
            options={sortOptions}
            ascIcon={<Icon icon={FaSortUp} />}
            descIcon={<Icon icon={FaSortDown} />}
          />
        </HStack>
      </PageTopBar>
      <PageContent>
        <HStack mb="4">
          <SearchInput value={search} onChange={setSearch} />

          <ResponsiveIconButton
            className="buttonSendDoc"
            icon={<FiPlus />}
            as={Link}
            to={'/admin/send-page-link'}
          >
            {t('sdContract:SendContract') as string}
          </ResponsiveIconButton>
        </HStack>
        {isContractLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}
        {!isContractLoading && (
          <DataList
            overflowY="scroll"
            flexWrap="wrap"
            className="dataListContract"
          >
            <DataListHeader>
              <DataListCell colName="number">
                {t('sdContract:Number')}
              </DataListCell>
              <DataListCell colName="createdBy">
                {t('sdContract:createdBy')}
              </DataListCell>
              <DataListCell colName="template">
                {t('sdContract:Template')}
              </DataListCell>
              <DataListCell colName="downloads">
                {t('sdContract:PDFdownloads')}
              </DataListCell>
            </DataListHeader>
            {standardContractList?.data.length === 0 && (
              <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                <DataListCell
                  alignItems={'stretch'}
                  textAlign={'center'}
                  width={'100%'}
                  colName="noData"
                >
                  {t('sdContract:NoDocument')}
                </DataListCell>
              </DataListRow>
            )}
            {standardContractList?.data?.length !== 0 &&
              standardContractList?.data?.map((sdContract) => (
                <DataListRow
                  as={LinkBox}
                  key={sdContract.id}
                  bg={!sdContract.companySignature ? 'orange.100' : 'white'}
                  _dark={{
                    bg: sdContract.companySignature
                      ? 'blackAlpha.400'
                      : 'orange.900',
                  }}
                >
                  <DataListCell colName="number">
                    <LinkOverlay
                      as={Link}
                      to={`/admin/standard-contract/${sdContract.id}`}
                    >
                      {sdContract.number}
                    </LinkOverlay>
                  </DataListCell>
                  <DataListCell colName="createdBy">
                    {sdContract.created_by.firstName}{' '}
                    {sdContract.created_by.lastName}
                  </DataListCell>
                  <DataListCell colName="template">
                    {sdContract?.template?.name}
                  </DataListCell>
                  <DataListCell
                    colName="downloads"
                    style={{ alignItems: 'center' }}
                  >
                    {sdContract.companySignature && (
                      <ContractActions sdContract={sdContract} />
                    )}
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter>
              <Pagination
                isLoadingPage={isContractLoading}
                setPage={setPage}
                page={standardContractList?.current_page}
                pageSize={standardContractList?.per_page}
                totalItems={standardContractList?.total}
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
