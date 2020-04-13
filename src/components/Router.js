import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute.js'
import AdminRoute from './AdminRoute.js'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import Logout from '../pages/Logout.js'
import New from '../pages/New.js'

function Router() {
  return (
    <div>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/logout" component={Logout} />
      <AdminRoute path="/admin/new" component={New} />
    </div>
  );
}

export default Router
