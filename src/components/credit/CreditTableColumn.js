import numeral from 'numeral';
import moment from 'moment';
import React from 'react';
import {t} from 'i18next';

export const CreditTableColumns = () => {
	const columns = [
		{
			name: <span>#</span>,
			selector: (row, index) => index + 1,
			width: '50px'
		},
		{
			name: <span> {t('invoice-id')} </span>,
			selector: row => row.invoice_no,
			sortable: true
		},

		{
			name: <span> {t('invoice-date')} </span>,
			selector: row => moment(row.invoice.created_at).format('DD-MM-Y'),
			sortable: true
		},

		{
			name: <span> {t('total-amount')} </span>,
			selector: row => {
				const total = Number(row.invoice.total_amount) + Number(row.invoice.total_amount) * (15 / 100);
				return <span> {`${numeral(total).format('0,0')} MMK`} </span>;
			},
			sortable: true
		},

		{
			name: <span> {t('discount')} </span>,
			selector: row => `${numeral(row.invoice.discount).format('0,0')} MMK`,
			sortable: true
		},

		{
			name: <span> {t('credit-amount')} </span>,
			selector: row => `${numeral(row.invoice.credit_amount).format('0,0')} MMK`,
			sortable: true
		},

		{
			name: <span> {t('pay-amount')} </span>,
			selector: row => {
				const repayments = JSON.parse(row.repayment);
				const repaymentAmounts = repayments.map(value => value.pay_amount);
				const totalRepayment = repaymentAmounts.reduce((a, b) => a + b, 0);
				return <span> {`${numeral(totalRepayment).format('0,0')} MMK`} </span>;
			},
			sortable: true
		},

		{
			name: <span> {t('remaining-balance')} </span>,
			selector: row => {
				const repayments = JSON.parse(row.repayment);
				const repaymentAmounts = repayments.map(value => value.pay_amount);
				const totalRepayment = repaymentAmounts.reduce((a, b) => a + b, 0);
				const balance = totalRepayment + Number(row.invoice.discount);
				const total = Number(row.invoice.total_amount) + Number(row.invoice.total_amount) * (15 / 100);
				let remainBalance = total - balance;
				if (remainBalance < 0) {
					remainBalance = 0;
					return <span> {`${numeral(remainBalance).format('0,0')} MMK`} </span>;
				}
				return <span> {`${numeral(remainBalance).format('0,0')} MMK`} </span>;
			},
			sortable: true
		},

		{
			name: <span>{t('remaining-time')} </span>,
			selector: row => `${JSON.parse(row.repayment).length} times`,
			sortable: true
		},

		{
			name: <span> {t('last-day')} </span>,
			selector: row => {
				const repayments = JSON.parse(row.repayment);
				const lastRepayment = repayments[repayments.length - 1];

				return <span> {moment(lastRepayment.pay_date).format('DD-MM-Y')} </span>;
			},
			sortable: true
		}
	];
	return columns;
};
