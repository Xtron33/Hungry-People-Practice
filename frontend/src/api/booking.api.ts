import {IBookingForm} from "../utils/types/IBookingForm.ts";
import {instance} from "./api.ts";


export const bookingApi = {
    async createBooking(data: IBookingForm): Promise<void | undefined>{
        try {
            return await instance.post('/booking/', data)
        }
        catch (e){
            console.log(e)
        }
    },
    async fetchData():Promise<IBookingForm[] | undefined>{
        try {
            const {data} = await instance.get<IBookingForm[]>('/booking/')
            return data
        }
        catch (e){
            console.log(e)
        }
    },
    async fetchUserData(userId: number): Promise<IBookingForm[] | undefined>{
        try {
            const {data} = await instance.get<IBookingForm[]>('/booking/user/' + userId);
            return data;
        }
        catch (e){
            console.log(e)
        }
    },

    async deleteBooking(id: number): Promise<void| undefined>{
        try {
            await instance.delete<void>('/booking/'+id)
        }
        catch (e){
            console.log(e)
        }
    },
}