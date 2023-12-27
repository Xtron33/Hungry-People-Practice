import {Button, Tabs, TabsItemProps, Text, TextInput} from "@gravity-ui/uikit";
import {useEffect, useState} from "react";
import {specialtiesApi} from "../../../api/specialties.api.ts";
import {File} from "@gravity-ui/icons";
import {API_KEY} from "../../../utils/consts.ts";
import {ISpec} from "../../../utils/types/ISpec.ts";

function AdminPageFirstgtabsSpecialties(){

    const [tabs, setTabs] = useState<string>('')

    const [items, setItems] = useState<TabsItemProps[]>([])

    const [update, setUpdate] = useState<boolean>(false)

    const [specialities, setSpecialities] = useState<ISpec[]>([])

    const [isNew, setIsNew] = useState<boolean>(false)

    const [image, setImage] = useState<string | File>("")

    const kostily: React.InputHTMLAttributes<HTMLInputElement> = {
        accept: ".png, .jpg"
    }


    useEffect(() => {
        specialtiesApi.fetchData().then((data) => {
            if(data !== undefined){
                setSpecialities(data)
                const buffer: TabsItemProps[] = []
                data.forEach((_elem, index) => {
                    const buf: TabsItemProps = {
                        id: index.toString(),
                        title: index.toString()
                    }
                    buffer.push(buf)
                })

                setItems(buffer)
                setTabs(buffer[0].id)

            }
        })
    }, [update]);


    const saveHandler = () => {
        const formData = new FormData()
        formData.append('image', image)
        specialtiesApi.createData(formData).finally(() => {
            setIsNew(false)
            setImage("")
            setUpdate(!update)
        })

    }

    const deleteHandler = () => {
        specialtiesApi.deleteData(specialities[parseInt(tabs)].id).finally(() => {
            setUpdate(!update)
        })
    }

    return(
        <>
            <Button onClick={() => setIsNew(!isNew)} view={"action"} size={"xl"}>{isNew ? "Close" : "Add"}</Button>
            {
                isNew ?
                    <>
                        <div className="admin__container__item__container__settings__input">
                        <Text className="admin__container__item__container__settings__input-label" variant={"subheader-2"}>Image</Text>
                        <TextInput onChange={(e) => { if (e.target.files !== null) setImage(e.target.files[0]) }}
                                   leftContent={<File style={{ marginLeft: "15px" }} />} controlProps={kostily}
                                   className="admin__container__item__container__settings__input-file" type="file" size="xl" hasClear={true} />
                        </div>
                        <Button onClick={() => saveHandler()} size={"xl"} view={"action"}>Save</Button>
                    </>
                :
                <></>
            }



            <div className="admin__container__item__container__tabs">
                <Tabs
                    size="xl"
                    activeTab={tabs}
                    onSelectTab={(tabId: string) => setTabs(tabId)}
                    items={items}
                />

                {specialities.length !== 0 && specialities[parseInt(tabs)] !== undefined ?
                    <>
                        <div style={{marginTop: "40px"}} className="admin__container__item__container__settings__input-image">
                            <img src={API_KEY+specialities[parseInt(tabs)].image}/>
                        </div>
                        <Button onClick={() => deleteHandler()} style={{marginTop: "40px"}} view={"outlined-danger"} size={"xl"}>Delete</Button>
                    </>
                    :
                    <></>

                }


            </div>
        </>
    )
}

export default AdminPageFirstgtabsSpecialties