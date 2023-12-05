import React, { FC } from 'react';

import { Stack } from '@chakra-ui/react';
import { isEmail, isMaxLength, isMinLength } from '@formiz/validations';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';

interface userFormProps {
  isUpdatePage: boolean;
}

export const UserForm: FC<userFormProps> = ({ isUpdatePage }) => {
  const { t } = useTranslation(['common', 'users', 'account']);

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
          name="firstName"
          required
          label={t('users:data.firstname.label')}
        />
        <FieldInput
          name="lastName"
          required
          label={t('users:data.lastname.label')}
        />
      </Stack>
      <FieldInput
        name="phoneNumber"
        label={t('account:data.phoneNumber.label')}
      />
      <FieldInput
        name="email"
        label={t('users:data.email.label')}
        required={t('users:data.email.required') as string}
        validations={[
          {
            rule: isEmail(),
            message: t('users:data.email.invalid'),
          },
          {
            rule: isMinLength(5),
            message: t('users:data.email.tooShort', { min: 5 }),
          },
          {
            rule: isMaxLength(254),
            message: t('users:data.email.tooLong', { min: 254 }),
          },
        ]}
      />
      {!isUpdatePage && (
        <FieldInput
          name="password"
          type="password"
          label={t('account:data.password.label')}
          required={t('account:data.password.required') as string}
          validations={[
            {
              rule: isMinLength(4),
              message: t('account:data.password.tooShort', { min: 4 }),
            },
            {
              rule: isMaxLength(50),
              message: t('account:data.password.tooLong', { min: 50 }),
            },
          ]}
        />
      )}
    </Stack>
  );
};
