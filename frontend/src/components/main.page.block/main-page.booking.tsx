import '../../styles/main-page/main-page.booking.scss'

import Rect from "../../assets/images/rect.png";
import Booking from "../../assets/images/booking.png"
import {useUser} from "../../hooks/useUser.ts";
import {useState} from "react";
import {IBookingForm} from "../../utils/types/IBookingForm.ts";
import {userApi} from "../../api/user.api.ts";
import {bookingApi} from "../../api/booking.api.ts";
import {useToaster} from "@gravity-ui/uikit";

function MainPageBooking(){

    const {add} = useToaster()

    const user = useUser()

    const [email, setEmail] = useState<string>(user.email)
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [people, setPeople] = useState<string>("")
    const [dateB, setDateB] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [user_id, setUserId] = useState<number | undefined>(user.id);

    const date = new Date();

    const day = date.getDate()+1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    const phoneHandler = (e: string) => {
        const prefixNumber = (str:string) => {
            if (str === "7") {
                return "7 (";
            }
            if (str === "8") {
                return "8 (";
            }
            if (str === "9") {
                return "7 (9";
            }
            return "7 (";
        }

        const value = e.replace(/\D+/g, "");
        const numberLength = 11;

        let result;
        if (e.includes("+8") || e[0] === "8") {
            result = "";
        } else {
            result = "+";
        }

        //
        for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 0:
                    result += prefixNumber(value[i]);
                    continue;
                case 4:
                    result += ") ";
                    break;
                case 7:
                    result += "-";
                    break;
                case 9:
                    result += "-";
                    break;
                default:
                    break;
            }
            result += value[i];
        }

        setPhone(result)
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(user_id === undefined){
            userApi.findByEmail(email).then((data)=>{
                if(data.id !== undefined){
                    setUserId(data.id)
                }
                else{
                    setUserId(undefined)
                }
            })
        }

        const data: IBookingForm = {
            name,
            email,
            phone,
            people: parseInt(people),
            date: dateB,
            time,
            user_id: user_id !== undefined ? user_id : null
        }

        bookingApi.createBooking(data)

        setEmail(user.email)
        setName("")
        setPhone("")
        setPeople("")
        setDateB("")
        setTime("")

        add({
            name: "booking",
            title: "You'r successful book table",
            autoHiding: 2000,
            type: "success"
        });
    }

    return(
        <div id="booking" className="main__booking">
            <div className="main__booking__container">
                <div className="main__booking__container__input">
                    <span className="main__booking__container__input-head">Book a table</span>
                    <div className="main__booking__container__input-line"></div>
                    <form onSubmit={(e) => submitHandler(e)} className="main__booking__container__input__container">
                        <div className="main__booking__container__input__container__line">
                            <input minLength={2} maxLength={20} required value={name} onChange={(e) => setName(e.target.value)} placeholder={"Name"} type={"text"}
                                   className="main__booking__container__input__container__line__text"/>
                            <input minLength={2} maxLength={20} required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} type={"email"}
                                   className="main__booking__container__input__container__line__text"/>
                        </div>
                        <div className="main__booking__container__input__container__line">
                            <input required minLength={17} maxLength={18} value={phone} onChange={(event) => phoneHandler(event.target.value)} placeholder={"Phone"} type={"tel"}
                                   className="main__booking__container__input__container__line__text"/>
                            <select required value={people} onChange={(e) => setPeople(e.target.value)} className="main__booking__container__input__container__line__text">
                                <option value="" disabled selected>People</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div className="main__booking__container__input__container__line">
                            <input required value={dateB} onChange={(e) => setDateB(e.target.value)} placeholder={"Date (mm/dd/yyyy)"} type={"date"} min={currentDate}
                                   className="main__booking__container__input__container__line__text"/>
                            <select required value={time} onChange={(e) => setTime(e.target.value)} className="main__booking__container__input__container__line__text">
                                <option value="" disabled selected>Time</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                            </select>
                        </div>
                        <div className="main__booking__container__input__container__line">
                            <button className="main__booking__container__input__container__line__button" type={"submit"}>BOOK NOW</button>
                        </div>
                    </form>
                </div>
                <div className="main__booking__container__image">
                    <img className="main__booking__container__image-main" src={Booking}/>
                    <img className="main__booking__container__image-rect" src={Rect}/>
                </div>
            </div>
        </div>
    )
}

export default MainPageBooking