'use strict'
import {createStore} from 'redux';

//Step 3 define reducers
const reducer = function(state={books:[]}, action){
  switch(action.type){
    case 'POST_BOOK':
      return {books:[...state.books, ...action.payload]};
      break;

    case 'DELETE_BOOK':
      const currentBookToDelete = [...state.books];
      const indexToDelete = currentBookToDelete.findIndex(
        function(book){
          return book.id === action.payload.id;
        }
      )
      return {books: [...currentBookToDelete.slice(0, indexToDelete),
                      ...currentBookToDelete.slice(indexToDelete+1)]};
      break;

    case 'UPDATE_BOOK':
      const currentBookToUpdate = [...state.books];
      const indexToUpdate = currentBookToUpdate.findIndex(function(book){
        return book.id === action.payload.id;});
      const newBookToUpdate = {...currentBookToUpdate[indexToUpdate],
                               title: action.payload.title}
      console.log('This is what is looks like: '+newBookToUpdate);
      return {books: [...currentBookToUpdate.slice(0, indexToUpdate),
                      newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]};
      break;
  }
  return state;
}

//Step 1 create the store
const store = createStore(reducer);

store.subscribe(function(){
  console.log('current state is: ', store.getState());
})

//Step 2 create and dispatch actions
store.dispatch({
  type:"POST_BOOK",
  payload: [{
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
  },]
})

//Dispatch another book
store.dispatch({
  type:"POST_BOOK",
  payload: [{
    id: 3,
    title: 'this is the third book title',
    description: 'this is the third book description',
    price: 40
  }]
})

//Delete a book
store.dispatch({type:"DELETE_BOOK", payload:{id:1}})

//Update a book
store.dispatch({type:"UPDATE_BOOK", payload:{id:1, title:"This is new title"}})
