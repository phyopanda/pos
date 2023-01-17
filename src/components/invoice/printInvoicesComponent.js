import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import numeral from 'numeral';

const tableHeader = [t('aterail-code'), t('name'), t('model'), t('quantity'), t('price'), t('total')];

const PrintInvoicesComponent = ({printData, closePrint}) => {
    const [shop, setShop] = useState(null);
    const [items, setItems] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [actual_amount, setActualAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [grandAmount, setGrandAmount] = useState(0);
    const [changes, setChanges] = useState(0);


    const printOut = async() => {
        const { print } = window.nativeApi;

        const getPrintOptions = localStorage.getItem("PRINT_SETTING") ? JSON.parse(localStorage.getItem("PRINT_SETTING")) : printOptions;
        await print.invoice(getPrintOptions);
        await print.reload((data) => {
            closePrint();
        });
    };
    console.log(printData)

    const calculateData = async() => {
            const data = await printData.invoice;
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

    useEffect(async() => {
        if(printData){
            setInvoice(printData.invoice);
            setItems(printData.invoiceData);
            setShop(printData.shop);
            await calculateData();
            await printOut();
        }
    },[])

  return (
    <>
        <div className="d-md-flex flex-md-column justify-content-center align-items-center">
            <div className="row">
                <h3> {shop && shop.name} </h3>
            </div>
            <div className="row"> 
                <h5> {shop && shop.description} </h5>
            </div>
            <div className="row">
                <h6> {shop && shop.address} </h6>
            </div>
        </div>
        <div className="d-md-flex flex-md-row justify-content-between">
            <div className="column ms-3">
                <h6>{t('phone')} - {shop && shop.phone}</h6>
            </div>
            <div className="column me-3">
                <h6>{t('email')} - {shop && shop.email}</h6>
            </div>
        </div>                                             
        <div className="col-md-12 mt-3 ps-3">
            <div className="d-md-flex flex-row justify-content-between align-items-center mb-3">
                <div className="invoice-info">
                    <h4> {t('invoice')} - AT{invoice && invoice.invoice_no} </h4>
                    <span> {t('invoice-date')} - {moment(invoice && invoice.created_at).format('DD,MM,YYYY')} </span>
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
                    { items && items.map((value, index) => {
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
                            <td className="w-200"> <h6> {numeral(invoice && invoice.total_amount).format('0,0')} MMK </h6> </td>
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
                            <td className="w-200"> <h6> {numeral(invoice && invoice.discount).format('0,0')} MMK </h6> </td>
                        </tr>

                        <tr>
                            <td className="w-200 me-2"> <h6> {t('pay_amount')} </h6> </td>
                            <td className="w-200"> <h6> {numeral(invoice && invoice.pay_amount).format('0,0')} MMK </h6> </td>
                        </tr>

                        <tr>
                            <td className="w-200 me-2"> <h6> {t('changes')} </h6> </td>
                            <td className="w-200"> <h6> {numeral(changes).format('0,0')} MMK </h6> </td>
                        </tr>

                        <tr>
                            <td className="w-200 me-2"> <h6> {t('credit-amount')} </h6> </td>
                            <td className="w-200"> <h6> {numeral(invoice && invoice.credit_amount).format('0,0')} MMK </h6> </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        
    </>
  )
}

export default PrintInvoicesComponent;