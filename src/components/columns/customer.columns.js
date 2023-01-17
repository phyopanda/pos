import numeral from 'numeral';
import React from 'react';
import {BsTrash, BsTrashFill} from 'react-icons/bs';
import {useHistory} from 'react-router-dom';
import {t} from 'i18next';
import { messageBoxType } from '../../utilities/native.utility';
import { useDispatch } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';

export const customerColumns = props => {
	const history = useHistory();
	const dispatch = useDispatch();

	const columns = [
		{
			name: <span className="datatable-header">#</span>,
			selector: (row, index) => index + 1,
			sortable: true,
			width: '50px'
		},
		{
			name: <span className="database-header">{t('name')}</span>,
			selector: row => row.name,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('email')} </span>,
			selector: row => row.email,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('phone')} </span>,
			selector: row => row.phone,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('address')} </span>,
			selector: row => row.address,
			sortable: true
		},
		{
			name: <span className='database-header'>{t('invoice-count')}</span>,
			selector: row => row.invoice.length,
			sortable: true
		},
		{
			name: <span className='database-header'>{t('total-bought-amount')}</span>,
			selector: (row) => {
				const totalAmount = row.invoice.map(e => Number(e.total_amount));
				const total = totalAmount.reduce((a,b) => a + b , 0)
				return ( 
					<span> {numeral(total).format(0,0)} MMK </span>
				)
			},
			sortable: true
		},
		{
			name: <span className='database-header'>{t('total-credit-amount')}</span>,
			selector: (row) => {
				const creditAmount = row.credit.map(e => Number(e.amount));
				const totalCredit = creditAmount.reduce((a, b) => a + b, 0);
				return(
					<span> {numeral(totalCredit).format(0,0)} MMK </span>
				)
			}
		},
		{
			name: <span className='database-header'> {t('total-paid-amount')} </span>,
			selector: row => {
				const payAmount = row.invoice.map(e => Number(e.pay_amount));
				const totalPaid = payAmount.reduce((a, b) => a + b , 0);
				return(
					<span> {numeral(totalPaid).format(0,0)} MMK </span>
				)
			}
		},
		// {
		// 	name: <span className="database-header"> {t('credit')} </span>,
		// 	selector: row => row.credit_amount,
		// 	sortable: true
		// },
		// {
		// 	name: <span className="database-header"> {t('paid-count')} </span>,
		// 	selector: row => {
		// 		console.log(row);
		// 	},
		// 	sortable: true
		// },
		// {
		// 	name: <span className="database-header"> {t('total-amount')} </span>,
		// 	selector: row => numeral(row.total_amount).format('0,0') + ' MMK',
		// 	sortable: true,
		// 	width: '175px'
		// }
		{
		  name: <span className='database-header'>Option</span>,
		  selector: (row) => {
		    return (
		      <>
                <BsTrash size={20} className="btn-icon ms-3" onClick={() => dispatch(setOpenDelModal({
                        open: true,
                        title: 'Delete Record',
                        message: 'Are you sure to delete record',
                        id: row.id,
						multiple: false,
                        type: 'customer'
                    }))}
                />
		      </>
		    )
		  }
		}
	];
	return columns;
};
