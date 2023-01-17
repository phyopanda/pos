import React, {Component} from 'react';
import {Card, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {printOptions} from '../../utilities/print.utility';
import {t} from 'i18next';
import {connect} from 'react-redux';

class InvoiceComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prefix: '',
			printNumber: '',
			colorPrint: '',
			backgroundPrint: '',
			invoice_header: '',
			invoice_footer: '',
			silent_print: '',
			lanscape: '',
			printSetting: printOptions
		};
	}

	saveInvoiceSetting(key, value) {
		this.state.printSetting[`${key}`] = value;
		this.setState({
			printSetting: this.state.printSetting
		});
		localStorage.setItem('PRINT_SETTING', JSON.stringify(this.state.printSetting));
		return;
	}

	async componentDidMount() {
		const {history} = this.props;
		const getPrefix = (await localStorage.getItem('PREFIX')) ? localStorage.getItem('PREFIX') : 'AT';
		const getPrintSetting = (await localStorage.getItem('PRINT_SETTING'))
			? JSON.parse(localStorage.getItem('PRINT_SETTING'))
			: this.state.printSetting;

		this.setState({
			prefix: getPrefix,
			printSetting: getPrintSetting,
			printNumber: getPrintSetting.copies,
			colorPrint: getPrintSetting.color,
			backgroundPrint: getPrintSetting.printBackground,
			invoice_header: getPrintSetting.header,
			invoice_footer: getPrintSetting.footer,
			silent_print: getPrintSetting.silent,
			lanscape: getPrintSetting.lanscape
		});

		nativeApi.app.navigateTo(url => {
			history.push(url);
		});
	}

	render() {
		const {
			prefix,
			printSetting,
			printNumber,
			colorPrint,
			backgroundPrint,
			invoice_header,
			invoice_footer,
			silent_print,
			lanscape
		} = this.state;
		return (
			<Card className="mt-3">
				<Card.Header>
					<Card.Title> {t('invoice-setting')} </Card.Title>
				</Card.Header>

				<Card.Body>
					<div className="row">
						<div className="col-md-4 mb-3">
							<FormLabel className="me-3 w-full"> {t('invoice-prefix-name')} </FormLabel>

							<InputGroup>
								<FormControl
									type="text"
									placeholder={t('invoice-prefix-name')}
									value={prefix}
									onChange={e => {
										this.setState({
											prefix: e.target.value
										});
										localStorage.setItem('PREFIX', e.target.value);
									}}
								/>
							</InputGroup>
						</div>

						<div className="col-md-4 mb-3">
							<FormLabel className="me-3 w-full"> {t('invoice-print-number')} </FormLabel>
							<InputGroup>
								<FormControl
									type="number"
									placeholder={t('invoice-print-number')}
									value={printNumber}
									onChange={e => {
										this.setState({
											printNumber: e.target.value
										});
										this.saveInvoiceSetting('copies', e.target.value);
									}}
								/>
							</InputGroup>
						</div>

						<div className="col-md-4 mb-3">
							<FormLabel className="me-3 w-full"> {t('color-print')} </FormLabel>
							<InputGroup>
								<FormControl
									as={'select'}
									value={colorPrint}
									onChange={e => {
										this.setState({
											colorPrint: e.target.value
										});
										this.saveInvoiceSetting(
											'color',
											e.target.value === 'false'
												? false
												: e.target.value === 'true' ? true : printSetting.color
										);
									}}
								>
									<option value={false}>
										{' '}
										{t('black')} & {t('white')}{' '}
									</option>
									<option value={true}> {t('color')} </option>
								</FormControl>
							</InputGroup>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 mb-3">
							<FormLabel className="me-3 w-full"> {t('print-background')} </FormLabel>
							<InputGroup>
								<FormControl
									as={'select'}
									value={backgroundPrint}
									onChange={e => {
										this.setState({
											backgroundPrint: e.target.value
										});
										this.saveInvoiceSetting(
											'printBackground',
											e.target.value === 'false'
												? false
												: e.target.value === 'true' ? true : printSetting.printBackground
										);
									}}
								>
									<option value={false}> {t('no')} </option>
									<option value={true}> {t('yes')} </option>
								</FormControl>
							</InputGroup>
						</div>

						<div className="col-md-4 mb-3">
							<FormLabel className="me-3 w-full"> {t('print-silent')} </FormLabel>
							<InputGroup>
								<FormControl
									as={'select'}
									value={silent_print}
									onChange={e => {
										this.setState({
											silent_print: e.target.value
										});
										this.saveInvoiceSetting(
											'silent',
											e.target.value === 'false'
												? false
												: e.target.value === 'true' ? true : printSetting.silent
										);
									}}
								>
									<option value={true}> {t('yes')} </option>
									<option value={false}> {t('no')} </option>
								</FormControl>
							</InputGroup>
						</div>

						<div className="col-md-4 mb-3">
							<FormLabel className="me-3 w-full"> {t('lanscape')} </FormLabel>
							<FormControl
								as={'select'}
								value={lanscape}
								onChange={e => {
									this.saveInvoiceSetting(
										'landscape',
										e.target.value === 'false'
											? false
											: e.target.value === 'true' ? true : printSetting.landscape
									);
									this.setState({
										lanscape: e.target.value
									});
								}}
							>
								<option value={true}> {t('yes')} </option>
								<option value={false}> {t('no')} </option>
							</FormControl>
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-6 mb-3">
							<FormLabel className="me-3 w-full"> {t('invoice-header')} </FormLabel>
							<InputGroup>
								<FormControl
									type="text"
									value={invoice_header}
									placeholder={t('invoice-header')}
									onChange={e => {
										this.setState({
											invoice_header: e.target.value
										});
										this.saveInvoiceSetting('header', e.target.value || printSetting.header);
									}}
								/>
							</InputGroup>
						</div>

						<div className="col-md-6 mb-3">
							<FormLabel className="me-3 w-full"> {t('invoice-footer')} </FormLabel>
							<InputGroup>
								<FormControl
									type="text"
									value={invoice_footer}
									placeholder={t('invoice-footer')}
									onChange={e => {
										this.setState({
											invoice_footer: e.target.value
										});
										this.saveInvoiceSetting('footer', e.target.value || printSetting.footer);
									}}
								/>
							</InputGroup>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}
}

const mapStateToProps = state => ({
	reducer: state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InvoiceComponent));
