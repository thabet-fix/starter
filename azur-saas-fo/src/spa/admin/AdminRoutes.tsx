import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import { PageApiDocumentation } from '@/spa/admin/api/PageApiDocumentation';

import ConfigurationRoutes from '../Configuration/ConfigurationRoutes';
import PackRoutes from '../Packs/PackRoutes';
import PaymentRoutes from '../Paiement/PaymentRoutes';
import AcContractRoutes from '../acContract/AcContractRoutes';
import { useAccount } from '../account/account.service';
import ContextRoutes from '../aiContext/AiContextRoutes';
import BillingRoutes from '../billing/BillingRoutes';
import CompanyRoutes from '../company/CompanyRoutes';
import TemplateRoutes from '../contractTemplate/TemplateRoutes';
import LanguageRoutes from '../language/LanguageRoutes';
import {
  AdminRouteGuard,
  EmployerAndManagerRouteGuard,
} from '../router/guards';
import { EmployerRouteGuard } from '../router/guards/EmployerRouteGuard';
import StandardContractRoutes from '../standardContract/standardContractRoutes';
import TmContractRoutes from '../tmContract/TmContractRoutes';

const AdminUsersRoutes = React.lazy(
  () => import('@/spa/admin/users/AdminUsersRoutes')
);
const GenerateLinkRoutes = React.lazy(
  () => import('@/spa/generateContractLink/GenerateLinkRoutes')
);

const AdminRoutes = () => {
  const { isAdmin, isLoading: accountLoading } = useAccount();
  return (
    <Routes>
      {!accountLoading && (
        <>
          <Route
            path="/"
            element={
              <Navigate
                to={isAdmin ? 'settings/company' : 'standard-contract/list-all'}
                replace
              />
            }
          />
          <Route
            path="settings/users/*"
            element={
              <EmployerRouteGuard>
                <AdminUsersRoutes />
              </EmployerRouteGuard>
            }
          />
          <Route path="api/*" element={<PageApiDocumentation />} />
          <Route path="commission-argrement/*" element={<AcContractRoutes />} />
          <Route path="merchandise-transfer/*" element={<TmContractRoutes />} />
          <Route
            path="standard-contract/*"
            element={<StandardContractRoutes />}
          />
          <Route path="send-page-link" element={<GenerateLinkRoutes />} />
          <Route
            path="settings/language/*"
            element={
              <AdminRouteGuard>
                <LanguageRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="settings/Pack/*"
            element={
              <AdminRouteGuard>
                <PackRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="settings/payment/*"
            element={
              <EmployerRouteGuard>
                <PaymentRoutes />{' '}
              </EmployerRouteGuard>
            }
          />
          <Route
            path="settings/billing/*"
            element={
              <EmployerRouteGuard>
                <BillingRoutes />
              </EmployerRouteGuard>
            }
          />
          <Route
            path="settings/ai-cadre/*"
            element={
              <AdminRouteGuard>
                <ContextRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="settings/configuration/*"
            element={
              <AdminRouteGuard>
                <ConfigurationRoutes />
              </AdminRouteGuard>
            }
          />
          <Route path="settings/company/*" element={<CompanyRoutes />} />
          <Route
            path="template/*"
            element={
              <EmployerAndManagerRouteGuard>
                <TemplateRoutes />
              </EmployerAndManagerRouteGuard>
            }
          />
          <Route path="*" element={<ErrorPage errorCode={404} />} />
        </>
      )}
    </Routes>
  );
};

export default AdminRoutes;
