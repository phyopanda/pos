
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { CustomerListTableComponent } from '../../components/customer/CustomerListTableComponent';
import { getInvoice } from '../../services/invoice.service';
import { getCustomerList } from '../../services/customer.service';
import CustomerBoughtItemsComponent from '../../components/customer/CustomerBoughtItemsComponent';

export const PageLoadingComponent = () => {

    return(
        <div className='page-loading-wrapper'>
            <h2> Loading Data </h2>
        </div>
    )
}