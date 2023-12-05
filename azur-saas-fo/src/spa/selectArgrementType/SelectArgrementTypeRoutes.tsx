import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageSelectArgrement } from './PageSelectArgrement';

const SelectArgrementTypeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageSelectArgrement />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default SelectArgrementTypeRoutes;
