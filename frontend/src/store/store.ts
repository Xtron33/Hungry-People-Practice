import {combineReducers, configureStore} from "@reduxjs/toolkit";

import UserReducer from './slice/userSlice.ts'

const rootReducer = combineReducers({
    UserReducer
})
export const store = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']