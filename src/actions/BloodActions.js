import axios from 'axios';
import {LOADING_BLOOD_SUCCESS, LOADING_BLOOD_FAIL,LOADING_BLOOD} from './types';
import { apiOrigin } from '../utills/we';

export const loadBloodGroups = () => {
	return (dispatch) => {
		
        dispatch({ type: LOADING_BLOOD });
		
		const url = `${apiOrigin}api/bloodgroup/getusersbloodgroup`;
		axios.get(url)
        .then(response => loadingSuccess(dispatch, response))
        .catch(error => loadingFail(dispatch, error));
	};
};

const loadingFail = (dispatch, error) => {
	dispatch({ 
        type: LOADING_BLOOD_FAIL,
        payload: error
    });
};

const loadingSuccess = (dispatch, response) => {
	dispatch({
		type: LOADING_BLOOD_SUCCESS, 
		payload: response
	});
};