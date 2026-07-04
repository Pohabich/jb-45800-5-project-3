import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        //vacationSlice, // for admin
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch