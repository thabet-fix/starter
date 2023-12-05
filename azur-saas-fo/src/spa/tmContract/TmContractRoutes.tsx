import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageTmList } from './PageTmList';
import { PageValidateTmContract } from './PageValidateTmContract';

const TmContractRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTmList />} />
      <Route path="/:contractId" element={<PageValidateTmContract />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default TmContractRoutes;
