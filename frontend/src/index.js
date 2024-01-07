// src/index.js
import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from "./store";


ReactDOM.render(
  <Provider store={store}> 
  <Router>
    <App />
  </Router>
</Provider>,
  document.getElementById('root')
);
