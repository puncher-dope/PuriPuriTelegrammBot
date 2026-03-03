import type { CardsForBartenders } from "@/types/cardT";
import { createSlice } from "@reduxjs/toolkit";

type bartendersState = {
    menu: CardsForBartenders[]
}

const initialState:bartendersState = {
    menu: []
}

export const bartendersSlice = createSlice({
    name: 'bartenders',
    initialState,
    reducers:{}
})

export default bartendersSlice.reducer