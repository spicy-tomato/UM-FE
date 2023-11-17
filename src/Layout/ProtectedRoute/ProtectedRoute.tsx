import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import NotFound from '../../Pages/Errors/NotFound/NotFound';
import { RoleConstantValue } from '../../shared/constants';

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
    return <Navigate to='/login' replace />;
  }

  if (
    ('role' in props && props.role === role) ||
    ('roles' in props && props.roles.includes(role))
  ) {
    return props.children;
  }

  return <NotFound />;
};

export default ProtectedRoute;
