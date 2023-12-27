import {instance} from "./api.ts";
import {IMenu} from "../utils/types/IMenu.ts";

export const menuApi = {
    async fetchData():Promise<IMenu[] | undefined>{
        try{
            const {data} = await instance.get<IMenu[]>('menu/')
            return data
        }
        catch (e){
            console.log(e)
        }
    },

    async createData (data: IMenu):Promise<void|undefined>{
        try {
            return await instance.post("menu/", data)
        }
        catch (e){
            console.log(e)
        }
    },

    async deleteData (id: number | undefined):Promise<void|undefined>{
        try {
            return await instance.delete('menu/'+id)
        }
        catch (e){
            console.log(e)
        }
    },
    async updateData (id: number | undefined, data: IMenu): Promise<void|undefined>{
        try {
            return await instance.patch('menu/'+id, data)
        }
        catch (e){
            console.log(e);
        }
    }
}
