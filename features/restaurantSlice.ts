import { createSelector, createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { Dishes, Restaurant } from '../typings'
import { RootState } from '../store'

interface RestaurantState {
    restaurant: Restaurant
}

const initialState: RestaurantState = {
    restaurant: {
        _id: "",
        image: "",
        name: "",
        rating: 0,
        type: {name: ""},
        address: "",
        short_description: "",
        dishes: [],
        long: 0,
        lat: 0,
    },
}

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
      setRestaurant: (state, action: PayloadAction<Restaurant>) =>{
        state.restaurant = action.payload
      }
    }
  })
  
  export const { setRestaurant } = restaurantSlice.actions

  export const selectRestaurant = (state:RootState) => state.restaurant.restaurant;

  export default restaurantSlice.reducer