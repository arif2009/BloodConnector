import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNRestart from 'react-native-restart';
import {
	EMAIL_CHANGED, PASSWORD_CHANGED, 
	LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
	LOGIN_USER
} from './types';
import { action } from 'mobx';

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

		dispatch({ type: LOGIN_USER });

		const data = `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
		const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

		axios.post('http://www.bloodconnector.org/token', data, header)
		.then(tokenInfo => loginUserSuccess(dispatch, tokenInfo))
		.catch((error) => loginUserFail(dispatch, error));
	};
};

const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_USER_FAIL});
	console.log(error);
};

const loginUserSuccess = (dispatch, tokenInfo) => {
	dispatch({
		type: LOGIN_USER_SUCCESS, 
		payload: tokenInfo
	});

	AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), ()=>{
		RNRestart.Restart();
	});
};