import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageConfiguration } from './PageConfiguration';

const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageConfiguration />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default ConfigurationRoutes;
