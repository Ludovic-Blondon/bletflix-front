import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider.js';

const AdminRoute = ({component: Component, ...rest}) => {

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;
  const { authIsAdmin } = authDispatch;

  return (
    <Route {...rest} render={props => (
      authIsAdmin()
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};

export default AdminRoute;
