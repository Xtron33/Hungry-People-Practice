import {useAppSelector} from "../store/hooks.ts";
import {IUser} from "../utils/types/IUser.ts";

export const useUser = (): IUser => {
    return useAppSelector((state) => state.UserReducer.user)
}