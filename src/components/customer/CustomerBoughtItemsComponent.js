import React, { useEffect, useState } from 'react'
import { Badge, Card } from 'react-bootstrap';
import { getInvoice } from '../../services/invoice.service';
import { messageBoxType } from '../../utilities/native.utility';
import moment from 'moment';
import numeral from 'numeral';

const CustomerBoughtItemsComponent = ({props, customerInfo}) => {
    const [boughtInvoices, setBoughtInvoices] = useState([]);

    const getBoughtInvoices = async() => {
        const {nativeApi} = window;
        const customer = customerInfo[0];
        const response = await getInvoice();
        if(response && response.success === false){
            nativeApi.messageBox.open({title: 'Customer', message: response.message, type: messageBoxType.error});
        };
        const getInvoices = response.filter(e => e.customer_phone === customer.phone)
        setBoughtInvoices(getInvoices);
    }

    useEffect(() => {
        if(customerInfo){
            getBoughtInvoices();
        }
    },[customerInfo])
  return (
    <Card className='mt-3'>
        <Card.Header>
            <Card.Title>
                <span className='title'> Bought Invoices</span>
            </Card.Title>
        </Card.Header>
        <Card.Body>
            {
                boughtInvoices && boughtInvoices.map((e, i) => (
                    <div key={`bought invoice id ${i}`} className='bought-invoice-box'>
                        <Badge className='ms-2'> Invoice-{e.invoice_no}</Badge>
                        <Badge className='ms-2'>{moment(e.created_at).format('DD-MM-Y')}</Badge>
                        <Badge className='ms-2'>{`${numeral(e.total_amount).format(0,0)} MMK`}</Badge>
                    </div>
                ))
            }
        </Card.Body>
    </Card>
  )
}

export default CustomerBoughtItemsComponent