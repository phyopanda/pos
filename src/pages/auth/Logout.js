import axios from 'axios';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeTokenAction } from '../../redux/actions/auth.action';
import { SET_ACCEASS_TOEKN } from '../../redux/actionTypes';
import { logout } from '../../services/auth.service';

class LogoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
        }
    }

    async componentDidMount() {
        const { history,  logoutAction } = this.props;
        await logoutAction();

        this.setState({
            is_loading: false
        });

        history.push('/');
    }

    render() {
        const { is_loading } = this.state;
        
        return (
            <>
                {is_loading && (
                    <div className='d-flex flex-column full-height justify-content-center align-items-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden"> Loading... </span>
                        </Spinner>
                    </div>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state
});
  
const mapDispatchToProps = (dispatch) => ({
    logoutAction: () => dispatch(removeTokenAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LogoutPage));