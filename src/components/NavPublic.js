import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const NavPublic = () => {

  let location = useLocation()

  return (
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        >
        <Menu.Item key="/">
          <Icon type="home" />
          <span>Home</span>
          <Link to="/home"></Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Icon type="login" />
          <span>Login</span>
          <Link to="/login"></Link>
        </Menu.Item>
      </Menu>
  );
};

export default NavPublic;
