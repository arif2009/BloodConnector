import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import {LOADING_BLOOD_SUCCESS, LOADING_BLOOD_FAIL,LOADING_BLOOD} from './types';
import {apiOrigin} from '../utills/we';
import { txtColor } from '../components/styles';

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

	AsyncStorage.getItem('@auth:userData', (error, result) => {
		var isLogedIn = !!result;
		Actions.refresh({rightTitle: isLogedIn?'':<Icon style={txtColor} type="FontAwesome" name="user-plus" />});
	});
	//Actions.main();
};