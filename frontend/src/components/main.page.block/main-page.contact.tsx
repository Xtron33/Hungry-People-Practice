
import '../../styles/main-page/main-page.contact.scss'
import {useState} from "react";
import {useUser} from "../../hooks/useUser.ts";
import {userApi} from "../../api/user.api.ts";
import {useToaster} from "@gravity-ui/uikit";
import {IContactForm} from "../../utils/types/IContactForm.ts";
import {contactApi} from "../../api/contact.api.ts";


function MainPageContact(){

    const {add} = useToaster()

    const user = useUser()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>(user.email)
    const [phone, setPhone] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [user_id, setUserId] = useState<number | undefined>(user.id)

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

        const data: IContactForm = {
            name,
            email,
            phone,
            message,
            status: "Open",
            answer: "",
            user_id: user_id !== undefined ? user_id : null
        }

        contactApi.createContact(data)

        setEmail(user.email)
        setName("")
        setPhone("")
        setMessage("")

        add({
            name: "contact",
            title: "You'r successful create applies",
            autoHiding: 2000,
            type: "success"
        });
    }

    return(
        <div id={"contact"} className={"main__contact"}>
            <div className="main__contact__container">
                <div className="main__contact__container__head">
                    <span className="main__contact__container__head-head">Contact</span>
                    <div className="main__contact__container__head-line"></div>
                    <span className="main__contact__container__head-title">Here you can contact with us</span>
                </div>
                <form onSubmit={(e) => submitHandler(e)} className="main__contact__container__input">
                    <div className="main__contact__container__input__line">
                        <input minLength={2} maxLength={20} required value={name} onChange={(e) => setName(e.target.value)} placeholder={"Name"} type={"text"}
                               className="main__contact__container__input__line__text"/>
                        <input minLength={2} maxLength={20} required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} type={"email"}
                               className="main__contact__container__input__line__text"/>
                        <input required minLength={17} maxLength={18} value={phone} onChange={(event) => phoneHandler(event.target.value)} placeholder={"Phone"} type={"tel"}
                               className="main__contact__container__input__line__text"/>
                    </div>
                    <div className="main__contact__container__input__line">
                        <textarea placeholder="Message" className="main__contact__container__input__line__text main__contact__container__input__line__text-area"
                                value={message} onChange={(e) => setMessage(e.target.value)} minLength={20} maxLength={500} required style={{resize:"none"}}></textarea>
                    </div>
                    <div className="main__contact__container__input__line">
                        <button className="main__contact__container__input__line__button" type={"submit"}>SEND MESSAGE</button>
                    </div>
                </form>



            </div>

        </div>
    )
}

export default MainPageContact