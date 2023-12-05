import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageList } from './PageList';
import { PageValidateContract } from './PageValidateContract';

const AcContractRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageList />} />
      <Route path="/:contractId" element={<PageValidateContract />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default AcContractRoutes;
