import image404 from '../assets/404/2x/Artboard 1@2x.png'
import '../styles/not-found.scss'
import {Text} from "@gravity-ui/uikit";
import {Link} from "react-router-dom";
function NotFound(){

    return(
        <div className={"not-found"}>
            <Text variant="display-3" className={"not-found__text"}>Oppps... Page not found :(</Text>
            <img className={"not-found__img"} src={image404}/>
            <Text variant="display-4" className={"not-found__text"}><Link to={'../'}>Go to main page -&gt;</Link></Text>
        </div>
        )

}

export default NotFound