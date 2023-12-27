import {IContactForm} from "../../utils/types/IContactForm.ts";
import {Button, Icon, Text, TextArea} from "@gravity-ui/uikit";
import {BroomMotion, FloppyDisk, PencilToLine} from "@gravity-ui/icons";
import React, {useId, useState} from "react";
import {contactApi} from "../../api/contact.api.ts";

const AppliesItemEdit = (props: {item: IContactForm, remove: (idx: number) => void}) => {

    const key1 = useId()
    const key2 = useId()

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [validAnswer, setValidAnswer] = useState<boolean>(true)

    const [answer, setAnswer] = useState<string>(props.item.answer)

    const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(answer.length < 10){
            setValidAnswer(false)
        }
        else{
            const data:IContactForm = props.item

            data.answer = answer
            data.status = "Close"

            contactApi.updateContact(data, props.item.id !== undefined ? props.item.id : 0).finally(()=>{
                setIsEdit(false)
            })


        }

    }

    return(
        <form onSubmit={(e) => saveHandler(e)} className="admin__container__item__container__settings__row admin__container__item__container__settings__row-vertical admin__container__item__container__settings__row-booking">
            <Text variant={"subheader-2"}>
               Creation Date and Time: {props.item.created_at?.slice(0,19)}
            </Text>
            <Text variant={"subheader-2"}>
                Status: {props.item.status}
            </Text>
            <Text variant={"subheader-2"}>
                Name: {props.item.name}
            </Text>
            <Text variant={"subheader-2"}>
                Email: {props.item.email}
            </Text>
            <Text variant={"subheader-2"}>
                Phone: {props.item.phone}
            </Text>
            <Text style={{wordBreak: "break-word", textAlign: "left"}} variant={"subheader-2"}>
                Message: <Text style={{wordBreak: "break-word", textAlign: "left"}} variant={"code-3"}>{props.item.message}</Text>
            </Text>
            <Text variant={"subheader-2"}>
                Answer:
            </Text>
            <TextArea value={answer} onUpdate={(e) => setAnswer(e)} className={!validAnswer ? "not-valid" : ""} disabled={!isEdit} minRows={2} maxRows={4}></TextArea>
            <div>
                {
                    !isEdit ?
                        <Button key={key1} onClick={() => setIsEdit(true)} size={"l"} view={"action"}>Answer <Icon data={PencilToLine}/></Button>
                        :
                        <Button key={key2} type={"submit"} size={"l"} view={"action"}>Save <Icon data={FloppyDisk}/></Button>
                }

                <Button style={{marginLeft: "20px"}} onClick={() => props.remove(props.item.id !== undefined ? props.item.id : 0)} size={"l"} selected view={"flat-danger"}><Icon data={BroomMotion}/></Button>
            </div>

        </form>
    )
}

export default AppliesItemEdit