import React from 'react';

import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';

export const ConfigurationForm = () => {
  const { t } = useTranslation(['configuration']);
  return (
    <Stack
      direction="column"
      borderRadius="lg"
      spacing="6"
      shadow="md"
      bg="white"
      _dark={{ bg: 'gray.900' }}
      p="6"
    >
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
        <FieldInput
          name="tokenQuotaExtra"
          label={t('configuration:Form.NbToken')}
        />
        <FieldInput
          name="tokenPriceExtra"
          label={t('configuration:Form.PriceToken')}
        />
      </Stack>
    </Stack>
  );
};
