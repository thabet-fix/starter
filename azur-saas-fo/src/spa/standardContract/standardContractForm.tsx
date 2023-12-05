import React, { FC, useEffect, useState } from 'react';

import { Box, Center, HStack, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';
import { FlagsBar } from '@/components/FlagsBar';

import { Content, Template } from '../contractTemplate/Template.type';

interface templateFormProps {
  templates?: Template;
  selectedLang?: (id: string | number | undefined) => void;
  overview?: boolean;
}

export const StandardContractForm: FC<templateFormProps> = ({
  templates,
  selectedLang,
  overview,
}) => {
  const { t } = useTranslation(['common', 'acContract', 'dashboard']);

  // Create state for the words
  const [words, setWords] = useState<string[]>([]);
  // set the first content in template as default value of template
  const [htmlValue, setHtmlValue] = useState(
    templates?.contents[0]?.content || ''
  );
  // find the content of template by selected language id
  const findContentByLangId = (
    contentTemplate: Content[],
    selectedLanguage: number | string
  ) => {
    return contentTemplate.find(
      (content) => content.langId === selectedLanguage
    );
  };

  // get an array of all template languages
  const templateLanguages: TODO = [];
  templates?.contents.map((value: TODO) =>
    templateLanguages.push(value.language)
  );
  // Update the words whenever the template changes
  useEffect(() => {
    const template = htmlValue;
    const newWords = template.split('@');
    setWords(newWords);
  }, [templates, htmlValue]);

  const generatedTemplate = words.map((word, index) => {
    if (word.includes('[')) {
      // Replace with FieldInput component

      const underIndex = word.indexOf('[');
      const lessThanIndex = word.indexOf(']', underIndex);
      const wordName = word.substring(underIndex + 1, lessThanIndex);
      return (
        <React.Fragment key={index}>
          {!overview ? (
            <FieldInput
              required={t('common:use.required')}
              name={wordName}
              helper={t('common:use.required')}
            />
          ) : (
            <Input required={false} name={wordName} />
          )}
        </React.Fragment>
      );
    } else {
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{
            __html: index !== words.length - 1 ? word + ' ' : word,
          }}
        />
      );
    }
  });
  const handleFlagClick = (id: string) => {
    if (selectedLang) {
      selectedLang(id);
    }
    const selectedContent = findContentByLangId(templates?.contents || [], id);
    selectedContent !== undefined
      ? setHtmlValue(selectedContent.content)
      : setHtmlValue('');
    // Ici, vous pouvez faire ce que vous voulez avec l'id du drapeau.
  };

  return (
    <>
      <Box>
        <Center>
          <HStack>
            <FlagsBar flags={templateLanguages} onFlagClick={handleFlagClick} />
          </HStack>
        </Center>
        {generatedTemplate}
      </Box>
    </>
  );
};
