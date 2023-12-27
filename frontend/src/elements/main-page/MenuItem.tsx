import {IMenu} from "../../utils/types/IMenu.ts";


const MenuItem = (props: {item: IMenu}) => {

    return(
        <div className="main__menu__container__menu__item">
            <div className="main__menu__container__menu__item__firstline">
                <div className="main__menu__container__menu__item__firstline-name">{props.item.title}</div>
                <div className="main__menu__container__menu__item__firstline-price">{props.item.price}</div>
            </div>
            <div className="main__menu__container__menu__item__subtitle">
                {props.item.subtitle}
            </div>
        </div>
    )
}

export default MenuItem