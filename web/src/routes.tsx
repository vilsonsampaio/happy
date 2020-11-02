import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

import Success from './pages/Success';

import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Dashboard from './pages/Dashboard';
import EditOrphanage from './pages/EditOrphanage';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanagesMap} />

        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanages/:id" exact component={Orphanage} />

        <Route path="/success" exact component={Success} />

        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/reset-password" exact component={ResetPassword} />

        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/orphanages/edit/:id/" exact component={EditOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
