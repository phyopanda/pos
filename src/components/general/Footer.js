import React from "react";
import '../../assets/css/components/footer.css';

export const Footer = (props) => {

    return(
        <div className="fixed-bottom bg-black">
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-6 pb-1">
                        <h3 className="office-header p-3"> Office Info </h3>
                        <ul className="office-info ps-3">
                            <li> No.(165), Middle Baho Road, Mayangone, Yangon </li>
                            <li> +959 421038123, +959 758276201 </li>
                            <li> info@agritechpos.com, support@agritechpos.com </li>
                            <li> https://www.agritechpos.com </li>
                        </ul>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                        <ul className="company-info pe-2">
                            <li> Terms of Use | Privacy </li>
                            <li> © 2022 HashTag Co.,Ltd (Reg No:200210155R) </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}