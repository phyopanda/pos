import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {login} from '../../services/auth.service';
import {setTokenAction} from '../../redux/actions/auth.action';
import {setAccountAction} from '../../redux/actions/account.action';
import {BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import {SideSectionComponent} from '../../components/general/SideSectionComponent';
import {menus, messageBoxType} from '../../utilities/native.utility';
import {zawgyi, t} from '../../utilities/translation.utility';
import {Language} from '../../components/general/Language';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			is_loading: false,
			err_message: null,
			messageBoxTitle: t('login-account')
		};
	}

	quitDevice() {
		const quit = window.nativeApi.quit;
		quit.quitApp();
	}

	openSocialMedia(url) {
		const {nativeApi} = window;
		nativeApi.webView.open(url);
	}

	componentDidMount() {}

	async login() {
		const {username, password, messageBoxTitle} = this.state;
		const {history} = this.props;
		const {nativeApi} = window;

		if (username === '' || password === '') {
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('all-fields-are-requried'),
				type: messageBoxType.info
			});
		}

		const requestBody = {
			name: username,
			password: password
		};

		this.setState({
			is_loading: true
		});

		const response = await login(requestBody);
		if (response.success === false) {
			nativeApi.messageBox.open({title: messageBoxTitle, message: response.message, type: messageBoxType.info});
			this.setState({
				is_loading: false
			});
			return;
		}

		await this.props.setToken(response.access_token);
		await this.props.setAccount(response.account);

		const getMenuList = menus.map(value => {
			value.label = t(value.label);
			return value;
		});

		nativeApi.app.setMenu(getMenuList);
		nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });
		history.push('/sale');
	}

	render() {
		const {username, password, is_loading} = this.state;
		const {lang} = this.props;

		return (
			<div className="container-fluid g-0">
				<div className="row g-0">
					<div className="col-md-6 background-image-layout">
						<SideSectionComponent />
					</div>

					<div className="col-md-6">
						<div className="d-flex flex-row justify-content-end">
							<Language />
						</div>
						<div className="flex-col-center-layout">
							<div className="d-flex flex-row justify-content-center mt-3">
								<img className="logo" src="build/assets/images/logo.png" />
							</div>

							<div className="col-md-6">
								<h3 className={`title-default mt-3 ${zawgyi(lang)}`}> {t('login-account')} </h3>

								<InputGroup className="mt-3">
									<FormControl
										className={`${zawgyi(lang)}`}
										type="text"
										placeholder={t('username')}
										value={username}
										onChange={e => this.setState({username: e.target.value})}
										autoFocus={true}
									/>
								</InputGroup>

								<InputGroup className="mt-3">
									<FormControl
										className={`${zawgyi(lang)}`}
										type="password"
										placeholder={t('password')}
										value={password}
										onChange={e => this.setState({password: e.target.value})}
										onKeyPress={e => (e.code === 'Enter' ? this.login() : null)}
									/>
								</InputGroup>

								<InputGroup className="mt-3">
									<Button
										disabled={is_loading}
										onClick={() => this.login()}
										className={`btn-primary me-3 ${zawgyi(lang)}`}
									>
										{' '}
										{t('login-btn-enter')}{' '}
									</Button>
									<Button onClick={() => this.quitDevice()} className={`btn-primary ${zawgyi(lang)}`}>
										{' '}
										{t('quit-btn-enter')}{' '}
									</Button>
								</InputGroup>
							</div>

							<div className="social-media-wrapper d-md-flex flex-md-column justify-content-end align-items-center mt-3 mb-3">
								<label className={`mt-3 mb-3 ${zawgyi(lang)}`}> {t('connect-social-media')}</label>

								<div className="d-md-flex flex-md-row">
									<BsInstagram
										className="btn-social me-3"
										size={40}
										color="#2759D4"
										cursor={'pointer'}
										onClick={() => this.openSocialMedia('https://www.instagram.com/agritech_pos/')}
									/>
									<BsFacebook
										className="btn-social me-3"
										size={40}
										color="#2759D4"
										cursor={'pointer'}
										onClick={() => this.openSocialMedia('https://www.facebook.com/agritechpos')}
									/>
									{/* <BsYoutube className='btn-social me-3' size={40} color="#2759D4"cursor={'pointer'} onClick={() => this.openSocialMedia('')} />
                                    <BsGoogle className='btn-social me-3' size={40} color="#2759D4" cursor={'pointer'} onClick={() => this.openSocialMedia('')} /> */}
									<BsLinkedin
										className="btn-social me-3"
										size={40}
										color="#2759D4"
										cursor={'pointer'}
										onClick={() =>
											this.openSocialMedia('https://www.linkedin.com/company/79565077/')}
									/>
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

const mapDispatchToProps = dispatch => ({
	setToken: accessToken => dispatch(setTokenAction(accessToken)),
	setAccount: account => dispatch(setAccountAction(account))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
