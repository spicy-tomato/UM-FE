import { Spinner } from '@chakra-ui/react';
import { NotFound } from '@components';
import { RoleConstantValue } from '@constants';
import { RootState } from '@redux';
import { useSelector } from 'react-redux';

type ProtectedRouteProps =
  | {
      role: RoleConstantValue;
      children: JSX.Element;
    }
  | {
      roles: RoleConstantValue[];
      children: JSX.Element;
    };

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const role = useSelector((store: RootState) => store.auth.user?.role);

  if (!role) {
    return <Spinner />;
  }

  if (
    ('role' in props && props.role === role) ||
    ('roles' in props && props.roles.includes(role))
  ) {
    return props.children;
  }

  return <NotFound />;
};

export { ProtectedRoute };
