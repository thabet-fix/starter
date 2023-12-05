import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Center,
  ScaleFade,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';

import { useSuccessPaymentToken } from './Payment.service';

export const SuccessCheckoutPageToken = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { isLoading: successLoading } = useSuccessPaymentToken(sessionId);
  const { t } = useTranslation(['payment']);
  return (
    <Stack p="4" m="auto">
      {!successLoading && (
        <ScaleFade initialScale={0.9} in>
          <Alert
            status="success"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="lg"
            px="8"
            py="4"
          >
            <Box fontSize="3rem">🎉</Box>
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {t('payment:successTokenCheckout')}
            </AlertTitle>
          </Alert>
          <Center mt="8">
            <Button
              as={RouterLink}
              to="/admin/standard-contract/list-all"
              variant="link"
              color="#318ba2"
              _dark={{ color: 'brand.300' }}
            >
              {t('payment:goToDashboard')}
            </Button>
          </Center>
        </ScaleFade>
      )}
    </Stack>
  );
};
