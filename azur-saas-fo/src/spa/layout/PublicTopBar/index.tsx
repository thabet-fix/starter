import React from 'react';

import {
  Box,
  Flex,
  SlideFade,
  Spacer,
  useBreakpointValue,
  useTheme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { Logo } from '@/components/Logo';
import { useAuthContext } from '@/spa/auth/AuthContext';
import { NavDrawer } from '@/spa/layout/NavDrawer';

import { AccountMenu } from '../AccountMenu';

export const PublicTopBar = () => {
  const theme = useTheme();
  const showDrawer = useBreakpointValue({
    base: true,
    [theme.layout.breakpoints.desktop]: false,
  });

  // select language
  const { t } = useTranslation(['common', 'auth', 'dashboard']);

  const { isAuthenticated } = useAuthContext();
  return (
    <>
      <SlideFade in offsetY={0} style={{ zIndex: 2 }}>
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
          bg="gray.800"
          _dark={{ bg: 'gray.900' }}
        >
          <Box p="4" as={RouterLink} to="/">
            <Logo />
          </Box>
          <Spacer />

          {isAuthenticated && (
            <Box as={RouterLink} to="/admin" mr={6}>
              {t('dashboard:title')}
            </Box>
          )}
          {!isAuthenticated && (
            <Box as={RouterLink} to="/login" mr={6}>
              {t('auth:login.actions.login')}
            </Box>
          )}

          {isAuthenticated && <AccountMenu />}
        </Flex>
      </SlideFade>
      <Box h={theme.layout.topBar.height} />
      {showDrawer && <NavDrawer />}
    </>
  );
};
