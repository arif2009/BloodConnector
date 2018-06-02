import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import We from '../../utills/we';

const submit = values => {

    const data = JSON.stringify(values);
    const header = { headers: { 'Content-Type': 'application/json' } };
    const url = `${We.apiOrigin}api/account/app_register`;
    const register = axios.post(url, data, header);

    const {Email, Password} = values;

    return register.then((result) => {
        console.log("Created Success", result);

        const data = `grant_type=password&username=${encodeURIComponent(Email)}&password=${encodeURIComponent(Password)}`;
		const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        const url = `${We.apiOrigin}token`;
        
		axios.post(url, data, header)
		.then(tokenInfo => {
            console.log("Logedin Success", tokenInfo.data);
            AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), ()=>{
                console.log("Stored auth info");
                Actions.userList({token: tokenInfo.data.access_token, rightTitle:''});
            });
        })
		.catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        //debugger;
        //console.log("error",error.response);
        let errors = We.processModelstateError(error);
        errors['_error'] = 'Registration Failed!'
        throw new SubmissionError(errors);
    });
};
export default submit;