import React, { FC, useEffect, useRef, useState } from 'react';

import { Flex, Stack, useDisclosure } from '@chakra-ui/react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Sticky from 'wil-react-sticky';

import { Viewport } from '@/components/Viewport';
import { useAuthContext } from '@/spa/auth/AuthContext';
import { LoginModalInterceptor } from '@/spa/auth/LoginModalInterceptor';
import { Guide } from '@/spa/guide/guide';

import { LayoutContext } from '../LayoutContext';
import { TopBar } from '../TopBar';
import { MainMenu } from './../MainMenu/index';

const NavStickyContainer: FC<{
  children: TODO;
  isSticky?: boolean;
}> = ({ children, isSticky = true }) =>
  isSticky ? <Sticky offsetTop={80}>{children}</Sticky> : children;

export const Layout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const {
    isOpen: navIsOpen,
    onClose: navOnClose,
    onOpen: navOnOpen,
  } = useDisclosure();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const [showSideMenu, setShowSideMenu] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { isAuthenticated, updateToken } = useAuthContext();

  useEffect(() => {
    const interceptor = Axios.interceptors.response.use(
      (r) => r,
      (error) => {
        if (
          error?.response?.status === 401 &&
          pathnameRef.current !== '/login'
        ) {
          updateToken(null);
          navigate('/login');
        }
        throw error;
      }
    );

    return () => Axios.interceptors.response.eject(interceptor);
  }, [updateToken, navigate]);

  return (
    <LayoutContext.Provider
      value={{
        isFocusMode,
        setIsFocusMode,
        navIsOpen,
        navOnClose,
        navOnOpen,
        showSideMenu,
        setShowSideMenu,
        runTour,
        setRunTour,
        stepIndex,
        setStepIndex,
      }}
    >
      <Guide />
      <Viewport>
        {isAuthenticated && !isFocusMode && <TopBar />}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={0} flex="1">
          <Flex
            position="fixed"
            h="100%"
            direction="column"
            minW="0"
            display={{ base: 'none', md: 'inherit' }}
            w={
              showSideMenu && isAuthenticated
                ? { base: 'full', md: '15rem' }
                : '0'
            }
            bg={'customBlue'}
            _dark={{ bg: 'blackAlpha.300' }}
            color="white"
            alignContent="space-between"
          >
            {showSideMenu && isAuthenticated && (
              <NavStickyContainer>
                <MainMenu me="auto" display={{ base: 'none', md: 'flex' }} />
              </NavStickyContainer>
            )}
          </Flex>
          <Flex
            h="full"
            direction="column"
            minW="0"
            display={{ base: 'none', md: 'inherit' }}
            w={
              showSideMenu && isAuthenticated
                ? { base: 'full', md: '15rem' }
                : '0'
            }
            bg={'gray.800'}
            color="white"
          ></Flex>
          <Flex direction="column" flex="1" minW="0">
            {children}
          </Flex>
        </Stack>
        <LoginModalInterceptor />
      </Viewport>
    </LayoutContext.Provider>
  );
};
