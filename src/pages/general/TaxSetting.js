import React, { useEffect, useState } from 'react'
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { taxAction } from '../../redux/actions/tax.action';
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from "../../utilities/translation.utility";

const TaxSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;
    const dispatch = useDispatch();
    const { nativeApi } = window;

    const [taxAmount, setTaxAmount] = useState('')

    const saveTax = async () => {

        if(taxAmount === '') {
            setTaxAmount(0);
            dispatch(taxAction(taxAmount));
            return;
        }

        if(!Number(taxAmount) || (Number(taxAmount) && Number(taxAmount) > 100)) {
            nativeApi.messageBox.open({
                title: t('title-tax-change'),
                message: t('invalid-tax-percentage'),
                type: messageBoxType.info
            });
            setTaxAmount(0);
            return;
        }
        
        dispatch(taxAction(taxAmount));
        return;
    }

    useEffect(() => {
        const getTax = localStorage.getItem('TAX_CHANGE') && localStorage.getItem('TAX_CHANGE');
        setTaxAmount(getTax)
    },[])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('title-tax-setting')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup>
                        <FormControl
                            type='text'
                            placeholder={t('tax-charges')}
                            maxLength={"3"}
                            value={taxAmount || ''}
                            onChange={e => setTaxAmount(e.target.value)}
                            onKeyPress={(e) => {
                                if(e.code === 'Enter') {
                                    saveTax();
                                }
                            }}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default TaxSetting