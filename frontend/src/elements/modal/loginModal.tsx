import {Button, Text, TextInput, useToaster} from "@gravity-ui/uikit";
import {useState} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import validateEmail from "../../utils/helper/email-validater.helper.ts";
import {userAuthApi} from "../../api/user.auth.api.ts";
import {UserSlice} from "../../store/slice/userSlice.ts";

function LoginModal(){

    const {add} = useToaster()

    const dispatch = useAppDispatch()

    const [validEmail, setValidEmail] = useState<"invalid" | undefined>(undefined)
    const [validPassword, setValidPassword] = useState<"invalid" | undefined>(undefined)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(validateEmail(email)){
            setValidEmail(undefined)
        }
        else{
            setValidEmail("invalid")
        }
        if(password.length<6){
            setValidPassword("invalid")
        }
        else{
            setValidPassword(undefined)
        }

        if(validEmail === undefined && validPassword === undefined){
            try {
                const data = await userAuthApi.login({
                    email: email,
                    password: password
                })
                if(data){
                    dispatch(UserSlice.actions.login(data))
                    add({
                        name: "login",
                        title: "Успешный вход",
                        autoHiding: 2000,
                        type: "success"
                    });
                }
            }
            catch (err: unknown){
                add({
                    name: "login",
                    title: "Не удалось войти в систему",
                    content: "Проверьте почту и пароль",
                    autoHiding: 2000,
                    type: "error"
                })
            }
        }

    }

    return(
        <form onSubmit={(event) => loginHandler(event)}>
            <div className="modal-user__container__input-container">
                <Text variant={"subheader-3"}>Email</Text>
                <TextInput value={email} onUpdate={(e) => setEmail(e)} size={"xl"} type={"email"} placeholder="example@mail.com" errorMessage="It's not email!" validationState={validEmail} />
            </div>
            <div className="modal-user__container__input-container">
                <Text variant={"subheader-3"}>Password</Text>
                <TextInput value={password} onUpdate={(e) => setPassword(e)} size={"xl"} type={"password"} placeholder="********" errorMessage="Password min length 6 characters" validationState={validPassword} />
            </div>
            <Button type={"submit"} view={"action"} size={"xl"}>Log In</Button>
        </form>
    )
}

export default LoginModal