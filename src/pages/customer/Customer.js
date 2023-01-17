import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { CustomerListTableComponent } from '../../components/customer/CustomerListTableComponent';
import { getInvoice } from '../../services/invoice.service';
import { getCustomerList } from '../../services/customer.service';
import CustomerBoughtItemsComponent from '../../components/customer/CustomerBoughtItemsComponent';
import { DeleteDialog } from '../../components/general/deleteDialog';

class CustomerPage extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            customerLists: [],
            selectedCustomer: null
        }
    };

    getSelectCustomerInfo(e) {
        this.setState({
            selectedCustomer: e
        });
    }


    async loadingData() {
        const { openToast } = this.props; 
        const response = await getCustomerList();
        const filterCustomer = [];
        let customers = [];

        if(response && response.success === false) {
            openToast('Customer', response.message, 'danger');
            return;
        }
        customers = response.filter(e => e.customer_name !== null);
        this.setState({
            customerLists: response
        })
        return;
    }

    async componentDidMount() {
        const {history} = this.props;
        await this.loadingData();
        nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });
    }
 
    render() {

        const { customerLists, selectedCustomer } = this.state;
        const { delModal } = this.props.reducer;

        return (
        <>
            {/* <Navigation props={this.props} /> */}

            <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-md-3'>
                        <CustomerBoughtItemsComponent
                        props={this.props}
                        customerInfo={selectedCustomer}
                        />
                    </div> */}
                    <div className='col-md-12'>
                        <CustomerListTableComponent 
                            props={this.props}
                            dataSource={customerLists}
                            reload={() => this.loadingData()}
                            retrive={(e) => this.getSelectCustomerInfo(e)}
                        />
                    </div>
                </div>
            </div>
            { delModal && (
                <DeleteDialog props={this.props} retrive={() => this.loadingData()} />
            )}
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
)(withRouter(CustomerPage));