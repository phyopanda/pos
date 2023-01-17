import React, { Component } from 'react'
import { Button, Card, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { createAccount, editUser, getUsers } from '../../services/user.service';
import { AccountList } from '../../components/account/accountList';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { BsArrowLeftRight } from 'react-icons/bs';
import { DeleteDialog } from '../../components/general/deleteDialog';
import { t } from 'i18next';
import { messageBoxType } from '../../utilities/native.utility';

const checkphone = /^(\+?(95)|[09])\d{10}/g;
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AccountPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      error: null,
      loading: false,
      userList: [],
      edit: null,
      edit_id: null,
      messageBoxTitle: 'Account'
    }
  }

  async fetchData() {
    const {nativeApi} = window;
    const response = await getUsers();

    if(response && response.success === false) {
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: response.message,
        type: messageBoxType.error
      })
      this.setState({
        loading: false
      })
      return;
    }

    this.setState({
      error: null,
      userList: response,
      loading: false
    });
  }

  componentDidMount() {
    const {history} = this.props;
    this.fetchData();

    nativeApi.app.navigateTo((url) => {
      history.push(url);
    });
  }

  async getRefresh(e) {
    if(e) {
      this.fetchData();
    }
  }

  editInfo(e) {
    if(e) {
      this.setState({
        name: e.name,
        phone: e.phone,
        email: e.email,
        edit_id: e.id
      })
    }
  }

  async create() {
    const {nativeApi} = window;
    const { name, phone, email, password, confirm_password } = this.state;

    if(name === '' || phone === '' || email === '' || password === '' || confirm_password === '') {
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: 'All fields are required',
        type: messageBoxType.error
      })
      return;
    }

    if(!pattern.test(email)){
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: 'Invalid email address',
        type: messageBoxType.error
      })
      return;
    }

    if(!checkphone.test(phone)){
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: 'Invalid phone number',
        type: messageBoxType.error
      })
      return;
    }

    if(password !== confirm_password) {
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: 'Password does not match',
        type: messageBoxType.error
      })
      return;
    }

    const resquestBody = {
      name: name,
      phone: phone,
      email: email,
      password: password
    }

    this.setState({
      loading: true
    });

    const response = await createAccount(resquestBody);

    if(response && response.success === false) {
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: response.message,
        type: messageBoxType.error
      })
      this.setState({
        loading: false
      })
      return;
    }

    this.fetchData();
    nativeApi.messageBox.open({
      title: this.state.messageBoxTitle,
      message: 'Account Successfully Created',
      type: messageBoxType.info
    })
    return;
  }

  async update() {
    const { phone, email, edit_id } = this.state;

    const updateRequest = {
      phone: phone,
      email: email
    }

    if(this.state.phone === updateRequest.phone){
      delete updateRequest.phone
    }

    if(this.state.email === updateRequest.email){
      delete updateRequest.email
    }

    const updateUser = await editUser(edit_id, updateRequest);

    if(updateUser && updateUser.success === false) {
      nativeApi.messageBox.open({
        title: this.state.messageBoxTitle,
        message: updateUser.message,
        type: messageBoxType.error
      });
      this.setState({
        loading: false
      });
      return;
    }
    nativeApi.messageBox.open({
      title: this.state.messageBoxTitle,
      message: 'Account Successfully Updated',
      type: messageBoxType.error
    })
    return this.fetchData();
  }

  switchBtn() {
    this.setState({
      edit: null
    })
  }

  render() {
    const { userList, edit } = this.state;
    const { delModal } = this.props.reducer;

    return (
      <>
        {/* <Navigation props={this.props} /> */}

        <div className='container-fluid'>
          <div className='row mt-3'>
            <div className='col-md-3'>
              <Card>
                <Card.Header>
                  <Card.Title>
                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                      <span> {edit === null ? `${t('create-account')}` : `${t('edit-account')}` } </span>

                      {edit && (<BsArrowLeftRight size={20} className="btn-icon" onClick={() => this.switchBtn()} />)}
                    </div> 
                  </Card.Title>
                </Card.Header>

                <Card.Body>
                  {edit === null && (
                    <FormControl 
                      className="mb-2"
                      type='text'
                      placeholder={t('name')}
                      value={this.state.name}
                      onChange={(e) => this.setState({
                        name: e.target.value
                      })}
                    />
                  )}

                  <FormControl 
                    className="mb-2"
                    type='email'
                    placeholder={t('email')}
                    value={this.state.email}
                    onChange={(e) => this.setState({
                      email: e.target.value
                    })}
                  />

                  <FormControl 
                    className="mb-2"
                    type='text'
                    placeholder={t('phone')}
                    value={this.state.phone}
                    onChange={(e) => this.setState({
                      phone: e.target.value
                    })}
                  />

                  {edit === null && (
                    <FormControl 
                      className="mb-2"
                      type='password'
                      placeholder={t('password')}
                      value={this.state.password}
                      onChange={(e) => this.setState({
                        password: e.target.value
                      })}
                    />
                  )}

                  {edit === null && (
                    <FormControl 
                      className="mb-2"
                      type='password'
                      placeholder={t('confirm-password')}
                      value={this.state.confirm_password}
                      onChange={(e) => this.setState({
                        confirm_password: e.target.value
                      })}
                    />
                  )}

                  <div className='d-md-flex flex-md-row justify-content-start align-items-center'>
                    {edit === null ? (
                      <Button 
                        className='btn-account-create mt-3'
                        onClick={() => this.create()}
                        disabled={this.state.loading}
                      > 
                        {t('confirm')}
                      </Button>
                    ) : (
                      <Button 
                        className='btn-account-create mt-3'
                        onClick={() => this.update()}
                        disabled={this.state.loading}
                      > 
                        {t('confirm')}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className='col-md-9'>
              <AccountList 
                props={this.props} 
                dataSource={userList} 
                reload={e => this.getRefresh(e)} 
                selectedEdit={e => this.setState({edit: e}, () => {
                  this.editInfo(e);
                })} 
              />
            </div>
          </div>
          
          {delModal && (
            <DeleteDialog props={this.props} reload={() => this.fetchData()} />
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
  openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountPage));