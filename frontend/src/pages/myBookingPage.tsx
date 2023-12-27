import '../styles/booking-page/booking-page.scss'
import {Text} from "@gravity-ui/uikit";
import {useEffect, useState} from "react";
import {IBookingForm} from "../utils/types/IBookingForm.ts";
import {bookingApi} from "../api/booking.api.ts";
import {useUser} from "../hooks/useUser.ts";
import BookingItem from "../components/booking.page/BookingItem.tsx";
function MyBookingPage(){

    const [bookings, setBookings] = useState<IBookingForm[]>([])
    const [update, setUpdate] = useState<boolean>(false)

    const user = useUser()

    useEffect(() => {
        if(user.id !== undefined)
        bookingApi.fetchUserData(user.id).then((data) => {
            if(data !== undefined)
            setBookings(data)
        })
    }, [update]);

    const deleteHandler = (id: number) => {
        bookingApi.deleteBooking(id).finally(() => setUpdate(!update))
    }

    return(
        <div className={"booking"}>
            <div className={"booking__container"}>
                <Text variant={"display-2"}>My Bookings</Text>
                <div className="booking__container__item">
                    {
                        bookings.map((elem) => <BookingItem key={elem.id} remove={deleteHandler} item={elem}/>)
                    }
                </div>
            </div>

        </div>
    )
}

export default MyBookingPage