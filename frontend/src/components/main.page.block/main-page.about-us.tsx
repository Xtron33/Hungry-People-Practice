import "../../styles/main-page/main-page.our-team.scss"
import {useEffect, useState} from "react";
import {IStatic} from "../../utils/types/IStatic.ts";
import {staticApi} from "../../api/static.api.ts";
import {API_KEY} from "../../utils/consts.ts";
import Rect from "../../assets/images/rect.png"
function MainPageAboutUs(){

    const [data, setData] = useState<IStatic>({} as IStatic)

    useEffect(() => {
        staticApi.fetchDataById('1').then((data)=>{
            if(data !== undefined){
                setData(data)
            }
        })
    }, []);

    return(
        <div id={"about-us"} className="main__about-us">
            <div className="main__about-us__container">
                <div className="main__about-us__container__text">
                    <span className="main__about-us__container__text-head">About us</span>
                    <div className="main__about-us__container__text-line"></div>
                    <span className="main__about-us__container__text-title">{data.title}</span>
                    <span className="main__about-us__container__text-subtitle">{data.subtitle}</span>
                </div>
                <div className="main__about-us__container__image">
                    <img className="main__about-us__container__image-main" src={API_KEY+data.image}/>
                    <img className="main__about-us__container__image-rect" src={Rect}/>
                </div>
            </div>
        </div>
    )
}

export default MainPageAboutUs