import axios from 'axios';
import {
	EMAIL_CHANGED, PASSWORD_CHANGED
} from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const loginUser = ({email, password}) => {
	return (dispatch) => {
		const data = `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
		const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

		axios.post('http://www.bloodconnector.org/token', data, header)
		.then(response => {
			dispatch({ type:'LOGIN_USER_SUCCESS', payload: response.data});
		});
	};
};