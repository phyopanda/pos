module.exports = {
	setMenu: (menus, curentWindow) => {
		let buildTemplate = [];
		menus.map(value => {
			buildTemplate.push({
				label: value.label,
				submenu: value.submenu
					? value.submenu.map(e => ({
							label: e.label,
							click() {
								curentWindow.webContents.send('navigate', e.url);
							}
						}))
					: null,
				click() {
					curentWindow.webContents.send('navigate', value.url);
				}
			});
		});
		return buildTemplate;
	},

	webPreferences: {
		nodeIntegration: true,
		nodeIntegrationInWorker: true,
		contextIsolation: true,
		webSecurity: false,
		allowRunningInsecureContent: false
	},

	devMenus : [

	]
};
