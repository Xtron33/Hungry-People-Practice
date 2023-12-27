
import {useAppDispatch} from "./store/hooks.ts";
import {userAuthApi} from "./api/user.auth.api.ts";
import {UserSlice} from "./store/slice/userSlice.ts";
import {useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import router from "./router/router.tsx";



function App() {
    const dispatch = useAppDispatch();
    const checkAuth = async () => {
        try{
            const user = await userAuthApi.auth()
            if(user !== undefined){
                dispatch(UserSlice.actions.login(user))
            }
            else{
                dispatch(UserSlice.actions.logot())
            }
            dispatch(UserSlice.actions.setLoading(false))
        }
        catch (e){
            console.log(e)
            dispatch(UserSlice.actions.setLoading(false))
        }

    }

    useEffect(() => {
        checkAuth();
    }, []);

      return (
          <RouterProvider router={router}/>
      )
}

export default App
