import React, {useEffect, useState} from 'react';
import {Card, FormLabel, FormControl, Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {paginationComponentOptions} from '../table/paginationOptions';
import {CreditTableColumns} from './CreditTableColumn';
import moment from 'moment';
import {itemExportToExcel} from '../../utilities/exports/itemExport.utility';

export const CreditTableComponent = ({data, retrive, refresh}) => {
	const [tableData, setTableData] = useState([]);
	const [currentRow, setCurrentRow] = useState(null);
	const [start_date, setStartDAte] = useState('');
	const [end_date, setEndDate] = useState('');
	const [currentInvoice, setCurrentInvoice] = useState('');

	const selectRowHandler = e => {
		setCurrentRow(e);
		retrive(e);
	};

	const dateStartRangeHandler = start_date => {
		const creditStart = tableData.filter(
			e => moment(e.invoice.created_at).format('YYYY-MM-DD') >= moment(start_date).format('YYYY-MM-DD')
		);
		setTableData(creditStart);
	};

	const dateEndRangeHandler = end_date => {
		const creditEnd = tableData.filter(
			e => moment(e.invoice.created_at).format('YYYY-MM-DD') <= moment(end_date).format('YYYY-MM-DD')
		);
		setTableData(creditEnd);
	};

	const clear = () => {
		setStartDAte('');
		setEndDate('');
		setTableData(data);
	};

	const payAmount = e => {
		let repayment = JSON.parse(e.repayment);
		let payList = repayment.map(e => e.pay_amount);
		let payAmount = payList.reduce((a, b) => a + b, 0);
		return payAmount;
	};

	const remainBalance = e => {
		let repayment = JSON.parse(e.repayment);
		let payList = repayment.map(e => e.pay_amount);
		let payAmount = payList.reduce((a, b) => a + b, 0);
		let remainBalance = e.invoice.total_amount - payAmount;
		if (remainBalance < 0) {
			return (remainBalance = 0);
		}
		return remainBalance;
	};

	const repaymentTime = e => {
		let repayment = JSON.parse(e.repayment);
		let repaymentTime = repayment.length;
		return repaymentTime;
	};

	const lastRepaymentDate = e => {
		let repayment = JSON.parse(e.repayment);
		let lastRepayment = repayment[repayment.length - 1];
		let lastRepaymentDate = moment(lastRepayment.created_at).format('DD,MM,YYYY');
		return lastRepaymentDate;
	};

	const exportCredit = () => {
		const excelData = tableData.map(e => ({
			invoice_no: e.invoice_no,
			invoiceDate: moment(e.created_at).format('DD,MM,YYYY'),
			total_amount: e.invoice.total_amount,
			discount: e.invoice.discount,
			pay_amount: payAmount(e),
			remaining_balance: remainBalance(e),
			repayment_time: repaymentTime(e),
			last_repayment: lastRepaymentDate(e)
		}));
		itemExportToExcel(
			start_date === '' && end_date === '' ? 'Credit List' : 'Credit List From ' + start_date + ' to ' + end_date,
			excelData
		);
	};

	useEffect(
		() => {
			if (data) {
				setTableData(data);
			}
			if ((refresh = true)) {
				const newData = data.filter(e => e.invoice_no === currentInvoice);
				retrive(newData);
			}
		},
		[data, refresh]
	);

	return (
		<Card>
			<Card.Header>
				<div className="d-md-flex flex-md-row ms-3">
					<Card.Title className="col">
						{' '}
						<h3>Credit</h3>{' '}
					</Card.Title>
					<div className="d-md-flex flex-md-column ms-3">
						<FormLabel> Start Date </FormLabel>
						<FormControl
							type="date"
							placeholder="Choose Start Date"
							value={start_date}
							onChange={e => {
								setStartDAte(e.target.value);
								dateStartRangeHandler(e.target.value);
							}}
						/>
					</div>

					<div className="d-md-flex flex-md-column ms-3">
						<FormLabel> End Date </FormLabel>
						<FormControl
							type="date"
							placeholder="Choose End Date"
							value={end_date}
							onChange={e => {
								setEndDate(e.target.value);
								dateEndRangeHandler(e.target.value);
							}}
						/>
					</div>
					<div className="d-md-flex flex-md-column ms-3 mt-2">
						<Button className="btn mt-4" onClick={() => exportCredit()}>
							{' '}
							Export{' '}
						</Button>
					</div>

					<div className="d-md-flex flex-md-column ms-3 mt-2">
						<Button className="btn mt-4" onClick={() => clear()}>
							{' '}
							Clear{' '}
						</Button>
					</div>
				</div>
			</Card.Header>

			<Card.Body>
				<DataTable
					dense
					highlightOnHover
					pointerOnHover
					selectableRows={true}
					selectableRowsHighlight={true}
					selectableRowsSingle={true}
					onSelectedRowsChange={e => {
						selectRowHandler(e.selectedRows);
						if (e.selectedCount === 1) {
							return setCurrentInvoice(e.selectedRows[0].invoice_no);
						} else {
							setCurrentInvoice('');
							retrive(null);
							return;
						}
					}}
					columns={CreditTableColumns()}
					data={tableData}
					pagination
					paginationComponentOptions={paginationComponentOptions}
					paginationPerPage={50}
					paginationRowsPerPageOptions={[50, 100, 150, 200, 500]}
				/>
			</Card.Body>
		</Card>
	);
};
