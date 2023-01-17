import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Navigation } from "../general/Navigation";
import { Card, Button } from "react-bootstrap";
import { setOpenRepaymentModal } from "../../redux/actions/openDelModal.action";
import { SET_OPEN_REPAY } from "../../redux/actionTypes";

class RepaymentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            detail: null,
            repayments: [],
        }

    };

    async loadingData(){
        const {id} = this.props.match.params;
        const repaymentDetail = await JSON.parse(localStorage.getItem('CREDIT'));
        this.setState({
            detail: repaymentDetail
        });

        console.log(this.state.detail);
    }

    addRepayment(){
        this.props.openRepayModel(SET_OPEN_REPAY, value);
        
    }

    async componentDidMount(){
        await this.loadingData();
        localStorage.removeItem('CREDIT');
    }

    render(){
        const { detail } = this.state;
        return(
            <>
            <Navigation props={this.props} />
            <div className="container-fluid mt-3">
                <div className="d-md-flex flex-md-row juistify-content-between">
                    <div className="col-md-7">
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    <span> Credit Detail </span>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Credit Amount : {detail && detail.credit_amount}</th>
                                            <th scope="col">Repayment : {detail && detail.repayment}</th>
                                        </tr>
                                    </thead>
                                </table>
                                <Button onClick={this.addRepayment}>
                                    Add Repayment
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-5">
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span> Credit Detail </span>
                                    </div>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <div className='d-flex flex-row mt-1'>
                                        <div className='col'>
                                            <span> Credit ID : {detail && detail.id}</span>
                                        </div>
                                        <div className='col'>
                                            <span> Invoice ID : {detail && detail.invoice_no}</span>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <span>Customer Name : {detail && detail.customer_name}</span>
                                    </div>
                                    <div className='row mt-3'>
                                        <span>Credit Amount : {detail && detail.credit_amount}</span>
                                    </div>
                                    <div className='row mt-3'>
                                        <span>Repayment : {detail && detail.repayment}</span>
                                    </div>
                                    <div className='row mt-3'>
                                        <span>Amount Left : {detail && detail.amount_left}</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state
})

const mapDispatchToProps = (dispatch) => ({
    openRepayModel: (type, value) => dispatch(setOpenRepaymentModal(type, value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RepaymentPage));
