import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const emiSlice = createSlice({
    name:'emi',
    initialState,
    reducers:{
        addEMI(state,action){
            state.pop(...state)
            state.push(action.payload)
        }
    }
})

export const {addEMI} = emiSlice.actions;
export default emiSlice.reducer