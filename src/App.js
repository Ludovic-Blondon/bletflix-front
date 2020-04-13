import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout.js';
import Router from './components/Router.js';

import { AuthProvider } from './providers/AuthProvider';
import { ApiProvider } from './providers/ApiProvider';
import { TestProvider } from './providers/TestProvider';

import "./styles/antd.less";
import "./styles/App.scss";

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <TestProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </TestProvider>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App
