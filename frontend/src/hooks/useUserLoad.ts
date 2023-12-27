import {useAppSelector} from "../store/hooks.ts";


export const useUserLoad = (): boolean => {
    return useAppSelector((state) => state.UserReducer.isLoading)
}