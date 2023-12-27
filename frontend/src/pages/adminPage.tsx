import {Button, Icon, Tabs, Text} from "@gravity-ui/uikit";

import '../styles/admin-page/admin-page.scss'
import {useState} from "react";
import AdminPageFirsttabsAboutUs from "../components/admin.page/admin.page.firsttabs/admin-page.firsttabs.about-us.tsx";
import AdminPageFirsttabsOurTeam from "../components/admin.page/admin.page.firsttabs/admin-page.firsttabs.our-team.tsx";
import AdminPageFirstgtabsSpecialties
    from "../components/admin.page/admin.page.firsttabs/admin-page.firstgtabs.specialties.tsx";
import AdminPageSecondtabsCategory
    from "../components/admin.page/admin.page.secondtabs/admin-page.secondtabs.category.tsx";
import AdminPageSecondtabsMenu from "../components/admin.page/admin.page.secondtabs/admin-page.secondtabs.menu.tsx";
import AdminPageThirdtabsBooking from "../components/admin.page/admin.page.thirdtabs/admin-page.thirdtabs.booking.tsx";
import {ArrowRightFromSquare} from "@gravity-ui/icons";
import {Link} from "react-router-dom";
import AdminPageThirdtabsApplies from "../components/admin.page/admin.page.thirdtabs/admin-page.thirdtabs.applies.tsx";

function AdminPage(){

    type staticContentTabs = "about" | "team" | "specialties"
    type menuContentTabs = "category" | "menu"
    type bookingAppliesTabs = "booking" | "applies"

    const [firstTabs, setFirstTabs] = useState<staticContentTabs>('about')
    const [secondTabs, setSecondTabs] = useState<menuContentTabs>('category')
    const [thirdTabs, setThirdTabs] = useState<bookingAppliesTabs>('booking')

    return(
        <div className="admin">
            <div className="admin__container">
                <div className="admin__container__head">
                    <Text variant={"display-2"}>Admin Page</Text>
                </div>
                <Link to={"../"}><Button width={"auto"} size={"xl"} view={"flat-danger"}>Exit from AdminDashboard<Icon data={ArrowRightFromSquare}/></Button></Link>
                <div className="admin__container__item__container">
                    <div className="admin__container__item__container__head">
                        <Text variant={"header-1"}>Static Content Edit</Text>
                    </div>
                    <div className="admin__container__item__container__tabs">
                        <Tabs
                            size="xl"
                            activeTab={firstTabs}
                            onSelectTab={(tabId: staticContentTabs) => setFirstTabs(tabId)}
                            items={[
                                {id: 'about', title: 'About Us'},
                                {id: 'team', title: 'Our Team'},
                                {id: 'specialties', title: 'Specialties'},
                            ]}
                        />
                    </div>
                    <div className="admin__container__item__container__settings">
                        {
                            firstTabs === "about" ? <AdminPageFirsttabsAboutUs/> :
                                firstTabs === "team" ? <AdminPageFirsttabsOurTeam/> :
                                    firstTabs === "specialties" ? <AdminPageFirstgtabsSpecialties/> : <></>
                        }
                    </div>
                </div>
                <div className="admin__container__item__container">
                    <div className="admin__container__item__container__head">
                        <Text variant={"header-1"}>Menu Edit</Text>
                    </div>
                    <div className="admin__container__item__container__tabs">
                        <Tabs
                            size="xl"
                            activeTab={secondTabs}
                            onSelectTab={(tabId: menuContentTabs) => setSecondTabs(tabId)}
                            items={[
                                {id: 'category', title: 'Category'},
                                {id: 'menu', title: 'Menu'},
                            ]}
                        />
                    </div>
                    <div className="admin__container__item__container__settings">
                        {
                            secondTabs === "category" ? <AdminPageSecondtabsCategory/> :
                                secondTabs === "menu" ? <AdminPageSecondtabsMenu/> : <></>
                        }
                    </div>
                </div>
                <div className="admin__container__item__container">
                    <div className="admin__container__item__container__head">
                        <Text variant={"header-1"}>Booking/Applies View</Text>
                    </div>
                    <div className="admin__container__item__container__tabs">
                        <Tabs
                            size="xl"
                            activeTab={thirdTabs}
                            onSelectTab={(tabId: bookingAppliesTabs) => setThirdTabs(tabId)}
                            items={[
                                {id: 'booking', title: 'Booking'},
                                {id: 'applies', title: 'Applies'},
                            ]}
                        />
                    </div>
                    <div className="admin__container__item__container__settings">
                        {
                            thirdTabs === "booking" ? <AdminPageThirdtabsBooking/> :
                                thirdTabs === "applies" ? <AdminPageThirdtabsApplies/> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage