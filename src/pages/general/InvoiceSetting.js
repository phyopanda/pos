import React, { useEffect, useState } from 'react'
import { Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { useSelector ,useDispatch } from 'react-redux';
import { setInvoiceSettingAction } from '../../redux/actions/invoicesSetting.action'
import { printOptions } from '../../utilities/print.utility';
import { t } from "../../utilities/translation.utility";

const InvoiceSetting = () => {

    const state = useSelector(state => state);
    const dispatch = useDispatch()

    const [prefix, setPrefix] = useState('');
    const [printSetting, setPrintSetting] = useState(printOptions);

    const saveInvoiceSetting = (key, value) => {
        printSetting[`${key}`] = value;
        dispatch(setInvoiceSettingAction(printSetting));
        return;
    }

    useEffect(() => {
        const getPrefix = localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT';
        setPrefix(getPrefix)

        const getPrintSetting = localStorage.getItem('INVOICE_SETTING')
            ? JSON.parse(localStorage.getItem('INVOICE_SETTING'))
            : printSetting;

        setPrintSetting(getPrintSetting)
    }, [])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title> {t('invoice-setting')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='row'>
                        <div className='col-md-3 mb-3'>
                            <FormLabel className='w-100'> {t('invoice-prefix-name')} </FormLabel>

                            <InputGroup>
                                <FormControl
                                    type='text'
                                    placeholder={t('invoice-prefix-name')}
                                    value={prefix}
                                    onChange={e => {
                                        setPrefix(e.target.value)
                                        localStorage.setItem('PREFIX', e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </div>

                        <div className="col-md-3 mb-3">
                            <FormLabel className="w-full"> {t('invoice-print-number')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    type="number"
                                    placeholder={t('invoice-print-number')}
                                    value={printSetting.copies}
                                    onChange={(e) => {
                                        printSetting.copies = e.target.value;
                                        setPrintSetting(printSetting);
                                        saveInvoiceSetting('copies', e.target.value)
                                    }}
                                />
                            </InputGroup>
                        </div>


                        <div className='col-md-3 mb-3'>
                            <FormLabel className="w-full"> {t('color-print')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    as={'select'}
                                    value={printSetting.color}
                                    onChange={(e) => {
                                        saveInvoiceSetting('color', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.color)
                                    }}
                                >
                                    <option value={false}> {t('black')} & {t('white')} </option>
                                    <option value={true}> {t('color')} </option>
                                </FormControl>
                            </InputGroup>
                        </div>

                        <div className='col-md-3'>
                            <FormLabel className="w-full"> {t('print-background')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    as={'select'}
                                    value={printSetting.printBackground}
                                    onChange={(e) => {
                                        saveInvoiceSetting('printBackground', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.printBackground)
                                    }}
                                >
                                    <option value={false}> {t('no')} </option>
                                    <option value={true}> {t('yes')} </option>
                                </FormControl>
                            </InputGroup>
                        </div>

                        <div className='col-md-3'>
                            <FormLabel className="me-3 w-full"> {t('lanscape')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    as={'select'}
                                    value={printSetting.landscape}
                                    onChange={(e) => {
                                        saveInvoiceSetting('landscape', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.landscape)
                                    }}
                                >
                                    <option value={false}> {t('no')} </option>
                                    <option value={true}> {t('yes')} </option>
                                </FormControl>
                            </InputGroup>
                        </div>

                        <div className='col-md-3'>
                            <FormLabel className="w-full"> {t('print-silent')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    as={'select'}
                                    value={printSetting.silent}
                                    onChange={(e) => {
                                        saveInvoiceSetting('silent', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.silent)
                                    }}
                                >
                                    <option value={false}> {t('no')} </option>
                                    <option value={true}> {t('yes')} </option>
                                </FormControl>
                            </InputGroup>
                        </div>

                        <div className='col-md-3'>
                            <FormLabel className="w-full"> {t('invoice-header')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    type='text'
                                    placeholder={t('invoice-header')}
                                    value={printSetting.header}
                                    onChange={(e) => {
                                        saveInvoiceSetting('header', e.target.value || printSetting.header)
                                    }}
                                />
                            </InputGroup>
                        </div>


                        <div className='col-md-3'>
                            <FormLabel className="me-3 w-full"> {t('invoice-footer')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    type='text'
                                    placeholder={t('invoice-footer')}
                                    value={printSetting.footer}
                                    onChange={(e) => {
                                        saveInvoiceSetting('footer', e.target.value || printSetting.footer)
                                    }}
                                />
                            </InputGroup>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default InvoiceSetting