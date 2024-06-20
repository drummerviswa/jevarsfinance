import {configureStore} from "@reduxjs/toolkit"
import customerReducer from "./slices/customerSlice"

export const store = configureStore({
    reducer: {
        customer:customerReducer
    }
});