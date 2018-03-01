"use strict"

// Books reducers
export function booksReducers(state={books:[
  {
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
  }

  ]}, action){
  switch(action.type){
    case "GET_BOOKS":
      console.log({...state, books:[...state.books]})
      return {...state, books:[...state.books]}

    case 'POST_BOOK':
      return {books:[...state.books, ...action.payload]};

    case 'DELETE_BOOK':
      const currentBookToDelete = [...state.books];
      const indexToDelete = currentBookToDelete.findIndex(
        function(book){
          return book.id === action.payload.id;
        }
      )
      return {books: [...currentBookToDelete.slice(0, indexToDelete),
                      ...currentBookToDelete.slice(indexToDelete+1)]};

    case 'UPDATE_BOOK':
      const currentBookToUpdate = [...state.books];
      const indexToUpdate = currentBookToUpdate.findIndex(function(book){
        return book.id === action.payload.id;});
      const newBookToUpdate = {...currentBookToUpdate[indexToUpdate],
                               title: action.payload.title}
      console.log('This is what is looks like: '+newBookToUpdate);
      return {books: [...currentBookToUpdate.slice(0, indexToUpdate),
                      newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]};
  }
  return state;
}