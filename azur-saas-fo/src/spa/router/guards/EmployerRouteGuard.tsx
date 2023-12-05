import { FC } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useAccount } from '@/spa/account/account.service';

export const EmployerRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isEmployer, isLoading } = useAccount();

  if (isLoading) {
    return null;
  }

  if (!isEmployer) {
    return <ErrorPage errorCode={403} />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
