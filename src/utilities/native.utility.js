import {t} from './translation.utility';
// "none", "info", "error", "question", "warning"
export const messageBoxType = {
	none: 'none',
	info: 'info',
	error: 'error',
	question: 'question',
	warning: 'warning'
};

export const menus = [
	{label: 'dashboard-page', url: '/dashboard'},
	{label: 'sale-page', url: '/sale'},
	{label: 'inventory-page', submenu: [
		{
			label: t('inventory-list'),
			url: '/inventory'
		},
		{
			label: t('item-create'),
			url: 'item-create'
		}
	]},
	{label: 'invoice-page', url: '/invoice'},
	{label: 'credit-page', url: '/credit'},
	{label: 'customer-page', url: '/customer'},
	{label: 'account-page', url: '/account'},
	{
		label: 'setting-page',
		submenu: [
			{
				label: `${t('nav-general')}`,
				url: '/general-setting'
			},
			{
				label: `${t('number-specification')}`,
				url: '/numberspecification'
			},
			{
				label: `${t('receipt')}`,
				url: '/invoicesetting'
			},
		]
	},
	{label: 'logout-page', url: '/logout'}
];

export const defaultMenuList = [
	{
		label: 'App',
		submenu: [{role: 'Quit'}]
	},
	{
		label: 'View',
		submenu: [
			{role: 'reload'},
			{type: 'separator'},
			{role: 'resetZoom'},
			{role: 'zoomIn'},
			{role: 'zoomOut'},
			{type: 'separator'},
			{role: 'togglefullscreen'},
			{role: 'toggleDevTools'}
		]
	},
	{
		label: 'Window',
		submenu: [{role: 'minimize'}, {role: 'zoom'}]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'User Guide',
				click: async () => {
					await shell.openExternal('https://agritechpos.com/userguide');
				}
			},
			{
				label: 'Documentations',
				click: async () => {
					await shell.openExternal('https://agritechpos.com/documentaions');
				}
			},
			{
				label: 'About Software',
				click: async () => {
					await shell.openExternal('https://agritechpos.com/about-software');
				}
			},
			{
				label: 'Support',
				click: async () => {
					await shell.openExternal('https://agritechpos.com/support');
				}
			}
		]
	}
];
