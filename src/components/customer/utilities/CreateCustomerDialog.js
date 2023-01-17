import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { createCustomer } from '../../../services/customer.service';
import { messageBoxType } from '../../../utilities/native.utility';
import { zawgyi, t } from '../../../utilities/translation.utility';

const checkphone = /^(\+?(95)|[09])\d{10}/g;

export const CreateCustomerDialog = ({isOpen, reload, close}) => {
    const state = useSelector(state => state);
    
    const { lang } = state;

    const [isShow, setIsShow] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setLoading] = useState(false);

    const messageBoxTitle = t('title-dialog-create-customer');

    const handleClose = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setIsShow(false);
        close(false);
    }

    const saveCustomer = async () => {
        const { nativeApi } = window;

        if(name === '' || phone === '') {
            nativeApi.messageBox.open({title: messageBoxTitle, message: t('required-name-and-phone'), type: messageBoxType.info});
            return;
        }

        if(!checkphone.test(phone)) {
            nativeApi.messageBox.open({title: messageBoxTitle, message: t('invalid-phone-number'), type: messageBoxType.info});
            return;
        }

        const requestBody = {
            name: name,
            phone: phone,
            email: email,
            address: address
        }

        setLoading(true);
        
        const response = await createCustomer(requestBody);

        if(response && response.success === false) {
            nativeApi.messageBox.open({title: messageBoxTitle, message: response.message, type: messageBoxType.info});
            setLoading(false);
            return;
        }

        setLoading(false);

        nativeApi.notification.show({title: t('success-create-customer'), body: t('success-create-customer-description')});
        handleClose();
        reload(true);
        return;
    }


    useEffect(() => {
        if(isOpen) {
            setIsShow(isOpen);
        }
    },[isOpen]);

    return(
        <Modal show={isShow} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <label className={`label-default ${zawgyi(lang)}`}> {t('title-dialog-create-customer')}  </label>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup className='mt-2'>
                    <FormControl
                        className={`${zawgyi(lang)}`}
                        type="text"
                        placeholder={t('input-customer-name')}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className='mt-2'>
                    <FormControl
                        className={`${zawgyi(lang)}`}
                        type="text"
                        placeholder={t('input-customer-phone')}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className='mt-2'>
                    <FormControl
                        className={`${zawgyi(lang)}`}
                        type="email"
                        placeholder={t('input-customer-email')}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className='mt-2'>
                    <FormControl
                        className={`${zawgyi(lang)}`}
                        type="text"
                        placeholder={t('input-customer-address')}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </InputGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button className={`${zawgyi(lang)}`} onClick={() => saveCustomer()} disabled={isLoading}> {t('btn-save')} </Button>
            </Modal.Footer>
        </Modal>
    )
}