import React, { Suspense } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { PageLogin } from '@/spa/auth/PageLogin';
import { PageLogout } from '@/spa/auth/PageLogout';
import { Layout, Loader } from '@/spa/layout';
import {
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard,
} from '@/spa/router/guards';

import { PageAcContract } from './acContract/PageAcContract';
import { PageActivate } from './account/PageActivate';
import { useAuthContext } from './auth/AuthContext';
import { PageStandardContract } from './standardContract/PageStandardContract';
import { SuccessGuestContractPage } from './standardContract/SuccessGuestContractPage';
import { PageTmContract } from './tmContract/PageTmContract';

const SelectArgrementTypeRoutes = React.lazy(
  () => import('@/spa/selectArgrementType/SelectArgrementTypeRoutes')
);

const AdminRoutes = React.lazy(() => import('@/spa/admin/AdminRoutes'));
const AccountRoutes = React.lazy(() => import('@/spa/account/AccountRoutes'));
const DashboardRoutes = React.lazy(
  () => import('@/spa/dashboard/DashboardRoutes')
);

export const App = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={isAuthenticated ? '/admin' : '/login'}
                    replace
                  />
                }
              />

              <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <PageLogin />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path=":key-confirm-account"
                element={
                  <PublicOnlyRouteGuard>
                    <PageActivate />
                  </PublicOnlyRouteGuard>
                }
              />
              <Route
                path="logout"
                element={
                  <ErrorBoundary>
                    <PageLogout />
                  </ErrorBoundary>
                }
              />

              <Route
                path="account/*"
                element={
                  <ErrorBoundary>
                    <AccountRoutes />
                  </ErrorBoundary>
                }
              />

              <Route
                path="dashboard/*"
                element={
                  <AuthenticatedRouteGuard>
                    <DashboardRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="admin/*"
                element={
                  <AuthenticatedRouteGuard>
                    <AdminRoutes />
                  </AuthenticatedRouteGuard>
                }
              />
              <Route
                path="standard-contract-:templateId"
                element={<PageStandardContract />}
              />
              <Route
                path="standard-contract/sucess"
                element={<SuccessGuestContractPage />}
              />

              <Route path="commission-argrement" element={<PageAcContract />} />
              <Route path="merchandise-transfer" element={<PageTmContract />} />
              <Route
                path="select-argrement-type"
                element={<SelectArgrementTypeRoutes />}
              />

              <Route path="*" element={<ErrorPage errorCode={404} />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
