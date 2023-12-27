import {useUser} from "../../hooks/useUser.ts";
import {Button, Text} from "@gravity-ui/uikit";
import {useAppDispatch} from "../../store/hooks.ts";
import {UserSlice} from "../../store/slice/userSlice.ts";
import {userAuthApi} from "../../api/user.auth.api.ts";
import {Link} from "react-router-dom";


function UserModal(){

    const user = useUser();

    const dispatch = useAppDispatch()
    const logout = () => {
        userAuthApi.logout();
        dispatch(UserSlice.actions.logot())
    }

    return(
        <>
            <div className="modal-user__container__email">
                <Text variant={"header-1"}>{user.email}</Text>
            </div>
            <div className="modal-user__container__menu">
                {
                    user.role === "admin" ?
                        <div className="modal-user__container__menu__item">
                            <Link to={"/admin"}><Text variant={"subheader-3"}>Admin Dashboard</Text></Link>
                        </div>
                        : <></>
                }
                <div className="modal-user__container__menu__item">
                    <Link to={"/my-bookings"}><Text variant={"subheader-3"}>My Booking</Text></Link>
                </div>
                <div className="modal-user__container__menu__item">
                    <Link to={"/my-appeals"}><Text variant={"subheader-3"}>My Appeals</Text></Link>
                </div>
            </div>

            <Button onClick={()=>logout()} selected={true} view={"flat-danger"} size={"xl"}>Log Out</Button>
        </>
    )
}

export default UserModal