/*import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Main from './components/main/Main';
import NotFound from './components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles-template/styles/styles.1.1.0.min.css';
import './styles/app.css';

export default function() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route
        exact
        path="/register"
        render={() => <Register component={Register} />}
      />
      <Route exact path="/login" render={() => <Login component={Login} />} />
      <Route path="/secretNotes" render={() => <Main component={Main} />} />
      <Route path="" component={NotFound} />
    </Switch>
  );
}

*/
import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//import Main from './components/main/Main';
import NotFound from './components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles-template/styles/styles.1.1.0.min.css';
import './styles/app.css';

const Main = lazy(() => import('./components/main/Main'));

export default function() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route
        exact
        path="/register"
        render={() => <Register component={Register} />}
      />
      <Route exact path="/login" render={() => <Login component={Login} />} />
      <Route
        path="/secretNotes"
        render={() => <Main component={WaitingComponent(Main)} />}
      />
      <Route path="" component={NotFound} />
    </Switch>
  );
}

function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}
