import {Button, Text, TextArea, TextInput} from "@gravity-ui/uikit";
import {File} from "@gravity-ui/icons";
import {useEffect, useState} from "react";
import {IStatic} from "../../../utils/types/IStatic.ts";
import {staticApi} from "../../../api/static.api.ts";
import {API_KEY} from "../../../utils/consts.ts";

function AdminPageFirsttabsOurTeam(){

    const kostily: React.InputHTMLAttributes<HTMLInputElement> = {
        accept: ".png, .jpg"
    }

    const [data, setData] = useState<IStatic>({} as IStatic)

    const [title, setTitle] = useState<string>(data.title)
    const [subtitle, setSubTitle] = useState<string>(data.subtitle)
    const [image, setImage] = useState<string | File>(data.image)

    const [isNew, setIsNew] = useState<boolean>(false)
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        staticApi.fetchDataById('2').then((data) =>{
            if(data !== undefined){
                setData(data)
                setTitle(data.title)
                setSubTitle(data.subtitle)
                setImage(data.image)
            }
        })
    }, [update]);

    useEffect(() => {
        if(Object.keys(data).length === 0){
            setIsNew(true)
        }
        else{
            setIsNew(false)
        }
    }, [data]);

    const saveHandler = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('subtitle', subtitle)

        formData.append('image', image)
        if(isNew){

            formData.append('id', '2')
            staticApi.createData(formData).finally(() => setUpdate(!update))
        }
        else{
            let id:string = '2'

            if(data.id !== undefined){
                formData.append('id', data.id.toString())
                id = data.id.toString()
            }
            else{
                formData.append('id', '2')
            }
            staticApi.updateData(formData, id).finally(() => setUpdate(!update))
        }
    }

    return(
        <>
            <div className="admin__container__item__container__settings__input">
                <Text className="admin__container__item__container__settings__input-label" variant={"subheader-2"}>Title</Text>
                <TextArea value={title} onUpdate={(e) => setTitle(e)} maxRows={5} size={"xl"} placeholder={"Lorem Impsum...."}></TextArea>
            </div>

            <div className="admin__container__item__container__settings__input">
                <Text className="admin__container__item__container__settings__input-label" variant={"subheader-2"}>Subtitle</Text>
                <TextArea value={subtitle} onUpdate={(e) => setSubTitle(e)} maxRows={5} size={"xl"} placeholder={"Lorem Impsum...."}></TextArea>
            </div>
            <div className="admin__container__item__container__settings__input">
                <Text className="admin__container__item__container__settings__input-label" variant={"subheader-2"}>Image</Text>
                <TextInput onChange={(e) => { if (e.target.files !== null) setImage(e.target.files[0]) }}
                           leftContent={<File style={{ marginLeft: "15px" }} />} controlProps={kostily}
                           className="admin__container__item__container__settings__input-file" type="file" size="xl" hasClear={true} />
            </div>
            {
                typeof image === "string" && image !== "" ?
                    <div className="admin__container__item__container__settings__input-image">
                        <img src={API_KEY+image}/>
                    </div>

                    : <></>
            }


            <Button onClick={() => saveHandler()} size={"xl"} view={"action"}>Save</Button>
        </>
    )
}

export default AdminPageFirsttabsOurTeam