import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute.js'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import Logout from '../pages/Logout.js'

function Router() {
  return (
    <div>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/logout" component={Logout} />
    </div>
  );
}

export default Router
