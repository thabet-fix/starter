import React, { useEffect, useState } from 'react';

import { Stack } from '@chakra-ui/react';
import { useForm } from '@formiz/core';
import { isNumber } from '@formiz/validations';
import { useTranslation } from 'react-i18next';

import { FieldEditor } from '@/components/FieldEditor';
import { FieldInput } from '@/components/FieldInput';
import { FieldRadios } from '@/components/FieldRadios';

export const PackForm = () => {
  const { t } = useTranslation(['common', 'pack']);
  const { values } = useForm();
  const [htmlValue, setHtmlValue] = useState('');
  useEffect(() => {
    setHtmlValue(values.descriptionField);
  }, [values]);

  const isAiOptionSelected = values.optionAi ? values.optionAi === '1' : true;

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
      <FieldInput
        name="name"
        required={t('common:use.required')}
        label={t('pack:Form.Name')}
      />
      <FieldEditor
        name="descriptionField"
        label={t('pack:Form.Description')}
        // required={t('common:use.required')}
        initialHtml={htmlValue}
      />
      <FieldInput name="stripeId" label="Stripe pack id" />
      <FieldInput
        name="price"
        required={t('common:use.required')}
        label={t('pack:Form.Price')}
      />
      <FieldInput
        name="contractNb"
        label={t('pack:Form.contractNb')}
        helper={t('pack:Form.UnlimitedValue')}
      />
      <FieldRadios
        name="optionAi"
        required={t('common:use.required')}
        label={t('pack:Form.OptionAi')}
        options={[
          { label: t('pack:Form.Yes'), value: '1' },
          { label: t('pack:Form.No'), value: '0' },
        ]}
        defaultValue="1"
      />
      {isAiOptionSelected && (
        <FieldInput
          name="quotaAi"
          label={t('pack:Form.QuotaAi')}
          helper={t('pack:Form.UnlimitedValue')}
        />
      )}
      <FieldInput
        name="period"
        label={t('pack:Form.Period')}
        helper={t('pack:Form.UnlimitedValue')}
        validations={[
          {
            rule: isNumber(),
            message: t('pack:Form.IntegerValue'),
          },
        ]}
      />
    </Stack>
  );
};
