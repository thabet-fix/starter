import React, { useState, useContext } from 'react';

import {
  Box,
  BoxProps,
  Flex,
  LinkOverlay,
  Progress,
  Show,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  HiBriefcase,
  HiClipboardCheck,
  HiCloud,
  HiDocumentDuplicate,
  HiOutlineAdjustments,
  HiOutlineCurrencyDollar,
  HiOutlineViewGrid,
  HiPaperAirplane,
  HiPencilAlt,
  HiShieldCheck,
  HiTranslate,
  HiUserGroup,
} from 'react-icons/hi';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';

import { usePackDetails } from '@/spa/Packs/Pack.service';
import { useAccount } from '@/spa/account/account.service';
import { LayoutContext, useLayoutContext } from '@/spa/layout';

const MainMenuItem = ({
  to,
  baseHref,
  ...rest
}: BoxProps & { to: string } & { baseHref: string }) => {
  const { navOnClose } = useLayoutContext();
  const { pathname } = useLocation();

  const isActive = pathname.startsWith(baseHref);
  return (
    <Box
      as={RouterLink}
      to={to}
      bg={isActive ? 'customBlueDark' : 'transparent'}
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.8}
      fontWeight="300"
      borderRadius="md"
      px="4"
      py="2"
      _hover={{
        bg: 'customBlueLight',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      _focusVisible={{
        outline: 'none',
        bg: 'customBlueLight',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      onClick={navOnClose}
      {...rest}
    />
  );
};

export const MainMenu = ({ ...rest }) => {
  const { PackDetails, isLoading: detailsLoading } = usePackDetails(
    localStorage.getItem('accountId')
  );
  const { t } = useTranslation(['mainMenu', 'common', 'payment', 'billing']);
  const { account, isEmployer, isAdmin, isManager } = useAccount();

  const [isFlotteOpen, setIsFlotteOpen] = useState(false);
  const { pathname } = useLocation();
  let isActiveItem = false;
  if (
    [
      '/admin/settings/users',
      '/admin/settings/language',
      '/admin/settings/company',
      '/admin/settings/company/update',
      '/admin/settings/pack',
      '/admin/settings/payment',
      '/admin/settings/ai-cadre',
      '/admin/settings/billing',
    ].includes(pathname)
  ) {
    isActiveItem = true;
  }

  const {
    setStepIndex,
  } = useContext(LayoutContext);

  const handleClickFirstStep = () => {
    setStepIndex(1);
  }

  return (
    <Stack spacing="1" {...rest}>
      {/* menu for employer and manager */}
      {(isEmployer || isManager) && (
        <>
          <MainMenuItem
            baseHref="/admin/standard-contract/"
            to="/admin/standard-contract/list-all"
            display={'flex'}
          >
            <HiDocumentDuplicate
              size={'1.3rem'}
              style={{ marginRight: '7px' }}
            />{' '}
            {t('mainMenu:contractList')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/select-argrement-type"
            to="/select-argrement-type"
            display={'flex'}
          >
            <HiPencilAlt size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:SignContract')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/send-page-link"
            to="/admin/send-page-link"
            display={'flex'}
          >
            <HiPaperAirplane size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:SendContract')}
          </MainMenuItem>
          <MainMenuItem
            className="guide-openTemplateMenu"
            display={'flex'}
            baseHref="/admin/template"
            to="/admin/template"
            onClick={handleClickFirstStep}
          >
            <HiClipboardCheck size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:Templates')}
          </MainMenuItem>
        </>
      )}

      {/* menu for only employer*/}
      {isEmployer && (
        <Show>
          <Stack onClick={() => setIsFlotteOpen(!isFlotteOpen)}>
            <Box
              as={RouterLink}
              to={'#'}
              bg="transparent"
              justifyContent="flex-start"
              position="relative"
              opacity={isActiveItem ? 1 : 0.8}
              fontWeight="300"
              borderRadius="md"
              px="4"
              py="2"
              _active={{ bg: 'gray.700' }}
              _hover={{
                bg: 'customBlueLight',
                _after: {
                  opacity: 1,
                  w: '2rem',
                },
              }}
              _focusVisible={{
                outline: 'none',
                bg: 'customBlueLight',
                _after: {
                  opacity: 1,
                  w: '2rem',
                },
              }}
              display={'flex'}
            >
              <HiOutlineViewGrid
                size={'1.3rem'}
                style={{ marginRight: '7px' }}
              />{' '}
              {t('mainMenu:Settings')}
            </Box>
            {(isFlotteOpen || isActiveItem) && (
              <Stack>
                <MainMenuItem
                  baseHref="/admin/settings/users"
                  style={{ paddingLeft: '30px' }}
                  to="/admin/settings/users"
                  display={'flex'}
                >
                  <HiUserGroup size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
                  {t('mainMenu:UsersManagement')}
                </MainMenuItem>
                <MainMenuItem
                  baseHref="/admin/settings/company"
                  style={{ paddingLeft: '30px' }}
                  to={'/admin/settings/company/update'}
                  display={'flex'}
                >
                  <HiBriefcase size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
                  {t('mainMenu:CompanyManagement')}
                </MainMenuItem>
                <MainMenuItem
                  baseHref="/admin/settings/payment"
                  style={{ paddingLeft: '30px' }}
                  to="/admin/settings/payment"
                  display={'flex'}
                >
                  <HiShieldCheck
                    size={'1.3rem'}
                    style={{ marginRight: '7px' }}
                  />{' '}
                  {t('mainMenu:Subscriptions')}
                </MainMenuItem>
                <MainMenuItem
                  baseHref="/admin/settings/billing"
                  style={{ paddingLeft: '30px' }}
                  to="/admin/settings/billing"
                  display={'flex'}
                >
                  <HiOutlineCurrencyDollar
                    size={'1.3rem'}
                    style={{ marginRight: '7px' }}
                  />{' '}
                  {t('mainMenu:Billing')}
                </MainMenuItem>
              </Stack>
            )}
          </Stack>
        </Show>
      )}
      {/* admin menu  */}
      {isAdmin && (
        <>
          <MainMenuItem
            baseHref="/admin/settings/company"
            style={{ paddingLeft: '30px' }}
            to={'/admin/settings/company'}
            display={'flex'}
          >
            <HiBriefcase size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:companiesManagement')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/settings/language"
            style={{ paddingLeft: '30px' }}
            to="/admin/settings/language"
            display={'flex'}
          >
            <HiTranslate size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:LanguagesManagement')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/settings/pack"
            style={{ paddingLeft: '30px' }}
            to="/admin/settings/pack"
            display={'flex'}
          >
            <HiShieldCheck size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:PacksManagement')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/settings/ai-cadre"
            style={{ paddingLeft: '30px' }}
            to="/admin/settings/ai-cadre"
            display={'flex'}
          >
            <HiCloud size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:ContextManagement')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/settings/configuration"
            style={{ paddingLeft: '30px' }}
            to="/admin/settings/configuration"
            display={'flex'}
          >
            <HiOutlineAdjustments
              size={'1.3rem'}
              style={{ marginRight: '7px' }}
            />{' '}
            {t('mainMenu:Configuration')}
          </MainMenuItem>
        </>
      )}

      {(isEmployer || isManager) && !detailsLoading && (
        <Box
          p={'4'}
          position={'fixed'}
          borderTop={'1px solid #fff'}
          bottom={'0'}
          left={'0'}
          right={'0'}
          w={'15rem'}
          fontWeight={'300'}
          fontSize={'sm'}
        >
          <Flex direction="row" justifyContent={'space-between'} mb="4">
            <LinkOverlay as={Link} to={'/admin/settings/payment'}>
              <Text as="p">
                {PackDetails?.pack.name}
                {PackDetails?.expiredIn && (
                  <Text as="div" color="red.500">
                    {t('mainMenu:Expiration')} :{' '}
                    {PackDetails.expiredIn.split(' ')[0]}
                  </Text>
                )}
              </Text>
            </LinkOverlay>
            <LinkOverlay as={Link} to={'/admin/settings/payment'}>
              <Text as="a">{t('mainMenu:Manage')}</Text>
            </LinkOverlay>
          </Flex>
          {PackDetails?.contractNb && (
            <>
              <Flex direction="column" mb="4">
                <Text as="p">{t('mainMenu:SignedDocuments')}</Text>
                <Text as="p">
                  {account?.contractNbCreated ?? 0} / {PackDetails?.contractNb}
                </Text>
              </Flex>
              <Box mb="4">
                <Progress
                  value={
                    ((account?.contractNbCreated ?? 0) /
                      PackDetails?.contractNb) *
                      100 ?? 0
                  }
                  colorScheme="green"
                  size="xs"
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </Stack>
  );
};
