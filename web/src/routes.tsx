import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import { AuthProvider } from './contexts/auth';

import useAuth from './hooks/useAuth';

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
import DeleteOrphanage from './pages/DeleteOrphanage';

interface ProtectedRoute extends RouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRoute> = ({ component: Component, ...rest }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <h1>Carregando...</h1>
  }
  
  return (
    <Route 
      {...rest} 
      render={(props) => authenticated 
        ? <Component />
        : <Redirect 
            to={{ 
              pathname: '/sign-in', 
              state: { from: props.location }, 
            }} 
          />
      }
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/app" exact component={OrphanagesMap} />

          <Route path="/orphanages/create" exact component={CreateOrphanage} />
          <Route path="/orphanages/:id" exact component={Orphanage} />

          <Route path="/success" exact component={Success} />

          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/reset-password" exact component={ResetPassword} />

          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <ProtectedRoute path="/orphanages/edit/:id/" exact component={EditOrphanage} />
          <ProtectedRoute path="/orphanages/delete/:id/" exact component={DeleteOrphanage} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
