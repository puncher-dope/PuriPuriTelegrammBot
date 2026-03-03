import { configureStore } from "@reduxjs/toolkit";
import waitersReducer from './reducers/WaitersSlice'
import bartendersReducer from './reducers/BartendersSlice'
import authReducer from './reducers/AuthReducer'
import { WaitersAPI } from "@/store/service/WaitersService"; 
import { BartendersAPI } from "@/store/service/BartendersService"; 
import { AuthAPI } from "@/store/service/AuthService";


export const store = configureStore({
    reducer: {
        waitersReducer,
        bartendersReducer,
        authReducer,
        [WaitersAPI.reducerPath]:WaitersAPI.reducer,
        [BartendersAPI.reducerPath]:BartendersAPI.reducer,
        [AuthAPI.reducerPath]:AuthAPI.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            WaitersAPI.middleware,
            BartendersAPI.middleware,
            AuthAPI.middleware,
        )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch