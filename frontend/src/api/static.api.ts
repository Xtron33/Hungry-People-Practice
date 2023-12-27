import {instance} from "./api.ts";
import {IStatic} from "../utils/types/IStatic.ts";


export const staticApi = {
    async fetchDataById(id: string | undefined):Promise<IStatic | undefined>{
        try{
            const data = await instance.get<IStatic>('static/'+id)
            return data.data
        }
        catch (e){
            console.log(e)
        }
    },

    async createData (data: FormData):Promise<void|undefined>{
        try {
            return await instance.post("static/", data)
        }
        catch (e){
            console.log(e)
        }
    },

    async updateData(data: FormData, id: string):Promise<void|undefined>{
        try {
            return await instance.post("static/"+id, data)
        }
        catch (e){
            console.log(e)
        }
    },
}
