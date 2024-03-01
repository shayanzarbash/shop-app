import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from '../features/navbar/navbarSlice.ts';
import productsSlice from '../features/products/productsSlice.ts';

const store = configureStore({
    reducer: {
        productsReducer: productsSlice,
        navbarReducer: navbarSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>

export default store




