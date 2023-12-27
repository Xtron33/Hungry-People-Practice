import {instance} from "./api.ts";
import {ICategory} from "../utils/types/ICategory.ts";

export const categoryApi = {
    async fetchData():Promise<ICategory[] | undefined>{
        try{
            const {data} = await instance.get<ICategory[]>('category/')
            return data
        }
        catch (e){
            console.log(e)
        }
    },

    async createData (data: ICategory):Promise<void|undefined>{
        try {
            return await instance.post("category/", data)
        }
        catch (e){
            console.log(e)
        }
    },

    async deleteData (id: number | undefined):Promise<void|undefined>{
        try {
            return await instance.delete('category/'+id)
        }
        catch (e){
            console.log(e)
        }
    },
    async updateData (id: number | undefined, data: ICategory): Promise<void|undefined>{
        try {
            return await instance.patch('category/'+id, data)
        }
        catch (e){
            console.log(e);
        }
    }
}
