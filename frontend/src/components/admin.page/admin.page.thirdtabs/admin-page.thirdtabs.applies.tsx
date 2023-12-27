import {useEffect, useState} from "react";
import {IContactForm} from "../../../utils/types/IContactForm.ts";
import {contactApi} from "../../../api/contact.api.ts";
import AppliesItemEdit from "../../../elements/admin-page/AppliesItemEdit.tsx";


function AdminPageThirdtabsApplies(){

    const [applies, setApplies] = useState<IContactForm[]>([])
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        contactApi.fetchData().then((data)=>{
            if(data !== undefined){
                setApplies(data)
            }
        })
    }, [update]);

    const deleteHandler = (id: number) => {
        contactApi.deleteContact(id).finally(() => setUpdate(!update))
    }

    return(
        <>
            {
                applies.map((elem) => <AppliesItemEdit item={elem} remove={deleteHandler} key={elem.id} />)
            }
        </>
    )
}

export default AdminPageThirdtabsApplies