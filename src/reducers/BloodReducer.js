import {
    LOADING_BLOOD_SUCCESS,
    LOADING_BLOOD_FAIL,
    LOADING_BLOOD
} from '../actions/types';

const INITIAL_STATE = {
	bloodInfo: null,
	error: '',
	loading: false,
	loaded: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOADING_BLOOD:
			return { ...state, loading: true, error: '' };
		case LOADING_BLOOD_SUCCESS:
			return { ...state, ...INITIAL_STATE, loaded: true, bloodInfo: action.payload.data };
		case LOADING_BLOOD_FAIL:
			return { ...state, error: 'Loading Failed.', loading: false };
		default:
			return state;

	}
};