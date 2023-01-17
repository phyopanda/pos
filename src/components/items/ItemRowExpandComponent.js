import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../../services/item.service';
import { messageBoxType } from '../../utilities/native.utility';
import { zawgyi, t } from '../../utilities/translation.utility';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';

export const ItemRowExpandComponent = ({ data, refresh }) => {
    const state = useSelector(state => state);
    const { lang } = state;

    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [percentage, setPercentage] = useState('');
    const [qty, setQty] = useState('');
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [code, setCode] = useState('');

    const update = async (value, fieldName) => {
        if (value === '') {
            window.nativeApi.messageBox.open({ title: t('title-update-item'), message: t('invalid-empty'), type: messageBoxType.info });
            return;
        }

        if (fieldName === 'price' || fieldName === 'qty' || fieldName === 'percentage') {
            if(value === 0){
                value = Number(0);
            }
            else if(!Number(value)){
                window.nativeApi.messageBox.open({ title: t('title-update-item'), message: t('invalid-number'), type: messageBoxType.info });
                return;              
            }
        }

        setPercentage(item.percentage);
        setQty(item.qty);
        setName(item.eng_name);
        setModel(item.model);
        setLocation(item.location);
        setPrice(item.price);
        const requestBody = item;

        if (fieldName === 'price' || fieldName === 'qty' || fieldName === 'percentage'){
            requestBody[fieldName] = Number(value);
        }
        requestBody[fieldName] = value;

        const updateResponse = updateItem(item.id, requestBody);

        if (updateResponse && updateResponse.status === false) {
            window.nativeApi.messageBox.open({ title: t('title-update-item'), message: updateResponse.message, type: messageBoxType.info });
            return;
        }

        window.nativeApi.notification.show({ title: t('title-update-item'), body: t('success-item-update') });
        refresh(true);
        return;
    }

    useEffect(() => {
        if (data) {
            setItem(data);
            setName(data.eng_name);
            setModel(data.model);
            setLocation(data.location);
            setPrice(data.price);
            setPercentage(data.percentage);
            setQty(data.qty);
            setCode(data.code);
        }
    }, [data]);

    return (
        <div className='container-fluid'>
            <div className='row'>

            <div className='col-md-2 mt-3 mb-3'>
                <Form.Label className={`${zawgyi(lang)}`}> {t('materail-code')} </Form.Label>
                <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type='text'
                            placeholder={t('materail-code')}
                            value={code || ''}
                            onChange={e => setCode(e.target.value)}
                            onKeyPress={e => {
                                if(e.code === 'Enter'){
                                update(code, 'code');
                                }
                            }}
                        />
                </InputGroup>
            </div>

            <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('name')} </Form.Label>
                    <InputGroup>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type='text'
                                placeholder={t('name')}
                                value={name || ''}
                                onChange={e => setName(e.target.value)}
                                onKeyPress={e => {
                                    if(e.code === 'Enter'){
                                        update(name, 'eng_name');
                                    }
                                }}
                            />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('model')} </Form.Label>
                    <InputGroup>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type='text'
                                placeholder={t('model')}
                                value={model || ''}
                                onChange={e => setModel(e.target.value)}
                                onKeyPress={e => {
                                    if(e.code === 'Enter'){
                                        update(model, 'model');
                                    }
                                }}
                            />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('location')} </Form.Label>
                    <InputGroup>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type='text'
                                placeholder={t('location')}
                                value={location || ''}
                                onChange={e => setLocation(e.target.value)}
                                onKeyPress={e => {
                                    if(e.code === 'Enter'){
                                        update(location, 'location');
                                    }
                                }}
                            />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('price')} </Form.Label>
                    <InputGroup>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type='text'
                                placeholder={t('price')}
                                value={price || ''}
                                onChange={e => setPrice(e.target.value)}
                                onKeyPress={e => {
                                    if(e.code === 'Enter'){
                                        update(Number(price), 'price');
                                    }
                                }}
                            />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('percentage')} </Form.Label>
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type='text'
                            placeholder={t('percentage')}
                            value={percentage || ''}
                            onChange={e => setPercentage(e.target.value)}
                            onKeyPress={e => {
                                if (e.code === 'Enter') {
                                    update(Number(percentage), 'percentage')
                                }
                            }}
                        />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('quantity')} </Form.Label>
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type='text'
                            placeholder={t('quantity')}
                            value={qty || ''}
                            onChange={e => setQty(e.target.value)}
                            onKeyPress={e => {
                                if (e.code === 'Enter') {
                                    update(Number(qty), 'qty')
                                }
                            }}
                        />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3 align-self-end'>
                    <Button 
                        className={`${zawgyi(lang)}`} 
                        onClick={() => dispatch(setOpenDelModal({
                            open: true,
                            title: t('delete-title'),
                            message: t('delete-message'),
                            type: 'items',
                            id: item.id,
                            multiple: false
                        }))}
                    > 
                        {t('btn-delete')}
                    </Button>
                </div>
            </div>
        </div>
    )
}