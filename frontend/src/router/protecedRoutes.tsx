import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {useUserLoad} from "../hooks/useUserLoad.ts";
import LoaderFallback from "../elements/loaderFallback.tsx";

type Props = {
    children: JSX.Element;
};

const ProtecedRoutes: React.FC<Props> = ({children}) => {
    const isAuth = useAuth();
    const isLoading = useUserLoad();

    return isLoading ? <LoaderFallback/> : isAuth ? children :  <Navigate to={"/"} replace/>
}

export default ProtecedRoutes;