import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CREATED_ACC } from '../../actions/types';
import We from '../../utills/we';

const submit = (values, dispatch) => {
    
    const data = JSON.stringify(values);
    const header = { headers: { 'Content-Type': 'application/json' } };
    const url = `${We.apiOrigin}api/account/app_register`;
    const {Email, Password} = values;

    const register = axios.post(url, data, header);
    return register.then(() => {
        const data = `grant_type=password&username=${encodeURIComponent(Email)}&password=${encodeURIComponent(Password)}`;
        const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        const url = `${We.apiOrigin}token`;
        axios.post(url, data, header)
            .then(tokenInfo => {
                AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), () => {
                    dispatch({ type: CREATED_ACC });
                    Actions.userList({ token: tokenInfo.data.access_token, rightTitle: '' });
                    Alert.alert(
                        'Congratulations!!',
                        'You are joined successfully with us.',
                        [{text: 'OK'}],
                        {cancelable: false}
                    );
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        let errors = We.processModelstateError(error);
        errors['_error'] = 'Registration Failed!'
        throw new SubmissionError(errors);
    });
};
export default submit;