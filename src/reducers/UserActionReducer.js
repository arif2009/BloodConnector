import {
	USER_UPDATE, USER_CREATE, USERS_FETCHING,
	USERS_FETCH_ERROR, USERS_FETCH_SUCCESS, 
	USER_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	password: '',

	userList: [],

	error: '',
	loading: true
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case USERS_FETCHING:
			return { ...state, loading: true, error: ''}
		case USERS_FETCH_SUCCESS:
			return { ...state, loading: false, userList: action.payload };
		case USERS_FETCH_ERROR:
			return { ...state, error: 'Login Failed.', loading: false};
		default:
			return state;

	}
};