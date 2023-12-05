import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PagePackCreate } from './PagePackCreate';
import { PagePackList } from './PagePackList';
import { PagePackUpdate } from './PagePackUpdate';

const PackRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagePackList />} />
      <Route path="/create" element={<PagePackCreate />} />
      <Route path="/update/:id" element={<PagePackUpdate />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default PackRoutes;
