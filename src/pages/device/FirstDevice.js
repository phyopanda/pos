import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { createFirstDevice } from '../../services/device.service';
import { AppToast } from '../../components/general/toasts';
import { ToastContainer } from "react-bootstrap";
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { checkNetworkConnection } from '../../utilities/networkConnection';
import { SET_NETWORK_ADDRESS, SET_NETWORK_MAC } from '../../redux/actionTypes';
import axios from 'axios';

class FirstDevice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip: '',
      mac: '',
      note: '',
    }
  }

  loadingData() {
    const device = checkNetworkConnection();
    console.log(device);
    
    if(device.wifi) {
      this.setState({
        ip: device.wifi.address,
        mac: device.wifi.mac
      }, () => {
        localStorage.setItem(SET_NETWORK_ADDRESS, device.wifi.address);
        localStorage.setItem(SET_NETWORK_MAC, device.wifi.mac);
      });
      return;
    }

    if(device.localhost) {
      this.setState({
        ip: device.localhost.address,
        mac: device.localhost.mac
      }, () => {
        localStorage.setItem(SET_NETWORK_ADDRESS, device.localhost.address);
        localStorage.setItem(SET_NETWORK_MAC, device.localhost.mac);
      });
    }

    return;
  }

  componentDidMount() {
    this.loadingData();
  }

  async create() {
    const { name, ip, mac, note } = this.state;
    const { history } = this.props;

    if(name === '' || ip === '' || mac === '') {
      this.props.openToast('Device Information', 'All fields are required','danger');
      return;
    }

    const requestBody = {
      name: name,
      ip: ip,
      mac: mac,
      note: note !== '' ? note : null
    }

    const response = await createFirstDevice(requestBody);
    
    if(response.success === false) {
      this.props.openToast('Device Information', response.message, 'danger');
      return;
    }

    axios.defaults.headers.common['ip'] = ip;
    axios.defaults.headers.common['mac'] = mac;
    history.push('/');
  }

  render() {
    const { name, ip, mac, note } = this.state;

    return (
      <div className='container-fluid'>
        <div className='row'>
          <ToastContainer
            className="app-toast-container"
            position={'top-end'}
          >
            <AppToast props={this.props} />
          </ToastContainer>
        </div>

        <div className='row'>
          <div className='col-md-4 mt-3'>
            <img src="build/assets/images/side_image.jpeg" className='img-fluid' />
          </div>

          <div className='col-md-8'>
            <h3 className="title m-3"> Create New Device </h3>
            <p className="m-3"> create new device for first times user </p>

            <InputGroup className='p-3'>
            <FormControl
              className="me-3"
              type="text"
              placeholder="Device Name"
              value={name}
              onChange={(e) => this.setState({
                name: e.target.value
              })}
            />

            <FormControl
              className="me-3"
              type="text"
              placeholder="IP Address"
              value={ip}
              onChange={(e) => this.setState({
                ip: e.target.value
              })}
            />

            <FormControl
              className="me-3"
              type="text"
              placeholder="MAC Address"
              value={mac}
              onChange={(e) => this.setState({
                mac: e.target.value
              })}
            />

            <FormControl
              className="me-3"
              type="text"
              placeholder="Note"
              value={note}
              onChange={(e) => this.setState({
                note: e.target.value
              })}
            />

            <Button onClick={() => this.create()}> Submit </Button>
            </InputGroup>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
    reducer: state
});
  
const mapDispatchToProps = (dispatch) => ({
    openToast: (title, message, method) => dispatch(setOpenToastAction(title, message, method))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(FirstDevice));