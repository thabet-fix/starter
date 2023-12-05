import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageCoontractLink } from './PageContractLink';

const GenerateLinkRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageCoontractLink />}></Route>
      <Route path="*" element={<ErrorPage errorCode={404} />}></Route>
    </Routes>
  );
};
export default GenerateLinkRoutes;
