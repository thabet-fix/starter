import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { is } from 'cypress/types/bluebird';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useToastError } from '@/components/Toast';

import { usePackDetails, usePackList } from '../Packs/Pack.service';
import { Pack } from '../Packs/Pack.type';
import { useAccount } from '../account/account.service';
import { useBilling } from '../billing/Billing.service';
import { Page, PageContent, PageTopBar } from '../layout';
import { useSubscriptionUrl } from './Payment.service';

export const PagePayment = () => {
  const navigate = useNavigate();
  const { PackList, isLoading: isPackLoading } = usePackList();
  const { t } = useTranslation(['common', 'payment']);
  const { account } = useAccount();
  const { PackDetails, isLoading: detailsLoading } = usePackDetails(
    localStorage.getItem('accountId')
  );

  const toastError = useToastError();

  const { mutate: stripeUrl } = useSubscriptionUrl({
    onSuccess: (data) => {
      Object.keys(data.url).length !== 0
        ? window.open(data.url, '_blank')
        : null;
      // window.location.href = data.url;
    },
    onError: () => {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    },
  });

  const getSubscriptionUrl = async (pack: Pack) => {
    const data = {
      packId: pack.id,
    };
    try {
      await stripeUrl(data);
    } catch (error) {
      toastError({
        title: t('common:use.errorOccurred'),
      });
    }
  };

  const [isPayedBefore, setIsPayedBefore] = useState(false);
  const [portalUrl, setPortalUrl] = useState('');

  const { isLoading: billingLoading } = useBilling({
    onSuccess: (response) => {
      if (response) {
        setIsPayedBefore(true);
        setPortalUrl(response.url);
      }
    },
  });
  const getPortalUrl = () => {
    window.location.href = portalUrl;
  };

  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('payment:ChooseYourPack')}</Heading>
          </HStack>
        </PageTopBar>
        {(isPackLoading || detailsLoading) && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}

        {!isPackLoading && !detailsLoading && (
          <HStack justifyContent={'center'}>
            <Flex align="stretch" direction={{ base: 'column', md: 'row' }}>
              {PackList?.data.map((pack) => (
                <GridItem
                  position={'relative'}
                  flexGrow={1}
                  key={pack.id}
                  rounded="md"
                  overflow="hidden"
                  bg={'white'}
                  p="7"
                  pb="20"
                  m="10px"
                  width={{ base: '100%', md: '50%' }}
                  maxWidth={{ base: '100%', md: '250px' }}
                  _hover={{
                    boxShadow: 'rgb(33 33 33 / 27%) 0px 0px 15px',
                  }}
                  style={
                    account?.packId === pack.id
                      ? {
                          boxShadow: 'rgb(33 33 33 / 27%) 0px 0px 15px',
                          borderRadius: '10px',
                          background:
                            'linear-gradient(180deg, #297ff6, #6f44eb)',
                          color: '#fff',
                        }
                      : {
                          border: '1px solid #c8c8c8',
                          color: '#555',
                          borderRadius: '10px',
                        }
                  }
                >
                  <Stack
                    spacing={4}
                    direction="column"
                    alignItems="left"
                    justifyContent="center"
                  >
                    <Text fontSize="md" textAlign="center" fontWeight={600}>
                      {pack?.name}
                    </Text>
                    <Box
                      fontSize="sm"
                      dangerouslySetInnerHTML={{
                        __html: pack?.description,
                      }}
                    />
                    {account?.packId === pack.id && PackDetails?.expiredIn && (
                      <Text fontSize="sm" textAlign="left">
                        {t('payment:ExpirationDate')}

                        {PackDetails.expiredIn.split(' ')[0]}
                      </Text>
                    )}
                    {account?.packId === pack.id &&
                      PackDetails?.contractNb &&
                      !PackDetails?.isExpired && (
                        <Text fontSize="sm" textAlign="left">
                          {t('payment:RemainingContract')}
                          {PackDetails.contractNb - account?.contractNbCreated}
                        </Text>
                      )}
                    {account?.packId === pack.id && PackDetails?.isExpired && (
                      <Text
                        fontSize="xs"
                        color={'white'}
                        textAlign="center"
                        fontWeight={'bold'}
                      >
                        {' '}
                        {t('payment:SubscriptionExhausted')}{' '}
                      </Text>
                    )}

                    <Stack
                      position={'absolute'}
                      bottom={'7'}
                      right={'0'}
                      left={'0'}
                      justifyContent="center"
                      spacing={{ base: 4, md: 6 }}
                      direction={{ base: 'row', md: 'column', lg: 'row' }}
                    >
                      {pack.price !== '0.00' &&
                        pack.id !== PackDetails?.packId &&
                        !billingLoading &&
                        !isPayedBefore && (
                          <Button
                            bg="linear-gradient(180deg, #297ff6, #6f44eb)"
                            _hover={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            _focus={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            rounded="xl"
                            color={'white'}
                            boxShadow="md"
                            onClick={() => getSubscriptionUrl(pack)}
                          >
                            {t('payment:Buy')}
                          </Button>
                        )}
                      {pack.price !== '0.00' &&
                        pack.id !== PackDetails?.packId &&
                        !billingLoading &&
                        isPayedBefore && (
                          <Button
                            bg="linear-gradient(180deg, #297ff6, #6f44eb)"
                            _hover={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            _focus={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            rounded="xl"
                            color={'white'}
                            boxShadow="md"
                            onClick={() => getPortalUrl()}
                          >
                            {t('payment:Buy')}
                          </Button>
                        )}
                      {account?.packId === pack.id &&
                        PackDetails?.isExpired &&
                        !billingLoading &&
                        !isPayedBefore && (
                          <Button
                            bg="linear-gradient(180deg, #297ff6, #6f44eb)"
                            _hover={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            _focus={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            rounded="xl"
                            color={'white'}
                            boxShadow="md"
                            onClick={() => getSubscriptionUrl(pack)}
                          >
                            {t('payment:Renew')}
                          </Button>
                        )}
                      {account?.packId === pack.id &&
                        PackDetails?.isExpired &&
                        !billingLoading &&
                        isPayedBefore && (
                          <Button
                            bg="linear-gradient(180deg, #297ff6, #6f44eb)"
                            _hover={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            _focus={{
                              bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                              transition: 'background 0.3s',
                            }}
                            rounded="xl"
                            color={'white'}
                            boxShadow="md"
                            onClick={() => getPortalUrl()}
                          >
                            {t('payment:Renew')}
                          </Button>
                        )}
                    </Stack>
                  </Stack>
                </GridItem>
              ))}
            </Flex>
          </HStack>
        )}
      </PageContent>
    </Page>
  );
};
