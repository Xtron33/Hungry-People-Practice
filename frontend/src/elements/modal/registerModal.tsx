import {Button, Text, TextInput, useToaster} from "@gravity-ui/uikit";
import {useState} from "react";
import validateEmail from "../../utils/helper/email-validater.helper.ts";
import {userAuthApi} from "../../api/user.auth.api.ts";

function RegisterModal(){

    const {add} = useToaster();

    const [validEmail, setValidEmail] = useState<"invalid" | undefined>(undefined)
    const [validPassword, setValidPassword] = useState<"invalid" | undefined>(undefined)
    const [validConfirmPassword, setValidConfirmPassword] = useState<"invalid" | undefined>(undefined)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        let validEmailFlag: boolean = true
        let validPasswordFlag: boolean = true
        let validConfPasswordFlag: boolean = true

        e.preventDefault()
        if(validateEmail(email)){
            setValidEmail(undefined)
            validEmailFlag = true
        }
        else{
            setValidEmail("invalid")
            validEmailFlag = false

        }
        if(password.length<6){
            setValidPassword("invalid")
            validPasswordFlag = false
        }
        else{
            setValidPassword(undefined)
            validPasswordFlag = true
        }
        if(password!=confPassword){
            setValidConfirmPassword("invalid")
            validConfPasswordFlag = false
        }
        else{
            setValidConfirmPassword(undefined)
            validConfPasswordFlag = true
        }

        if(validEmailFlag && validPasswordFlag && validConfPasswordFlag){
            try {
                await userAuthApi.register({
                    email: email,
                    password: password,
                    role: 'user'
                })
                add({
                    name: "register",
                    title: "Успешная регистрация",
                    autoHiding: 2000,
                    type: "success"
                });

            }
            catch (err: unknown){
                add({
                    name: "register",
                    title: "Не удалось создать пользователя",
                    content: "Проверьте, возможно пользователь с данной почтой уже существует",
                    autoHiding: 2000,
                    type: "error"
                })
            }
        }

    }


    return(
        <form onSubmit={(event) => registerHandler(event)}>
            <div className="modal-user__container__input-container">
                <Text variant={"subheader-3"}>Email</Text>
                <TextInput value={email} onUpdate={(e) => setEmail(e)} size={"xl"} type={"email"} placeholder="example@mail.com" errorMessage="It's not email!" validationState={validEmail} />
            </div>
            <div className="modal-user__container__input-container">
                <Text variant={"subheader-3"}>Password</Text>
                <TextInput value={password} onUpdate={(e) => setPassword(e)} size={"xl"} type={"password"} placeholder="********" errorMessage="Password min length 6 characters" validationState={validPassword} />
            </div>
            <div className="modal-user__container__input-container">
                <Text variant={"subheader-3"}>Confirm password</Text>
                <TextInput value={confPassword} onUpdate={(e) => setConfPassword(e)} size={"xl"} type={"password"} placeholder="********" errorMessage="Passwords not match" validationState={validConfirmPassword} />
            </div>
            <Button type={"submit"} view={"action"} size={"xl"}>Sig In</Button>
        </form>
    )
}

export default RegisterModal