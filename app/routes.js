import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import ResultPage from './components/result/ResultPage';
import ContactPage from './components/contact/ContactPage';

export default ( 
    <Route path="/" component={ App } >
        <IndexRoute component={ HomePage }/> 
        <Route path="result" component={ ResultPage }/> 
        <Route path="contact" component={ ContactPage }/> 
    </Route>
);