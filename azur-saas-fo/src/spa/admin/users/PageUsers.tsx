import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  LinkBox,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiPlus, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
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
import { useAccount } from '@/spa/account/account.service';
import { UserStatus } from '@/spa/admin/users/UserStatus';
import {
  useActivateUser,
  useUserList,
  useUserRemove,
} from '@/spa/admin/users/users.service';
import { User } from '@/spa/admin/users/users.types';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

type UserActionProps = Omit<MenuProps, 'children'> & {
  user: User;
};

const UserActions = ({ user, ...rest }: UserActionProps) => {
  const { t } = useTranslation(['common', 'users']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  // const deactivateUser = () => userUpdate({ ...user, activated: false });

  const { mutate: userRemove, ...userRemoveData } = useUserRemove({
    onSuccess: (_, { login }) => {
      toastSuccess({
        title: t('users:feedbacks.deleteUserSuccess.title'),
        description: t('users:feedbacks.deleteUserSuccess.description', {
          login,
        }),
      });
    },
    onError: (_, { login }) => {
      toastError({
        title: t('users:feedbacks.deleteUserError.title'),
        description: t('users:feedbacks.deleteUserError.description', {
          login,
        }),
      });
    },
  });
  const removeUser = () => userRemove(user);
  const isRemovalLoading = userRemoveData.isLoading;

  const { mutate: userActivate, ...userActivateData } = useActivateUser({
    onSuccess: () => {
      toastSuccess({
        title: t('users:feedbacks.activateUserSuccess.title'),
        description: t('users:feedbacks.activateUserSuccess.description'),
      });
    },
    onError: () => {
      toastError({
        title: t('users:feedbacks.activateUserError.title'),
        description: t('users:feedbacks.activateUserError.description'),
      });
    },
  });
  const activateUser = () => userActivate(user);
  const isActionsLoading = userActivateData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton
        as={ActionsButton}
        isLoading={isActionsLoading || isRemovalLoading}
      />
      <Portal>
        <MenuList>
          {!user.activated && (
            <MenuItem
              onClick={activateUser}
              icon={
                <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
              }
            >
              {t('common:actions.activate')}
            </MenuItem>
          )}
          <MenuDivider />

          <MenuItem
            as={Link}
            to={`/admin/settings/users/${user.id}`}
            icon={<Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeUser}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageUsers = () => {
  const { t } = useTranslation(['users', 'account']);
  const { isAdmin } = useAccount();
  const [page, setPage] = useState(1);
  const {
    users,
    isLoadingPage,
    isLoading: isUsersLoading,
    isError,
    refetch,
  } = useUserList({ page });
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  const navigate = useNavigate();
  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('users:list.title')}</Heading>
          </HStack>
        </PageTopBar>
        {!isAdmin && (
          <HStack justifyContent="flex-end" mb="4">
            <ResponsiveIconButton
              icon={<FiPlus />}
              as={Link}
              to={'/admin/settings/users/create'}
            >
              {t('users:addManager')}
            </ResponsiveIconButton>
          </HStack>
        )}

        <DataList>
          <DataListHeader isVisible={{ base: false, md: true }}>
            <DataListCell colName="name" colWidth="2">
              {t('account:data.firstname.label')} /{' '}
              {t('account:data.lastname.label')}
            </DataListCell>
            <DataListCell colName="email">
              {t('account:data.email.label')}
            </DataListCell>
            <DataListCell colName="phoneNumber">
              {t('account:data.phoneNumber.label')}
            </DataListCell>
            <DataListCell
              colName="status"
              colWidth={{ base: '2rem', md: '0.5' }}
              align="center"
            >
              <Box as="span" display={{ base: 'none', md: 'block' }}>
                {t('users:data.status.label')}
              </Box>
            </DataListCell>
            <DataListCell colName="actions" colWidth="4rem" align="flex-end" />
          </DataListHeader>
          {isError && (
            <Center p={4}>
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>
                  {t('users:feedbacks.loadingUserError.title')}
                </AlertTitle>
                <AlertDescription>
                  {t('users:feedbacks.loadingUserError.description')}
                  <Button
                    colorScheme="error"
                    variant="ghost"
                    size="sm"
                    leftIcon={<FiRefreshCw />}
                    isLoading={isLoadingPage}
                    onClick={() => refetch()}
                  >
                    {t('users:list.actions.refetch')}
                  </Button>
                </AlertDescription>
              </Alert>
            </Center>
          )}
          {users?.data.length === 0 && (
            <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
              <DataListCell
                alignItems={'stretch'}
                textAlign={'center'}
                width={'100%'}
                colName="noData"
              >
                {t('users:noManager')}
              </DataListCell>
            </DataListRow>
          )}
          {users?.data.length !== 0 &&
            users?.data.map((user) => (
              <DataListRow as={LinkBox} key={user.id}>
                <DataListCell colName="name">
                  <HStack maxW="100%">
                    <Box minW="0">
                      <Text noOfLines={1} maxW="full" fontWeight="bold">
                        {user.firstName} {user.lastName}
                      </Text>
                    </Box>
                  </HStack>
                </DataListCell>
                <DataListCell colName="email">{user.email}</DataListCell>

                <DataListCell
                  colName="phoneNumber"
                  fontSize="sm"
                  position="relative"
                  pointerEvents="none"
                >
                  <Text noOfLines={1} maxW="full">
                    {user.phoneNumber}
                  </Text>
                </DataListCell>
                <DataListCell colName="status">
                  <UserStatus isActivated={user.activated} />
                </DataListCell>
                <DataListCell colName="actions">
                  <UserActions user={user} />
                </DataListCell>
              </DataListRow>
            ))}
          <DataListFooter>
            <Pagination
              isLoadingPage={isUsersLoading}
              setPage={setPage}
              page={users?.current_page}
              pageSize={users?.per_page}
              totalItems={users?.total}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination>
          </DataListFooter>
        </DataList>
      </PageContent>
    </Page>
  );
};
