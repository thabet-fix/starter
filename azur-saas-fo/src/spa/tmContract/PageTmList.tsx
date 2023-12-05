import React, { useState } from 'react';

import {
  Center,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spinner,
} from '@chakra-ui/react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
  DataList,
  DataListCell,
  DataListHeader,
  DataListRow,
} from '@/components/DataList';
import { Icon } from '@/components/Icons';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';
import { SearchInput } from '@/components/SearchInput';
import { Sort, SortValue } from '@/components/Sort';

import { TemplateContratNav } from '../admin/TemplateContratNav';
import { Page, PageContent, PageTopBar } from '../layout';
import { useTmContractList } from './tmContract.service';

export const PageTmList = () => {
  const [search, setSearch] = useState<string | undefined>('');
  const sortOptions = [
    { value: 'created_at', label: 'Date de création' },
    { value: 'alphabetical_order', label: 'Ordre alphabitique' },
  ];
  const [sort, setSort] = useState<SortValue>({
    by: 'created_at',
    order: 'desc',
  });

  const { tmContractList, isLoading: isContractLoading } = useTmContractList({
    search,
    orderBy: sort.by,
    order: sort.order,
  });

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
            icon={<FiPlus />}
            as={Link}
            to={'/admin/send-page-link'}
          >
            {'Envoyer un contrat' as string}
          </ResponsiveIconButton>
        </HStack>
        {isContractLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}
        {!isContractLoading && (
          <DataList overflowY="scroll" flexWrap="wrap">
            <DataListHeader>
              <DataListCell colName="number" colWidth={'10%'}>
                {'Numéro'}
              </DataListCell>
              <DataListCell colName="representativeName" colWidth={'20%'}>
                {'Nom et prénom'}
              </DataListCell>
              <DataListCell
                mr={2}
                colName="representativeAddress"
                colWidth={'20%'}
              >
                {'Adresse'}
              </DataListCell>
              <DataListCell mr={2} colName="designation" colWidth={'20%'}>
                {'Désignation'}
              </DataListCell>
              <DataListCell mr={2} colName="price" colWidth={'10%'}>
                {'Prix'}
              </DataListCell>

              <DataListCell colName="downloadPdfBU" colWidth="8%">
                {'Contrat en BG'}
              </DataListCell>
              <DataListCell colName="downloadPdf" colWidth="8%">
                {'Contrat'}
              </DataListCell>
            </DataListHeader>
            {tmContractList?.map((tmContract) => (
              <DataListRow
                as={LinkBox}
                key={tmContract.id}
                bg={!tmContract.companySignature ? 'orange.100' : 'white'}
              >
                <DataListCell colName="number">
                  <LinkOverlay as={Link} to={`${tmContract.id}`}>
                    {tmContract.number}
                  </LinkOverlay>
                </DataListCell>
                <DataListCell colName="representativeName">
                  {tmContract.representativeFirstName}{' '}
                  {tmContract.representativeLastName}
                </DataListCell>
                <DataListCell colName="representativeAddress">
                  {tmContract.representativeAddress}
                </DataListCell>
                <DataListCell colName="designation">
                  {tmContract.designation}
                </DataListCell>
                <DataListCell colName="price">{tmContract.price}</DataListCell>
                <DataListCell colName="downloadPdfBU">
                  {tmContract?.pdfUrlLang1 && (
                    <IconButton
                      aria-label="activated"
                      icon={<FiDownload />}
                      color={'bleu'}
                      onClick={() =>
                        window.open(
                          (tmContract?.pdfUrlLang1 as string) ?? '',
                          '_blank'
                        )
                      }
                    />
                  )}
                </DataListCell>
                <DataListCell colName="downloadPdfBU">
                  {tmContract?.pdfUrlLang2 && (
                    <IconButton
                      aria-label="activated"
                      icon={<FiDownload />}
                      color={'bleu'}
                      onClick={() =>
                        window.open(
                          (tmContract?.pdfUrlLang2 as string) ?? '',
                          '_blank'
                        )
                      }
                    />
                  )}
                </DataListCell>
              </DataListRow>
            ))}

            {/* <DataListFooter>
            <Pagination
              isLoadingPage={isLoadingPage}
              setPage={setPage}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination>
          </DataListFooter> */}
          </DataList>
        )}
      </PageContent>
    </Page>
  );
};
