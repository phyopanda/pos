import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import history from './utilities/histroy';

import ConfigurationPage from './pages/Configuration';
import LoginPage from './pages/auth/Login';
import LogoutPage from './pages/auth/Logout';
import DashboardPage from './pages/dashboard/Dashboard';
import LandingPage from './pages/Landing';
import LicensePage from './pages/License';
import ErrorPage from './pages/Error';
import FirstUserRegisterPage from './pages/user/FirstUserRegister';
import ProfilePage from './pages/user/Profile';

import FirstDevice from './pages/device/FirstDevice';
import AccountPage from './pages/user/Account';
import InventoryPage from './pages/Inventory';
import EditItemPage from './pages/item/EditItem';
import CategoryListPage from './pages/category/CategoryList';
import EditCategoryPage from './pages/category/EditCategory';
import SalePage from './pages/Sale';
import InvoiceReportPage from './components/sale/invoiceReport';
import InvociePage from './pages/Invoice';
import CustomerPage from './pages/customer/Customer';
import EditCustomerPage from './components/customer/EditCustomer';
import Invoice from './pages/Invoice';
import CreditPage from './pages/Credit';
import Repayment from './components/repayment/Repayment';
import InvoiceSetting from './components/settings/InvoiceSetting2';
import BackUpComponent from './components/settings/backup';
import CreateItemPage from './pages/item/CreateItemPage';
import GeneralSettingPage from './pages/general/GeneralPage';

import './assets/css/theme.css';
import NumberSpecificationSettingPage from './pages/setting/NumberSpecificationSettingPage';

class App extends Component {

	render() {
		return (
			<HashRouter history={history}>
				<Route exact path={'/'} component={LandingPage} />

				<Route exact path={'/configuration'} component={ConfigurationPage} />
				<Route exact path={'/license'} component={LicensePage} />
				<Route exact path={'/dashboard'} component={DashboardPage} />
				<Route exact path={'/error/:status'} component={ErrorPage} />
				<Route exact path={'/user/first'} component={FirstUserRegisterPage} />

				<Route exact path={'/login'} component={LoginPage} />
				<Route exact path={'/logout'} component={LogoutPage} />

				<Route exact path={'/numberspecification'} component={NumberSpecificationSettingPage} />
				<Route exact path={'/invoicesetting'} component={InvoiceSetting} />
				<Route exact path={'/backup'} component={BackUpComponent} />

				<Route exact path={'/profile'} component={ProfilePage} />

				<Route exact path={'/device/first'} component={FirstDevice} />
				<Route exact path={'/account'} component={AccountPage} />

				<Route exact path={'/inventory'} component={InventoryPage} />
				<Route exact path={'/item-create'} component={CreateItemPage} />
				<Route exact path={'/item/:id'} component={EditItemPage} />

				<Route exact path={'/category'} component={CategoryListPage} />
				<Route exact path={'/category/:id'} component={EditCategoryPage} />

				<Route exact path={'/invoiceReport'} component={InvoiceReportPage} />
				<Route exact path={'/invoice'} component={InvociePage} />

				<Route exact path={'/credit'} component={CreditPage} />
				<Route exact path={'/repayment/:id'} component={Repayment} />

				<Route exact path={'/sale'} component={SalePage} />

				<Route exact path={'/customer'} component={CustomerPage} />
				<Route exact path={'/editcustomer/:id'} component={EditCustomerPage} />

				<Route exact path={'/general-setting'} component={GeneralSettingPage} />
			</HashRouter>
		);
	}
}

export default App;
