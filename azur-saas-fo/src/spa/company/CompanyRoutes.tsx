import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { AdminRouteGuard } from '../router/guards';
import { EmployerRouteGuard } from '../router/guards/EmployerRouteGuard';
import { PageCompanyList } from './PageCompanyList';
import { PageCompanyUpdate } from './PageCompanyUpdate';

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminRouteGuard>
            <PageCompanyList />
          </AdminRouteGuard>
        }
      />
      <Route
        path="/update"
        element={
          <EmployerRouteGuard>
            <PageCompanyUpdate />
          </EmployerRouteGuard>
        }
      />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default CompanyRoutes;
