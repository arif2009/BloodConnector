import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import {LOADING_BLOOD_SUCCESS, LOADING_BLOOD_FAIL,LOADING_BLOOD} from './types';
import We from '../utills/we';
var styles = require('../components/styles');

export const loadBloodGroups = () => {
	return (dispatch) => {
		
        dispatch({ type: LOADING_BLOOD });
		
		const url = `${We.apiOrigin}api/bloodgroup/getusersbloodgroup`;
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
		Actions.refresh({rightTitle: isLogedIn?'':<Icon style={styles.txtColor} type="FontAwesome" name="user-plus" />});
	});
	//Actions.main();
};