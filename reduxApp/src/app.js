'use strict'
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// Import Combined Reducers
import reducers from './reducers/index';

//Import Actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

//Step 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// store.subscribe(function(){
//   console.log('current state is: ', store.getState());
// })

//Step 2 create and dispatch actions
store.dispatch(postBooks(
  [{
    id: 1,
    title:'this is the book title',
    description: 'this is the book description',
    price: 33.33
  },
  {
    id: 2,
    title: 'this is the second book title',
    description: 'this is the second book description',
    price: 50
  }]
))


// store.dispatch({
//   type:"POST_BOOK",
//   payload: [{
//     id: 1,
//     title:'this is the book title',
//     description: 'this is the book description',
//     price: 33.33
//   },
//   {
//     id: 2,
//     title: 'this is the second book title',
//     description: 'this is the second book description',
//     price: 50
//   },]
// })

//Dispatch another book
// store.dispatch({
//   type:"POST_BOOK",
//   payload: [{
//     id: 3,
//     title: 'this is the third book title',
//     description: 'this is the third book description',
//     price: 40
//   }]
// })

//Delete a book
store.dispatch(deleteBooks(
  {id: 1}
))
//store.dispatch({type:"DELETE_BOOK", payload:{id:1}})

//Update a book
store.dispatch(updateBooks(
  {id:1, title:"This is new title"}
))
//store.dispatch({type:"UPDATE_BOOK", payload:{id:1, title:"This is new title"}})

//-->> CART ACTION <<--
// ADD TO CART 
store.dispatch(addToCart([{id: 1 }]))