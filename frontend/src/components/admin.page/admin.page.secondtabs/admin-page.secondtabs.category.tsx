import {Button, Icon, TextInput} from "@gravity-ui/uikit";
import {CirclePlusFill} from "@gravity-ui/icons";
import {useEffect, useState} from "react";
import {ICategory} from "../../../utils/types/ICategory.ts";
import {categoryApi} from "../../../api/category.api.ts";
import CategoryEditRow from "../../../elements/admin-page/CategoryEditRow.tsx";


function AdminPageSecondtabsCategory(){

    const [isNew, setIsNew] = useState<boolean>(false)
    const [newCategory, setNewCategory] = useState<string>("")
    const [update, setUpdate] = useState<boolean>(false)

    const [categories,setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        categoryApi.fetchData().then((data) => {
            if(data !== undefined){
                setCategories(data)
            }
        })
    }, [update]);

    const deleteHandler = (item_id: number) => {

        categoryApi.deleteData(item_id).finally(() => setUpdate(!update))
    }
    const saveHandler = () => {
        if(newCategory!==""){
            const data: ICategory = {
                name: newCategory
            }

            categoryApi.createData(data).finally(() => {
                setNewCategory("")
                setIsNew(false)
                setUpdate(!update)
            })
        }




    }

    return(
        <>
            <Button onClick={() => {setIsNew(!isNew); setNewCategory('')}} view={"action"} size={"xl"}>{isNew ? "Close" : "Add"}</Button>
            {
                isNew ?
                    <div className="admin__container__item__container__settings__row">
                        <TextInput autoFocus={true} onUpdate={(e) => setNewCategory(e)} className={"admin__container__item__container__settings__row-input"} size={"l"} view={"normal"} value={newCategory}>
                        </TextInput>
                        <Button onClick={() => saveHandler()} size={"l"} view={"action"}><Icon data={CirclePlusFill}/></Button>
                    </div>
                    :
                    <></>
            }
            {
                categories.map((elem) => <CategoryEditRow key={elem.id} item={elem} remove={deleteHandler}/>)
            }
        </>
    )
}

export default AdminPageSecondtabsCategory