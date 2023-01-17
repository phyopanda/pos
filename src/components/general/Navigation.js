import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Language } from "./Language";
import { AppToast } from "./toasts";
import { BsFillInboxesFill, BsFillFileEarmarkTextFill, BsCartCheckFill, BsLaptopFill, BsCreditCard, BsPeopleFill, BsFillPersonLinesFill, BsFillGearFill, BsFillFilePersonFill, BsBoxArrowInRight } from 'react-icons/bs';
import { t, zawgyi } from "../../utilities/translation.utility";
import { useSelector } from "react-redux";

const menus = [
    { label: 'dashboard-page', url: "/dashboard", icon: <BsLaptopFill className="me-2" size={20} />},
    { label: 'sale-page', url: "/sale", icon: <BsCartCheckFill className="me-2" size={20} />},
    { label: 'inventory-page', url: "/inventory", icon: <BsFillInboxesFill className="me-2" size={20} />},
    { label: 'invoice-page', url: "/invoice", icon: <BsFillFileEarmarkTextFill className="me-2" size={20} /> },
    { label: 'credit-page', url: "/credit", icon: <BsCreditCard className="me-2" size={20} />},
    { label: 'customer-page', url: "/customer", icon: <BsPeopleFill className="me-2" size={20} /> },
    { label: 'profile-page', url: "/profile", icon: <BsFillPersonLinesFill className="me-2" size={20} /> },
    { label: 'account-page', url: "/account", icon: <BsFillFilePersonFill className="me-2" size={20} /> },
    { label: 'setting-page', url: "/setting", icon: <BsFillGearFill className="me-2" size={20} /> },
    { label: 'logout-page', url: "/logout", icon: <BsBoxArrowInRight className="me-2" size={20} /> }
];

export const Navigation = ({props}) => {
    const state = useSelector(state => state);
    const history = useHistory();

    const { lang } = state;
    const { pathname } = history.location;

    const [navList, setNavList] = useState(menus);

    useEffect(() => {
        if(lang) {
            setNavList(menus);
        }
    }, [lang])

    return(
        <div className="d-md-flex flex-md-row justify-content-between align-item-center navigation-wrapper">
            <div className="d-md-flex flex-md-row justify-content-start align-items-center mb-3">
                {navList.map((menu, index) => {
                    return(
                        <Button className={`btn-nav ms-2 ${menu.url === pathname ? 'btn-nav-active' : ''}`} key={`btn_id_${index}`} onClick={() => history.push(menu.url)}>
                            {menu.icon}
                        <span className={`${zawgyi(lang)}`}> {t(menu.label)} </span>
                        </Button>
                    )
                })}
            </div>

            <Language />
        </div>
    )
}