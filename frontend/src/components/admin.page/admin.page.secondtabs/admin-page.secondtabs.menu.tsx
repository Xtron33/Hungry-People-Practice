import {Button, Icon, Select, SelectOption, Switch, TextInput} from "@gravity-ui/uikit";
import {CirclePlusFill} from "@gravity-ui/icons";
import {useEffect, useState} from "react";
import {ICategory} from "../../../utils/types/ICategory.ts";
import {categoryApi} from "../../../api/category.api.ts";
import {IMenu} from "../../../utils/types/IMenu.ts";
import {menuApi} from "../../../api/menu.api.ts";
import MenuItemRow from "../../../elements/admin-page/MenuItemRow.tsx";


function AdminPageSecondtabsMenu(){

    const [isNew, setIsNew] = useState<boolean>(false)

    const [menu, setMenu] = useState<IMenu[]>([])

    const [title, setTitle] = useState<string>("")
    const [subTitle, setSubTitle] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [category, setCategory] = useState<string[]>([''])
    const [isMain, setIsMain] = useState<boolean>(false)

    const [update, setUpdate] = useState<boolean>(false)

    const [categories, setCategories] = useState<ICategory[]>([])

    const [options, setOptions] = useState<SelectOption[]>([])

    type validCatOpt = "" | "not-valid"
    const [validCat, setValidCat] = useState<validCatOpt>("")

    const inputCfg: React.InputHTMLAttributes<HTMLInputElement> = {
        required: true,
        minLength: 3,
        maxLength: 20
    }

    const deleteHandler = (item_id: number) => {
        menuApi.deleteData(item_id).finally(() => setUpdate(!update))
    }

    useEffect(() => {
        categoryApi.fetchData().then((data) => {
            if(data!==undefined){
                setCategories(data)
            }
        })
        menuApi.fetchData().then((data) => {
            if(data!==undefined){
                setMenu(data)
            }
        })
    }, [update]);

    useEffect(() => {
        const buf: SelectOption[] = []
        categories.forEach((elem) => {
            if(elem !== undefined && elem.id !== undefined){
                const buffer:SelectOption = {value: elem.id.toString(), content: elem.name}
                buf.push(buffer)
            }

        })
        setOptions(buf)
    }, [categories]);



    const clearAll = () => {
        setTitle('')
        setSubTitle('')
        setPrice('')
        setCategory([''])
        setIsMain(false)
    }

    const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(category[0] === ""){
            setValidCat("not-valid")
        }
        else {
            setValidCat("")
            const data: IMenu = {
                title,
                subtitle: subTitle,
                price,
                category_id: parseInt(category[0]),
                is_main: isMain
            }

            menuApi.createData(data).finally(() => {
                setIsNew(false)
                setUpdate(!update)
            })
        }


    }

    return(
        <>
            <Button onClick={() => {setIsNew(!isNew); clearAll()}} view={"action"} size={"xl"}>{isNew ? "Close" : "Add"}</Button>
            {
                isNew ?
                    <form onSubmit={(e) => saveHandler(e)} className="admin__container__item__container__settings__row admin__container__item__container__settings__row-vertical">
                        <div className="admin__container__item__container__settings__row__sub">
                            <TextInput controlProps={inputCfg} placeholder={"Title"} autoFocus={true} onUpdate={(e) => setTitle(e)} className={"admin__container__item__container__settings__row__sub-input"} size={"l"} view={"normal"} value={title}>
                            </TextInput>
                            <TextInput controlProps={inputCfg} placeholder={"Subtitle"} autoFocus={true} onUpdate={(e) => setSubTitle(e)} className={"admin__container__item__container__settings__row__sub-input"} size={"l"} view={"normal"} value={subTitle}>
                            </TextInput>
                        </div>
                        <div className="admin__container__item__container__settings__row__sub">
                            <TextInput controlProps={inputCfg} placeholder={"Price (24.99)"} autoFocus={true} onUpdate={(e) => setPrice(e)} className={"admin__container__item__container__settings__sub__row-input"} size={"l"} view={"normal"} value={price}>
                            </TextInput>
                            <Select
                                className={validCat}
                                size={"l"}
                                options={options}
                                placeholder="Category"
                                onUpdate={(e) => setCategory(e)}
                                value={category}
                            />
                            <Switch onUpdate={(e) => setIsMain(e)} checked={isMain} size="l">Main</Switch>
                            <Button type={"submit"} size={"l"} view={"action"}><Icon data={CirclePlusFill}/></Button>
                        </div>
                    </form>
                    :
                    <></>
            }
            {
                menu.map((elem) => <MenuItemRow key={elem.id} item={elem} options={options} remove={deleteHandler}/>)
            }
        </>
    )
}

export default AdminPageSecondtabsMenu