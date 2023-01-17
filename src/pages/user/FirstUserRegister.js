import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import {createAccount} from '../../services/user.service';
import {SideSectionComponent} from '../../components/general/SideSectionComponent';
import {zawgyi, t} from '../../utilities/translation.utility';
import {messageBoxType} from '../../utilities/native.utility';
import {Language} from '../../components/general/Language';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkphone = /^(\+?(95)|[09])\d{10}/g;

class FirstUserRegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_loading: false,
			account_name: '',
			email: '',
			phone: '',
			password: '',
			confirm_password: '',
			err_message: null,
			messageBoxTitle: t('title-first-user')
		};
	}

	componentDidMount() {}

	async createAccount() {
		const {account_name, phone, email, password, confirm_password, messageBoxTitle} = this.state;
		const {history} = this.props;
		const {nativeApi} = window;

		if (account_name === '' || phone === '' || email === '' || password === '' || confirm_password === '') {
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('all-fields-are-requried'),
				type: messageBoxType.info
			});
		}

		if (password !== confirm_password) {
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('password-does-not-match'),
				type: messageBoxType.info
			});
		}

		if (!pattern.test(email)) {
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('invalid-email-address'),
				type: messageBoxType.info
			});
		}

		if (!checkphone.test(phone)) {
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('invalid-phone-number'),
				type: messageBoxType.info
			});
		}

		const resquestBody = {
			name: account_name,
			email: email,
			phone: phone,
			password: password
		};

		this.setState({
			is_loading: true
		});

		const response = await createAccount(resquestBody);

		if (response.success === false) {
			nativeApi.messageBox.open({title: messageBoxTitle, message: response.message, type: messageBoxType.info});
			return this.setState({
				is_loading: false
			});
		}

		return this.setState(
			{
				is_loading: false,
				err_message: null
			},
			() => {
				history.push('/');
			}
		);
	}

	render() {
		const {is_loading, account_name, phone, email, password, confirm_password} = this.state;
		const {lang} = this.props;

		return (
			<div className="container-fluid g-0">
				<div className="row g-0">
					<div className="col-md-6 background-image-layout">
						<SideSectionComponent />
					</div>
					<div className="col-md-6 ps-3 pe-3">
						<div className="">
							<div className="d-flex flex-row justify-content-end">
								<Language />
							</div>
							<div className="d-flex flex-row justify-content-center mt-3">
								<img className="logo" src="build/assets/images/logo.png" />
							</div>
							<h3 className={`title-default m-3 ${zawgyi(lang)}`}> {t('title-first-user')} </h3>

							<div className="d-md-flex flex-md-row justify-content-between">
								<div className="col-md-12 d-flex flex-column justify-content-center">
									<InputGroup>
										<FormControl
											className={`${zawgyi(lang)} me-3`}
											type="text"
											required={true}
											placeholder={t('account-name')}
											value={account_name}
											onChange={e =>
												this.setState({
													account_name: e.target.value
												})}
										/>

										<FormControl
											className={`${zawgyi(lang)} me-3`}
											type="text"
											required={true}
											placeholder={t('phone')}
											value={phone}
											onChange={e =>
												this.setState({
													phone: e.target.value
												})}
										/>

										<FormControl
											className={`${zawgyi(lang)} me-3`}
											type="text"
											required={true}
											placeholder={t('email')}
											value={email}
											onChange={e =>
												this.setState({
													email: e.target.value
												})}
										/>
									</InputGroup>

									<InputGroup className="mt-3">
										<FormControl
											className={`${zawgyi(lang)} me-3`}
											type="password"
											required={true}
											placeholder={t('password')}
											value={password}
											onChange={e =>
												this.setState({
													password: e.target.value
												})}
										/>

										<FormControl
											className={`${zawgyi(lang)} me-3`}
											type="password"
											required={true}
											placeholder={t('confirm-password')}
											value={confirm_password}
											onChange={e =>
												this.setState({
													confirm_password: e.target.value
												})}
										/>
									</InputGroup>

									<InputGroup className="mt-3">
										<Button
											className={`${zawgyi(lang)}`}
											disabled={is_loading}
											onClick={() => this.createAccount()}
										>
											{' '}
											{t('confirm')}{' '}
										</Button>
									</InputGroup>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	reducer: state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FirstUserRegisterPage));
