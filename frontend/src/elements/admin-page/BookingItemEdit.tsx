import {IBookingForm} from "../../utils/types/IBookingForm.ts";
import {Button, Text} from "@gravity-ui/uikit";

const BookingItemEdit = (props: {item: IBookingForm, remove: (idx: number) => void}) => {

    return(
        <div className="admin__container__item__container__settings__row admin__container__item__container__settings__row-vertical admin__container__item__container__settings__row-booking">
            <Text variant={"subheader-2"}>
                Date and Time: {props.item.date} {props.item.time.slice(0,5)}
            </Text>
            <Text variant={"subheader-2"}>
                Name: {props.item.name}
            </Text>
            <Text variant={"subheader-2"}>
                Number of peoples: {props.item.people}
            </Text>
            <Text variant={"subheader-2"}>
                Email: {props.item.email}
            </Text>
            <Text variant={"subheader-2"}>
                Phone: {props.item.phone}
            </Text>
            <Button onClick={() => props.remove(props.item.id !== undefined ? props.item.id : 0)} size={"xl"} view={"outlined-danger"}>Delete</Button>
        </div>
    )
}

export default BookingItemEdit