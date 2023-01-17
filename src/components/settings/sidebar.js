import React from 'react';
import { BsArrowRightShort } from "react-icons/bs";
import { t } from 'i18next';

const menus = [
    {
        "label": `${t('shop')}`,
        "component": "ShopComponent"
    },
    {
        "label":  `${t('number-specification')}`,
        "component": "NumberSpecificationComponent"
    },
    {
        "label" : `${t('receipt')}`,
        "component" : "InvoiceComponent"
    },
    {
        "label" :`${t('backup')}`,
        "component" : "BackUpComponent"
    }
    // {
    //     "label": "Device",
    //     "component": "DeviceComponent"
    // }
];

export const SideBarComponent = ({ getComponent }) => {

    return(
        <div className='d-md-flex flex-column sidebar-wrapper'>
            <div className='m-2'>
                <h3 className="sidebar-title mt-2"> {t('setting')} </h3>

                <ul className='sidebar-list'>
                    {menus.map((value, index) => {
                        return(
                            <li 
                                key={`setting_lists_id_${index}`}
                                onClick={() => getComponent(value.component)}
                            > 
                                <BsArrowRightShort size={30} /> 
                                <span> {value.label} </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}