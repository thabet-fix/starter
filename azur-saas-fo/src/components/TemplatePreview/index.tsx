import React, { FC, useEffect, useState } from 'react';

import { Box, Input, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaSignature } from 'react-icons/fa';

import { Template } from '@/spa/contractTemplate/Template.type';

interface templatePreviewProps {
  template?: Template | undefined;
}

export const TemplatePreview: FC<templatePreviewProps> = ({ template }) => {
  const { t } = useTranslation(['template']);
  const [editorContent, setEditorContent] = useState<string[]>([]);

  useEffect(() => {
    const newWords = template?.contents[0]?.content.split('@');

    typeof newWords === 'undefined'
      ? setEditorContent([])
      : setEditorContent(newWords);
  }, [template]);

  const generatedTemplate =
    editorContent.length > 0
      ? editorContent.map((word, index) => {
          // Affichage Aperçu forumlaire
          if (word.includes('[')) {
            // Replace with FieldInput component

            const underIndex = word.indexOf('[');
            const lessThanIndex = word.indexOf(']', underIndex);
            const wordName = word.substring(underIndex + 1, lessThanIndex);
            return (
              <React.Fragment key={index}>
                <Input required={false} name={wordName} />
              </React.Fragment>
            );
          } else {
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html:
                    index !== editorContent.length - 1 ? word + ' ' : word,
                }}
              />
            );
          }
        })
      : null;

  return (
    <Stack
      maxHeight={'250px'}
      width={['100%']}
      mr={[0, 0, 0, 0, 4]}
      direction="column"
      position="relative"
      mb="20"
    >
      <Stack
        width={['100%']}
        maxHeight={['none', 'none', 'none', 'none', 'calc(100vh - 5px)']}
        overflowY={['auto', 'auto', 'auto', 'auto', 'auto']}
        direction="column"
        borderRadius="lg"
        spacing="6"
        padding={6}
        shadow="md"
        bg="white"
        _dark={{ bg: 'gray.900' }}
        p="6"
        style={{
          transform: `scale(0.7)`,
          transformOrigin: 'top',
          border: '3px solid #ffc107',
          // maxHeight:'250px',
        }}
      >
        <div>{generatedTemplate}</div>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {template?.labelSign1
              ? template.labelSign1
              : t('template:SignatureEmployee')}
          </Text>
          <FaSignature size={50} />
        </Box>
      </Stack>
    </Stack>
  );
};
