import {configureStore} from "@reduxjs/toolkit"
import customerReducer from "./slices/customerSlice"
import depositReducer from "./slices/depositSlice"
import emiReducer from "./slices/emiSlice"

export const store = configureStore({
    reducer: {
        customer:customerReducer,
        deposit:depositReducer,
        emi:emiReducer,
    }
});