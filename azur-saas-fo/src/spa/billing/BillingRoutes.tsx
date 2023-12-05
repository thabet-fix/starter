import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageBilling } from './PageBIlling';

const BillingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageBilling />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default BillingRoutes;
