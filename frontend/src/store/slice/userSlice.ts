import {IUser} from "../../utils/types/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState{
    user: IUser
    isAuth: boolean
    isLoading: boolean
}

const initialState: UserState = {
    user: {
        email: "",
        role: "",
    },
    isAuth: false,
    isLoading: true
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logot: (state) => {
            state.isAuth = false
            state.user = {email: "", role: ""}

        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
}
    }
})

export default UserSlice.reducer