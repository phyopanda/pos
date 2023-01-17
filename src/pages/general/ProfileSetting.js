import React, { useEffect, useState } from 'react'
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changePassword, editUser, getProfile  } from '../../services/user.service'
import { messageBoxType } from '../../utilities/native.utility'
import { t, zawgyi } from '../../utilities/translation.utility'

const checkphone = /^(\+?(95)|[09])\d{9}/g;
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ProfileSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;
    const { nativeApi } = window;
    const history = useHistory();

    const [ data ,setData ] = useState([])
    const [adminName, setAdminName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isloading, setIsLoading] = useState(true);

    const loadingData = async () => {

        const response = await getProfile();

        if (response && response.success === false) {
            nativeApi.messageBox.open({
                title: t('title-update-profile'),
                message: response.message,
                type: messageBoxType.info
            });
            return;
        }

        setData(response);
        setAdminName(response.name);
        setPhone(response.phone);
        setEmail(response.email);
        setIsLoading(false);
        return;
    }

    const update = async () => {
        if (adminName === '' || phone === '' || email === '') {
            nativeApi.messageBox.open({
                title: t('title-update-profile'),
                message: t('all-fields-are-requried'),
                type: messageBoxType.info
            });
            return;
        }

        const requestBody = {
            name: adminName,
            phone: phone,
            email: email
        }

        if(data.name === adminName) {
            delete requestBody.name;
        }

        if(data.phone === phone) {
            delete requestBody.phone;
        }

        if(data.email === email) {
            delete requestBody.email;
        }  

        if(Object.keys(requestBody).length === 0) {
            nativeApi.messageBox.open({
                title: t('title-update-profile'),
                message: t('does-not-have-update-info'),
                type: messageBoxType.info
            });
            return;
        }

        if (!checkphone.test(phone)) {
            nativeApi.messageBox.open({
                title: t('title-update-profile'),
                message: t('invalid-phone-number'),
                type: messageBoxType.info
            });
            return;
        }

        if (!pattern.test(email)) {
            nativeApi.messageBox.open({
                title: t('title-update-profile'),
                message: t('invalid-email-address'),
                type: messageBoxType.info
            });
            return;
        }

        const response = await editUser(data.id , requestBody);

        if(response && response.success === false) {
            nativeApi.messageBox.open({
                title: t('title-update-profile'),
                message: response.message,
                type: messageBoxType.info
            });
            return;
        }

        loadingData();

        nativeApi.notification.show({
            title: t('title-update-profile'),
            body: t('success-update-profile')
        });

        return;
    }

    const change = async() => {
        if(currentPassword === '' || newPassword === '' || confirmPassword === '') {
            nativeApi.messageBox.open({
                title: t('title-change-password'),
                message: t('all-fields-are-requried'),
                type: messageBoxType.info
            });
            return;
        }

        if(confirmPassword !== newPassword) {
            nativeApi.messageBox.open({
                title: t('title-change-password'),
                message: t('invalid-change-password-confirm'),
                type: messageBoxType.info
            });
            return;
        }
        
        setIsLoading(true)

        const requestBody = {
            password : currentPassword,
            newPassword : newPassword
        }

        const response = await changePassword(data.id , requestBody);

        if(response && response.success === false) {
            nativeApi.messageBox.open({
                title: t('title-change-password'),
                message : response.message,
                type : messageBoxType.info
            });
            setIsLoading(false);
            return;
        }
       
        setIsLoading(false);

        nativeApi.notification.show({
            title: t('title-change-password'),
            body: t('success-update-password')
        });

        history.push('/logout');
        return;
    }

    useEffect(() => {
        loadingData();
    }, [])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('update-profile')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='text'
                            className={`me-3 ${zawgyi(lang)}`}
                            placeholder={t('name')}
                            value={adminName}
                            onChange={e => setAdminName(e.target.value)}
                        />

                        <FormControl
                            type='text'
                            className={`me-3 ${zawgyi(lang)}`}
                            placeholder={t('phone')}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />

                        <FormControl
                            type='email'
                            className={`me-3 ${zawgyi(lang)}`}
                            placeholder={t('email')}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Button onClick={() => update()} disabled={isloading} className={`${zawgyi(lang)}`}> {t('update')} </Button>
                    </InputGroup>

                    <Card.Title className={`${zawgyi(lang)}`}>  {t('change-password')} </Card.Title>

                    <InputGroup>
                        <FormControl
                            type='password'
                            className={`me-3 ${zawgyi(lang)}`}
                            placeholder={t('current-password')}
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                        />

                        <FormControl
                            type='password'
                            className={`me-3 ${zawgyi(lang)}`}
                            placeholder={t('new-password')}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />

                        <FormControl
                            className={`me-3 ${zawgyi(lang)}`}
                            type='password'
                            placeholder={t('confirm-password')}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />

                        <Button onClick={() => change()} disabled={isloading} className={`${zawgyi(lang)}`}> {t('change-password')} </Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProfileSetting;