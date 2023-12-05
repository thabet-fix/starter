import React from 'react';

import { Button, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { TemplatePreview } from '@/components/TemplatePreview';

import { useTemplateList } from '../contractTemplate/Template.service';
import { Page, PageContent } from '../layout';

export const PageSelectArgrement = () => {
  const { TemplateList } = useTemplateList();

  const { t } = useTranslation(['template']);
  return (
    <Page containerSize="xl">
      <PageContent>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {TemplateList?.data.map((template) => (
            <GridItem
              position={'relative'}
              flexGrow={1}
              key={template.id}
              rounded="md"
              overflow="hidden"
              bg={'white'}
              p="7"
              m="10px"
              width={'100%'}
              maxWidth={'100%'}
              _hover={{
                boxShadow: 'rgb(33 33 33 / 27%) 0px 0px 15px',
              }}
            >
              <Stack
                spacing={4}
                direction="column"
                alignItems="left"
                justifyContent="center"
              >
                <Text fontSize="md" textAlign="center" fontWeight={600}>
                  {template?.name}
                </Text>
                {template.contents[0] && (
                  <TemplatePreview template={template} />
                )}

                <Stack
                  position={'absolute'}
                  bottom={'7'}
                  right={'0'}
                  left={'0'}
                  justifyContent="center"
                  spacing={{ base: 4, md: 6 }}
                  direction={{ base: 'row', md: 'column', lg: 'row' }}
                >
                  <Button
                    bg="linear-gradient(180deg, #297ff6, #6f44eb)"
                    _hover={{
                      bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                      transition: 'background 0.3s',
                    }}
                    _focus={{
                      bg: 'linear-gradient(90deg, #297ff6, #6f44eb)',
                      transition: 'background 0.3s',
                    }}
                    rounded="xl"
                    color={'white'}
                    boxShadow="md"
                    as={RouterLink}
                    to={`/standard-contract-${template.id}`}
                  >
                    {t('template:useTemplate')}
                  </Button>
                </Stack>
              </Stack>
            </GridItem>
          ))}
        </SimpleGrid>
      </PageContent>
    </Page>
  );
};
