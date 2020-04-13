import React from 'react';
import MyHeader from './Header.js';

import { Layout } from 'antd';

const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
      <Layout className="layout">
	    <MyHeader />
	    <Content>
			{children}
	    </Content>
	    <Footer style={{ textAlign: 'center' }}>bletflix ©2020 Created by lb-developpeur</Footer>
	  </Layout>
  );
};

export default AppLayout;
