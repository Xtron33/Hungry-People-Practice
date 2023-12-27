import {IMenu} from "../../utils/types/IMenu.ts";
import {Button, Icon, Select, SelectOption, Switch, TextInput} from "@gravity-ui/uikit";
import {BroomMotion, FloppyDisk, PencilToLine} from "@gravity-ui/icons";
import {useId, useState} from "react";
import {menuApi} from "../../api/menu.api.ts";

const MenuItemRow = (props: {item: IMenu, options: SelectOption[], remove: (idx: number) => void}) => {

    const key1 = useId()
    const key2 = useId()

    type validCatOpt = "" | "not-valid"
    const [validCat, setValidCat] = useState<validCatOpt>("")

    const [title, setTitle] = useState<string>(props.item.title)
    const [subTitle, setSubTitle] = useState<string>(props.item.subtitle)
    const [price, setPrice] = useState<string>(props.item.price)
    const [category, setCategory] = useState<string[]>([props.item.category_id.toString()])
    const [isMain, setIsMain] = useState<boolean>(props.item.is_main)

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const inputCfg: React.InputHTMLAttributes<HTMLInputElement> = {
        required: true,
        minLength: 3,
        maxLength: 20
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

            menuApi.updateData(props.item.id,data).finally(() => {
                setIsEdit(false)
            })
        }
    }

    return(
        <form onSubmit={(e) => saveHandler(e)} className="admin__container__item__container__settings__row admin__container__item__container__settings__row-vertical">
            <div className="admin__container__item__container__settings__row__sub">
                <TextInput disabled={!isEdit} view={isEdit ? "normal" : "clear"} controlProps={inputCfg} placeholder={"Title"} autoFocus={true} onUpdate={(e) => setTitle(e)} className={"admin__container__item__container__settings__row__sub-input"} size={"l"} value={title}>
                </TextInput>
                <TextInput disabled={!isEdit} view={isEdit ? "normal" : "clear"} controlProps={inputCfg} placeholder={"Subtitle"} autoFocus={true} onUpdate={(e) => setSubTitle(e)} className={"admin__container__item__container__settings__row__sub-input"} size={"l"} value={subTitle}>
                </TextInput>
            </div>
            <div className="admin__container__item__container__settings__row__sub">
                <TextInput disabled={!isEdit} view={isEdit ? "normal" : "clear"} controlProps={inputCfg} placeholder={"Price (24.99)"} autoFocus={true} onUpdate={(e) => setPrice(e)} className={"admin__container__item__container__settings__row__sub-input"} size={"l"} value={price}>
                </TextInput>
                <Select
                    disabled={!isEdit} view={isEdit ? "normal" : "clear"}
                    className={validCat}
                    size={"l"}
                    options={props.options}
                    placeholder="Category"
                    onUpdate={(e) => setCategory(e)}
                    value={category}
                />
                <Switch disabled={!isEdit} onUpdate={(e) => setIsMain(e)} checked={isMain} size="l">Main</Switch>
                {
                    !isEdit ?
                        <Button key={key1} type={"button"} onClick={() => setIsEdit(true)} size={"l"} view={"action"}><Icon data={PencilToLine}/></Button>
                        :
                        <Button key={key2} type={"submit"} size={"l"} view={"action"}><Icon data={FloppyDisk}/></Button>
                }
                <Button onClick={() => props.remove(props.item.id !== undefined ? props.item.id : 0)} size={"l"} selected view={"flat-danger"}><Icon data={BroomMotion}/></Button>
            </div>
        </form>
    )
}

export default MenuItemRow