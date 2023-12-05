import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageStandardList } from './PageStandardContractList';
import { PageValidateStandardContract } from './PageValidateStandardContract';

const StandardContractRoutes = () => {
  return (
    <Routes>
      <Route path="/list-:templateId" element={<PageStandardList />} />
      <Route path="/:contractId" element={<PageValidateStandardContract />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default StandardContractRoutes;
