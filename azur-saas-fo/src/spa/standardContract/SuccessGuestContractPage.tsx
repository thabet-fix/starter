import { Alert, AlertTitle, Box, ScaleFade, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const SuccessGuestContractPage = () => {
  const { t } = useTranslation(['sdContract']);
  return (
    <Stack p="4" m="auto">
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
            {t('sdContract:SuccessSendContract')}
          </AlertTitle>
        </Alert>
      </ScaleFade>
    </Stack>
  );
};
