import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import '../../styles/main-page/main-page.maps.scss'
import Footer from "../footer.tsx";
function MainPageMaps(){

    return(
        <>
            <div className="main__maps">
                <YMaps>
                    <Map options={{restrictMapArea: true}} height={400} width={"100dvw"} className="main__maps__container" defaultState={{ center: [40.875634, 14.443508], zoom: 15 }}>
                        <Placemark options={{preset: 'islands#blueFoodIcon', iconColor: 'red'}} geometry={[40.875634, 14.443508]} />
                    </Map>
                </YMaps>
            </div>
            <Footer/>
        </>


    )
}

export default MainPageMaps