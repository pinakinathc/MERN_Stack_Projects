'use strict'
// React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//React-Router
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import Combined Reducers
import reducers from './reducers/index';

//Import Actions
//import {addToCart} from './actions/cartActions';
//import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

//Step 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Main from './main';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';

const Routes = (
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={BooksList}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/admin" component={BooksForm}/>
    </Route>
  </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);