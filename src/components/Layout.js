import React from 'react';
import { Layout } from 'antd';
import Header from './Header.js';

const AppLayout = ({ children }) => {
  return (
    <Layout className="root-layout" style={{ minHeight: '100vh' }}>
      <Header />
      <Layout style={{padding:'1em'}}>
        {children}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
