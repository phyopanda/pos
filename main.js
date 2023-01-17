const {BrowserWindow, app, Menu, ipcMain, shell, globalShortcut, dialog, Notification, screen} = require('electron');
const path = require('path');
const {setMenu} = require('./src/utilities/nativeInterface.utility');

const isProduction = app.isPackaged;

let webPreferences = {
	nodeIntegration: true,
	nodeIntegrationInWorker: true,
	contextIsolation: true,
	webSecurity: false,
	allowRunningInsecureContent: false,
	preload: path.join(__dirname, 'preload.js')
};

const template = [
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

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

let curentWindow = null;

if (!isProduction) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	});
}

app.whenReady().then(() => {
	const {width, height} = screen.getPrimaryDisplay().workAreaSize;

	const browserWindowOptions = {
		webPreferences
	};
	curentWindow = new BrowserWindow({
		width: parseInt(width),
		height: parseInt(height),
		fullscreen: false,
		...browserWindowOptions,
		icon: `${__dirname}/assets/icons/logo.ico`
	});

	if (!isProduction) {
		globalShortcut.register('Ctrl+Shift+I', () => {
			return null;
		});
	}

	curentWindow.loadFile('./index.html');
});
app.on('window-all-closed', () => {
	app.quit();
});

ipcMain.on('restart-app', () => {
	app.quit();
});

ipcMain.on('quit-app', () => {
	app.quit();
});

ipcMain.on('print-invoice', (events, options) => {
	curentWindow.webContents.print(options, (success, failureReason) => {
		curentWindow.webContents.send('reload', success ? success : failureReason);
	});
});

ipcMain.on('show-message-box', (events, data) => {
	dialog.showMessageBox(curentWindow, data);
});

ipcMain.on('open-webview', (events, url) => {
	let win = new BrowserWindow({
		width: 800,
		height: 1000,
		type: 'MainWindow',
		frame: true,
		fullscreen: false,
		...browserWindowOptions
	});

	if (!isProduction) {
		globalShortcut.register('Ctrl+Shift+I', () => {
			return null;
		});
	}

	win.loadURL(url);
});

ipcMain.on('notification:show', (events, data) => {
	new Notification({title: data.title, body: data.body, tag: data.tag}).show();
});

ipcMain.on('app:set-menu', (events, menus) => {
	let buildTemplate = setMenu(menus, curentWindow);

	if(isProduction === false) {
		buildTemplate.push({label: 'development', submenu: [
			{role: 'toggleDevTools'},
			{role: 'reload'}
		]});
	}

	const menu = Menu.buildFromTemplate(buildTemplate);
	Menu.setApplicationMenu(menu);
});

ipcMain.on('app:default-menu', events => {
	Menu.setApplicationMenu(menu);
});

ipcMain.on('print-display', () => {
	let win = new BrowserWindow({
		width: 800,
		height: 1000,
		type: 'MainWindow',
		frame: false,
		fullscreen: false,
	});

	win.loadURL('./index.html');
});

ipcMain.on('app:change-language', (events, menus) => {
	let buildTemplate = [];

	menus.map(value => {
		buildTemplate.push({
			label: value.label,
			click() {
				curentWindow.webContents.send('navigate', value.url);
			}
		});
	});

	buildTemplate.push({
		label: 'View',
		submenu: [
			{role: 'reload'},
			{role: 'forceReload'},
			{type: 'separator'},
			{role: 'resetZoom'},
			{role: 'zoomIn'},
			{role: 'zoomOut'},
			{type: 'separator'},
			{role: 'togglefullscreen'},
			{role: 'toggleDevTools'}
		]
	});

	const menu = Menu.buildFromTemplate(buildTemplate);
	Menu.setApplicationMenu(menu);
});
