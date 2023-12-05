import React, { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  IconButton,
  IconButtonProps,
  SlideFade,
  Spacer,
  useBreakpointValue,
  useTheme,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import ReactFlagsSelect from 'react-flags-select';
import { useTranslation } from 'react-i18next';
import { FiMenu } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

import { Logo } from '@/components/Logo';
import {
  accountKeys,
  useAccount,
  useUpdateAccount,
} from '@/spa/account/account.service';
import { AccountMenu, useLayoutContext } from '@/spa/layout';
import { NavDrawer } from '@/spa/layout/NavDrawer';

const MenuButton = (props: Partial<IconButtonProps>) => {
  const { navOnOpen } = useLayoutContext();
  return (
    <IconButton
      aria-label="Navigation"
      icon={<FiMenu size="1.5em" />}
      onClick={navOnOpen}
      bg="transparent"
      _active={{ bg: 'gray.700' }}
      _hover={{ bg: 'gray.900' }}
      {...props}
    />
  );
};

export const TopBar = () => {
  const theme = useTheme();
  const { account } = useAccount();
  const queryClient = useQueryClient();
  const { mutate: updateAccount } = useUpdateAccount({
    onSuccess: () => {
      queryClient.invalidateQueries(accountKeys.account);
    },
  });

  const submitLanguage = async (values: TODO) => {
    const newAccount = {
      ...account,
      ...values,
    };

    await updateAccount(newAccount);
  };
  const { t, i18n } = useTranslation(['common']);
  const [selectedLang, setSelectedLang] = useState(
    account?.langKey === 'FR' ? 'FR' : 'GB'
  );

  useEffect(() => {
    setSelectedLang(account?.langKey === 'FR' ? 'FR' : 'GB');
    i18n.changeLanguage(account?.langKey === 'FR' ? 'FR' : 'en');
  }, [account?.langKey, i18n]);

  const showDrawer = useBreakpointValue({
    base: true,
    [theme.layout.breakpoints.desktop]: false,
  });

  return (
    <>
      <SlideFade in offsetY={-40} style={{ zIndex: 2 }}>
        <Flex
          position="fixed"
          top="0"
          insetStart="0"
          insetEnd="0"
          color="gray.50"
          align="center"
          pt="safe-top"
          px="4"
          h={theme.layout.topBar.height}
          bg="customBlue"
          _dark={{ bg: 'gray.900' }}
          justifyContent={'space-between'}
        >
          <MenuButton display={{ base: 'flex', md: 'none' }} ms="-0.5rem" />
          <Box
            as={RouterLink}
            to="/"
            mx={{ base: 'auto', [theme.layout.breakpoints.desktop]: 0 }}
          >
            <Logo />
          </Box>
          <Spacer />
          <Box p="4">
            <ReactFlagsSelect
              className="language-select"
              countries={['GB', 'FR']}
              // selected={i18n.language == 'en' ? 'GB' : i18n.language}
              selected={selectedLang}
              placeholder={t('common:use.language')}
              showOptionLabel={false}
              customLabels={{
                GB: 'EN',
                FR: 'FR',
              }}
              onSelect={(code) => {
                let newLanguage;
                if (code === 'GB') {
                  newLanguage = 'en';
                } else {
                  newLanguage = code;
                }

                i18n.changeLanguage(newLanguage);
                localStorage.setItem('appLang', newLanguage);

                // Update the account's langKey value in the database
                // updateAccount({
                //   ...account,
                //   langKey: newLanguage,
                // });
                submitLanguage({ langKey: newLanguage });
              }}
            />
          </Box>
          <AccountMenu />
        </Flex>
      </SlideFade>
      <Box h={theme.layout.topBar.height} />
      {showDrawer && <NavDrawer />}
    </>
  );
};
