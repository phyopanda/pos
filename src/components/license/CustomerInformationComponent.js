import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from 'react-redux';
import { zawgyi } from "../../utilities/translation.utility";
import { messageBoxType } from "../../utilities/native.utility";
import { t } from 'i18next';

export const CustomerInformationComponent = ({ retriveUserInfo, backStep }) => {

    const state = useSelector(state => state);
    const { lang } = state;
    const { nativeApi } = window;

    const messageboxTitle = t('title-customer-info');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const checkPhone = /^(\+?(95)|[09])\d{10}/g;
    const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const submit = () => {
        if(firstName === '' || lastName === '' || email === '' || phone === '' || address === '') {
            nativeApi.messageBox.open({title: messageboxTitle, message: t('all-fields-are-requried'), type: messageBoxType.info});
            return;
        }

        if(!checkEmail.test(email)){
            nativeApi.messageBox.open({title: messageboxTitle, message: t('invalid-email-address'), type: messageBoxType.info});
            return;
        }

        if(!checkPhone.test(phone)){
            nativeApi.messageBox.open({title: messageboxTitle, message: t('invalid-phone-number'), type: messageBoxType.info});
            return;
        }

        const userInfo = {
            first_name: firstName,
            last_name: lastName,
            display_name: `${firstName} ${lastName}`,
            phone: phone,
            email: email,
            address: address
        }

        retriveUserInfo(userInfo);
    }

    return (
        <div className="d-md-flex flex-md-column"> 
            <div className="d-md-flex flex-md-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('serial-key')} />
                <p className={`${zawgyi(lang)} mt-3`}> {t('description-userinfo')} </p>
            </div>

            <div className="d-md-flex flex-md-column">
                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="me-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            required={true}
                            value={firstName}
                            placeholder={t('first-name')}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            required={true}
                            value={lastName}
                            placeholder={t('last-name')}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            required={true}
                            value={phone}
                            placeholder={t('phone')}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="ms-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="email"
                            required={true}
                            value={email}
                            placeholder={t('email')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            as="textarea"
                            rows={3}
                            required={true}
                            value={address}
                            placeholder={t('address')}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <Button onClick={() => submit()} className={`${zawgyi(lang)}`}> {t('confirm')} </Button>
            </div>
        </div>
    )
}