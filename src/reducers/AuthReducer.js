import {
	EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER,
	AUTH_INFO, AUTH_INFO_DISPATCHED, CREATED_ACC
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: '',
	loading: false,
	isLogedIn: false,
	userInfo: null,
	key:'in-auth-reducer'
};

export default (state = INITIAL_STATE, action) => {
	//console.log(action);
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case LOGIN_USER:
			return { ...state, loading: true, error: ''}
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, isLogedIn: true, userInfo: action.payload, key: Math.random() };
		case LOGIN_USER_FAIL:
			return { ...state, error: 'Login Failed.', password: '', loading: false};
		case AUTH_INFO_DISPATCHED:
			return {...state, ...INITIAL_STATE, userInfo: action.payload };
		case CREATED_ACC:
			return {...state, key: Math.random()};
		default:
			return state;

	}
};