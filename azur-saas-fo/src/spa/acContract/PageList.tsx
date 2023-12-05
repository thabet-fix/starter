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
import { useAcContractList } from './acContract.service';

export const PageList = () => {
  const [search, setSearch] = useState<string | undefined>('');
  const sortOptions = [
    { value: 'created_at', label: 'Date de création' },
    { value: 'alphabetical_order', label: 'Ordre alphabitique' },
  ];
  const [sort, setSort] = useState<SortValue>({
    by: 'created_at',
    order: 'desc',
  });

  const { acContractList, isLoading: isContractLoading } = useAcContractList({
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
              <DataListCell colName="Representant" colWidth={'25%'}>
                {'Employé'}
              </DataListCell>
              <DataListCell mr={2} colName="phone" colWidth={'20%'}>
                {'Numéro téléphone'}
              </DataListCell>
              <DataListCell mr={2} colName="email" colWidth={'25%'}>
                {'Email'}
              </DataListCell>

              <DataListCell colName="downloadPdfBU" colWidth="8%">
                {'Contrat en BG'}
              </DataListCell>
              <DataListCell colName="downloadPdf" colWidth="8%">
                {'Contrat'}
              </DataListCell>
            </DataListHeader>
            {acContractList?.map((acContract) => (
              <DataListRow
                as={LinkBox}
                key={acContract.id}
                bg={!acContract.companySignature ? 'orange.100' : 'white'}
              >
                <DataListCell colName="number">
                  <LinkOverlay as={Link} to={`${acContract.id}`}>
                    {acContract.number}
                  </LinkOverlay>
                </DataListCell>
                <DataListCell colName="Representant">
                  {acContract.name}
                </DataListCell>
                <DataListCell colName="phone">
                  {' '}
                  {acContract.phoneNumber}{' '}
                </DataListCell>
                <DataListCell colName="email">{acContract.email}</DataListCell>
                <DataListCell colName="downloadPdfBU">
                  {acContract?.pdfUrlLang1 && (
                    <IconButton
                      aria-label="activated"
                      icon={<FiDownload />}
                      color={'bleu'}
                      onClick={() =>
                        window.open(
                          (acContract?.pdfUrlLang1 as string) ?? '',
                          '_blank'
                        )
                      }
                    />
                  )}
                </DataListCell>
                <DataListCell colName="downloadPdfBU">
                  {acContract?.pdfUrlLang2 && (
                    <IconButton
                      aria-label="activated"
                      icon={<FiDownload />}
                      color={'bleu'}
                      onClick={() =>
                        window.open(
                          (acContract?.pdfUrlLang2 as string) ?? '',
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
