import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPrintAction} from '../../redux/actions/print.action';
import { printOptions } from '../../utilities/print.utility';
import { t, zawgyi } from "../../utilities/translation.utility";

const PrintSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;
    const dispatch = useDispatch()

    const [printSetting, setPrintSetting] = useState(printOptions);

    const savePrintSetting = async (key, value) => {
        printSetting[`${key}`] = value;
        dispatch(setPrintAction(printSetting));
    }

    useEffect(() => {
        // console.log(printSetting)
        const getPrintSetting = (localStorage.getItem('PRINT_DATA')) ? JSON.parse(localStorage.getItem('PRINT_DATA')) : printSetting;
        setPrintSetting(getPrintSetting) 
    }, [])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('title-print-setting')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='row'>
                        <div className='col-md-3'>
                            <FormLabel className='w-full'> {t('invoice-print-number')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    type='number'
                                    placeholder={t('invoice-print-number')}
                                    value={printSetting.copies}
                                    onChange={(e) => {
                                        savePrintSetting('copies', e.target.value)
                                    }}
                                />
                            </InputGroup>
                        </div>

                        <div className='col-md-3'>
                            <FormLabel className="w-full"> {t('color-print')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    as={'select'}
                                    value={printSetting.color}
                                    onChange={(e) => {
                                        savePrintSetting('color', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.color)
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
                                        savePrintSetting('printBackground', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.printBackground)
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
                                        savePrintSetting('landscape', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.landscape)
                                    }}
                                >
                                    <option value={false}> {t('no')} </option>
                                    <option value={true}> {t('yes')} </option>
                                </FormControl>
                            </InputGroup>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-md-4'>
                            <FormLabel className="w-full"> {t('print-silent')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    as={'select'}
                                    value={printSetting.silent}
                                    onChange={(e) => {
                                        savePrintSetting('silent', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.silent)
                                    }}
                                >
                                    <option value={false}> {t('no')} </option>
                                    <option value={true}> {t('yes')} </option>
                                </FormControl>
                            </InputGroup>
                        </div>

                        <div className='col-md-4'>
                            <FormLabel className="w-full"> {t('invoice-header')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    type='text'
                                    placeholder={t('invoice-header')}
                                    value={printSetting.header}
                                    onChange={(e) => {
                                        savePrintSetting('header', e.target.value || printSetting.header)
                                    }}
                                />
                            </InputGroup>
                        </div>

                        <div className='col-md-4'>
                            <FormLabel className="me-3 w-full"> {t('invoice-footer')} </FormLabel>
                            <InputGroup>
                                <FormControl
                                    type='text'
                                    placeholder={t('invoice-footer')}
                                    value={printSetting.footer}
                                    onChange={(e) => {
                                        savePrintSetting('footer', e.target.value || printSetting.footer)
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

export default PrintSetting