import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from '../../actions/types';
import { apiOrigin, processModelstateError } from '../../utills/we';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const submitLoginForm = (values, dispatch) => {
    
    const {email, password} = values;

    const data = `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    const url = `${apiOrigin}token`;

    return axios.post(url, data, header)
                .then(tokenInfo => loginUserSuccess(dispatch, tokenInfo))
                .catch((error) => loginUserFail(dispatch, error));

    /*return sleep(1000).then(() => {
        debugger;
        console.log(values);
        if (values.Email !== 'sunlight4d@gmail.com') {
            throw new SubmissionError({
                Email: 'Wrong email',
                _error: 'Login failed!',
            });
        } else {
            alert(`Validation success. Values = ${JSON.stringify(values)}`);
        }
    });*/

    /*const data = JSON.stringify(values);
    const header = { headers: { 'Content-Type': 'application/json' } };
    const url = `${apiOrigin}api/account/app_register`;
    const {Email, Password} = values;

    const register = axios.post(url, data, header);
    return register.then(() => {
        const data = `grant_type=password&username=${encodeURIComponent(Email)}&password=${encodeURIComponent(Password)}`;
        const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        const url = `${apiOrigin}token`;

        Alert.alert(
            'Congratulations!!',
            'You are joined successfully with us.',
            [{text: 'OK'}],
            {cancelable: false}
        );
        
        axios.post(url, data, header)
            .then(tokenInfo => {
                AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), () => {
                    dispatch({ type: CREATED_ACC });
                    Actions.userList({ token: tokenInfo.data.access_token, rightTitle: '' });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        let errors = processModelstateError(error);
        errors['_error'] = 'Registration Failed!'
        throw new SubmissionError(errors);
    });*/
};

const loginUserFail = (dispatch, error) => {
    dispatch({ type: LOGIN_USER_FAIL});
    console.log("error >", error);
	let errors = processModelstateError(error);
    errors['_error'] = 'Registration Failed!'
    throw new SubmissionError(errors);
};

const loginUserSuccess = (dispatch, tokenInfo) => {
	AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), ()=>{
		console.log("Stored auth info");
		dispatch({
			type: LOGIN_USER_SUCCESS, 
			payload: tokenInfo.data
		});
		Actions.userList({token: tokenInfo.data.access_token, rightTitle:''});
	});
};

export default submitLoginForm;