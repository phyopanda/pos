import React, { useState,useEffect } from 'react';
import {Form, FormControl, InputGroup} from 'react-bootstrap';
import {t} from 'i18next';
import { useSelector } from 'react-redux';
import { messageBoxType } from '../../../utilities/native.utility';

export const CustomerRowExpandComponent = ({data, refresh}) => {
  const state = useSelector(state => state);
  const {lang} = state;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [customer, setCustomer] = useState(null);

const updateCustomer = async (value, fieldName) => {
  if(value === ''){
    window.nativeApi.messageBox.open({title: 'Update Customer', message: 'Invalid Input', type: messageBoxType.error});
    return;
  }

  const requestBody = customer;
  requestBody[fieldName] = value;

  const response = await updateCustomer(customer.id, requestBody);
  if(response && response.success === false){
    window.nativeApi.messageBox.open({title: 'Update Customer', message: response.message, type: messageBoxType.error});
    return
  }
  window.nativeApi.notification.show({title: 'Update Customer', body: 'Customer Update Successfully'});
  refresh(true);
  return;
}

  useEffect(() => {
    if(data){
      setCustomer(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
    }
  },[data])

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3 mt-3 mb-3'>
                <Form.Label className={`${t(lang)}`}>{t('name')}</Form.Label>
                <InputGroup>
                  <FormControl
                  type='text'
                  className={`${t(lang)}`}
                  placeholder={t('name')}
                  value={name || ''}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  onKeyPress={e => {
                    if(e.code === 'Enter'){
                      updateCustomer(name, 'name');
                    }
                  }}
                  />
                </InputGroup>
            </div>
            <div className='col-md-3 mt-3 mb-3'>
                <Form.Label className={`${t(lang)}`}>{t('email')}</Form.Label>
                <InputGroup>
                  <FormControl
                  type='text'
                  className={`${t(lang)}`}
                  placeholder={t('email')}
                  value={email || ''}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  onKeyPress={e => {
                    if(e.code === 'Enter'){
                      updateCustomer(email, 'email');
                    }
                  }}
                  />
                </InputGroup>
            </div>
            <div className='col-md-3 mt-3 mb-3'>
                <Form.Label className={`${t(lang)}`}>{t('phone')}</Form.Label>
                <InputGroup>
                  <FormControl
                  type='text'
                  className={`${t(lang)}`}
                  placeholder={t('phone')}
                  value={phone || ''}
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                  onKeyPress={e => {
                    if(e.code === 'Enter'){
                      updateCustomer(phone, 'phone');
                    }
                  }}
                  />
                </InputGroup>
            </div>
              <div className='col-md-3 mt-3 mb-3'>
                <Form.Label className={`${t(lang)}`}>{t('address')}</Form.Label>
                <InputGroup>
                  <FormControl
                  type='text'
                  className={`${t(lang)}`}
                  placeholder={t('address')}
                  value={address || ''}
                  onChange={e => {
                    setAddress(e.target.value);
                  }}
                  onKeyPress={e => {
                    if(e.code === 'Enter'){
                      update(address, 'address');
                    }
                  }}
                  />
                </InputGroup>
            </div>
        </div>
    </div>
  )
}
