import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {t} from 'i18next';

export const invoiceColumns = props => {
	const columns = [
		{
			name: <span> # </span>,
			selector: (row, index) => index + 1,
			sortable: true,
			width: '50px'
		},
		{
			name: <span> {t('invoice-id')} </span>,
			selector: row => row.invoice_no,
			sortable: true
		},
		{
			name: <span> {t('date')} </span>,
			selector: row => moment(row.created_at).format('DD-MM-Y'),
			sortable: true
		},
		{
			name: <span> {t('name')} </span>,
			selector: row => row.customer && row.customer.name,
			sortable: true
		},
		{
			name: <span> {t('phone')} </span>,
			selector: row => row.customer && row.customer.phone,
			sortable: true
		},
		{
			name: <span> {t('email')} </span>,
			selector: row => row.customer && row.customer.email,
			sortable: true
		},
		{
			name: <span> {t('address')} </span>,
			selector: row => row.customer && row.customer.address,
			sortable: true
		},
		// {
		//     name: <span> Credit Amount </span>,
		//     selector: row => `${numeral(row.credit_amount).format('0,0')} MMK`,
		//     sortable: true
		// },
		{
			name: <span> {t('total-amount')} </span>,
			selector: row => {
				const total = Number(row.total_amount) + Number(row.total_amount) * (15 / 100);
				return <span> {`${numeral(total).format('0,0')} MMK`} </span>;
			},
			sortable: true
		},
		{
			name: <span> {t('pay-amount')} </span>,
			selector: row => `${numeral(row.pay_amount).format('0,0')} MMK`,
			sortable: true
		},
		{
			name: <span> {t('discount')} </span>,
			selector: row => `${numeral(row.discount).format('0,0')} MMK`,
			sortable: true
		},
		{
			name: <span> {t('profit')} </span>,
			selector: row => {
				const getInvoiceItems = row.invoice_data ? JSON.parse(row.invoice_data) : [];
				const totalSold = getInvoiceItems.map(e => Number(e.net_profit));
				const totalAmount = totalSold.reduce((a, b) => a + b, 0);

				return `${numeral(totalAmount).format('0,0')} MMK`;
			},
			sortable: true
		}
	];

	return columns;
};
