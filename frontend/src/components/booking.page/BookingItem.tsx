import {IBookingForm} from "../../utils/types/IBookingForm.ts";
import {Button, Icon, Text} from "@gravity-ui/uikit";
import {SquareXmark} from "@gravity-ui/icons";

const BookingItem = (props: {item: IBookingForm, remove: (idx: number) => void}) => {

    return(
        <div className={"booking__container__item__container"}>
            <div className={"booking__container__item__container__info"}>
                <Text color={"secondary"} variant={"header-1"}>Time of booking:</Text>
                <div>
                    <Text style={{marginRight: "7px"}} variant={"header-2"}>{props.item.time.slice(0,5)}</Text>
                    <Text variant={"header-2"}>{props.item.date}</Text>
                </div>
                <Text color={"secondary"} variant={"header-1"}>People name of booking:</Text>
                <div>
                    <Text variant={"header-2"}>{props.item.name}</Text>
                </div>
                <Text color={"secondary"} variant={"header-1"}>Number of people:</Text>
                <div>
                    <Text variant={"header-2"}>{props.item.people}</Text>
                </div>
            </div>
            <Button onClick={() => props.remove(props.item.id !== undefined ? props.item.id : 0)} size={"xl"} view={"outlined-danger"}>Cancel Booking<Icon size={20} data={SquareXmark}/></Button>
        </div>
    )

}

export default BookingItem