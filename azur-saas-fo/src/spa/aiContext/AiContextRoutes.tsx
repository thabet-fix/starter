import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageContextCreate } from './PageAiContextCreate';
import { PageContextList } from './PageAiContextList';
import { PageContextUpdate } from './PageAiContextUpdate';

const ContextRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageContextList />} />
      <Route path="/create" element={<PageContextCreate />} />
      <Route path="/update/:id" element={<PageContextUpdate />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default ContextRoutes;
