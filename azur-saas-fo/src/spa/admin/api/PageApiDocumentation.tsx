import React from 'react';

import { Box } from '@chakra-ui/react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { TemplateContratNav } from '@/spa/admin/TemplateContratNav';
import { Page, PageContent } from '@/spa/layout';

export const PageApiDocumentation = () => {
  return (
    <Page containerSize="xl" nav={<TemplateContratNav />}>
      <PageContent>
        <Box borderRadius="md" bg="transparent" _dark={{ bg: 'gray.200' }}>
          <SwaggerUI url="/open-api.json" />
        </Box>
      </PageContent>
    </Page>
  );
};
