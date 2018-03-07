'use strict'
//CART REDUCERS
export function cartReducers(state={cart:[], finalAmount:0}, action){
  switch(action.type){
    case "ADD_TO_CART":
      return { ...state, cart:action.payload}
      break;

    case "DELETE_CART_ITEM":
      const indexToDelete = action.payload;
      const currentBookToDelete = [...state.cart]
      let temp = [...currentBookToDelete.slice(0, indexToDelete),
               ...currentBookToDelete.slice(indexToDelete+1)];
      return {...state, cart: temp}

    case "UPDATE_CART":
    const currentCartToUpdate = [...state.cart];
    const indexToUpdate = action._id;
    console.log('======newBookToUpdate=====',currentCartToUpdate[indexToUpdate]);
    let newCartToUpdate;
    if ( currentCartToUpdate[indexToUpdate].quantity <= 0 && action.unit===-1){
      newCartToUpdate = {...currentCartToUpdate[indexToUpdate],
        quantity: 0}
    } else {
    newCartToUpdate = {...currentCartToUpdate[indexToUpdate],
      quantity: currentCartToUpdate[indexToUpdate].quantity + action.unit}
    }
    return {...state, cart: [...currentCartToUpdate.slice(0, indexToUpdate),
        newCartToUpdate, ...currentCartToUpdate.slice(indexToUpdate+1)]};

    case  "CALCULATE_TOTAL":
      let total = 0.0;
      action.payload.map(function(cartArr){
        total += cartArr.quantity * cartArr.price;
      });
      return {...state, finalAmount: total};
  }
  return state
}
