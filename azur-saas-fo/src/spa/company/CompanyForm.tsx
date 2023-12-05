import React from 'react';

import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldImage64bit } from '@/components/FieldImage64bit';
import { FieldInput } from '@/components/FieldInput';

export const CompanyForm = () => {
  const { t } = useTranslation(['common', 'companies']);

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
        <FieldInput name="denomination" label={t('companies:Denomination')} />
        <FieldInput name="presidentName" label={t('companies:PresidentName')} />
      </Stack>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
        <FieldInput name="siret" label={t('companies:Siret')} />
        <FieldInput name="siren" label={t('companies:Siren')} />
      </Stack>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
        <FieldInput name="adresse" label={t('companies:Address')} />
        <FieldInput name="postalCode" label={t('companies:PostalCode')} />
      </Stack>
      <FieldImage64bit name={'logo'} label={t('companies:Logo')} />
    </Stack>
  );
};
