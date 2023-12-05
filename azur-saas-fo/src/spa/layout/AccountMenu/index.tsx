import React from 'react';

import {
  Avatar,
  Box,
  Img,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiLogOut, FiMoon, FiSun, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { Icon } from '@/components/Icons';
import { useAccount } from '@/spa/account/account.service';

export const AccountMenu = ({ ...rest }) => {
  const { t } = useTranslation(['layout']);

  const { colorMode, toggleColorMode } = useColorMode();
  const { account, isLoading } = useAccount();
  const navigate = useNavigate();
  const isPremium = localStorage.getItem('packPremium');
  return (
    <Box color="gray.800" _dark={{ color: 'white' }}>
       
      
      <Menu placement="bottom-end" {...rest}>
        <MenuButton borderRadius="full" _focusVisible={{ shadow: 'outline' }}>
          {isPremium === 'true' && (
            <Img src="/premium.png" position={'absolute'} top={0} />
          )}

          <Avatar size="sm" icon={<></>} name={account?.email}>
            {isLoading && <Spinner size="xs" />}
          </Avatar>
        </MenuButton>
        <MenuList maxW="12rem" overflow="hidden">
          <MenuGroup title={account?.email} noOfLines={1}>
            <MenuItem
              as={Link}
              to="/account"
              icon={<Icon icon={FiUser} fontSize="lg" color="gray.400" />}
            >
              {t('layout:accountMenu.myAccount')}
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            icon={
              <Icon
                icon={colorMode === 'dark' ? FiSun : FiMoon}
                fontSize="lg"
                color="gray.400"
              />
            }
            onClick={() => toggleColorMode()}
          >
            {colorMode === 'dark'
              ? t('layout:accountMenu.switchColorModeLight')
              : t('layout:accountMenu.switchColorModeDark')}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<Icon icon={FiLogOut} fontSize="lg" color="gray.400" />}
            onClick={() => navigate('/logout')}
          >
            {t('layout:accountMenu.logout')}
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
