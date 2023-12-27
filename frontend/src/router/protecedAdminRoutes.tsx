import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {useUser} from "../hooks/useUser.ts";
import {useUserLoad} from "../hooks/useUserLoad.ts";
import LoaderFallback from "../elements/loaderFallback.tsx";

type Props = {
    children: JSX.Element;
};

const ProtecedAdminRoutes: React.FC<Props> = ({children}) => {
    const isAuth = useAuth();
    const isLoading = useUserLoad();
    const user = useUser()

    return isLoading ? <LoaderFallback/> : isAuth && user.role==="admin" ? children : <Navigate to={"/"} replace/>
}

export default ProtecedAdminRoutes;