import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const depositSlice = createSlice({
    name:'deposit',
    initialState,
    reducers:{
        addDeposit(state,action){
            state.pop(...state)
            state.push(action.payload)
        }
    }
})

export const {addDeposit} = depositSlice.actions;
export default depositSlice.reducer