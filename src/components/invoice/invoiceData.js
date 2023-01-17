import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { getShop } from "../../services/shop.service";
import moment from "moment";
import { t } from "../../utilities/translation.utility";
import { useSelector } from "react-redux";
import numeral from "numeral";

const tableHeader = [t('aterail-code'), t('name'), t('model'), t('quantity'), t('price'), t('total')];

export const InvoiceDataComponent = ({ invoiceDetail, isOpen, closeModal, setprint }) => {

    const [shop, setShop] = useState (null);
    const [invoice, setInvoice] = useState (null);
    const [invoiceData, setInVoiceData] = useState(null);
    const [actual_amount, setActualAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [grandAmount, setGrandAmount] = useState(0);
    const [changes, setChanges] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [isPrint, setIsPrint] = useState(false);
    const [data, setData] = useState({
        shop: null,
        invoice: null,
        invoiceData: null,
    });

    const lang = useSelector(state => state.lang);

    const importData = () => {
        const data = invoiceDetail[0];
        const actual_amount = (Number(data.total_amount) + (Number(data.total_amount)*(15/100)));
        setActualAmount(actual_amount);
        const tax = (Number(data.total_amount) * (15/100));
        setTaxAmount(tax); 
        const grand_amount = Number(actual_amount) - Number(data.discount);
        setGrandAmount(grand_amount)
        if(data.pay_amount > grand_amount){
            const changes_amount = Number(data.pay_amount) - Number(grand_amount);
            setChanges(changes_amount);
            return;
        }
    }

    const print = async () => {
        setprint(data);
        setIsPrint(true);
    }

    const close = () => {
        setIsShow(false);
        closeModal();
    }

    useEffect(async () => {
        if(isOpen === 1) {
            setIsShow(true);
            const shopinfo = await getShop();

            if(shopinfo && shopinfo.success === false) {
                dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
                return;
            }
            const iData = invoiceDetail && invoiceDetail.length > 0 && JSON.parse(invoiceDetail[0].invoice_data);
            setInVoiceData(iData);
            setShop(shopinfo);
            setInvoice(invoiceDetail && invoiceDetail[0]);
            setData({
                shop: shopinfo,
                invoice: invoiceDetail && invoiceDetail[0],
                invoiceData: iData
            });
            importData(); 
        }

    },[isOpen]);

    return (
        <>
        <Modal show={isShow} size='lg'>
            <Modal.Body>
            {shop && invoice && (
                    <>
                        <div className="d-md-flex flex-md-column justify-content-center align-items-center">
                            <div className="row">
                                <h3> {shop.name} </h3>
                            </div>
                            <div className="row"> 
                                <h5> {shop.description} </h5>
                            </div>
                            <div className="row">
                                <h6> {shop.address} </h6>
                            </div>
                        </div>
                        <div className="d-md-flex flex-md-row justify-content-between">
                            <div className="column ms-3">
                                <h6>{t('phone')} - {shop.phone}</h6>
                            </div>
                            <div className="column">
                                <h6>{t('email')} - {shop.email}</h6>
                            </div>
                        </div>                                             
                        <div className="col-md-12 mt-3 ps-3">
                            <div className="d-md-flex flex-row justify-content-between align-items-center mb-3">
                                <div className="invoice-info">
                                    <h4> {t('invoice')} - AT{invoice.invoice_no} </h4>
                                    <span> {t('invoice-date')} - {moment(invoice.created_at).format('DD,MM,YYYY')} </span>
                                </div>

                                <div className="customer-info">
                                    <div className="pe-3">
                                        <h6> {t('name')} - {invoice && invoice.customer && invoice.customer.name} </h6>
                                        <h6> {t('phone')} - {invoice && invoice.customer && invoice.customer.phone} </h6>
                                        <h6> {t('address')} - {invoice && invoice.customer && invoice.customer.address} </h6>
                                    </div>
                                </div>
                            </div>


                            <table className="table solid-border mb-3 pb-3">
                                <thead>
                                    <tr>
                                        {tableHeader.map((thHeader, index) => {
                                            return (
                                                <th key={`table_header_id_${index}`} className='solid-border'> <small> {thHeader} </small> </th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody>
                                    { invoiceData && invoiceData.map((value, index) => {
                                        return (
                                        <tr key={`invoice data key ${index}`}>
                                            <td className='solid-border'> <small> {value.code} </small> </td>
                                            <td className='solid-border'> <small> {value.name} </small> </td>
                                            <td className='solid-border'> <small> {value.model} </small> </td>
                                            <td className='solid-border'> <small> {value.requestQty} </small> </td>
                                            <td className='solid-border'> <small> {numeral(value.sell_price).format('0,0')} MMK </small> </td>
                                            <td className='solid-border'> <small> {numeral(value.totalAmount).format('0,0')} MMK </small> </td>
                                        </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>

                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                <div className="">
                                    {invoice && invoice.creditAmount === 0 && (
                                        <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                    )}
                                </div>

                                <table className="me-5">
                                    <thead>
                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('total')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.total_amount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200 me-2"> <h6> TAX (15%) </h6> </td>
                                            <td className="w-200"> <h6> {numeral(taxAmount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('actual_amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(actual_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('grand_amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(grandAmount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('discount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.discount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('pay_amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.pay_amount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('changes')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(changes).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200 me-2"> <h6> {t('credit-amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.credit_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </>
                )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => print()}> Print </Button> 
                <Button onClick={close}> Close </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}