import { createSelector, createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { Dishes } from '../typings'
import { RootState } from '../store'

interface BasketState {
    value: Dishes[]
}

const initialState: BasketState = {
    value: [],
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
      addToBasket: (state, action: PayloadAction<Dishes>) => {
        state.value = [...state.value, action.payload]
      },
      removeFromBasket: (state, action: PayloadAction<Dishes>) => {
        const index = state.value.findIndex((item) => item._id === action.payload._id)

        let newBasket = [...state.value];

        if (index >= 0){
            newBasket.splice(index,1);
        }else{
            console.warn(`Can't remove (id: ${action.payload._id} as it is not in the basket)`)
        }

        state.value = newBasket;
      },
      resetBasket: (state) => {
        state.value = [];
      }
    }
  })
  
  export const { addToBasket, removeFromBasket, resetBasket } = basketSlice.actions

  export const selectBasketItems = (state:RootState) => state.basket.value;

  // Memoization for when computation is needed
  export const selectBasketItemsId = createSelector( 
    [(state:RootState) => state.basket.value, (state:RootState, id:string) => id],  (value, id) => value.filter((item) => item._id === id))

  export const selectBasketTotal = createSelector( 
    [(state:RootState) => state.basket.value],  (value) => value.reduce((total, item) => total += item.price, 0))

  export default basketSlice.reducer