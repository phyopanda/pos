import axios from 'axios';
import {defaultMenuList} from '../../utilities/native.utility';
import {t} from '../../utilities/translation.utility';
import {ACCESS_TOKEN, REMOVE_TOKEN, SET_ACCEASS_TOEKN} from '../actionTypes';

export const setTokenAction = accessToken => async dispatch => {
	localStorage.setItem(ACCESS_TOKEN, accessToken);
	axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

	return dispatch({
		type: SET_ACCEASS_TOEKN,
		payload: accessToken
	});
};

export const removeTokenAction = () => async dispatch => {
	localStorage.removeItem(ACCESS_TOKEN);
	axios.defaults.headers.common['Authorization'] = null;

	const {nativeApi} = window;

	const getMenus = defaultMenuList.map(value => {
		value.role = value.role ? t(value.role) : null;
		return value;
	});

	nativeApi.app.setDefaultMenu();

	return dispatch({
		type: REMOVE_TOKEN,
		payload: localStorage.getItem(ACCESS_TOKEN)
	});
};
