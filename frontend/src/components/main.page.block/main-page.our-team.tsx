import "../../styles/main-page/main-page.about-us.scss"
import {useEffect, useState} from "react";
import {IStatic} from "../../utils/types/IStatic.ts";
import {staticApi} from "../../api/static.api.ts";
import {API_KEY} from "../../utils/consts.ts";
import Rect from "../../assets/images/rect.png"
function MainPageOurTeam(){

    const [data, setData] = useState<IStatic>({} as IStatic)

    useEffect(() => {
        staticApi.fetchDataById('2').then((data)=>{
            if(data !== undefined){
                setData(data)
            }
        })
    }, []);

    return(
        <div id="our-team" className="main__our-team">
            <div className="main__our-team__container">
                <div className="main__our-team__container__head">
                    <span>Our team</span>
                </div>
                <div className="main__our-team__container__tail">
                    <div className="main__our-team__container__tail__image">
                        <img className="main__our-team__container__tail__image-main" src={API_KEY+data.image}/>
                        <img className="main__our-team__container__tail__image-rect" src={Rect}/>
                    </div>
                    <div className="main__our-team__container__tail__text">
                        <span className="main__our-team__container__tail__text-head">Master Chef</span>
                        <div className="main__our-team__container__tail__text-line"></div>
                        <span className="main__our-team__container__tail__text-title">{data.title}</span>
                        <span className="main__our-team__container__tail__text-subtitle">{data.subtitle}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MainPageOurTeam