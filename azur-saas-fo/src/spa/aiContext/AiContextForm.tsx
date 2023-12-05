import React, { FC } from 'react';

import { IconButton, Stack, Text } from '@chakra-ui/react';
import { useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

// import { FieldEditor } from '@/components/FieldEditor';
import { FieldInput } from '@/components/FieldInput';
import { FieldTextarea } from '@/components/FieldTextarea';
import { useRepeater } from '@/hooks/useRepeater';

import { Context } from './AiContext.type';

interface contextFormProps {
  context?: Context | undefined;
}
export const ContextForm: FC<contextFormProps> = ({ context }) => {
  const { t } = useTranslation(['common', 'aiContext']);
  // const { values } = useForm();
  // const [htmlValue, setHtmlValue] = useState('');
  // useEffect(() => {
  //   setHtmlValue(values.context);
  // }, [values]);

  const form = useForm();
  const collection = useRepeater({
    name: 'contextFlields',
    form,
    initialValues: context?.fields || [{}],
  });

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
        label={t('aiContext:Form.Name')}
      />
      {/* <FieldEditor
        name="context"
        label="Cadre"
        required={t('common:use.required')}
        initialHtml={htmlValue}
      /> */}

      <FieldTextarea
        name="context"
        label={t('aiContext:Form.Context')}
        required={t('common:use.required')}
      />
      {/* context fields */}

      {collection.keys.map((key: TODO, index: TODO) => (
        <Stack key={key}>
          <Stack
            my="4"
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Text>
              {t('aiContext:Form.Field')} {index + 1}
            </Text>
            <IconButton
              aria-label="Delete"
              icon={<FiTrash2 />}
              disabled={!(collection.keys.length > 1)}
              onClick={() =>
                collection.keys.length > 1 && collection.remove(index)
              }
            />
          </Stack>
          <Stack
            direction="row"
            spacing="4"
            data-test={`repeater-item[${index}]`}
          >
            <FieldInput
              name={`contextFlields[${index}].label`}
              label={t('aiContext:Form.Name') as string}
              required={t('common:use.required')}
            />
            <FieldInput
              name={`contextFlields[${index}].value`}
              label={t('aiContext:Form.Value') as string}
              required={t('common:use.required')}
              helper={'Exp: @[value]@'}
            />
          </Stack>
          <IconButton
            aria-label="Add"
            icon={<FiPlus />}
            size="sm"
            onClick={() => {
              collection.insert(index + 1);
              setTimeout(function () {
                window.scrollTo(0, document.body.scrollHeight);
              }, 200);
            }}
            isDisabled={collection.length > 20}
          />
        </Stack>
      ))}
      {/* fin */}
    </Stack>
  );
};
