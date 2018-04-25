import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
	LOADING_BLOOD_SUCCESS, 
	LOADING_BLOOD_FAIL,
	LOADING_BLOOD
} from './types';

export const loadBloodGroups = () => {
	return (dispatch) => {
		
        dispatch({ type: LOADING_BLOOD });
        
        axios.get('http://10.0.2.2/api/bloodgroup/getusersbloodgroup')
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
	//Actions.main();
};