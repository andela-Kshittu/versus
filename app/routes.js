import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import ContactPage from './components/contact/ContactPage';

export default ( 
    <Route path="/" component={ App } >
        <IndexRoute component={ HomePage }/> 
        <Route path="login" component={ LoginPage }/> 
        <Route path="contact" component={ ContactPage }/> 
    </Route>
);