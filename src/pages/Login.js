import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Icon } from 'antd'
import { useAuthContext } from '../providers/AuthProvider.js';

const Login = () => {

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;
  const { authLogin, authLogout, authIsLogged } = authDispatch;
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Login</h2>
      {
        authIsLogged()
        ? <Redirect to="/" />
        : (
          loading
          ? (
            <React.Fragment>
              <Icon type="loading" style={{marginRight:".5em"}} />
              Identification en cours
            </React.Fragment>
          )
          : (
            <form >
              <input defaultValue="test@example.com" placeholder="Email" />
              <input defaultValue="test" placeholder="Password" />
              <button type="submit">Sign-in</button>
            </form>
          )
        )
      }
    </div>
  );
};

export default Login;
