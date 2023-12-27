import {useEffect, useState} from "react";
import {IBookingForm} from "../../../utils/types/IBookingForm.ts";
import {bookingApi} from "../../../api/booking.api.ts";
import BookingItemEdit from "../../../elements/admin-page/BookingItemEdit.tsx";

function AdminPageThirdtabsBooking(){

    const [bookings, setBookings] = useState<IBookingForm[]>([])
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        bookingApi.fetchData().then((data) => {
            if(data!==undefined){
                setBookings(data)
            }
        })
    }, [update]);

    const deleteHandler = (id: number) => {
        bookingApi.deleteBooking(id).finally(()=>setUpdate(!update))
    }

    return(
        <>
            {
                bookings.map((elem) => <BookingItemEdit remove={deleteHandler} item={elem} key={elem.id}/>)
            }
        </>
    )
}

export default AdminPageThirdtabsBooking