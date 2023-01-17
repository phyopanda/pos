import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { t, zawgyi } from "../../utilities/translation.utility";

export const CustomerComponent = ({ dataSource }) => {
    const state = useSelector(state => state);

    const { lang } = state;

    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if(dataSource) {
            setCustomer(dataSource);
            localStorage.setItem('CUSTOMER', JSON.stringify(dataSource));
        }
        const custData = localStorage.getItem('CUSTOMER') ? JSON.parse(localStorage.getItem('CUSTOMER')): null;
        setCustomer(custData);
    }, [dataSource]);

    return(
        <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-1 mb-1">
            {customer && (
                <>
                    <div className="col-md-3">
                        <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('name')} </label>
                            <label className={`${zawgyi(lang)}`}> {customer.name} </label>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('phone')} </label>
                            <label className={`${zawgyi(lang)}`}> {customer.phone} </label>
                        </div>
                    </div>

                    <div className="col-md-3">
                        {customer.email && (
                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-1">
                                <label className={`${zawgyi(lang)}`}> {t('email')} </label>
                                <label className={`${zawgyi(lang)}`}> {customer.email} </label>
                            </div>
                        )}

                        {customer.address && (
                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-1">
                                <label className={`${zawgyi(lang)}`}> {t('address')} </label>
                                <label className={`${zawgyi(lang)}`}> {customer.address} </label>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}