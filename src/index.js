import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
import App from './App';
import './utilities/translation.utility';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/themes/layout.css';
import './assets/css/themes/utilities.css';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
