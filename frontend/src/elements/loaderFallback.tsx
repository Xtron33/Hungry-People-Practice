import {PacmanLoader} from "react-spinners";

function LoaderFallback(){

    return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100dvw", height: "100dvh"}}>
            <PacmanLoader color="#E8C300" loading size={64} margin={0}/>
        </div>
    )
}

export default LoaderFallback