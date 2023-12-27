
import '../../styles/main-page/main-page.menu.scss'
import {useEffect, useState} from "react";
import {ICategory} from "../../utils/types/ICategory.ts";
import {categoryApi} from "../../api/category.api.ts";
import {IMenu} from "../../utils/types/IMenu.ts";
import {menuApi} from "../../api/menu.api.ts";
import MenuItem from "../../elements/main-page/MenuItem.tsx";
import {isMobile} from 'react-device-detect'
import {Select} from "@gravity-ui/uikit";
function MainPageMenu(){
    const [categories,setCategories] = useState<ICategory[]>([])
    const [menu, setMenu] = useState<IMenu[]>([])



    const [currentCategory, setCurrentCategory] = useState<number>(0)

    useEffect(() => {
        categoryApi.fetchData().then((data) => {
            if(data !== undefined){

                const buff: ICategory[] = [{id: 0, name: "Main"}]
                data.forEach((elem) => buff.push(elem))
                setCategories(buff)
            }
        })
        menuApi.fetchData().then((data) => {
            if(data!==undefined){
                setMenu(data)
            }
        })
    }, []);

    return (
        <div id={"menu"} className={"main__menu"}>
            <div className={"main__menu__container"}>
                <div className="main__menu__container__head">
                    <span className="main__menu__container__head-head">Delicious Menu</span>
                    <div className="main__menu__container__head-line"></div>
                    <span className="main__menu__container__head-title">Our menu best in the world</span>
                </div>
                {
                    !isMobile ?
                        <div className="main__menu__container__category">
                            <div onClick={() => setCurrentCategory(0)} className="main__menu__container__category__item">Main</div>
                            {
                                categories.map((elem) => <div onClick={() => setCurrentCategory(elem.id !== undefined ? elem.id : 0)} className="main__menu__container__category__item" key={elem.id}>{elem.name}</div> )
                            }
                        </div>
                        :
                        <div className="main__menu__container__category">
                            <Select
                            size={"xl"}
                            width={300}
                            defaultValue={['0']}
                            onUpdate={(e) => setCurrentCategory(parseInt(e[0]))}
                            >
                                {
                                    categories.map((elem) => <Select.Option value={elem.id !== undefined ? elem.id.toString() : '0'} key={elem.id} >{elem.name}</Select.Option> )
                                }
                            </Select>
                        </div>

                }

                <div className="main__menu__container__menu">
                    {
                        menu.map((elem) => currentCategory === 0 ? elem.is_main ? <MenuItem key={elem.id} item={elem}/> : <></> : currentCategory === elem.category_id ? <MenuItem key={elem.id} item={elem}/> : <></>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPageMenu