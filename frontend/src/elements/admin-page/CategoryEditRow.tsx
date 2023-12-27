import {Button, Icon, Text, TextInput} from "@gravity-ui/uikit";
import {BroomMotion, FloppyDisk, PencilToLine} from "@gravity-ui/icons";
import {ICategory} from "../../utils/types/ICategory.ts";
import {useId, useState} from "react";
import {categoryApi} from "../../api/category.api.ts";


const CategoryEditRow = (props: {item: ICategory, remove: (idx:number) => void}) =>{
    const key1 = useId()
    const key2 = useId()

    const [name, setName] = useState<string>(props.item.name)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const saveHandler = () => {

        if(name==="" && props.item.id !== undefined){
            props.remove(props.item.id)
        }
        else{
            const data: ICategory = {name}

            categoryApi.updateData(props.item.id, data).finally(() => {
                setIsEdit(false)
            })
        }


    }

    return(
        <div className="admin__container__item__container__settings__row">
            <Text variant={"subheader-1"}>{props.item.id}</Text>
            <TextInput autoFocus={true} onUpdate={(e) => setName(e)} className={"admin__container__item__container__settings__row-input"} size={"l"} disabled={!isEdit} view={isEdit ? "normal" : "clear"} value={name}>
            </TextInput>
            {
                !isEdit ?
                    <Button key={key1} onClick={() => setIsEdit(true)} size={"l"} view={"action"}><Icon data={PencilToLine}/></Button>
                    :
                    <Button key={key2} onClick={() => saveHandler()} size={"l"} view={"action"}><Icon data={FloppyDisk}/></Button>
            }

            <Button onClick={() => props.remove(props.item.id !== undefined ? props.item.id : 0)} size={"l"} selected view={"flat-danger"}><Icon data={BroomMotion}/></Button>
        </div>
    )
}

export default CategoryEditRow