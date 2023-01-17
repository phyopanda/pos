import i18next from 'i18next';
import {menus} from '../../utilities/native.utility';
import {LANG_SET, LANG_VALUE} from '../actionTypes';

export const setLangAction = lang => async dispatch => {
	localStorage.setItem(LANG_VALUE, lang);
	i18next.changeLanguage(lang, () => {
		let getMenus = [];
		const getToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null;
		if (getToken !== null) {
			menus.map(value => {
				getMenus.push({
					label: i18next.t(value.label),
					url: value.url
				});
			});

			const {nativeApi} = window;
			nativeApi.app.changeLang(getMenus);
			return;
		}
	});

	return dispatch({
		type: LANG_SET,
		payload: lang
	});
};
