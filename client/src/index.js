import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import App from './App';



const AppWithRouter = withRouter(App);
ReactDOM.render(<HashRouter><AppWithRouter /></HashRouter>, document.getElementById('root'));

