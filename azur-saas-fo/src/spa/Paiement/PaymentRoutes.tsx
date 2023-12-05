import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { ErrorCheckoutPage } from './ErrorCheckoutPage';
import { PageCheckout } from './PageCheckout';
import { PagePayment } from './PagePayement';
import { SuccessCheckoutPage } from './SuccessCheckoutPage';
import { SuccessCheckoutPageToken } from './SuccessCheckoutPageToken';

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagePayment />} />
      <Route path="/success" element={<SuccessCheckoutPage />} />
      <Route path="/success-token" element={<SuccessCheckoutPageToken />} />
      <Route path="/error" element={<ErrorCheckoutPage />} />
      <Route path="/checkout" element={<PageCheckout />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default PaymentRoutes;
