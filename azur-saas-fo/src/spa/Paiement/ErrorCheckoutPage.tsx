import {
  Alert,
  AlertTitle,
  Button,
  Center,
  ScaleFade,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

export const ErrorCheckoutPage = () => {
  const { t } = useTranslation(['payment']);
  return (
    <Stack p="4" m="auto">
      <ScaleFade initialScale={0.9} in>
        <Alert
          status="error"
          variant="solid"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="lg"
          px="8"
          py="4"
        >
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {t('payment:errorCheckout')}
          </AlertTitle>
        </Alert>
        <Center mt="8">
          <Button
            as={RouterLink}
            to="/admin/settings/payment"
            variant="link"
            color="#318ba2"
            _dark={{ color: 'brand.300' }}
          >
            {t('payment:goToPayment')}
          </Button>
        </Center>
      </ScaleFade>
    </Stack>
  );
};
