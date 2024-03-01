import { toast } from "react-hot-toast";
import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../../libraries/product-type';

function fetchFromLocalStorage() {
    const value = localStorage.getItem("value");
    if (value) {
        return JSON.parse(value);
    }
    else {
        return [];
    }
}

function storeInLocalStorage(data: IProduct) {
    localStorage.setItem("value", JSON.stringify(data));
}

const initialState = {
    value: fetchFromLocalStorage(),
}

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        add: (state, action) => {
            const existingProduct = state.value.find((eachProduct: IProduct) => eachProduct.id === action.payload.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            }

            state.value = [...state.value, { ...action.payload, quantity: 1 }];

            const uniqueProducts = state.value.filter((product: IProduct, index: number, self: any) =>
                index === self.findIndex((p: any) => p.id === product.id)
            );

            state.value = uniqueProducts;
            storeInLocalStorage(state.value);
            toast.success("Product Added!");
        },

        remove: (state, action) => {
            const index = state.value.findIndex((product: IProduct) => product.id === action.payload);
            if (index !== -1) {
                state.value.splice(index, 1);
                storeInLocalStorage(state.value);
                toast.success("Product Deleted!");
            }
        },

        removeOne: (state, action) => {
            const index = state.value.findIndex((product: IProduct) => product.id === action.payload);

            if (index !== -1) {
                if (state.value[index].quantity > 1) {
                    state.value[index].quantity -= 1;
                    storeInLocalStorage(state.value);
                    toast.success("Product Deleted!");
                }
            }
        }
    },
});

export const { add, remove, removeOne } = navbarSlice.actions;
export default navbarSlice.reducer;
