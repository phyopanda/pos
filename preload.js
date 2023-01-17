const {ipcRenderer, contextBridge} = require('electron');
const {device} = require('./src/node');

contextBridge.exposeInMainWorld('nativeApi', {
	messageBox: {
		open(data) {
			return ipcRenderer.send('show-message-box', data);
		}
	},
	webView: {
		open(url) {
			return ipcRenderer.send('open-webview', url);
		}
	},
	device: {
		get(data) {
			return data(device);
		},
		platform(data) {
			return data(device.platform());
		}
	},
	app: {
		restart() {
			ipcRenderer.send('restart-app', true);
		}
	},
	quit: {
		quitApp() {
			return ipcRenderer.send('quit-app');
		}
	},
	display: {
		new(){
			return ipcRenderer.send('print-display');
		}
	},
	print: {
		invoice(options) {
			return ipcRenderer.send('print-invoice', options);
		},
		targetComponent() {
			return ipcRenderer.send('print-target-component');
		},
		reload(data) {
			return ipcRenderer.on('reload', (event, res) => {
				return data(res);
			});
		}
	},
	notification: {
		show(data) {
			return ipcRenderer.send('notification:show', data);
		}
	},
	app: {
		navigateTo(retrive) {
			return ipcRenderer.on('navigate', (event, response) => {
				return retrive(response);
			});
		},
		changeLang(menus) {
			return ipcRenderer.send('app:change-language', menus);
		},
		setMenu(menus) {
			return ipcRenderer.send('app:set-menu', menus);
		},
		setDefaultMenu() {
			return ipcRenderer.send('app:default-menu');
		},
		delMenu() {
			return ipcRenderer.send('delete-menu');
		}
	}
});
