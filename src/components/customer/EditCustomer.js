import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../general/Navigation';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { CustomerEditComponent } from './CustomerEditComponent';
import { customerDetail } from '../../services/customer.service';


class EditCustomerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            customeritem: null,
        }
    }
    async loadingData() {
        const { id } = this.props.match.params;
        const { openToast } = this.props;

        const response = await customerDetail(id);
        if (response && response.success === false) {
            openToast('customer update', response.message, 'danger');
            return;
        }

        this.setState({
            is_loading: false,
            customeritem: response,
            
        })
    }

    async componentDidMount() {
        await this.loadingData();
    }


    render() {

        const { is_loading, customeritem } = this.state;
        const { history } = this.props

        return (
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-md-12 d-md-flex flex-md-row justify-content-start align-items-center'>
                            <div className='mb-2 mt-2'>
                                <BsArrowLeftCircle size={30} className='btn-icon' onClick={() => history.push('/customer')} />
                            </div>
                        </div>
                    </div>
                    {!is_loading && (
                        <div className='row mt-1'>
                            <div className='col-md-3'>
                                <CustomerEditComponent props={this.props} item={customeritem} reload={() => this.loadingData()} />
                            </div>
                        </div>
                    )}
                </div>
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
)(withRouter(EditCustomerPage));
