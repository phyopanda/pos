import numeral from 'numeral';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MonthsChart from '../../components/charts/MonthsChart';
import { CountCard } from '../../components/general/CountCard';
import { Navigation } from '../../components/general/Navigation';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { getInvoice } from '../../services/invoice.service';
import { changeNumberFormat } from '../../utilities/number.utility';
import { getItems } from '../../services/item.service';
import WeekChart from '../../components/charts/WeekChart';
import { Card } from 'react-bootstrap';
import { getCreditList } from '../../services/credit.service';
import { t } from 'i18next';

class DashboardPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            count: {
                customer: 0,
            },
            totalSellAmount: 0,
            qty: 0,
            totalCreditCustomerAmount: 0,
            totalCreditCustomerList: 0
        };
    }

    async loadingData() {

        const { openToast } = this.props;

        const customerResponse = await getInvoice();
        if (customerResponse && customerResponse.success === false) {
            openToast('Customer', customerResponse.message, 'danger');
            return;
        }

        const customerFilter = customerResponse.filter(value => value.customer_name !== null);

        customerResponse.map((value) => {
            value.created_at = moment(value.created_at).format('DD-MM-Y');
        });
        const todayDate = moment().format('DD-MM-Y');
        const todayFilter = customerResponse.filter(value => value.created_at === todayDate);
        const totalSellAmountArray = todayFilter.map((value) => {
            return Number(value.total_amount);
        });

        const itemResponse = await getItems();
        // console.log(itemResponse)
        if (itemResponse && itemResponse.success === false) {

            openToast('Customer', itemResponse.message, 'danger');
            return;
        }

        const itemFilter = itemResponse.filter(value => value.qty !== null);
        const qtylist = itemFilter.map(value => value.qty);
        const totalqty = qtylist.reduce((a, b) => a + b, 0);

        this.setState({
            count: customerFilter.length,
            totalSellAmount: totalSellAmountArray.reduce((a, b) => a + b, 0),
            qty: totalqty,
        });
    }

    async creditData() {
        const { openToast } = this.props

        const creditResponse = await getCreditList();
        if (creditResponse && creditResponse.success === false) {
            openToast('Credit', creditResponse.message, 'danger');
            return;
        }

        const creditCustomer = creditResponse.filter(e => e.invoice.customer_name !== null)
        const data = this.getUniqueListBy(creditCustomer, 'customer_phone');
        const creditCustomerList = data.length

        const CreditAmount = creditResponse.map(e => Number(e.amount))
        const totalCreditAmount = CreditAmount.reduce((a, b) => a + b, 0)

        this.setState({
            totalCreditCustomerAmount: totalCreditAmount,
            totalCreditCustomerList: creditCustomerList
        })
    }


    getUniqueListBy(items, key) {
        return [...new Map(items.map(item => [item[key], item])).values()]
    }

    async componentDidMount() {
        const {history} = this.props;
		window.nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });

        this.loadingData();
    }

    render() {
        const { count, totalSellAmount, qty, totalCreditCustomerAmount, totalCreditCustomerList } = this.state;
        return (
            <>
                {/* <Navigation props={this.props} /> */}

                <div className='container-fluid'>
                    <Card className='mt-3'>
                        <Card.Header>
                            <Card.Title className='row justify-content-center'>{t('customer')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className='row' >
                                <div className='col-md-3'>
                                    <CountCard
                                        props={this.props}
                                        label={t('total-customer')}
                                        color="rgba(229, 64, 64,1)"
                                        count={count.customer ? count.customer : 0}
                                        url={'/customer'}
                                        urlLabel={'View More Customer List'}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <CountCard
                                        props={this.props}
                                        label={t('total-sell-amount')}
                                        color="rgb(255, 218, 108, 1)"
                                        count={`${numeral(totalSellAmount).format('0,0')} MMK`}
                                        url={'/invoice'}
                                        urlLabel={'View More Sell Amount List'}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <CountCard
                                        props={this.props}
                                        label={t('total-quantity')}
                                        color="rgb(108, 147, 39, 1)"
                                        count={qty ? qty : 0}
                                        url={'/inventory'}
                                        urlLabel={'View More Quantity List'}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                        <Card.Header>
                            <Card.Title className='row justify-content-center'>
                                {t('credit')}
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <CountCard
                                        props={this.props}
                                        label={t('total-credit-customer')}
                                        color="rgb(23, 162, 184,1)"
                                        count={totalCreditCustomerList ? totalCreditCustomerList : 0}
                                        url={'/credit'}
                                        urlLabel={'View More Credit Customer List'}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <CountCard
                                        props={this.props}
                                        label={t('total-credit-customer-amount')}
                                        color="rgba(114, 196, 84,1)"
                                        count={totalCreditCustomerAmount ? totalCreditCustomerAmount : 0}
                                        url={'/credit'}
                                        urlLabel={'View More Credit Amount List'}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className='row mt-3'>
                        <div className='col-md-6'>
                            <MonthsChart />
                        </div>
                        <div className='col-md-6'>
                            <WeekChart />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state
});

const mapDispatchToProps = (dispatch) => ({
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DashboardPage));