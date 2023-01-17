import React, { Component } from 'react';
import { Card, FormControl, FormLabel, InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../components/general/Navigation';
import { setOpenToastAction } from '../redux/actions/toast.action';
import { getInvoice } from '../services/invoice.service';
import DataTable from "react-data-table-component";
import { invoiceColumns } from './invoice/invoiceColumns';
import { TableLoadingComponent } from '../components/table/tableLoading';
import { InvoiceDataComponent } from '../components/invoice/invoiceData';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { paginationComponentOptions } from '../components/table/paginationOptions';
import { InvoiceTableHeader } from '../components/table/invoiceTableHeader';
import { autocomplete } from '../utilities/table.utility';
import { itemExportToExcel } from '../utilities/exports/itemExport.utility';
import { t } from 'i18next';
import numeral from 'numeral';
import PrintInvoicesComponent from '../components/invoice/printInvoicesComponent';

let getToday = moment().format('YYYY-MM-DD');


class InvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_date: '',
            end_date: '',
            invoices: [],
            tableloading: true,
            invoiceData: null,
            searchText: '',
            display: '',
            is_print: false,
            preview: false,
            totalSoldAmount: 0,
            showDetail: 0,
            dataToPrint: null
        }
    }

    // print(){
    //     this.setState({
    //         is_print: true
    //     })
    //     const { print } = window.nativeApi;

    //     this.setState({
    //         display: 'display'
    //     })
    //     print.invoice();
    //     print.reload((data) => {
    //         if(data === true) {
    //             this.setState({
    //                 is_print: false,
    //             })
    //         }
    //     });
    // }

    async loadingData() {
        const response = await getInvoice();
        if(response && response.success === false){
           return this.props.openToast('Invoice', response.message, 'danger');
        }
        response.map((value) => {
            let getInvoiceItems = value.invoice_data ? JSON.parse(value.invoice_data) : [];
            getInvoiceItems.map((item) => {
                item.net_profit = item.totalAmount - item.totalOriginAmount;
                return item;
            });

            value.invoice_data = JSON.stringify(getInvoiceItems);
            return value;
        });

        this.setState({
            invoices: response,
            tableloading: false,
        });
    }

    async todayInvoices() {
        const invoiceToday = this.state.invoices.filter(e => moment(e.created_at).format('YYYY-MM-DD') === getToday);
        this.setState({
            invoices: invoiceToday,
            start_date: getToday
        });
        this.totalSold();
    }

    async dateStartRangeHandler(startdate){
        await this.loadingData();
        const invoicestart = this.state.invoices.filter(e => moment(e.created_at).format('YYYY-MM-DD') >= moment(startdate).format('YYYY-MM-DD'));
            this.setState({
                invoices: invoicestart
            });
        this.totalSold();
    }

    totalSold(){
        const totalSold = this.state.invoices.map(e => Number(e.total_amount));
        const totalAmount = totalSold.reduce((a,b) => a + b, 0)
        this.setState({
            totalSoldAmount: totalAmount
        })
    }

    clear(){
        this.setState({
            end_date: '',
            searchText: '',
        });
        this.todayInvoices();
    }

    async dateEndRangeHandler(enddate){
        await this.loadingData();
        const invoiceEnd = this.state.invoices.filter(e => moment(e.created_at).format('YYYY-MM-DD') <= moment(enddate).format('YYYY-MM-DD'));
            this.setState({
                invoices: invoiceEnd
            });
        this.totalSold();
    }

    onTextChange(e){
        let resultData = this.state.invoices.filter((result, index) => {
            let filterText = result.invoice_id.toString();
            if(filterText.includes(e)){
                return result;
            };
        })
        this.setState({
            searchText: e,
            invoices: resultData
        })
    }

    handlePrint(e){
        this.setState({
            dataToPrint: e,
            is_print: true
        });
    }

    invoiceDataHandler(event){
        this.setState({
            invoiceData: event.selectedRows,
            preview: true,
            showDetail: event.selectedCount
        });
    }

    modalClose(){
        this.setState({
            showDetail: 0
        });
    }

    exportInvoice(){
        const excelData = this.state.invoices.map(e => ({
            invoice_no: e.invoice_no,
            customer_name: e.customer_name,
            customer_phone: e.customer_phone,
            customer_email: e.customer_email,
            customer_address: e.customer_address,
            credit_amount: e.credit_amount,
            total_amount: e.total_amount,
            pay_amount: e.pay_amount,
            discount: e.discount
        }));
        itemExportToExcel(this.state.start_date ==='' && this.state.end_date === ''?'Invoice List':'Invoice List from'+this.state.start_date+'to'+this.state.end_date,excelData);
    }

    async componentDidMount(){
        const {history} = this.props;
        await this.loadingData();
        this.todayInvoices();

        nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });
    }

    render() {
        const { start_date, end_date, invoices, tableloading, preview, searchText, is_print, invoiceData, totalSoldAmount, showDetail, dataToPrint } = this.state; 
        return (
            <>
            {
                is_print ? (
                    <PrintInvoicesComponent printData={dataToPrint} closePrint={() => this.setState({is_print: false, showDetail: 0})}/>
                ):(
                    <div className='container-fluid'>
                    { preview && (
                        <div className='row'>
                            <div className='col-md-12'>
                                <InvoiceDataComponent 
                                setprint={(e) => this.handlePrint(e)}
                                closeModal={() => this.modalClose()} 
                                invoiceDetail={invoiceData} 
                                isOpen={showDetail}  
                                getInvoice={invoices}/>
                            </div>
                        </div>
                    )}

                    <div className='row mt-3'>
                        {!is_print ? ( 
                        <div className='col-md-12'>
                            <Card>
                                <Card.Header className='d-md-flex flex-md-row justify-content-start align-items-center'>
                                    <div className='d-md-flex flex-md-column ms-3'>
                                        <FormLabel> {t('start-date')} </FormLabel>
                                        <FormControl
                                            type='date'
                                            placeholder={t('start-date')}
                                            value={start_date}
                                            onChange={(e) => {this.setState({ start_date: e.target.value });
                                            this.dateStartRangeHandler(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className='d-md-flex flex-md-column ms-3'>
                                        <FormLabel> {t('end-date')} </FormLabel>
                                        <FormControl
                                            type='date'
                                            placeholder={t('end-date')}
                                            value={end_date}
                                            onChange={(e) => {this.setState({ end_date: e.target.value });
                                            this.dateEndRangeHandler(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className='d-md-flex flex-md-column ms-3 mt-4 pt-2'>
                                            <Button className='btn btn-margin-top' onClick={() => this.exportInvoice()}> {t('export')} </Button>
                                        </div>

                                        <div className='d-md-flex flex-md-column ms-3 mt-4 pt-2'>
                                            <Button className='btn btn-margin-top' onClick={()=> this.clear()}> {t('clear')} </Button>
                                        </div>
                                    <div className='col'>
                                        <div className='d-md-flex flex-md-row justify-content-end align-items-center'>
                                            <h3> {t('total-sold-amount')} - {`${numeral(totalSoldAmount).format('0,0')} ${t('mmk')}`} </h3>
                                        </div>
                                    </div>
                                </Card.Header>

                                <Card.Body>
                                    <DataTable
                                        subHeader
                                        pagination={paginationComponentOptions}
                                        dense
                                        progressPending={tableloading}
                                        progressComponent={<TableLoadingComponent />}
                                        data = {invoices}
                                        columns={invoiceColumns(this.props)}
                                        highlightOnHover
                                        pointerOnHover
                                        selectableRows={true}
                                        selectableRowsHighlight={true}
                                        onSelectedRowsChange={(e) => 
                                            this.invoiceDataHandler(e)
                                        }
                                        selectableRowsSingle={true}
                                        paginationPerPage={50}
                                        paginationRowsPerPageOptions={[50, 100, 150, 200, 500]}
                                    />
                                </Card.Body>
                            </Card>
                        </div>
                        ): (<></>)}
                    </div>
                </div>
                )
            }
            </>
            
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state
  });
  
  const mapDispatchToProps = (dispatch) => ({
      openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(InvoicePage));