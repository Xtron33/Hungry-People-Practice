import {instance} from "./api.ts";
import {IUser} from "../utils/types/IUser.ts";

export const userApi = {

    async findByEmail(email: string){
        const {data} = await instance.get<IUser>('user/email/'+email)
        return data
    }
}