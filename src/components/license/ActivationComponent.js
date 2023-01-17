import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { activatedLicense, storeLicense } from "../../services/license.service.js";
import axios from "axios";
import { LICENSE } from "../../redux/actionTypes";
import { t, zawgyi } from "../../utilities/translation.utility.js";
import { messageBoxType } from '../../utilities/native.utility';

export const ActivationComponent = ({ serial, user, plan, backStep, history }) => {

    const state = useSelector(state => state);
    const { lang } = state;
    const { nativeApi } = window;

    const messageBoxTitle = t('title-license-confirmation');

    const [reginfo, setReginfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const save = async () => {
        setLoading(true);

        const checkLicenseResponse = await activatedLicense(reginfo);

        if(checkLicenseResponse && checkLicenseResponse.success === false) {
            nativeApi.messageBox.open({title: messageBoxTitle, message: checkLicenseResponse.message, type: messageBoxType.info });
            setLoading(false);
            return;
        }

        const requestBody = {
            token: checkLicenseResponse.license_token,
            serial: reginfo.serial_key
        }

        const response = await storeLicense(requestBody);

        if(response && response.success === false) {
            nativeApi.messageBox.open({title: messageBoxTitle, message: checkLicenseResponse.message, type: messageBoxType.info });
            return;
        }
        axios.defaults.headers.common['license'] = response.token;
        localStorage.setItem(LICENSE, response.token);
        
        nativeApi.notification.show({title: messageBoxTitle, body: t('success-license-store')});
        
        setLoading(false);
        history.push('/');
    }
    
    useEffect(() => {
        if(serial || user || plan) {
            const requestBody = {
                serial_key: serial,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                email: user.email,
                address: user.address,
                activation_date: plan.activated_at,
                duration: plan.duration,
                num_device: plan.device
            }

            setReginfo(requestBody);
        }
    },[serial, user, plan]);

    return (
        <div className="full-w d-md-md-flex flex-md-row pe-3 ps-3">
            <div className="d-flex flex-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('plan')} />
                <p className={`${zawgyi(lang)} title-default mt-3`}> {t('title-license-confirmation')} </p>
            </div>
            
            <div className="d-md-md-flex flex-md-column mt-3">
                {(serial && plan && user) && (
                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <div className="col-md-12 pe-3">
                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('serial-number')} </label>
                            <span> {serial} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('name')} </label>
                            <span> {user.display_name} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('phone')} </label>
                            <span> {user.phone} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('email')} </label>
                            <span> {user.email} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('address')} </label>
                            <span> {user.address} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('label-activation-date')}</label>
                            <span> {plan.activated_at} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('label-service-life')} </label>
                            <span> {plan.duration} </span>
                        </div>

                        <div className="d-md-flex flex-md-row justify-content-between mb-1">
                            <label className={`${zawgyi(lang)}`}> {t('label-device')} </label>
                            <span> {plan.device} </span>
                        </div>

                        <Button className={`full-w mt-3 ${zawgyi(lang)}`} onClick={() => save()} disabled={loading}> {t('confirm')} </Button>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}