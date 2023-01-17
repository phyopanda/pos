import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { itemExportToExcel } from "../../utilities/exports/itemExport.utility";
import { t } from 'i18next';
import { pdf } from "../../utilities/export.utility";
import { zawgyi } from "../../utilities/translation.utility";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";

const CustomerTableHeaderComponent = ({props, dataSource, selectedRows}) => {
    const state = useSelector(state => state);
    const {lang} = state;
    const columns = ['Name', 'Email', 'Phone No', 'Address', 'Invoice Count', 'Total Bought Invoices', 'Total Paid Amount'];
    const [ data, setData] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const dispatch = useDispatch();

    const paidCount = (e) => {
        let repayment = JSON.parse(e.credit.repayment);
        let paidCount = repayment.length;
        return paidCount;
    }

    const exportToExcel = () => {
        const excelData = selectedRows.map(e => ({
            name: e.name,
            email: e.email,
            phone_number: e.phone,
            address: e.address,
            credit: e.credit_amount,
            invoice_count: e.invoice.length,
            total_bought_amount: total(e.invoice),
            total_credit_amount: credit(e.credit),
            total_paid_amount: payAmount(e.invoice)
        }));
        itemExportToExcel('customerlist', excelData);
    }

    const total = (e) => {
        const getTotal = e.map(value => Number(value.total_amount));
        const totalBought = getTotal.reduce((a,b) => a + b , 0);
        return totalBought;
    }

    const payAmount = (e) => {
        const getPayAmount = e.map(value => Number(value.pay_amount));
        const totalPayAmount = getPayAmount.reduce((a, b) => a + b, 0);
        return totalPayAmount;
    }

    const credit = (e) => {
        const getCredit = e.map( value => Number(value.amount));
        const totalCredit = getCredit.reduce((a, b) => a + b, 0);
        return totalCredit;
    }

    const calculateData = (e) => {
        const pdfData = e.map(e => {
            return [e.name, e.email, e.phone, e.address, e.invoice.length, total(e.invoice), credit(e.credit), payAmount(e.invoice)]
        });
        setData(pdfData);
    }

    const printToPdf = (e) => {
        calculateData(e);
        pdf(columns, data, `customer_${moment().format('D_M_Y')}`);
    }


    useEffect(() => {
        if(selectedRows.length >= 1){
            setSelectedData(selectedRows);
            setIsSelected(true);
        }else setIsSelected(false);
            
    },[selectedRows]);

    return (
            <>
            <div className="d-flex flex-row">
            {
                isSelected && (
                    <div className="me-3">
                    <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => dispatch(setOpenDelModal({
                            open: true,
                            title: 'Delete Record',
                            message: 'Are you sure to delete record',
                            type: 'customer',
                            multiple: true,
                            data : selectedData
                        }))}
                    >
                        {t('delete-all')}
                    </Button>
                    <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => printToPdf(selectedData)}
                    >
                        {t('btn-export-pdf')}
                    </Button>

                    <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => exportToExcel()}
                    >
                        {t('btn-export-excel')}
                    </Button>
                    </div>
                )
            }

            </div>
        </>
    )
}

export default CustomerTableHeaderComponent;