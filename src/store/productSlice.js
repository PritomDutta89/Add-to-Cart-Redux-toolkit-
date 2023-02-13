// const { createSlice } = require('@reduxjs/toolkit');
import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

//enumes by using js object && freez it by object property bcz no one can updated it
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
       data:[],
       status: STATUSES.IDLE
    },
    reducers: {

        setProducts(state,action){
            state.data= action.payload;
        },

        setStatus(state,action){
            state.status= action.payload;
        }
    }
})

export const {setProducts,setStatus} = productSlice.actions;
export default productSlice.reducer;

//Thunk [Normal not redux-toolkit]
export function fetchProducts(){
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
         try{
            let res = await fetch('https://fakestoreapi.com/products');
            res = await res.json();
            //using dispatch function for calling action
            dispatch(setProducts(res))
            dispatch(setStatus(STATUSES.IDLE))
         } catch(err){
            dispatch(setStatus(STATUSES.ERROR))
         }
    }
}

