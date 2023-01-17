import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { t, zawgyi } from "../../utilities/translation.utility";
import { messageBoxType } from "../../utilities/native.utility";

const tableHeader = ['materail-code', 'name', 'model', 'quantity', 'price', 'total']

export const SaleVoucherComponent = ({ dataSource, total, retrive, refresh }) => {

    const history = useHistory();
    const state = useSelector(state => state);
    const { lang, tax } = state;
    
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState('');
    const [payAmount, setPayAmount] = useState('');
    const [creditAmount, setCreditAmount] = useState('');
    const [netAmount, setNetAmount] = useState('');
    const [grandAmount, setGrandAmount] = useState('');
    const [taxAmount, setTaxAmount] = useState(0);
    const [changes, setChanges] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const [reload, setReload] = useState(false);
    const [taxchange, setTaxChange] = useState(0);

    const messageBoxTitle = t('open-invoice');

    const calculateDiscount = (e) => {
        if(e !== '' && !Number(e)) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('invalid-number'), type: messageBoxType.info});
            return;
        }

        if(payAmount !== ''){
            const getGrandAmount = (Number(netAmount)-Number(payAmount)) - Number(e);

            if(e > grandAmount) {
                nativeApi.messageBox.open({title:messageBoxTitle, message: t('over-discount'), type: messageBoxType.info});
                return;
            }

            if(Number(getGrandAmount) < 0) {
                setCreditAmount(0);
                setChanges(Math.abs(getGrandAmount));
                setDiscount(e);
                return;
            }
            setDiscount(e);
            setChanges(Number(getGrandAmount) > 0 ? 0 : Math.abs(getGrandAmount));
            setGrandAmount(Number(netAmount) - Number(e));
            setCreditAmount(Number(getGrandAmount));
            return;
        }

        const getGrandAmount = Number(netAmount) - Number(e);

        if(e > grandAmount) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('over-discount'), type: messageBoxType.info});
            return;
        }

        setDiscount(e);
        setGrandAmount(Number(getGrandAmount));
        setCreditAmount(Number(getGrandAmount));
    }

    const makePayment = (type) => {
        if(type === 'cash'){
            const amounts = {
                total_amount: totalAmount,
                tax: taxAmount,
                actual_amount: netAmount,
                grand_amount: grandAmount,
                discount: discount,
                pay_amount: payAmount,
                changes: changes,
                credit_amount: creditAmount
            }
            localStorage.setItem('AMOUNTS', JSON.stringify(amounts));
            localStorage.setItem('INVOICE', JSON.stringify(dataSource));
            history.push('/invoiceReport');
            return;
        }
        if(type === 'save'){
            const amounts = {
                total_amount: totalAmount,
                tax: taxAmount,
                actual_amount: netAmount,
                grand_amount: grandAmount,
                discount: discount,
                pay_amount: payAmount,
                changes: changes,
                credit_amount: creditAmount
            }
            const customer = localStorage.getItem('CUSTOMER') ? JSON.parse(localStorage.getItem('CUSTOMER')) : null;
            const storeData = {
                customer: customer,
                items: dataSource,
                amounts: amounts
            }
            const storeInvoices = localStorage.getItem('STORE_INVOICES') ? JSON.parse(localStorage.getItem('STORE_INVOICES')): [];
            storeInvoices.push(storeData);
            localStorage.setItem('STORE_INVOICES', JSON.stringify(storeInvoices));
            localStorage.removeItem('CUSTOMER');
            localStorage.removeItem('CURRENT_INVOICE');
        }
        setItems([]);
        setBtnDisable(true);
        setReload(true);
        refresh();
    }

    const calculateCredit = (e) => {

        if(e !== '' && !Number(e)) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('invalid-number'), type: messageBoxType.info});
            return;
        }  
        const getCreditAmount = (Number(netAmount) - Number(discount)) - Number(e);

        if(getCreditAmount < 0) {
            const getChanges = (Number(netAmount) - Number(discount)) - Number(e);
            setChanges(Math.abs(getChanges));
            setCreditAmount(0);
            setPayAmount(e);
            return;
        }
        setChanges(getCreditAmount < 0 ? Math.abs(getCreditAmount) : 0);
        setPayAmount(e);
        setCreditAmount(getCreditAmount);
    }

    const removeItem = (item) => {
        const delitems = items.filter(e => e.id !== item.id);
        setItems(delitems);
        retrive(delitems);
    }
    
    useEffect(() => {
        setItems(dataSource);

        if(dataSource.length > 0) {
            setBtnDisable(false);
            const totalAmounts = dataSource.map(value => value.totalAmount);
            const totaPaidAmount = totalAmounts.reduce((a,b) => a + b);
            setTotalAmount(totaPaidAmount);
            const taxPercent = localStorage.getItem('TAX_CHANGE') && JSON.parse(localStorage.getItem('TAX_CHANGE')) ;
            setTaxChange(taxPercent);

            const getTax =  (Number(totaPaidAmount) * Number(taxPercent) / 100);
            setTaxAmount(getTax);

            setNetAmount(getTax + totaPaidAmount);
            setGrandAmount(getTax + totaPaidAmount);
            setCreditAmount(getTax + totaPaidAmount);
        }
        if(dataSource.length === 0 ){
            setBtnDisable(true);
        }

    }, [dataSource, total]);

    return (
        <>
            <div className="table-responsive">
                <div className="d-md-flex flex-md-row justify-content-end align-items-center">
                    <Button className="btn w-full mt-3" onClick={() => makePayment('save')} disabled={btnDisable}> <span> {t('save-invoice')}  </span> </Button>
                </div>  
                <table className="table request-item-table">
                    <thead>
                        <tr>
                            <th> # </th>
                            {tableHeader.map((header, index) => {
                                return (
                                    <th key={`header_id_${index}`} className={`${zawgyi(lang)}`}> {t(header)} </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {items.length > 0 && items.map((item, index) => {
                            return (
                                <tr key={`cart_item_id_${index}`}>
                                    <td> {index + 1} </td>
                                    <td> {item.code} </td>
                                    <td> {item.name} </td>
                                    <td> {item.model} </td>
                                    <td> {item.requestQty} </td>
                                    <td> {numeral(item.sell_price).format('0,0')} MMK </td>
                                    <td>
                                        <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                                            <span className="me-3"> {numeral(item.sell_price * item.requestQty).format('0,0')} MMK</span>
                                        </div>
                                    </td>
                                    <td>
                                        <BsTrash className="btn-icon" size={20} onClick={() => removeItem(item)} />
                                    </td>
                                </tr>  
                            )
                        })}

                        { items.length > 0 && (
                            <>
                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('total-amount')} </h5>
                                            <h5> {numeral(totalAmount).format('0,0')} MMK </h5>
                                        </div> 
                                        
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('tax-charges')} ({taxchange}%) </h5>
                                            <h5> { numeral(taxAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('actural-amount')} </h5>
                                            <h5> { numeral(netAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('discount')} </h5>
                                            <InputGroup className="request-item-table-input">
                                                <FormControl
                                                    className={`${zawgyi(lang)}`}
                                                    type="text"
                                                    value={discount}
                                                    onChange={(e) => calculateDiscount(e.target.value)}
                                                />
                                            </InputGroup>
                                        </div> 
                                        
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('pay-amount')} </h5>
                                            <InputGroup className="request-item-table-input">
                                                <FormControl
                                                    className={`${zawgyi(lang)}`}
                                                    type="text"
                                                    value={payAmount}
                                                    onChange={(e) => calculateCredit(e.target.value)}
                                                />
                                            </InputGroup>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('net-amount')} </h5>
                                            <h5> { numeral(grandAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('credit-amount')} </h5>
                                            <h5> { numeral(creditAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('refund-amount')} </h5>
                                            <h5> { numeral(changes).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={4}></td>
                                    <td colSpan={4} align='end'>
                                        <Button 
                                            className="large-btn" 
                                            onClick={() => makePayment('cash')}
                                            disabled={payAmount === 0 || payAmount === '' ? true : false}
                                        > 
                                            <span className={`${zawgyi(lang)}`}> {t('make-payment')} </span> 
                                        </Button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}