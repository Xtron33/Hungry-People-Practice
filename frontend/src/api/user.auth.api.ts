import {IUser, IUserData, IUserReg} from "../utils/types/IUser.ts";
import {instance} from "./api.ts";

export const userAuthApi = {

    async login(userData: IUserData): Promise<IUser | undefined>{
        const {data} = await instance.post<IUser>('auth/login', userData)
        return data
    },
    async register(userData: IUserReg): Promise<void | undefined>{
        await instance.post<void>('user', userData)
    },

    async auth(): Promise<IUser | undefined>{
        const {data} = await instance.post<IUser>('auth/auth')
        return data
    },
    async logout(): Promise<void>{
        await instance.post<void>('auth/logout')
    }
}