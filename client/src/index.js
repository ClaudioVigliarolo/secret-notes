import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const AppWithRouter = withRouter(App);
ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.getElementById('root')
);
