import {API_KEY} from "../../utils/consts.ts";
import {useEffect, useState} from "react";
import {ISpec} from "../../utils/types/ISpec.ts";
import {specialtiesApi} from "../../api/specialties.api.ts";

import '../../styles/main-page/main-page.spec.scss'
import {Carousel} from "antd";



function MainPageSpec(){

    const [specialities, setSpecialities] = useState<ISpec[]>([])

    useEffect(() => {
        specialtiesApi.fetchData().then((data) => {
            if(data !== undefined){
                setSpecialities(data)
            }
        })
    }, []);

    return(
        <div id="spec" className="main__spec">
            <div className="main__spec__container">
                <div className="main__spec__container__head">
                    <span>Specialties</span>
                </div>
                <div className="main__spec__container__tail">
                    <div className="main__spec__container__tail__text">
                        <span className="main__spec__container__tail__text-head">Our specialisation</span>
                        <div className="main__spec__container__tail__text-line"></div>
                        <span className="main__spec__container__tail__text-title">We're cooking food from other countries</span>
                        <span className="main__spec__container__tail__text-subtitle">In our place you can plunge in traditional food different countries</span>
                    </div>
                </div>

            </div>
            <Carousel style={{position: "absolute", width: "100%", height: "100%"}} className="main__spec__carousel"  autoplay={true} autoplaySpeed={4000} infinite={true} speed={600} easing={"easy-in-out"}>
                {
                    specialities.map((elem) =>
                        <div className={"main__spec__carousel__item"} key={elem.id}>
                            <img src={API_KEY+elem.image}/>
                        </div>
                    )
                }

            </Carousel>
        </div>
    )
}

export default MainPageSpec
