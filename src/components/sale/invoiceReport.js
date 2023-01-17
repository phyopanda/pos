import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getShop } from "../../services/shop.service";
import moment from "moment";
import numeral from "numeral";
import { createInvoice, getLastInvoice } from "../../services/invoice.service";
import { BsArrowLeftCircle } from 'react-icons/bs';
import { t, zawgyi } from '../../utilities/translation.utility'; 
import { printOptions } from "../../utilities/print.utility";
import { messageBoxType } from "../../utilities/native.utility";

const tableHeader = ['No', t('materail-code'), t('name'), t('quantity'), t('price'), t('total')];

class InvoiceReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: null,
            invoice: null,
            customer: null,
            amount: null,
            invoiceNumber: null,
            tax: 0,
            display: '',
            isPrint: false,
            success: false
        }
    }

    async loadingShopInfo() {
        const response = await getShop();

        if(response && response.success === false) {
            window.nativeApi.messageBox.open({ title: t('response-error'), message: response.message, type: messageBoxType.info});
            return;
        }

        this.setState({ shop: response});
    }

    async loadingLastInvoice() {
        const response = await getLastInvoice();

        if(response && response.success === false) {
            window.nativeApi.messageBox.open({ title: t('response-error'), message: response.message, type: messageBoxType.info});
            return;
        }

        const lastInvoice = response ? response.invoice_no : 0;
        const ivId = Number(lastInvoice) + 1;

        let invoice_no = '';

        for (let x = ivId.toString().length; x < 6; x++) {
            invoice_no += '0';
        }

        invoice_no += ivId;

        this.setState({
            invoiceNumber: invoice_no
        });
    }

    loadingLocalStorage() {
        const iData = localStorage.getItem('INVOICE') ? JSON.parse(localStorage.getItem('INVOICE')) : null;
        const customerData = localStorage.getItem('CUSTOMER') ? JSON.parse(localStorage.getItem('CUSTOMER')) : null;
        const getAmounts = localStorage.getItem('AMOUNTS') ? JSON.parse(localStorage.getItem('AMOUNTS')) : null;
        const taxAmount = localStorage.getItem('TAX_CHANGE') ? JSON.parse(localStorage.getItem('TAX_CHANGE')) : 0;
        this.setState({
            invoice: iData,
            customer: customerData,
            amount: getAmounts,
            tax: taxAmount
        });
    }

    async saveInvoice () {
        if (this.state.invoice && this.state.amount) {
            const requestBody = {
                invoice_no: this.state.invoiceNumber,
                customer_id: this.state.customer ? this.state.customer.id : null,
                customer_name: this.state.customer ? this.state.customer.name : null,
                customer_phone: this.state.customer ? this.state.customer.phone : null,
                customer_address: this.state.customer ? this.state.customer.address : null,
                customer_email: this.state.customer ? this.state.customer.email : null,
                total_amount: this.state.amount.grand_amount,
                pay_amount: this.state.amount.pay_amount,
                discount: this.state.amount.discount === '' ? 0 : this.state.amount.discount,
                invoice_data: this.state.invoice,
                credit_amount: this.state.amount.credit_amount,
            }

            const response = await createInvoice(requestBody);

            if (response && response.success === false) {
                window.nativeApi.messageBox.open({ title: t('response-error'), message: response.message, type: messageBoxType.info});
                return;
            }

            return;
        }

        return;
    }

    async print () {
        const { print } = window.nativeApi;
        this.setState({
            isPrint: true,
            display: 'display'
        });

        const getPrintOptions = localStorage.getItem("PRINT_SETTING") ? JSON.parse(localStorage.getItem("PRINT_SETTING")) : printOptions;
        
        await this.saveInvoice();

        await print.invoice(getPrintOptions);
        await print.reload((data) => {
            localStorage.removeItem('INVOICE');
            localStorage.removeItem('CURRENT_INVOICE');
            localStorage.removeItem('CUSTOMER');
            this.setState({
                success: true,
                isPrint: false
            });
        });
    }

    componentDidMount() {
        const { history } = this.props;

        window.nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });

        this.loadingShopInfo();
        this.loadingLastInvoice();
        this.loadingLocalStorage();
    }

    render() {
        const { lang } = this.props.reducer;
        const { history } = this.props;

        return(
            <div className="container-fluid">
                {this.state.shop === null && (
                    <div className="row mt-1">
                        <Card>
                            <Card.Header>
                                <Card.Title className={`${zawgyi(lang)}`}> {t('title-shop-wraning-info')} </Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <p className={`${zawgyi(lang)}`}> {t('body-shop-warning')} </p>
                            </Card.Body>
                        </Card>
                    </div>
                )}

                {this.state.success === false && (
                    <>
                        <div className="row mt-1">
                            <div className="d-md-flex flex-md-row justify-content-start mt-3">
                                <BsArrowLeftCircle size={30} className={`btn-icon ${this.state.display}`} onClick={() => history.push('/sale')} />
                            </div>
                        </div>
                        {this.state.shop && this.state.invoice && (
                    <div className="row mt-1">
                        <h3> Inovice. {localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT'}{this.state.invoiceNumber}</h3>
                        <table className="table solid-border">
                            <thead>
                                <tr className="solid-border">
                                    <td colSpan={6} align='center'>
                                        <h4>{this.state.shop.name}</h4>
                                        <h5>{this.state.shop.description}</h5>
                                        <h6>{this.state.shop.address}</h6>
                                        <h6>phone : {this.state.shop.phone}</h6>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="solid-border" colSpan={3} align='justify'>
                                        <h6> {t('name')}: {this.state.customer && this.state.customer.name} </h6>
                                        <h6> {t('phone')} : {this.state.customer && this.state.customer.phone} </h6>
                                        <h6> {t('address')} : {this.state.customer && this.state.customer.address} </h6>
                                    </td>
                                            
                                    <td className="solid-border" colSpan={3} align='right'>
                                        Date: <small>{moment().format('DD,MM,YYYY')} </small><br/>
                                        Invoice: <small>#{localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT'}{this.state.invoiceNumber}</small>
                                    </td>
                                </tr>

                                <tr>
                                    {tableHeader.map((thHeader, index) => {
                                        return (<th key={`table_header_id_${index}`} className='solid-border'> <small> {thHeader} </small> </th>)
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.invoice.length > 0 && this.state.invoice.map((value, index) => {
                                    return (
                                        <tr className="solid-border" key={`item_id_${index}`}>
                                            <td className='solid-border'><small>{index +1}</small></td>
                                            <td className='solid-border'> <small> {value.code} </small> </td>
                                            <td className='solid-border'> <small> {value.name} </small> </td>
                                            <td className='solid-border'> <small> {value.requestQty} </small> </td>
                                            <td className='solid-border'> <small> {numeral(value.sell_price).format('0,0')} MMK </small> </td>
                                            <td className='solid-border'> <small> {numeral(value.totalAmount).format('0,0')} MMK </small> </td>
                                        </tr>
                                    )
                                })}
                                
                                {this.state.amount && (
                                    <>
                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('total-amount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.total_amount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('tax-charges')}({this.state.tax}%) </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.tax).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('actural-amount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.actual_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                        
                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('net-amount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.grand_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                        
                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('discount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.discount).format('0,0')} MMK </h6> </td>
                                        </tr>   

                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('pay-amount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.pay_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                                    
                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('refund-amount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.changes).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={4} className='no-border'></td>
                                            <td className="solid-border"> <h6> {t('credit-amount')} </h6> </td>
                                            <td className="solid-border"> <h6> {numeral(this.state.amount.credit_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>        
                        </table> 
                        

                        {!this.state.isPrint && (
                            <div className="d-flex flex-row justify-content-end me-5 pe-5">
                                <Button 
                                    className={`btn btn-print mt-3 w-25 ${this.state.display} ${zawgyi(lang)}`} 
                                    onClick={() => this.print()}
                                > 
                                        {t('print')} 
                                </Button>
                            </div> 
                        )}
                    </div>
                )}
                    </>
                )}

                {this.state.success && (
                    <div className="row mt-1">
                        <div className="d-flex flex-column justify-content-center align-items-center hv-100">
                            <h1 className="thank-you"> Thank You </h1>
                            <Button onClick={() => this.props.history.push('/sale')}> {t('go-back')} </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reducer: state
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(InvoiceReportPage));

// export const InvoiceReport = () => {

//     const dispatch = useDispatch();
//     const history = useHistory();
//     const lang = useSelector(state => state.lang);

//     const [shop, setShop] = useState(null);
//     const [invoice, setInvoice] = useState(null);
//     const [invoiceId, setInvoiceId] = useState('');
//     const [display, setDisplay] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [isPrint, setIsPrint] = useState(false);
//     const [reload, setReload] = useState(false);
//     const [customer, setCustomer] = useState(null);
//     const [amounts, setAmounts] = useState(null);

//     console.log('Invoice');



//     useEffect(async () => {
//         const shopinfo = await getShop();

//         if (shopinfo && shopinfo.success === false) {
//             dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
//             return;
//         }

//         setShop(shopinfo);

//         const invoiceResponse = await getLastInvoice();
//         if (invoiceResponse && invoiceResponse.success === false) {
//             dispatch(setOpenToastAction('Invoice', invoiceResponse.success, 'danger'));
//             return;
//         }

//         const lastInvoice = invoiceResponse ? invoiceResponse.invoice_no : 0;
//         let ivId = Number(lastInvoice) + 1;

//         let invoice_no = '';

//         for (let x = ivId.toString().length; x < 6; x++) {
//             invoice_no += '0';
//         }

//         invoice_no += ivId;

//         setInvoiceId(invoice_no);

//         const iData = JSON.parse(localStorage.getItem('INVOICE'));
//         setInvoice(iData);

//         const customerData = JSON.parse(localStorage.getItem('CUSTOMER'));
//         setCustomer(customerData);

//         const getAmounts = JSON.parse(localStorage.getItem('AMOUNTS'));
//         setAmounts(getAmounts);
//     }, []);

//     return (
//         <div className="container-fluid bg-clear">

//         </div>
//     )
// }