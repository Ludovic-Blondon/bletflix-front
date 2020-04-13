import React from 'react';
import { Layout, Avatar } from 'antd';

import { useAuthContext } from '../providers/AuthProvider.js';

const Header = () => {

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;

  return (
    <Layout.Header className="header">
        Header
    </Layout.Header>
  );
};

export default Header;
