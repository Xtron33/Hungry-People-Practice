import ArrowDown from "../../assets/icons/arrow-down.svg";
import Facebook from "../../assets/icons/facebook.svg";
import X from "../../assets/icons/X.svg";
import Nelsyagram from "../../assets/icons/nelzyagramm.svg";

import {HashLink as Link} from 'react-router-hash-link'

import '../../styles/main-page/main-page.first-block.scss'

function MainPageFirstBlock(){

    return(
        <div id="home" className="main__first">
            <div className="main__first__container">
                <div className="main__first__container__left">
                    <div className="main__first__container__left__text">Mon - Fri: 8PM - 10PM, Sat - Sun: 8PM - 3AM</div>
                </div>
                <div className="main__first__container__middle">
                    <div className={"main__first__container__middle-subcontaner"}>
                        <div className="main__first__container__middle__text">
                            <div className="main__first__container__middle__text-sub">Restaurant</div>
                            <div className="main__first__container__middle__text-main">hungry people</div>
                        </div>

                        <div className="main__first__container__middle__separator"></div>
                        <div className="main__first__container__middle__button">
                            <Link to="#booking"><button style={{cursor: "pointer"}} className="main__first__container__middle__button-yellow">BOOK TABLE</button></Link>
                            <Link to="#about-us"><button style={{cursor: "pointer"}} className="main__first__container__middle__button-outline">EXPLORE</button></Link>
                        </div>
                    </div>


                    <Link to="#about-us" className="main__first__container__middle__scroll">
                        <img className="main__first__container__middle__scroll__icon" src={ArrowDown}/>
                    </Link>

                </div>
                <div className="main__first__container__right">
                    <a href="https://facebook.com" target={"_blank"} className="main__first__container__right__links">
                        <img className="main__first__container__right__links-img" src={Facebook}/>
                    </a>
                    <a href="https://twitter.com" target={"_blank"} className="main__first__container__right__links">
                        <img className="main__first__container__right__links-img" src={X}/>
                    </a>
                    <a href="https://instagram.com" target={"_blank"} className="main__first__container__right__links">
                        <img className="main__first__container__right__links-img" src={Nelsyagram}/>
                    </a>
                </div>
            </div>
            <div className="main__first__decoration">
                <div className="main__first__decoration__line"></div>
                <div className="main__first__decoration__line main__first__decoration__line-middle"></div>
                <div className="main__first__decoration__line"></div>
            </div>
        </div>
    )
}

export default MainPageFirstBlock