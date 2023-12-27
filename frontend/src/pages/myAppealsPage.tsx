import {useEffect, useState} from "react";
import {useUser} from "../hooks/useUser.ts";
import {Text} from "@gravity-ui/uikit";
import {IContactForm} from "../utils/types/IContactForm.ts";
import {contactApi} from "../api/contact.api.ts";
import AppealsItem from "../components/appeals.page/AppealsItem.tsx";
import '../styles/booking-page/booking-page.scss'

function MyAppealsPage(){
    const [appils, setAppils] = useState<IContactForm[]>([])
    const [update, setUpdate] = useState<boolean>(false)

    const user = useUser()

    useEffect(() => {
        if(user.id !== undefined)
            contactApi.fetchUserData(user.id).then((data) => {
                if(data !== undefined)
                    setAppils(data)
            })
    }, [update]);

    const deleteHandler = (id: number) => {
        contactApi.deleteContact(id).finally(() => setUpdate(!update))
    }

    return(
        <div className={"booking"}>
            <div className={"booking__container"}>
                <Text variant={"display-2"}>My Appeals</Text>
                <div className="booking__container__item">
                    {
                        appils.map((elem) => <AppealsItem key={elem.id} remove={deleteHandler} item={elem}/>)
                    }
                </div>
            </div>

        </div>
    )
}
export default MyAppealsPage