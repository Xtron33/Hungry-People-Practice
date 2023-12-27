
import MainPageFirstBlock from "../components/main.page.block/main-page.first-block.tsx";
import MainPageAboutUs from "../components/main.page.block/main-page.about-us.tsx";
import '../styles/main-page/main-page.scss'
import MainPageOurTeam from "../components/main.page.block/main-page.our-team.tsx";
import MainPageBooking from "../components/main.page.block/main-page.booking.tsx";
import MainPageSpec from "../components/main.page.block/main-page.spec.tsx";
import MainPageMenu from "../components/main.page.block/main-page.menu.tsx";
import MainPageContact from "../components/main.page.block/main-page.contact.tsx";
import MainPageMaps from "../components/main.page.block/main-page.maps.tsx";

function MainPage(){

    return(
        <div className="main">
            <MainPageFirstBlock/>
            <MainPageAboutUs/>
            <MainPageOurTeam/>
            <MainPageBooking/>
            <MainPageSpec/>
            <MainPageMenu/>
            <MainPageContact/>
            <MainPageMaps/>
        </div>
    )
}

export default MainPage;