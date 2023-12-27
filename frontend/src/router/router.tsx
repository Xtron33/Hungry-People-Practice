import {createBrowserRouter} from "react-router-dom";


import ProtecedAdminRoutes from "./protecedAdminRoutes.tsx";
import ProtecedRoutes from "./protecedRoutes.tsx";
import Layout from "../components/layout.tsx";

import {lazy, Suspense} from "react";
import LoaderFallback from "../elements/loaderFallback.tsx";

const MainPage = lazy(() => import("../pages/mainPage.tsx"));
const AdminPage = lazy(() => import("../pages/adminPage.tsx"));
const MyBookingPage = lazy(() => import("../pages/myBookingPage.tsx"));
const MyAppealsPage = lazy(() => import("../pages/myAppealsPage.tsx"));
const NotFound = lazy(() => import('../pages/NotFound.tsx'));


const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<LoaderFallback/>}><Layout/></Suspense>,
        children: [
            {
                path: '/',
                element: <MainPage/>
            },
            {
                path: '/my-bookings',
                element: <ProtecedRoutes><MyBookingPage/></ProtecedRoutes>
            },
            {
                path: '/my-appeals',
                element: <ProtecedRoutes><MyAppealsPage/></ProtecedRoutes>
            }
        ]

    },
    {
        path: '/admin',
        element: <Suspense fallback={<LoaderFallback/>}><ProtecedAdminRoutes><AdminPage/></ProtecedAdminRoutes></Suspense>
    },
    {
        path: '*',
        element: <Suspense fallback={<LoaderFallback/>}><NotFound/></Suspense>
    }
])

export default router