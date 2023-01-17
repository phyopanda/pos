import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { getProfile } from '../../services/user.service';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { editUser } from '../../services/user.service';
import { changePassword } from '../../services/user.service';
import { t } from 'i18next';
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { messageBoxType } from '../../utilities/native.utility';

const checkphone = /^(\+?(95)|[09])\d{9}/g;
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      is_loading: true,
      update_name: '',
      update_phone: '',
      update_email: '',
      current_password: '',
      new_password: '',
      confirm_password: '',
      error: null,
      password_error: null,
      messageBoxTitle: 'Profile Update'
    }
  }

  httpHandler(response){
    const {nativeApi} = window;
    if(response && response.success === false) {
      nativeApi.messageBox.open({
				title: this.state.messageBoxTitle,
				message: response.message,
				type: messageBoxType.error
			});
      ArrowReturnLeft;
    }
    return response;
  }

  async loadingData() {
    const {openToast} = this.props;
    const response = await getProfile();

    if(response && response.success === false) {
      nativeApi.messageBox.open({
				title: this.state.messageBoxTitle,
				message: response.message,
				type: messageBoxType.error
			});
      return;
    }

    this.setState({
      user: response,
      update_name: response.name,
      update_email: response.email,
      update_phone: response.phone,
      is_loading: false
    });
    return;
  }

  async componentDidMount() {
    const {history} = this.props;
    this.loadingData();
    nativeApi.app.navigateTo((url) => {
      history.push(url);
    });
  }

  async update() {
    const { update_email, update_name, update_phone } = this.state;
    const { openToast } = this.props;

    if(update_email === '' || update_name === '' || update_phone === '') {
      nativeApi.messageBox.open({
				title: this.state.messageBoxTitle,
				message: 'All fileds are required',
				type: messageBoxType.error
			});
      return;
    }

    if(!checkphone.test(update_phone)) {
      nativeApi.messageBox.open({
				title: this.state.messageBoxTitle,
				message:  'Invalid phone number',
				type: messageBoxType.error
			});
      return;
    }

    if(!pattern.test(update_email)){
      nativeApi.messageBox.open({
				title: this.state.messageBoxTitle,
				message:  'Invalid email address',
				type: messageBoxType.error
			});
      return;
  }
    const requestBody = {
      name: update_name, 
      phone: update_phone,
      email: update_email
    }

    if(this.state.user.name === requestBody.name) {
      delete requestBody.name;
    }

    if(this.state.user.phone === requestBody.phone){
      delete requestBody.phone;
    }

    if(this.state.user.email === requestBody.email){
      delete requestBody.email;
    }

    const response = await editUser(this.state.user.id, requestBody);

    if(response && response.success === false) {
      nativeApi.messageBox.open({
				title: this.state.messageBoxTitle,
				message:  response.message,
				type: messageBoxType.error
			});
      return;
    }

    this.loadingData();
    nativeApi.messageBox.open({
      title: this.state.messageBoxTitle,
      message: 'Profile Update Successful',
      type: messageBoxType.info
    });
    return;
  }

  async changePassword() {
    const { current_password, new_password, confirm_password } = this.state;
    const { openToast, history } = this.props;

    if(current_password === '' || new_password === '' || confirm_password === '') {
      nativeApi.messageBox.open({
        title: 'Change Password',
        message: 'All fields are required',
        type: messageBoxType.error
      });
      return;
    }

    if(confirm_password !== new_password) {
      nativeApi.messageBox.open({
        title: 'Change Password',
        message: 'new password does not match',
        type: messageBoxType.error
      });
      return;
    }

    this.setState({
      is_loading: true
    });

    const requestBody = {
      password: current_password,
      newPassword: new_password
    }

    const response = await changePassword(this.state.user.id, requestBody);

    if(response && response.success === false) {
      nativeApi.messageBox.open({
        title: 'Change Password',
        message: response.message,
        type: messageBoxType.error
      });
      return;
    }

    this.setState({
      is_loading: false,
    });

    nativeApi.messageBox.open({
      title: 'Change Password',
      message: 'Password Change Successfully',
      type: messageBoxType.info
    });
    history.push('/logout');
    return;
  }

  render() {
    const { user, is_loading, update_name, update_email, update_phone, current_password, new_password, confirm_password } = this.state;
    return (
      <>
        {/* <Navigation props={this.props} /> */}

        <div className='container-fluid'>
          <div className='row mt-3'>
            <div className='col-md-4'>
              {user && (
                <Card>
                  <Card.Header>
                    <Card.Title> {t('user-profile')} </Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> {t('name')} </label>
                      <label> {user.name} </label>
                    </Card.Text>

                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> {t('phone')} </label>
                      <label> {user.phone} </label>
                    </Card.Text>

                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> {t('email')} </label>
                      <label> {user.email} </label>
                    </Card.Text>

                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> {t('status')} </label>
                      <span className={`active-status ${user.active === true ? 'enable' : 'disable'}`}>
                        {`${user.active === true ? 'Active' : 'Disable'}`}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>

            <div className='col-md-8'>
              <Card>
                  <Card.Header>
                    <Card.Title className="mb-3"> {t('update-profile')} </Card.Title>
                  </Card.Header>
                  <Card.Body className='d-md-flex flex-md-column'>
                    <InputGroup className='mb-3'>
                      <FormControl
                        type='text'
                        className="me-3"
                        placeholder={t('name')}
                        value={update_name}
                        onChange={(e) => this.setState({
                          update_name: e.target.value
                        })}
                      />

                      <FormControl 
                          type='text'
                          className="me-3"
                          placeholder={t('phone')}
                          value={update_phone}
                          onChange={(e) => this.setState({
                            update_phone: e.target.value
                          })}
                        />

                        <FormControl
                          type='email' 
                          placeholder={t('email')}
                          value={update_email}
                          onChange={(e) => this.setState({
                            update_email: e.target.value
                          })}
                        />

                        <Button onClick={() => this.update()} disabled={is_loading}> {t('update')} </Button>
                    </InputGroup>

                    <Card.Title className="mt-3"> {t('change-password')} </Card.Title>

                    <InputGroup>
                      <FormControl
                        type='password'
                        className="me-3"
                        placeholder={t('current-password')}
                        value={current_password}
                        onChange={(e) => this.setState({
                          current_password: e.target.value
                        })}
                      />

                      <FormControl 
                        type='password'
                        className="me-3"
                        placeholder={t('new-password')}
                        value={new_password}
                        onChange={(e) => this.setState({
                          new_password: e.target.value
                        })}
                      />

                      <FormControl
                        type='password' 
                        placeholder={t('confirm-password')}
                        value={confirm_password}
                        onChange={(e) => this.setState({
                          confirm_password: e.target.value
                        })}
                      />

                      <Button onClick={() => this.changePassword()} disabled={is_loading}> {t('change-password')} </Button>
                    </InputGroup>
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
});
  
const mapDispatchToProps = (dispatch) => ({
  openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfilePage));