import {instance} from "./api.ts";
import {ISpec} from "../utils/types/ISpec.ts";


export const specialtiesApi = {
    async fetchData():Promise<ISpec[] | undefined>{
        try{
            const {data} = await instance.get<ISpec[]>('spec/')
            return data
        }
        catch (e){
            console.log(e)
        }
    },

    async createData (data: FormData):Promise<void|undefined>{
        try {
            return await instance.post("spec/", data)
        }
        catch (e){
            console.log(e)
        }
    },

    async deleteData (id: number | undefined):Promise<void|undefined>{
        try {
            return await instance.delete('spec/'+id)
        }
        catch (e){
            console.log(e)
        }
    },
}
