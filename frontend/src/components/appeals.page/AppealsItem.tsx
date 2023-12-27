import {Button, Icon, Text} from "@gravity-ui/uikit";
import {SquareXmark} from "@gravity-ui/icons";
import {IContactForm} from "../../utils/types/IContactForm.ts";

const AppealsItem = (props: {item: IContactForm, remove: (idx: number) => void}) => {

    return(
        <div className={"booking__container__item__container"}>
            <div className={"booking__container__item__container__info"}>
                <Text color={"secondary"} variant={"header-1"}>Time of creation:</Text>
                <div>
                    <Text style={{marginRight: "7px"}} variant={"header-2"}>{props.item.created_at?.slice(0,19)}</Text>
                </div>
                <Text color={"secondary"} variant={"header-1"}>Status:</Text>
                <div>
                    <Text variant={"header-2"}>{props.item.status}</Text>
                </div>
                <Text color={"secondary"} variant={"header-1"}>Message:</Text>
                <div>
                    <Text style={{wordBreak: "break-word"}} variant={"header-2"}>{props.item.message}</Text>
                </div>
                <Text color={"secondary"} variant={"header-1"}>Answer:</Text>
                <div>
                    <Text style={{wordBreak: "break-word"}} variant={"header-2"}>{props.item.answer}</Text>
                </div>
            </div>
            <Button onClick={() => props.remove(props.item.id !== undefined ? props.item.id : 0)} size={"xl"} view={"outlined-danger"}>Delete Appeals<Icon size={20} data={SquareXmark}/></Button>
        </div>
    )

}

export default AppealsItem