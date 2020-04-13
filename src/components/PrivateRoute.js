import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider.js';

const PrivateRoute = ({component: Component, ...rest}) => {

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;
  const { authIsLogged } = authDispatch;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      authIsLogged()
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};

export default PrivateRoute;
