// src/index.js
import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from "./store";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <Provider store={store}> 
  <GoogleOAuthProvider clientId="670670362084-q8pifr0jagdh5cbr67eo9lm9v2hvjmbs.apps.googleusercontent.com">
  <Router>
    <App />
  </Router>
  </GoogleOAuthProvider>
</Provider>,
  document.getElementById('root')
);
