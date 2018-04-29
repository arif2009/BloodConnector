import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
	EMAIL_CHANGED, PASSWORD_CHANGED, 
	LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
	LOGIN_USER, AUTH_INFO, AUTH_INFO_DISPATCHED
} from './types';

export const authInfo = () => {
	return(dispatch) => {
		dispatch({ type: AUTH_INFO });
		AsyncStorage.getItem('@auth:userData', (error, result) => dispatchUserData(dispatch,error,result));
	}
};

const dispatchUserData = (dispatch, error, result)=>{
	dispatch({
		type: AUTH_INFO_DISPATCHED,
		payload: JSON.parse(result)
	});
};

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
	console.log("Login Clicked", email, password);
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
	console.log("Success", tokenInfo.data);
	AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), ()=>{
		console.log("Stored auth info");
		dispatch({
			type: LOGIN_USER_SUCCESS, 
			payload: tokenInfo.data
		});
		Actions.userList({token: tokenInfo.data.access_token});
	});
};