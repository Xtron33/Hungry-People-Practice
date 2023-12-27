import {instance} from "./api.ts";
import {IContactForm} from "../utils/types/IContactForm.ts";


export const contactApi = {
    async createContact(data: IContactForm): Promise<void | undefined>{
        try {
            return await instance.post('/contact/', data)
        }
        catch (e){
            console.log(e)
        }
    },
    async fetchData():Promise<IContactForm[] | undefined>{
        try {
            const {data} = await instance.get<IContactForm[]>('/contact/')
            return data
        }
        catch (e){
            console.log(e)
        }
    },
    async fetchUserData(userId: number): Promise<IContactForm[] | undefined>{
        try {
            const {data} = await instance.get<IContactForm[]>('/contact/user/' + userId);
            return data;
        }
        catch (e){
            console.log(e)
        }
    },
    async deleteContact(id: number): Promise<void | undefined>{
        try{
            await instance.delete<void>('/contact/'+id)
        }
        catch (e) {
            console.log(e)
        }
    },
    async updateContact(data:IContactForm ,id: number): Promise<void | undefined>{
        try {
            await instance.patch('/contact/'+id, data)
        }
        catch (e) {
            console.log(e)
        }
    }
}