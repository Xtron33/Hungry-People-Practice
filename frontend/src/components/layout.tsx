import { Outlet } from "react-router-dom";
import Header from "./header.tsx";
import {FC} from "react";

const Layout: FC = () => {

    return(

        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout