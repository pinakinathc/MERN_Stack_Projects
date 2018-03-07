'use strict'
import axios from 'axios';
//GET A BOOK

export function getBooks(){
  return function(dispatch){
    axios.get("/books")
      .then(function(response){
        dispatch({type: "GET_BOOKS", payload: response.data})
      })
      .catch(function(err){
        //console.log('=====Error======')
        dispatch({type: "GET_BOOK_REJECTED", payload: err})
      })
  }
}

export function postBooks(book){
  return function(dispatch){
    axios.post("/books", book)
      .then(function(response){
        dispatch({type: "POST_BOOK", payload: response.data})
      })
      .catch(function(err){
        dispatch({
          type:"POST_BOOK_REJECTED",
          payload: "There was an error while posting a new book"
        })
      })
  }
}

//Delete a book
export function deleteBooks(id){
  return function(dispatch){
    axios.delete("/books/"+id)
      .then(function(response){
        dispatch({type: "DELETE_BOOK", payload: id})
      })
      .catch(function(err){
        dispatch({type: "DELETE_BOOK_REJECTED", payload: err})
      })
  }
  // return {
  //   type: "DELETE_BOOK",
  //   payload: id
  // }
}

//Update a book
export function updateBooks(book){
  let value = {title:book.title, description: book.description, price: book.price}
  return function(dispatch){
    axios.put("/books/"+book._id, book)
    .then(function(response){
      dispatch({type: "UPDATE_BOOK", payload: book})
    })
    .catch(function(err){
      console.log('caught the error')
      dispatch({type: "UPDATE_BOOK_REJECTED", payload: err})
    })
  }
  // return {
  //   type: 'UPDATE_BOOK',
  //   payload: book
  // }
}