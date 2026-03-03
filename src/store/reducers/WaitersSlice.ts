import { createSlice } from "@reduxjs/toolkit";
import { type CardsForWaiters } from "@/types/cardT";


type waitersState = {
    menu: CardsForWaiters[],
}

const initialState:waitersState = {
    menu: []
}


export const waitersSlice = createSlice({
    name: 'waiters',
    initialState,
    reducers:{}
})

export default waitersSlice.reducer