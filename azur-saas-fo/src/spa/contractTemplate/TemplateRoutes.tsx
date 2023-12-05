import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageTemplateCreate } from './PageTemplateCreate';
import { PageTemplateList } from './PageTemplateList';
import { PageTemplateUpdate } from './PageTemplateUpdate';

const TemplateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTemplateList />} />
      <Route path="/create" element={<PageTemplateCreate />} />
      <Route path="/update/:id" element={<PageTemplateUpdate />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default TemplateRoutes;
