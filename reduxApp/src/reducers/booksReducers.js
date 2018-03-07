"use strict"

// Books reducers
export function booksReducers(state={books:[]}, action){
  switch(action.type){
    case "GET_BOOKS":
      return {...state, books:[...action.payload]}

    case 'POST_BOOK':
      return {books:[...state.books, ...action.payload]};

    case 'DELETE_BOOK':
      const currentBookToDelete = [...state.books];
      console.log('====>>> currentBookToDelete <<<====', currentBookToDelete);
      console.log('=====>>> action <<<====',action)
      const indexToDelete = currentBookToDelete.findIndex(
        function(book){
          return book._id === action.payload;
        }
      )
      console.log('====>>> index to delete <<<====', indexToDelete);
      let temp = {books: [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete+1)]};
      console.log('====>>> checking before deleting <<<=====',temp);
      return temp;

    case 'UPDATE_BOOK':
      const currentBookToUpdate = [...state.books];
      console.log('=====>>>updating myself<<<====', action)
      const indexToUpdate = currentBookToUpdate.findIndex(function(book){
        return book._id === action.payload._id;});
      const newBookToUpdate = {...currentBookToUpdate[indexToUpdate],
                               title: action.payload.title,
                               description: action.payload.description,
                               price: action.payload.price}
      return {books: [...currentBookToUpdate.slice(0, indexToUpdate),
                      newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]};
  }
  return state;
}