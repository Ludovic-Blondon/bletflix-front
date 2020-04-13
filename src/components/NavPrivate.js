import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import { useAuthContext } from '../providers/AuthProvider.js';

const NavPrivate = () => {

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;

  let location = useLocation()

  return (
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        >
        <Menu.Item key="/">
          <Icon type="home" />
          <span>Home</span>
          <Link to="/"></Link>
        </Menu.Item>
        <Menu.Item key="/private">
          <Icon type="lock" />
          <span>Private</span>
          <Link to="/private"></Link>
        </Menu.Item>
        <Menu.Item key="/clusters">
          <Icon type="lock" />
          <span>Clusters</span>
          <Link to="/clusters"></Link>
        </Menu.Item>
        <Menu.Item key="/logout">
          <Icon type="logout" />
          <span>Logout</span>
          <Link to="/logout"></Link>
        </Menu.Item>
      </Menu>
  );
};

export default NavPrivate;
