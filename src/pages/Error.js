/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { t } from '../utilities/translation.utility';
import { Button } from 'react-bootstrap';
import { checkLicense } from '../services/license.service.js';
import { ArrowLeft } from 'react-bootstrap-icons';

import '../assets/css/error.css';

class ErrorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            errorMessage: '',
            title: '',
            status: null
        }
    }

    componentDidMount() {
        const { status } = this.props.match.params;
        const { errorMessage, title } = this.state;

        let setTitle = title;
        let setErrorMessage = errorMessage;
         
        if(Number(status) === 0) {
            setTitle = t('error-server-network-title');
            setErrorMessage = t('error-server-network-message');
        }

        if(Number(status) === 404) {
            setTitle = t('error-resource-not-found-title');
            setErrorMessage = t('error-resource-not-found-message');
        }

        if(status === 'expired') {
            setTitle = t('error-license-expired-title');
            setErrorMessage = t('error-license-expired-message');
        }

        if(status === 'unknown') {
            setTitle = t('error-unknown-title');
            setErrorMessage = t('error-unknown-message');
        }

        if(status === 'device') {
            setTitle = t('error-device-title');
            setErrorMessage = t('error-device-message');
        }

        return this.setState({
            title: setTitle,
            errorMessage: setErrorMessage,
            status: status
        });
    }

    async retry() {
        const { status } = this.props.match.params;
        const { history } = this.props;

        this.setState({
            is_loading: true
        });

        if(Number(status) === 0) {
            const response = await checkLicense();

            if(response) {
                return this.setState({
                    is_loading: false
                }, () => {
                    history.push('/');
                });
            }

            return this.setState({
                is_loading: false
            });
        }
    }

    back() {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { title, errorMessage, is_loading, status } = this.state;
        const { lang } = this.props.reducer;
    return (
        <>
            <div className='d-flex flex-row justify-content-start align-items-center'>
                {Number(status) !== 0 && (
                <ArrowLeft
                    className='back-error mt-3 ms-3'
                    size={50}
                    onClick={() => this.back()}
                />
                )}

            </div>
            <div className='d-md-flex flex-column justify-content-start align-items-center mt-3'>
                <div className='col-md-4'>
                    <h3 className='error-title'> {title} </h3>
                    <p className='error-message-description'> {errorMessage} </p>

                    {Number(status) === 0 && (
                    <Button 
                        
                        disabled={is_loading}
                        onClick={() => this.retry()}
                    > 
                        {t('error-btn-retry')} 
                    </Button>
                    )}
                </div>
            </div>
        </>
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
  )(withRouter(ErrorPage));


