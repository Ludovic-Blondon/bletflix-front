import React, { useEffect, useRef } from 'react';

import { useAuthContext } from '../providers/AuthProvider.js';

const Logout = () => {
  const [authState, authDispatch] = useAuthContext();
  const { authLogout } = authDispatch;

  useEffect(() => {
    authLogout();
  })

  return null;
};

export default Logout;
